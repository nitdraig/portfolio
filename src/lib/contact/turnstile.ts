import { getEnv } from "../env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Treat empty or .env.example placeholders as unset. */
function isPlaceholder(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!v) return true;
  return (
    v.startsWith("your-") ||
    v.includes("your-turnstile") ||
    v === "changeme"
  );
}

/** Public site key — safe to embed in prerendered HTML. */
export function getTurnstileSiteKey(): string {
  // Prefer static PUBLIC_ read so Vite inlines it at build/prerender time.
  const fromMeta = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
  const raw =
    fromMeta != null && String(fromMeta).trim() !== ""
      ? String(fromMeta).trim()
      : getEnv("PUBLIC_TURNSTILE_SITE_KEY");
  return isPlaceholder(raw) ? "" : raw;
}

function getTurnstileSecret(): string {
  const raw = getEnv("TURNSTILE_SECRET_KEY");
  return isPlaceholder(raw) ? "" : raw;
}

export function isTurnstileConfigured(): boolean {
  return Boolean(getTurnstileSiteKey() && getTurnstileSecret());
}

export async function verifyTurnstileToken(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const secret = getTurnstileSecret();
  if (!secret) return false;
  if (!token?.trim()) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  const res = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return false;

  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}
