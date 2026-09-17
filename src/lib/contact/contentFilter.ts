const URL_PATTERN = /https?:\/\/|www\./i;
const HTML_PATTERN = /<\s*(a|script|img|iframe|link)\b/i;

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "discard.email",
  "dispostable.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "mailinator.com",
  "mailnesia.com",
  "maildrop.cc",
  "mintemail.com",
  "moakt.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempail.com",
  "tempmail.com",
  "throwaway.email",
  "trashmail.com",
  "yopmail.com",
]);

function countUrls(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) ?? []).length;
}

function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 0) return "";
  return email.slice(at + 1).trim().toLowerCase();
}

export type ContentFilterInput = {
  fullname: string;
  email: string;
  message?: string;
};

/**
 * Cheap content heuristics for typical contact-form spam.
 * Conservative on keywords so real consulting leads are not blocked.
 */
export function isSpamContent(input: ContentFilterInput): boolean {
  const name = input.fullname.trim();
  const message = (input.message ?? "").trim();
  const domain = emailDomain(input.email);

  if (URL_PATTERN.test(name) || name.includes("@") || HTML_PATTERN.test(name)) {
    return true;
  }

  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return true;
  }

  if (HTML_PATTERN.test(message) || countUrls(message) > 2) {
    return true;
  }

  return false;
}
