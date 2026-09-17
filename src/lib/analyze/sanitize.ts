/**
 * Input sanitization and content filtering for the idea analysis endpoint.
 *
 * Layers:
 * 1. Strip HTML/script tags and dangerous patterns
 * 2. Reject non-project/idea content (prompt injection, off-topic)
 * 3. Normalize whitespace and length
 */

// --- Patterns to strip from input ---

const HTML_TAG_RE = /<[^>]*>/g;
const JS_URI_RE = /javascript\s*:/gi;
const DATA_URI_RE = /data\s*:[^,]*;base64/gi;
const EVENT_HANDLER_RE = /\bon\w+\s*=/gi;

// --- Prompt injection / jailbreak detection ---

const INJECTION_PATTERNS = [
  // System prompt overrides
  /ignore\s+(all\s+)?(previous|prior|above|earlier|preceding)\s+(instructions?|prompts?|rules?|context)/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /you\s+are\s+now\s+(a|an|the)/i,
  /act\s+as\s+(a|an|the)\s+(different|new|another)/i,
  /new\s+(system|role|persona)\s*(prompt|instructions?)?/i,
  // Data exfiltration attempts
  /send\s+(all\s+)?(data|info|information|content)\s+to/i,
  /exfiltrate|leak\s+(data|information)/i,
  /what\s+(are|is)\s+your\s+(system|initial)\s+(prompt|instructions?)/i,
  /reveal\s+(your|the)\s+(system|initial)\s+(prompt|instructions?)/i,
  // Command execution
  /exec\s*\(|eval\s*\(|system\s*\(|subprocess/i,
  /\b(rm\s+-rf|chmod|curl|wget|nc|netcat)\b/,
  // SQL/NoSQL injection
  /(\b(union\s+select|drop\s+table|insert\s+into|delete\s+from)\b)/i,
  /\$\s*\{.*\}/, // MongoDB template literals
  // Role hijacking
  /from\s+now\s+on\s+(you\s+)?(will|must|should|are)/i,
  /pretend\s+(you\s+)?(are|to\s+be|that)/i,
];

// --- Off-topic content detection ---

const OFF_TOPIC_PATTERNS = [
  // System/meta queries
  /what\s+(model|ai|llm|gpt|claude|gemini)\s+are\s+you/i,
  /who\s+(made|created|built|designed)\s+you/i,
  /what\s+(is|are)\s+your\s+(name|version|model)/i,
  // Non-project topics
  /write\s+(me\s+)?(a\s+)?(poem|song|story|essay|article)/i,
  /tell\s+me\s+(a\s+)?joke/i,
  /what\s+is\s+the\s+(weather|temperature)/i,
  /(translate|traduc|traduci)\s+(this|esto|esto)\s+(to|a|al)\s+(spanish|english|español|inglés)/i,
  /how\s+do\s+I\s+(cook|make|bake)\s+(a\s+)?(cake|pizza|pasta)/i,
  // Political/controversial
  /(opinion|opinión)\s+(about|sobre)\s+(trump|biden|politics|politica)/i,
  // Help/support for other products
  /how\s+(do|can)\s+I\s+(fix|reset|change)\s+(my|the)\s+(password|account|subscription)/i,
  // Math/calculations
  /what\s+is\s+\d+\s*[+\-*/÷×]\s*\d+/i,
  /calculate?\s+(the\s+)?(square\s+root|factorial)/i,
];

// --- Dangerous characters for upstream injection ---

const DANGEROUS_CHARS_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export type SanitizeResult =
  | { ok: true; clean: string }
  | { ok: false; reason: "injection" | "off_topic" | "empty" | "too_short" | "too_long" };

/**
 * Sanitize and validate user input for the idea analyst.
 * Returns the cleaned string or a rejection reason.
 */
export function sanitizeInput(raw: string): SanitizeResult {
  // 1. Strip HTML tags
  let clean = raw.replace(HTML_TAG_RE, "");

  // 2. Strip dangerous URI schemes
  clean = clean.replace(JS_URI_RE, "");
  clean = clean.replace(DATA_URI_RE, "");

  // 3. Strip event handlers
  clean = clean.replace(EVENT_HANDLER_RE, "");

  // 4. Strip control characters
  clean = clean.replace(DANGEROUS_CHARS_RE, "");

  // 5. Normalize whitespace
  clean = clean.replace(/\s+/g, " ").trim();

  // 6. Length checks
  if (clean.length < 3) return { ok: false, reason: "too_short" };
  if (clean.length > 2000) return { ok: false, reason: "too_long" };

  // 7. Prompt injection check
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(clean)) {
      return { ok: false, reason: "injection" };
    }
  }

  // 8. Off-topic check
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(clean)) {
      return { ok: false, reason: "off_topic" };
    }
  }

  return { ok: true, clean };
}

/**
 * Check if input looks like it could be a project idea.
 * Loose check — just ensures there are actual words, not just numbers/symbols.
 */
export function looksLikeIdea(text: string): boolean {
  const words = text.split(/\s+/).filter((w) => /[a-zA-Záéíóúñ]/.test(w));
  return words.length >= 2;
}

/**
 * Rate limit rejection message by locale.
 */
export function getRejectionMessage(
  result: Extract<SanitizeResult, { ok: false }>,
  locale: "es" | "en" = "es",
): string {
  const messages: Record<string, { es: string; en: string }> = {
    injection: {
      es: "Entrada no válida. Por favor describí una idea de proyecto o producto.",
      en: "Invalid input. Please describe a project or product idea.",
    },
    off_topic: {
      es: "Este analizador solo acepta ideas de proyectos. Describe un producto, app o plataforma que te gustaría construir.",
      en: "This analyzer only accepts project ideas. Describe a product, app, or platform you'd like to build.",
    },
    empty: {
      es: "El campo está vacío. Escribí tu idea de proyecto.",
      en: "The field is empty. Write your project idea.",
    },
    too_short: {
      es: "La idea es muy corta. Describila un poco más (mínimo 3 caracteres).",
      en: "The idea is too short. Describe it a bit more (minimum 3 characters).",
    },
    too_long: {
      es: "La idea es muy larga. Resumila en máximo 2000 caracteres.",
      en: "The idea is too long. Summarize it in 2000 characters or less.",
    },
  };
  const msg = messages[result.reason] ?? messages.empty;
  return msg[locale] ?? msg.es;
}
