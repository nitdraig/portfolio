import { projects, type Project } from "./projects";
import type { Locale } from "../i18n/ui";

/** Node-panel project shape — flat, locale-resolved. */
export type NodeProject = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  type: string;
  desc: string;
  slug: string;
  year: number;
  image: string;
  status?: string;
  featured?: boolean;
};

/** Map real projects → node-panel shape for a given locale. */
export function getNodeProjects(locale: Locale): NodeProject[] {
  return projects.map((p) => ({
    id: p.slug,
    title: p.title[locale] ?? p.title.en,
    category: capitalize(p.industry),
    tags: p.tags,
    type: capitalize(p.deliveryType),
    desc: p.shortDescription[locale] ?? p.shortDescription.en,
    slug: p.slug,
    year: p.year,
    image: p.image,
    status: p.status,
    featured: p.featured,
  }));
}

/** Categories derived from real project industries + delivery types. */
export const CATEGORIES = [
  ...Array.from(new Set(projects.map((p) => capitalize(p.industry)))),
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ---------- Idea decomposition & matching ---------- */

export const IDEA_DICTIONARY = [
  { match: /runn|carrera|marató|corredor/i, tags: ["USERS", "EVENTS", "PROFILES", "MATCHING", "SPORTS"] },
  { match: /pago|fintech|banc|finan|cuota|membresía/i, tags: ["USERS", "PAYMENTS", "LEDGER", "COMPLIANCE", "DASHBOARD"] },
  { match: /marketplace|tienda|ecommerce|vender|compra/i, tags: ["USERS", "LISTINGS", "SEARCH", "TRANSACTIONS", "PLATFORM"] },
  { match: /social|comunidad|red|ONG|animal|rescate/i, tags: ["USERS", "CONTENT", "FEED", "INTERACTIONS", "NONPROFIT"] },
  { match: /automat|workflow|integrac|tarea/i, tags: ["TRIGGERS", "RULES", "INTEGRATIONS", "ACTIONS", "MONITORING"] },
  { match: /freelanc|cliente|proyecto|entrega/i, tags: ["USERS", "PROJECTS", "CLIENTS", "TASKS", "FREELANCE"] },
  { match: /educación|aprendizaje|escuela|colegio|institución/i, tags: ["USERS", "LEARNING", "INSTITUTIONS", "EDUCATION"] },
  { match: /minería|minero|geología|recurso/i, tags: ["USERS", "MINING", "PROFESSIONALS", "NETWORKING"] },
  { match: /salud|médic|hospital|paciente|HIPAA/i, tags: ["USERS", "HEALTHCARE", "SECURITY", "COMPLIANCE"] },
  { match: /receta|cocina|comida|aliment/i, tags: ["USERS", "CONTENT", "AI", "FOOD"] },
  { match: /landing|sitio|web\s*(site|page)|marca/i, tags: ["USERS", "LANDING", "BRAND", "MARKETING"] },
  { match: /IA|inteligencia\s*artificial|agente|chatbot|LLM/i, tags: ["AI", "AGENTS", "AUTOMATION", "LLMS"] },
  { match: /ambiental|sustentab|clima|jema|licencia/i, tags: ["USERS", "SUSTAINABILITY", "ENVIRONMENT", "AI"] },
];

const FALLBACK_TAGS = ["USERS", "DATA", "LOGIC", "INTERFACE", "PLATFORM"];

export function decomposeIdea(text: string): string[] {
  const hit = IDEA_DICTIONARY.find((d) => d.match.test(text));
  return hit ? hit.tags : FALLBACK_TAGS;
}

export function matchProjects(text: string, tags: string[], locale: Locale = "es"): NodeProject[] {
  const all = getNodeProjects(locale);
  const lower = text.toLowerCase();
  const tagSet = tags.map((t) => t.toLowerCase());
  let matches = all.filter(
    (p) =>
      p.tags.some((t) => lower.includes(t.toLowerCase())) ||
      tagSet.some((tag) => p.tags.some((pt) => pt.toLowerCase() === tag))
  );
  if (matches.length === 0) matches = all.slice(0, 3);
  return matches.slice(0, 3);
}

export function generateMvp(text: string, tags: string[]): string[] {
  const lower = text.toLowerCase();
  const bullets: string[] = [];

  if (/app|mobile|ios|android/.test(lower))
    bullets.push("A focused mobile app that lets users complete the core action in under 60 seconds.");
  else if (/platform|marketplace|saas|b2b/.test(lower))
    bullets.push("A web dashboard where each side of the marketplace can list, search, and manage its core objects.");
  else bullets.push("A clean web interface that lets users perform the one action the idea promises.");

  if (/user|profile|auth|login|sign up/.test(lower) || tags.includes("USERS"))
    bullets.push("Simple sign-up and profile setup so the system can personalize the experience from day one.");
  else bullets.push("A lightweight data model that captures the inputs needed to deliver value.");

  if (/payment|pay|subscription|buy|sell|transaction/.test(lower) || tags.includes("PAYMENTS") || tags.includes("TRANSACTIONS"))
    bullets.push("A basic payment or transaction flow with clear confirmation and history.");
  else if (/search|find|match|filter/.test(lower) || tags.includes("SEARCH") || tags.includes("MATCHING"))
    bullets.push("Search and filtering so users can find the right match in a growing catalog.");
  else if (/content|post|feed|community/.test(lower) || tags.includes("CONTENT"))
    bullets.push("Content creation and a simple feed so early users can see activity immediately.");
  else bullets.push("The smallest automation or workflow that removes the manual step users would otherwise do.");

  bullets.push("Analytics, feedback capture, and an admin view to learn what to build next.");
  return bullets.slice(0, 4);
}

export function generateNextSteps(_text: string, _tags: string[]): string[] {
  return [
    "Define the primary user and the one job they hire this product to do.",
    "Map the smallest end-to-end flow that delivers value in the first session.",
    "Build the prototype, test it with 5 real users, and capture feedback.",
    "Iterate on the highest-friction step before adding any new feature.",
  ];
}

export const STEP_TEMPLATES = [
  "Define the primary user and the one job they hire this product to do.",
  "Map the smallest loop that delivers value end-to-end.",
  "Choose the metric that proves the loop works and how to measure it.",
  "Identify the highest-risk assumption and a 48-hour validation test.",
  "Build the MVP surface and ship to 5 real users before adding features.",
  "Connect analytics and feedback channels to guide the next iteration.",
];
