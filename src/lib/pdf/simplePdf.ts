/**
 * Minimal single-page PDF builder (Helvetica / WinAnsi).
 * No external dependencies — good enough for a short thank-you note.
 */

function encodeWinAnsi(text: string): string {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code === 0x5c) return "\\\\";
      if (code === 0x28) return "\\(";
      if (code === 0x29) return "\\)";
      if (code >= 0x20 && code <= 0x7e) return ch;
      if (code <= 0xff) return `\\${code.toString(8).padStart(3, "0")}`;
      return "";
    })
    .join("");
}

function wrapLine(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export type SimplePdfDoc = {
  title: string;
  lines: string[];
  filename: string;
};

/**
 * Build and trigger download of a simple A4 text PDF.
 */
export function downloadSimplePdf(doc: SimplePdfDoc): void {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 56;
  const startY = pageHeight - 72;
  const lineHeight = 16;
  const maxChars = 78;

  const contentLines: string[] = [];
  let y = startY;

  const pushText = (text: string, size: number, gapAfter = 0) => {
    const wrapped = wrapLine(text, maxChars);
    for (const line of wrapped) {
      contentLines.push(
        `BT /F1 ${size} Tf ${marginX} ${y.toFixed(2)} Td (${encodeWinAnsi(line)}) Tj ET`,
      );
      y -= lineHeight;
    }
    y -= gapAfter;
  };

  pushText(doc.title, 16, 10);
  for (const line of doc.lines) {
    if (!line.trim()) {
      y -= lineHeight * 0.6;
      continue;
    }
    pushText(line, 11, 2);
  }

  const stream = contentLines.join("\n");
  const objects: string[] = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`,
  );
  objects.push(
    `4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  );
  objects.push(
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
  );

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = doc.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export type AnalysisPdfLocale = "es" | "en";

export function buildAnalysisThankYouPdf(
  locale: AnalysisPdfLocale,
  polishedIdea?: string,
): SimplePdfDoc {
  const idea = (polishedIdea || "").trim();

  if (locale === "es") {
    const lines = [
      "Recibí tu análisis. Este documento es un resumen para que avances con claridad.",
      "",
    ];
    if (idea) {
      lines.push("Tu idea (resumen):", idea, "");
    }
    lines.push(
      "El análisis con IA es superficial: te da primeros pasos y una dirección inicial,",
      "no un plan de producto completo. Sirve para conversar y priorizar.",
      "",
      "Para avanzar, escribinos:",
      "Email: me@agustin.top",
      "Web: https://www.agustin.top",
      "LinkedIn: https://www.linkedin.com/in/avellaneda-agustin/",
      "",
      "Análisis impulsado por Flowfolio (https://flowfolio.space).",
      "",
      "Agustín Avellaneda",
      "Freelance · MVP y desarrollo de producto",
    );
    return {
      title: "Gracias por compartir tu idea",
      filename: "agustin-mvp-proximos-pasos.pdf",
      lines,
    };
  }

  const lines = [
    "I received your analysis. This note is a short summary so you can move forward with clarity.",
    "",
  ];
  if (idea) {
    lines.push("Your idea (summary):", idea, "");
  }
  lines.push(
    "The AI analysis is surface-level: it gives first steps and an initial direction,",
    "not a full product plan. It is meant to start a conversation and prioritize.",
    "",
    "To move forward, reach out:",
    "Email: me@agustin.top",
    "Web: https://www.agustin.top",
    "LinkedIn: https://www.linkedin.com/in/avellaneda-agustin/",
    "",
    "Analysis powered by Flowfolio (https://flowfolio.space).",
    "",
    "Agustín Avellaneda",
    "Freelance · MVP & Product Development",
  );
  return {
    title: "Thanks for sharing your idea",
    filename: "agustin-mvp-next-steps.pdf",
    lines,
  };
}
