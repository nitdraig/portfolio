import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "../env";

/** Production cap: enough for a typo retry, tight enough to stop bursts. */
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = "1 h" as const;
const RATE_LIMIT_PREFIX = "contact-form";

/** In-memory fallback when Upstash is not configured (local dev). */
const memoryStore = new Map<string, number[]>();
const MEMORY_WINDOW_MS = 60 * 60 * 1000;

function isDev(): boolean {
  return import.meta.env.DEV === true || process.env.NODE_ENV !== "production";
}

/** Treat empty or .env.example placeholders as unset. */
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

function checkMemoryRateLimit(key: string): boolean {
  const now = Date.now();
  let timestamps = memoryStore.get(key) ?? [];
  timestamps = timestamps.filter((t) => now - t < MEMORY_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
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
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
    prefix: RATE_LIMIT_PREFIX,
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

/**
 * Returns true if the request is allowed, false if rate limited.
 * Checks both IP and email identifiers when email is provided.
 * Disabled in development so local testing is not blocked.
 */
export async function checkContactRateLimit(
  ip: string,
  email?: string,
): Promise<boolean> {
  if (isDev()) return true;

  const ratelimit = getRatelimit();

  if (!ratelimit) {
    console.warn(
      "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN not set; using in-memory fallback (not reliable on serverless).",
    );
    const ipOk = checkMemoryRateLimit(`ip:${ip}`);
    const emailOk = email
      ? checkMemoryRateLimit(`email:${email.toLowerCase()}`)
      : true;
    return ipOk && emailOk;
  }

  const ipResult = await ratelimit.limit(`ip:${ip}`);
  if (!ipResult.success) return false;

  if (email) {
    const emailResult = await ratelimit.limit(`email:${email.toLowerCase()}`);
    if (!emailResult.success) return false;
  }

  return true;
}
