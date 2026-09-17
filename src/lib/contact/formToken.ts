import { getEnv } from "../env";

const MIN_AGE_MS = 6_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = getEnv("CONTACT_FORM_SECRET") || getEnv("MAILPREX_FORM_TOKEN");
  if (secret) return secret;
  if (import.meta.env.DEV) return "dev-contact-form-secret";
  throw new Error("CONTACT_FORM_SECRET or MAILPREX_FORM_TOKEN is required");
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function sign(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(signature);
}

export async function createFormToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const signature = await sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function verifyFormToken(
  token: string | undefined,
): Promise<{ ok: true } | { ok: false; error: "spam" | "too_fast" | "expired" }> {
  if (!token || !token.includes(".")) {
    return { ok: false, error: "spam" };
  }

  const separator = token.indexOf(".");
  const issuedAtRaw = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!issuedAtRaw || !signature) {
    return { ok: false, error: "spam" };
  }

  const expected = await sign(issuedAtRaw);
  if (!timingSafeEqual(signature, expected)) {
    return { ok: false, error: "spam" };
  }

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) {
    return { ok: false, error: "spam" };
  }

  const age = Date.now() - issuedAt;
  if (age < MIN_AGE_MS) return { ok: false, error: "too_fast" };
  if (age > MAX_AGE_MS) return { ok: false, error: "expired" };
  return { ok: true };
}
