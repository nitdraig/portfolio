import nodemailer from "nodemailer";
import { getThankYouEmailContent } from "./templates";
import { getEnv } from "../env";

export type ThankYouEmailPayload = {
  to: string;
  name: string;
  language: "es" | "en";
};

export async function sendThankYouEmail(
  payload: ThankYouEmailPayload,
): Promise<{ ok: boolean; error?: string }> {
  const { to, name, language } = payload;

  const from = getEnv("MAILER_FROM");
  const host = getEnv("MAILER_HOST");
  const port = Number(getEnv("MAILER_PORT")) || 587;
  const user = getEnv("MAILER_USER");
  const pass = getEnv("MAILER_PASS");

  if (!from || !host || !user || !pass) {
    console.error("[sendThankYouEmail] Missing MAILER_* env vars");
    return { ok: false, error: "Email not configured" };
  }

  let transporter: nodemailer.Transporter;
  try {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } catch (e) {
    console.error("[sendThankYouEmail] Transporter error", e);
    return { ok: false, error: "Failed to create mailer" };
  }

  const { subject, text, html } = getThankYouEmailContent(language, name);

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error("[sendThankYouEmail] Send failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}
