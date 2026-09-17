import { verifyFormToken } from "./formToken";

export type AntiSpamInput = {
  honeypot?: string;
  honeypotCompany?: string;
  formToken?: string;
};

export type AntiSpamResult =
  | { ok: true }
  | { ok: false; error: "spam" | "too_fast" | "expired" };

/**
 * Server-side bot checks: honeypots and a signed form session token.
 */
export async function validateAntiSpam(
  input: AntiSpamInput,
): Promise<AntiSpamResult> {
  if (input.honeypot?.trim() || input.honeypotCompany?.trim()) {
    return { ok: false, error: "spam" };
  }

  return verifyFormToken(input.formToken);
}
