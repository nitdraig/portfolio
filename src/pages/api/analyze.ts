import type { APIRoute } from "astro";
import { getEnv } from "../../lib/env";
import {
  checkAnalyzeAttemptLimit,
  checkAnalyzeRequestLimit,
} from "../../lib/analyze/rateLimit";
import { formatPitchQuotes } from "../../lib/analyze/formatPitch";
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

function rateLimitMessage(
  kind: "attempt" | "request",
  language: "es" | "en",
): string {
  if (kind === "attempt") {
    return language === "es"
      ? "Demasiados intentos. Probá de nuevo en unos minutos."
      : "Too many attempts. Try again in a few minutes.";
  }
  return language === "es"
    ? "Demasiadas peticiones. Probá de nuevo más tarde."
    : "Too many requests. Try again later.";
}

function formatAnalyzePayload(data: Record<string, unknown>): Record<string, unknown> {
  const next = { ...data };
  if (typeof next.polishedIdea === "string") {
    next.polishedIdea = formatPitchQuotes(next.polishedIdea);
  }
  if (typeof next.idea === "string") {
    next.idea = formatPitchQuotes(next.idea);
  }
  return next;
}

export const POST: APIRoute = async ({ request }) => {
  // --- CORS: only accept same-origin or same-site requests ---
  if (!isSameOriginRequest(request)) {
    return Response.json(
      { success: false, error: "forbidden" } satisfies AnalyzeResult,
      { status: 403 },
    );
  }

  const ip = getClientIp(request);

  // --- Attempt limit by IP (every POST counts) ---
  const attemptRl = await checkAnalyzeAttemptLimit(ip);
  if (!attemptRl.allowed) {
    return Response.json(
      {
        success: false,
        error: "rate_limit",
        message: rateLimitMessage("attempt", "es"),
      } satisfies AnalyzeResult,
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(attemptRl.resetMs / 1000)),
          "X-RateLimit-Remaining": String(attemptRl.remaining),
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

  // --- Request limit by IP (upstream calls) ---
  const requestRl = await checkAnalyzeRequestLimit(ip);
  if (!requestRl.allowed) {
    return Response.json(
      {
        success: false,
        error: "rate_limit",
        message: rateLimitMessage("request", language),
      } satisfies AnalyzeResult,
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(requestRl.resetMs / 1000)),
          "X-RateLimit-Remaining": String(requestRl.remaining),
        },
      },
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

  const pitchStyle =
    language === "es"
      ? 'Explorador, te propongo "{Nombre}": una app sencilla que resuelve un problema concreto, empezando por un solo alcance.'
      : 'Explorer, I propose "{Name}": a simple app that solves one concrete problem, starting with a single scope.';

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
        pitchStyle,
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
    const payload = formatAnalyzePayload(
      (data.data || data) as Record<string, unknown>,
    );
    return Response.json({ success: true, data: payload } satisfies AnalyzeResult);
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
