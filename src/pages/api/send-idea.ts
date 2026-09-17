import type { APIRoute } from "astro";
import { getEnv } from "../../lib/env";
import { isSameOriginRequest } from "../../lib/contact/origin";

export type SendEmailResult =
  | { success: true }
  | { success: false; error: string; status?: number };

/** Allowed types for the general send-email endpoint. */
type EmailType = "idea" | "contact" | "budget";

function buildIdeaMessage(data: Record<string, unknown>, isEs: boolean): string {
  const idea = String(data.idea || "").trim();
  const polishedIdea = String(data.polishedIdea || "").trim();
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const steps = Array.isArray(data.steps) ? data.steps : [];
  const mvp = Array.isArray(data.mvp) ? data.mvp : [];

  const lines: string[] = [
    isEs ? "Nueva idea desde el portfolio" : "New idea from the portfolio",
    "",
    isEs ? "Idea original:" : "Original idea:",
    idea,
    "",
  ];

  if (polishedIdea) {
    lines.push(isEs ? "Idea pulida:" : "Polished idea:", polishedIdea, "");
  }
  if (tags.length) {
    lines.push(isEs ? "Componentes:" : "Components:", tags.join(", "), "");
  }
  if (mvp.length) {
    lines.push(
      isEs ? "Propuesta MVP:" : "MVP proposal:",
      ...mvp.map((s: string, i: number) => `${i + 1}. ${s}`),
      "",
    );
  }
  if (steps.length) {
    lines.push(
      isEs ? "Próximos pasos:" : "Next steps:",
      ...steps.map((s: string, i: number) => `${i + 1}. ${s}`),
      "",
    );
  }
  return lines.join("\n");
}

function buildContactMessage(data: Record<string, unknown>, isEs: boolean): string {
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const page = String(data.page || "").trim();

  const lines: string[] = [
    isEs ? "Nuevo contacto desde el portfolio" : "New contact from the portfolio",
    "",
  ];
  if (name) lines.push(isEs ? "Nombre:" : "Name:", name, "");
  if (email) lines.push("Email:", email, "");
  if (page) lines.push(isEs ? "Página:" : "Page:", page, "");
  if (message) lines.push(isEs ? "Mensaje:" : "Message:", message, "");
  return lines.join("\n");
}

function buildBudgetMessage(data: Record<string, unknown>, isEs: boolean): string {
  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const projectType = String(data.projectType || "").trim();
  const budget = String(data.budget || "").trim();
  const description = String(data.message || "").trim();
  const timeline = String(data.timeline || "").trim();

  const lines: string[] = [
    isEs
      ? "Nueva solicitud de presupuesto desde el portfolio"
      : "New budget request from the portfolio",
    "",
  ];
  if (name) lines.push(isEs ? "Nombre:" : "Name:", name, "");
  if (email) lines.push("Email:", email, "");
  if (projectType) lines.push(isEs ? "Tipo de proyecto:" : "Project type:", projectType, "");
  if (budget) lines.push(isEs ? "Presupuesto estimado:" : "Estimated budget:", budget, "");
  if (timeline) lines.push(isEs ? "Plazo estimado:" : "Timeline:", timeline, "");
  if (description) lines.push(isEs ? "Descripción:" : "Description:", description, "");
  return lines.join("\n");
}

const SERVICE_LABELS: Record<EmailType, { es: string; en: string }> = {
  idea: { es: "Análisis de Idea", en: "Idea Analysis" },
  contact: { es: "Contacto", en: "Contact" },
  budget: { es: "Solicitud de Presupuesto", en: "Budget Request" },
};

const WEB_NAME_LABELS: Record<EmailType, { es: string; en: string }> = {
  idea: { es: "Portfolio Análisis de Idea", en: "Portfolio Idea Analysis" },
  contact: { es: "Portfolio Contacto", en: "Portfolio Contact" },
  budget: { es: "Portfolio Presupuesto", en: "Portfolio Budget Request" },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isSameOriginRequest(request)) {
      return Response.json({ success: true });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON" } satisfies SendEmailResult,
        { status: 400 },
      );
    }

    const language = body.language === "en" ? "en" : "es";
    const isEs = language === "es";
    const type: EmailType =
      body.type === "contact" || body.type === "budget" ? body.type : "idea";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    // Validate required fields per type
    if (type === "contact") {
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length < 3) {
        return Response.json(
          { success: false, error: isEs ? "Mensaje requerido" : "Message required" } satisfies SendEmailResult,
          { status: 400 },
        );
      }
    }

    if (type === "budget") {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!name || name.length < 2) {
        return Response.json(
          { success: false, error: isEs ? "Nombre requerido" : "Name required" } satisfies SendEmailResult,
          { status: 400 },
        );
      }
      if (!message || message.length < 10) {
        return Response.json(
          { success: false, error: isEs ? "Descripción requerida (mín. 10 caracteres)" : "Description required (min 10 chars)" } satisfies SendEmailResult,
          { status: 400 },
        );
      }
    }

    if (type === "idea") {
      const idea = typeof body.idea === "string" ? body.idea.trim() : "";
      if (!idea || idea.length < 3 || idea.length > 2000) {
        return Response.json(
          { success: false, error: "Idea must be 3-2000 characters" } satisfies SendEmailResult,
          { status: 400 },
        );
      }
    }

    const emailDestiny =
      getEnv("EMAIL_DESTINY") || getEnv("NEXT_PUBLIC_EMAIL_DESTINY");
    const mailprexToken =
      getEnv("MAILPREX_FORM_TOKEN") ||
      getEnv("NEXT_PUBLIC_MAILPREX_FORM_TOKEN");
    const url =
      getEnv("MAILPREX_URL") || "https://api.mailprex.excelso.xyz/email/send";

    if (!emailDestiny || !mailprexToken) {
      console.error("[send-email] Missing EMAIL_DESTINY or MAILPREX_FORM_TOKEN");
      return Response.json(
        { success: false, error: "Email service not configured" } satisfies SendEmailResult,
        { status: 500 },
      );
    }

    // Build message based on type
    const message =
      type === "idea"
        ? buildIdeaMessage(body, isEs)
        : type === "contact"
          ? buildContactMessage(body, isEs)
          : buildBudgetMessage(body, isEs);

    const senderName =
      type === "contact" || type === "budget"
        ? String(body.name || "").trim() || "Portfolio Visitor"
        : email || "Portfolio Visitor";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: senderName,
        email: email || "no-reply@portfolio.local",
        service: SERVICE_LABELS[type][language],
        message,
        phone: "",
        webName: WEB_NAME_LABELS[type][language],
        emailDestiny,
        formToken: mailprexToken,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[send-email] Mailprex HTTP error", res.status, text);
      return Response.json(
        { success: false, error: text || `HTTP ${res.status}`, status: res.status } satisfies SendEmailResult,
        { status: 502 },
      );
    }

    return Response.json({ success: true } satisfies SendEmailResult);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    console.error("[send-email] Unhandled error", msg);
    return Response.json(
      { success: false, error: msg } satisfies SendEmailResult,
      { status: 500 },
    );
  }
};
