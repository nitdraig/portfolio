import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "../env";

/**
 * Analyze endpoint rate limits (per IP):
 * - Attempts: every POST (valid, rejected, or malformed) — 8 / 10 minutes
 * - Requests: upstream API calls — 5 / 1 hour
 * - Global cap: 20 upstream calls / 1 hour
 */
const ATTEMPT_LIMIT = 8;
const ATTEMPT_WINDOW = "10 m" as const;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;

const IP_REQUEST_LIMIT = 5;
const IP_REQUEST_WINDOW = "1 h" as const;
const IP_REQUEST_WINDOW_MS = 60 * 60 * 1000;

const GLOBAL_LIMIT = 20;
const GLOBAL_WINDOW = "1 h" as const;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;

const PREFIX = "analyze";

type WindowDuration = `${number} ${"s" | "m" | "h" | "d"}`;

/** In-memory fallback when Upstash is not configured (local / no Redis). */
const memoryStore = new Map<string, number[]>();

function isDev(): boolean {
  return import.meta.env.DEV === true || process.env.NODE_ENV !== "production";
}

function getUpstashCredentials(): { url: string; token: string } | null {
  const url = getEnv("UPSTASH_REDIS_REST_URL");
  const token = getEnv("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return null;
  if (
    url.includes("your-instance") ||
    token.includes("your-upstash") ||
    token === "your-upstash-token"
  ) {
    return null;
  }
  return { url, token };
}

function checkMemoryRateLimit(
  key: string,
  max: number,
  windowMs: number,
): AnalyzeRateLimitResult {
  const now = Date.now();
  let timestamps = memoryStore.get(key) ?? [];
  timestamps = timestamps.filter((t) => now - t < windowMs);
  if (timestamps.length >= max) {
    const oldest = timestamps[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(1000, windowMs - (now - oldest)),
    };
  }
  timestamps.push(now);
  memoryStore.set(key, timestamps);
  return {
    allowed: true,
    remaining: max - timestamps.length,
    resetMs: windowMs,
  };
}

function createLimiter(
  limit: number,
  window: WindowDuration,
  prefix: string,
): Ratelimit | null {
  const creds = getUpstashCredentials();
  if (!creds) return null;

  const redis = new Redis({ url: creds.url, token: creds.token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `${PREFIX}:${prefix}`,
    analytics: true,
  });
}

type LimiterKind = "attempt" | "request" | "global";

const limiterCache: Partial<Record<LimiterKind, Ratelimit | null>> = {};

function getLimiter(kind: LimiterKind): Ratelimit | null {
  if (kind in limiterCache) return limiterCache[kind] ?? null;

  let instance: Ratelimit | null;
  switch (kind) {
    case "attempt":
      instance = createLimiter(ATTEMPT_LIMIT, ATTEMPT_WINDOW, "attempt");
      break;
    case "request":
      instance = createLimiter(IP_REQUEST_LIMIT, IP_REQUEST_WINDOW, "request");
      break;
    case "global":
      instance = createLimiter(GLOBAL_LIMIT, GLOBAL_WINDOW, "global");
      break;
    default: {
      const _exhaustive: never = kind;
      throw new Error(`Unhandled limiter kind: ${_exhaustive}`);
    }
  }

  limiterCache[kind] = instance;
  return instance;
}

export type AnalyzeRateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  kind: "attempt" | "request";
};

async function runLimit(
  kind: LimiterKind,
  key: string,
  max: number,
  windowMs: number,
): Promise<Omit<AnalyzeRateLimitResult, "kind">> {
  const ratelimit = getLimiter(kind);

  if (!ratelimit) {
    if (kind !== "attempt") {
      console.warn(
        "[analyze-rate-limit] Upstash not configured; using in-memory fallback.",
      );
    }
    return checkMemoryRateLimit(`${kind}:${key}`, max, windowMs);
  }

  const result = await ratelimit.limit(key);
  return {
    allowed: result.success,
    remaining: result.remaining,
    resetMs: Math.max(1000, result.reset - Date.now()),
  };
}

/**
 * Count every analyze POST (including rejected / invalid bodies).
 * Disabled in dev so local testing is not blocked.
 */
export async function checkAnalyzeAttemptLimit(
  ip: string,
): Promise<AnalyzeRateLimitResult> {
  if (isDev()) {
    return {
      allowed: true,
      remaining: ATTEMPT_LIMIT - 1,
      resetMs: 0,
      kind: "attempt",
    };
  }

  const result = await runLimit(
    "attempt",
    `ip:${ip}`,
    ATTEMPT_LIMIT,
    ATTEMPT_WINDOW_MS,
  );
  return { ...result, kind: "attempt" };
}

/**
 * Cap upstream API calls per IP, plus a global quota.
 * Disabled in dev so local testing is not blocked.
 */
export async function checkAnalyzeRequestLimit(
  ip: string,
): Promise<AnalyzeRateLimitResult> {
  if (isDev()) {
    return {
      allowed: true,
      remaining: IP_REQUEST_LIMIT - 1,
      resetMs: 0,
      kind: "request",
    };
  }

  const ipResult = await runLimit(
    "request",
    `ip:${ip}`,
    IP_REQUEST_LIMIT,
    IP_REQUEST_WINDOW_MS,
  );
  if (!ipResult.allowed) return { ...ipResult, kind: "request" };

  const globalResult = await runLimit(
    "global",
    "all",
    GLOBAL_LIMIT,
    GLOBAL_WINDOW_MS,
  );
  if (!globalResult.allowed) return { ...globalResult, kind: "request" };

  return {
    allowed: true,
    remaining: Math.min(ipResult.remaining, globalResult.remaining),
    resetMs: ipResult.resetMs,
    kind: "request",
  };
}
