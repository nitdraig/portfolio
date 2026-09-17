import type { APIRoute } from "astro";
import {
  discoveryFormSchema,
  formatDiscoveryBodyForOwner,
} from "../../lib/contact/schema";
import { validateAntiSpam } from "../../lib/contact/antiSpam";
import { isSpamContent } from "../../lib/contact/contentFilter";
import { isSameOriginRequest } from "../../lib/contact/origin";
import { checkContactRateLimit } from "../../lib/contact/rateLimit";
import {
  isTurnstileConfigured,
  verifyTurnstileToken,
} from "../../lib/contact/turnstile";
import { sendThankYouEmail } from "../../lib/email/sendThankYouEmail";
import { getEnv } from "../../lib/env";

export type SubmitDiscoveryResult =
  | { success: true }
  | {
      success: false;
      error:
        | "spam"
        | "too_fast"
        | "expired"
        | "captcha"
        | "rate_limit"
        | "validation"
        | "mailprex"
        | "email";
      message?: string;
    };

/** Pretend success so bots do not iterate on the payload. */
function silentReject(): Response {
  return Response.json({ success: true } satisfies SubmitDiscoveryResult);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "validation",
          message: "Invalid JSON",
        } satisfies SubmitDiscoveryResult,
        { status: 400 },
      );
    }

    const language = body.language === "en" ? "en" : "es";

    if (!isSameOriginRequest(request)) {
      return silentReject();
    }

    const antiSpam = await validateAntiSpam({
      honeypot: typeof body.honeypot === "string" ? body.honeypot : undefined,
      honeypotCompany:
        typeof body.honeypotCompany === "string"
          ? body.honeypotCompany
          : undefined,
      formToken: typeof body.formToken === "string" ? body.formToken : undefined,
    });

    if (!antiSpam.ok) {
      if (antiSpam.error === "spam") {
        return silentReject();
      }
      return Response.json(
        { success: false, error: antiSpam.error } satisfies SubmitDiscoveryResult,
        { status: 400 },
      );
    }

    const ip = getClientIp(request);

    if (isTurnstileConfigured()) {
      const captchaToken =
        typeof body.turnstileToken === "string" ? body.turnstileToken : "";
      const captchaOk = await verifyTurnstileToken(captchaToken, ip);
      if (!captchaOk) {
        return Response.json(
          { success: false, error: "captcha" } satisfies SubmitDiscoveryResult,
          { status: 400 },
        );
      }
    }

    const email = typeof body.email === "string" ? body.email : undefined;
    const allowed = await checkContactRateLimit(ip, email);
    if (!allowed) {
      return Response.json(
        { success: false, error: "rate_limit" } satisfies SubmitDiscoveryResult,
        { status: 429 },
      );
    }

    const parsed = discoveryFormSchema.safeParse({
      fullname: body.fullname,
      email: body.email,
      necesidad: body.necesidad,
      presupuesto: body.presupuesto,
      urgencia: body.urgencia,
      decision: body.decision,
      message: typeof body.message === "string" ? body.message : "",
    });

    if (!parsed.success) {
      const msg = parsed.error.flatten().fieldErrors;
      const first =
        Object.values(msg).flat().join(" ") || "Revisa los campos.";
      return Response.json(
        {
          success: false,
          error: "validation",
          message: first,
        } satisfies SubmitDiscoveryResult,
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (isSpamContent(data)) {
      return silentReject();
    }

    // Prefer Astro keys; fall back to Next.js naming for easier migration.
    const emailDestiny =
      getEnv("EMAIL_DESTINY") || getEnv("NEXT_PUBLIC_EMAIL_DESTINY");
    const mailprexToken =
      getEnv("MAILPREX_FORM_TOKEN") ||
      getEnv("NEXT_PUBLIC_MAILPREX_FORM_TOKEN");
    const url =
      getEnv("MAILPREX_URL") || "https://api.mailprex.excelso.xyz/email/send";

    if (!emailDestiny || !mailprexToken) {
      console.error(
        "[contact] Missing EMAIL_DESTINY or MAILPREX_FORM_TOKEN in environment",
      );
      return Response.json(
        {
          success: false,
          error: "mailprex",
          message: "Configuración de email faltante",
        } satisfies SubmitDiscoveryResult,
        { status: 500 },
      );
    }

    const bodyForOwner = formatDiscoveryBodyForOwner(data, language);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: data.fullname,
          email: data.email,
          service: data.necesidad,
          message: bodyForOwner,
          phone: "",
          webName: "Portfolio Freelance Discovery",
          emailDestiny,
          formToken: mailprexToken,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("[contact] Mailprex HTTP error", res.status, text);
        return Response.json(
          {
            success: false,
            error: "mailprex",
            message: text || `HTTP ${res.status}`,
          } satisfies SubmitDiscoveryResult,
          { status: 502 },
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Mailprex error";
      console.error("[contact] Mailprex fetch failed", msg);
      return Response.json(
        {
          success: false,
          error: "mailprex",
          message: msg,
        } satisfies SubmitDiscoveryResult,
        { status: 502 },
      );
    }

    const thankYou = await sendThankYouEmail({
      to: data.email,
      name: data.fullname,
      language,
    });

    // Owner notification already succeeded via Mailprex; don't fail the request
    // if the thank-you SMTP step has issues.
    if (!thankYou.ok) {
      console.error("[contact] Thank-you email failed", thankYou.error);
    }

    return Response.json({ success: true } satisfies SubmitDiscoveryResult);
  } catch (e) {
    console.error("[contact] Unhandled error", e);
    return Response.json(
      {
        success: false,
        error: "email",
        message: e instanceof Error ? e.message : "Server error",
      } satisfies SubmitDiscoveryResult,
      { status: 500 },
    );
  }
};
