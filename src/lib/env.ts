import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Static import.meta.env reads (Vite only inlines statically referenced keys).
 * Dynamic import.meta.env[key] always returns undefined.
 */
const META_ENV: Record<string, string | undefined> = {
  EMAIL_DESTINY: import.meta.env.EMAIL_DESTINY,
  NEXT_PUBLIC_EMAIL_DESTINY: import.meta.env.NEXT_PUBLIC_EMAIL_DESTINY,
  MAILPREX_FORM_TOKEN: import.meta.env.MAILPREX_FORM_TOKEN,
  NEXT_PUBLIC_MAILPREX_FORM_TOKEN: import.meta.env.NEXT_PUBLIC_MAILPREX_FORM_TOKEN,
  MAILPREX_URL: import.meta.env.MAILPREX_URL,
  MAILER_FROM: import.meta.env.MAILER_FROM,
  MAILER_HOST: import.meta.env.MAILER_HOST,
  MAILER_PORT: import.meta.env.MAILER_PORT,
  MAILER_USER: import.meta.env.MAILER_USER,
  MAILER_PASS: import.meta.env.MAILER_PASS,
  CONTACT_FORM_SECRET: import.meta.env.CONTACT_FORM_SECRET,
  PUBLIC_TURNSTILE_SITE_KEY: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: import.meta.env.TURNSTILE_SECRET_KEY,
  UPSTASH_REDIS_REST_URL: import.meta.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  PORTFOLIO_API_TOKEN: import.meta.env.PORTFOLIO_API_TOKEN,
  PORTFOLIO_API_URL: import.meta.env.PORTFOLIO_API_URL,
};

let fileEnvCache: Record<string, string> | null = null;

function stripQuotes(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseEnvFile(filePath: string): Record<string, string> {
  const out: Record<string, string> = {};
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key) continue;
    out[key] = stripQuotes(trimmed.slice(eq + 1));
  }
  return out;
}

/**
 * Load `.env` from disk for local/dev when process.env is incomplete.
 * Skipped silently on serverless if files are absent.
 */
function loadFileEnv(): Record<string, string> {
  if (fileEnvCache) return fileEnvCache;

  const root = process.cwd();
  const mode = process.env.NODE_ENV || "development";
  const merged: Record<string, string> = {};

  // Later files override earlier ones (Vite-like precedence).
  for (const name of [
    ".env",
    ".env.local",
    `.env.${mode}`,
    `.env.${mode}.local`,
  ]) {
    const full = path.join(root, name);
    if (!existsSync(full)) continue;
    try {
      Object.assign(merged, parseEnvFile(full));
    } catch {
      // Ignore unreadable env files
    }
  }

  fileEnvCache = merged;
  return fileEnvCache;
}

/**
 * Read a server env var by key.
 * Order: process.env (Vercel runtime) → static import.meta.env → local .env files.
 * Do not import from "vite" — it pulls the bundler into the serverless bundle.
 */
export function getEnv(key: string): string {
  const fromProcess = process.env[key];
  if (fromProcess != null && String(fromProcess).trim() !== "") {
    return stripQuotes(String(fromProcess));
  }

  const fromMeta = META_ENV[key];
  if (fromMeta != null && String(fromMeta).trim() !== "") {
    return stripQuotes(String(fromMeta));
  }

  const fromFile = loadFileEnv()[key];
  if (fromFile != null && fromFile.trim() !== "") {
    return stripQuotes(fromFile);
  }

  return "";
}
