import type { APIRoute } from "astro";
import { getEnv } from "../../lib/env";
import { checkAnalyzeRateLimit } from "../../lib/analyze/rateLimit";
import { isSameOriginRequest } from "../../lib/contact/origin";
import { sanitizeInput, looksLikeIdea, getRejectionMessage } from "../../lib/analyze/sanitize";

export type AnalyzeResult =
  | { success: true; data: Record<string, unknown> }
  | {
      success: false;
      error: "rate_limit" | "validation" | "auth" | "upstream" | "forbidden" | "rejected";
      message?: string;
    };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export const POST: APIRoute = async ({ request }) => {
  // --- CORS: only accept same-origin or same-site requests ---
  if (!isSameOriginRequest(request)) {
    return Response.json(
      { success: false, error: "forbidden" } satisfies AnalyzeResult,
      { status: 403 },
    );
  }

  // --- Rate limit by IP ---
  const ip = getClientIp(request);
  const rl = await checkAnalyzeRateLimit(ip);
  if (!rl.allowed) {
    return Response.json(
      {
        success: false,
        error: "rate_limit",
        message: "Too many requests. Try again later.",
      } satisfies AnalyzeResult,
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.resetMs / 1000)),
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      },
    );
  }

  // --- Parse body ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        error: "validation",
        message: "Invalid JSON body",
      } satisfies AnalyzeResult,
      { status: 400 },
    );
  }

  const rawIdea = typeof body.projectIdea === "string" ? body.projectIdea.trim() : "";
  const language = body.language === "en" ? "en" : "es";

  // --- Sanitize and validate input ---
  const sanitized = sanitizeInput(rawIdea);
  if (!sanitized.ok) {
    return Response.json(
      {
        success: false,
        error: "rejected",
        message: getRejectionMessage(sanitized, language),
      } satisfies AnalyzeResult,
      { status: 400 },
    );
  }

  // --- Content filter: must look like a project idea ---
  if (!looksLikeIdea(sanitized.clean)) {
    return Response.json(
      {
        success: false,
        error: "rejected",
        message: getRejectionMessage({ ok: false, reason: "off_topic" }, language),
      } satisfies AnalyzeResult,
      { status: 400 },
    );
  }

  // --- Auth token ---
  const apiToken = getEnv("PORTFOLIO_API_TOKEN");
  const upstreamUrl = getEnv("PORTFOLIO_API_URL") || "https://api.flowfolio.space/portfolio/idea";

  if (!apiToken) {
    console.error("[analyze] PORTFOLIO_API_TOKEN not configured");
    return Response.json(
      {
        success: false,
        error: "auth",
        message: "API not configured",
      } satisfies AnalyzeResult,
      { status: 500 },
    );
  }

  // --- Forward sanitized input to upstream API ---
  try {
    const upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        name: "Explorador",
        projectIdea: sanitized.clean,
        language,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!upstreamRes.ok) {
      const text = await upstreamRes.text().catch(() => "");
      console.error("[analyze] Upstream HTTP error", upstreamRes.status, text);
      return Response.json(
        {
          success: false,
          error: "upstream",
          message: `Upstream returned ${upstreamRes.status}`,
        } satisfies AnalyzeResult,
        { status: 502 },
      );
    }

    const data = await upstreamRes.json();
    return Response.json({ success: true, data: data.data || data } satisfies AnalyzeResult);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upstream fetch failed";
    console.error("[analyze] Upstream error", msg);
    return Response.json(
      {
        success: false,
        error: "upstream",
        message: msg,
      } satisfies AnalyzeResult,
      { status: 502 },
    );
  }
};
