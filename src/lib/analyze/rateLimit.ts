import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "../env";

/**
 * Analyze endpoint rate limits:
 * - Per IP: 5 calls per 1 minute sliding window
 * - Global cap: 20 calls per 1 minute (protects upstream API quota)
 */
const IP_LIMIT = 5;
const IP_WINDOW = "1 h" as const;
const GLOBAL_LIMIT = 20;
const GLOBAL_WINDOW = "1 h" as const;
const PREFIX = "analyze";

/** In-memory fallback when Upstash is not configured (local dev). */
const memoryStore = new Map<string, number[]>();
const MEMORY_WINDOW_MS = 60 * 60 * 1000;

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

function checkMemoryRateLimit(key: string, max: number): boolean {
  const now = Date.now();
  let timestamps = memoryStore.get(key) ?? [];
  timestamps = timestamps.filter((t) => now - t < MEMORY_WINDOW_MS);
  if (timestamps.length >= max) return false;
  timestamps.push(now);
  memoryStore.set(key, timestamps);
  return true;
}

function createUpstashRatelimit(): Ratelimit | null {
  const creds = getUpstashCredentials();
  if (!creds) return null;

  const redis = new Redis({ url: creds.url, token: creds.token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(GLOBAL_LIMIT, GLOBAL_WINDOW),
    prefix: PREFIX,
    analytics: true,
  });
}

let ratelimitInstance: Ratelimit | null | undefined;

function getRatelimit(): Ratelimit | null {
  if (ratelimitInstance === undefined) {
    ratelimitInstance = createUpstashRatelimit();
  }
  return ratelimitInstance;
}

export type AnalyzeRateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
};

/**
 * Check per-IP rate limit for the analyze endpoint.
 * Returns { allowed, remaining, resetMs }.
 * Disabled in dev so local testing is not blocked.
 */
export async function checkAnalyzeRateLimit(
  ip: string,
): Promise<AnalyzeRateLimitResult> {
  if (isDev()) {
    return { allowed: true, remaining: IP_LIMIT - 1, resetMs: 0 };
  }

  const ratelimit = getRatelimit();

  if (!ratelimit) {
    console.warn(
      "[analyze-rate-limit] Upstash not configured; using in-memory fallback.",
    );
    const ipAllowed = checkMemoryRateLimit(`ip:${ip}`, IP_LIMIT);
    return {
      allowed: ipAllowed,
      remaining: ipAllowed ? IP_LIMIT - 1 : 0,
      resetMs: MEMORY_WINDOW_MS,
    };
  }

  const result = await ratelimit.limit(`ip:${ip}`);
  return {
    allowed: result.success,
    remaining: result.remaining,
    resetMs: result.reset,
  };
}
