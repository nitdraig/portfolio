import { z } from "zod";

export const NECESIDAD_OPTIONS = [
  { value: "desarrollo", labelEs: "Desarrollo", labelEn: "Development" },
  { value: "consultoria", labelEs: "Consultoría", labelEn: "Consulting" },
  { value: "auditoria", labelEs: "Auditoría", labelEn: "Audit" },
] as const;

export const PRESUPUESTO_OPTIONS = [
  { value: "menos-2k", labelEs: "Menos de 2k USD", labelEn: "Under 2k USD" },
  { value: "2k-5k", labelEs: "2k - 5k USD", labelEn: "2k - 5k USD" },
  { value: "5k-15k", labelEs: "5k - 15k USD", labelEn: "5k - 15k USD" },
  { value: "15k-plus", labelEs: "15k+ USD", labelEn: "15k+ USD" },
] as const;

export const URGENCIA_OPTIONS = [
  { value: "asap", labelEs: "Lo antes posible", labelEn: "ASAP" },
  { value: "2-semanas", labelEs: "En 1-2 semanas", labelEn: "In 1-2 weeks" },
  { value: "1-3-meses", labelEs: "En 1-3 meses", labelEn: "In 1-3 months" },
  {
    value: "exploratorio",
    labelEs: "Solo explorando opciones",
    labelEn: "Just exploring options",
  },
] as const;

export const DECISION_OPTIONS = [
  {
    value: "si",
    labelEs: "Sí, soy dueño o decisor",
    labelEn: "Yes, I'm the owner or decision maker",
  },
  {
    value: "no",
    labelEs: "No, necesito validar con mi equipo",
    labelEn: "No, I need to validate with my team",
  },
] as const;

/** Full name: at least 8 characters and a space (first + last name). */
const fullnameAntiSpam = z
  .string()
  .min(8, "Nombre y apellido (mín. 8 caracteres)")
  .refine((s) => /\s/.test(s.trim()), "Indica nombre y apellido");

/** Optional message: if present, at least 8 characters (filters tiny spam tokens). */
const messageAntiSpam = z
  .string()
  .max(2000)
  .optional()
  .refine(
    (s) => !s || s.trim().length === 0 || s.trim().length >= 8,
    "Si escribes algo, al menos 8 caracteres",
  );

export const discoveryFormSchema = z.object({
  fullname: fullnameAntiSpam,
  email: z.string().email("Email inválido"),
  necesidad: z.enum(["desarrollo", "consultoria", "auditoria"]),
  presupuesto: z.enum(["menos-2k", "2k-5k", "5k-15k", "15k-plus"]),
  urgencia: z.enum(["asap", "2-semanas", "1-3-meses", "exploratorio"]),
  decision: z.enum(["si", "no"]),
  message: messageAntiSpam,
});

export type DiscoveryFormData = z.infer<typeof discoveryFormSchema>;

export function formatDiscoveryBodyForOwner(
  data: DiscoveryFormData,
  lang: "es" | "en",
): string {
  const labels =
    lang === "es"
      ? {
          necesidad: "Necesidad",
          presupuesto: "Presupuesto",
          urgencia: "Urgencia",
          decision: "¿Es dueño/decisor del proyecto?",
          message: "Mensaje adicional",
          si: "Sí",
          no: "No",
        }
      : {
          necesidad: "Need",
          presupuesto: "Budget",
          urgencia: "Urgency",
          decision: "Project owner/decision maker?",
          message: "Additional message",
          si: "Yes",
          no: "No",
        };

  const necesidadLabel =
    NECESIDAD_OPTIONS.find((o) => o.value === data.necesidad)?.[
      lang === "es" ? "labelEs" : "labelEn"
    ] ?? data.necesidad;
  const presupuestoLabel =
    PRESUPUESTO_OPTIONS.find((o) => o.value === data.presupuesto)?.[
      lang === "es" ? "labelEs" : "labelEn"
    ] ?? data.presupuesto;
  const urgenciaLabel =
    URGENCIA_OPTIONS.find((o) => o.value === data.urgencia)?.[
      lang === "es" ? "labelEs" : "labelEn"
    ] ?? data.urgencia;
  const decisionLabel = data.decision === "si" ? labels.si : labels.no;

  let body = [
    `${labels.necesidad}: ${necesidadLabel}`,
    `${labels.presupuesto}: ${presupuestoLabel}`,
    `${labels.urgencia}: ${urgenciaLabel}`,
    `${labels.decision}: ${decisionLabel}`,
  ].join("\n");

  if (data.message?.trim()) {
    body += `\n\n${labels.message}:\n${data.message.trim()}`;
  }
  return body;
}
