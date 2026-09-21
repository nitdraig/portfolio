/**
 * Styled analysis PDF — client-side, no external deps.
 * Helvetica + Helvetica-Bold, embedded logo JPEG, multi-page A4.
 */

export type AnalysisPdfLocale = "es" | "en";

export type AnalysisPdfPayload = {
  locale: AnalysisPdfLocale;
  idea: string;
  polishedIdea?: string;
  tags?: string[];
  steps?: string[];
  mvp?: string[];
};

type PdfBlock =
  | { kind: "space"; h: number }
  | { kind: "rule" }
  | { kind: "label"; text: string }
  | { kind: "title"; text: string }
  | { kind: "body"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "chips"; items: string[] }
  | { kind: "muted"; text: string }
  | { kind: "contact"; lines: string[] };

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;
const MARGIN_TOP = 56;
const MARGIN_BOTTOM = 56;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const LOGO_URL = "/logo-black.png";

function encodeWinAnsi(text: string): string {
  const normalized = String(text)
    .replace(/[\u2018\u2019\u00B4]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "-")
    .replace(/\u2192/g, ">")
    .replace(/\u00A0/g, " ");

  return Array.from(normalized)
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

function wrapText(text: string, maxChars: number): string[] {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const words = clean.split(" ");
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
  return lines;
}

function copy(locale: AnalysisPdfLocale) {
  if (locale === "es") {
    return {
      filename: "agustin-analisis-idea.pdf",
      brand: "agustin.top",
      docLabel: "ANÁLISIS DE IDEA",
      thankYou: "Gracias por compartir tu idea.",
      thankYouBody:
        "Este documento es una copia del análisis superficial generado con IA. Sirve como punto de partida para conversar y priorizar — no reemplaza un discovery completo.",
      youSaid: "LO QUE DIJISTE",
      polished: "IDEA PULIDA",
      components: "COMPONENTES INFERIDOS",
      nextSteps: "PRÓXIMOS PASOS",
      mvp: "PROPUESTA MVP",
      contact: "PARA AVANZAR",
      contactBody: "Escribime y seguimos con claridad sobre alcance, plazos y MVP.",
      email: "me@agustin.top",
      web: "https://www.agustin.top",
      linkedin: "linkedin.com/in/avellaneda-agustin",
      powered: "Análisis impulsado por Flowfolio · flowfolio.space",
      role: "Freelance · MVP y desarrollo de producto",
      name: "Agustín Avellaneda",
    };
  }
  return {
    filename: "agustin-idea-analysis.pdf",
    brand: "agustin.top",
    docLabel: "IDEA ANALYSIS",
    thankYou: "Thanks for sharing your idea.",
    thankYouBody:
      "This document is a copy of the surface-level AI analysis. It is a starting point to talk and prioritize — not a full product discovery.",
    youSaid: "YOU SAID",
    polished: "POLISHED IDEA",
    components: "INFERRED COMPONENTS",
    nextSteps: "NEXT STEPS",
    mvp: "MVP PROPOSAL",
    contact: "TO MOVE FORWARD",
    contactBody: "Email me and we can clarify scope, timeline, and MVP together.",
    email: "me@agustin.top",
    web: "https://www.agustin.top",
    linkedin: "linkedin.com/in/avellaneda-agustin",
    powered: "Analysis powered by Flowfolio · flowfolio.space",
    role: "Freelance · MVP & Product Development",
    name: "Agustin Avellaneda",
  };
}

function buildBlocks(payload: AnalysisPdfPayload): PdfBlock[] {
  const t = copy(payload.locale);
  const polished = (payload.polishedIdea || "").trim();
  const idea = (payload.idea || "").trim();
  const tags = (payload.tags || []).map((x) => String(x).trim()).filter(Boolean);
  const steps = (payload.steps || []).map((x) => String(x).trim()).filter(Boolean);
  const mvp = (payload.mvp || []).map((x) => String(x).trim()).filter(Boolean);

  const blocks: PdfBlock[] = [
    { kind: "space", h: 8 },
    { kind: "title", text: t.thankYou },
    { kind: "body", text: t.thankYouBody },
    { kind: "space", h: 10 },
    { kind: "rule" },
    { kind: "space", h: 12 },
  ];

  if (polished) {
    blocks.push(
      { kind: "label", text: t.polished },
      { kind: "title", text: polished },
      { kind: "space", h: 14 },
    );
  }

  if (idea && idea !== polished) {
    blocks.push(
      { kind: "label", text: t.youSaid },
      { kind: "body", text: idea },
      { kind: "space", h: 14 },
    );
  }

  if (tags.length) {
    blocks.push(
      { kind: "label", text: t.components },
      { kind: "chips", items: tags },
      { kind: "space", h: 14 },
    );
  }

  if (steps.length) {
    blocks.push({ kind: "label", text: t.nextSteps });
    steps.forEach((step, i) => {
      blocks.push({ kind: "bullet", text: `${i + 1}. ${step}` });
    });
    blocks.push({ kind: "space", h: 12 });
  }

  if (mvp.length) {
    blocks.push({ kind: "label", text: t.mvp });
    mvp.forEach((item) => {
      blocks.push({ kind: "bullet", text: `> ${item}` });
    });
    blocks.push({ kind: "space", h: 12 });
  }

  blocks.push(
    { kind: "rule" },
    { kind: "space", h: 14 },
    { kind: "label", text: t.contact },
    { kind: "body", text: t.contactBody },
    { kind: "space", h: 8 },
    {
      kind: "contact",
      lines: [t.email, t.web, t.linkedin],
    },
    { kind: "space", h: 16 },
    { kind: "muted", text: t.name },
    { kind: "muted", text: t.role },
    { kind: "space", h: 8 },
    { kind: "muted", text: t.powered },
  );

  return blocks;
}

async function loadLogoJpeg(): Promise<{
  bytes: Uint8Array;
  width: number;
  height: number;
} | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("logo load failed"));
      el.src = LOGO_URL;
    });

    const maxW = 160;
    const scale = Math.min(1, maxW / img.naturalWidth);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92),
    );
    if (!blob) return null;
    const buf = new Uint8Array(await blob.arrayBuffer());
    return { bytes: buf, width: w, height: h };
  } catch {
    return null;
  }
}

function estimateBlockHeight(block: PdfBlock): number {
  switch (block.kind) {
    case "space":
      return block.h;
    case "rule":
      return 10;
    case "label":
      return 18;
    case "title":
      return wrapText(block.text, 52).length * 18 + 6;
    case "body":
      return wrapText(block.text, 78).length * 14 + 4;
    case "bullet":
      return wrapText(block.text, 74).length * 14 + 4;
    case "chips":
      return 22;
    case "muted":
      return 14;
    case "contact":
      return block.lines.length * 14 + 8;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

type PageOps = string[];

function renderHeader(
  ops: PageOps,
  locale: AnalysisPdfLocale,
  hasLogo: boolean,
  logoDrawH: number,
): number {
  const t = copy(locale);
  let y = PAGE_H - MARGIN_TOP;

  // Accent bar at top
  ops.push("0.231 0.510 0.965 rg");
  ops.push(`0 ${PAGE_H - 8} ${PAGE_W} 8 re f`);

  if (hasLogo) {
    const logoW = 72;
    const logoH = logoDrawH;
    ops.push("q");
    ops.push(`${logoW} 0 0 ${logoH} ${MARGIN_X} ${(y - logoH).toFixed(2)} cm`);
    ops.push("/Im1 Do");
    ops.push("Q");
    ops.push("0.09 0.09 0.11 rg");
    ops.push(
      `BT /F2 9 Tf ${MARGIN_X + logoW + 12} ${(y - 18).toFixed(2)} Td (${encodeWinAnsi(t.brand)}) Tj ET`,
    );
    ops.push("0.45 0.45 0.48 rg");
    ops.push(
      `BT /F1 8 Tf ${PAGE_W - MARGIN_X - 110} ${(y - 18).toFixed(2)} Td (${encodeWinAnsi(t.docLabel)}) Tj ET`,
    );
    y -= Math.max(logoH, 28) + 18;
  } else {
    ops.push("0.09 0.09 0.11 rg");
    ops.push(
      `BT /F2 14 Tf ${MARGIN_X} ${(y - 4).toFixed(2)} Td (${encodeWinAnsi(t.brand)}) Tj ET`,
    );
    ops.push("0.45 0.45 0.48 rg");
    ops.push(
      `BT /F1 8 Tf ${PAGE_W - MARGIN_X - 110} ${(y - 2).toFixed(2)} Td (${encodeWinAnsi(t.docLabel)}) Tj ET`,
    );
    y -= 28;
  }

  // Divider under header
  ops.push("0.88 0.88 0.90 rg");
  ops.push(`${MARGIN_X} ${y} ${CONTENT_W} 0.8 re f`);
  y -= 20;
  return y;
}

function renderFooter(ops: PageOps, pageIndex: number, pageCount: number): void {
  const label = `${pageIndex + 1} / ${pageCount}`;
  ops.push("0.70 0.70 0.72 rg");
  ops.push(
    `BT /F1 8 Tf ${PAGE_W / 2 - 10} 28 Td (${encodeWinAnsi(label)}) Tj ET`,
  );
}

function renderBlock(ops: PageOps, block: PdfBlock, startY: number): number {
  let y = startY;

  switch (block.kind) {
    case "space":
      return y - block.h;
    case "rule":
      ops.push("0.88 0.88 0.90 rg");
      ops.push(`${MARGIN_X} ${y} ${CONTENT_W} 0.6 re f`);
      return y - 10;
    case "label":
      ops.push("0.231 0.510 0.965 rg");
      ops.push(
        `BT /F2 8 Tf ${MARGIN_X} ${y.toFixed(2)} Td (${encodeWinAnsi(block.text)}) Tj ET`,
      );
      return y - 16;
    case "title": {
      ops.push("0.09 0.09 0.11 rg");
      const lines = wrapText(block.text, 52);
      for (const line of lines) {
        ops.push(
          `BT /F2 13 Tf ${MARGIN_X} ${y.toFixed(2)} Td (${encodeWinAnsi(line)}) Tj ET`,
        );
        y -= 17;
      }
      return y - 4;
    }
    case "body": {
      ops.push("0.25 0.25 0.28 rg");
      const lines = wrapText(block.text, 78);
      for (const line of lines) {
        ops.push(
          `BT /F1 10 Tf ${MARGIN_X} ${y.toFixed(2)} Td (${encodeWinAnsi(line)}) Tj ET`,
        );
        y -= 14;
      }
      return y - 2;
    }
    case "bullet": {
      ops.push("0.25 0.25 0.28 rg");
      const lines = wrapText(block.text, 74);
      lines.forEach((line, i) => {
        const x = MARGIN_X + (i === 0 ? 0 : 14);
        ops.push(
          `BT /F1 10 Tf ${x} ${y.toFixed(2)} Td (${encodeWinAnsi(line)}) Tj ET`,
        );
        y -= 14;
      });
      return y - 2;
    }
    case "chips": {
      const text = block.items.join("  ·  ");
      // Soft chip band
      const bandH = 22;
      ops.push("0.96 0.97 0.99 rg");
      ops.push(
        `${MARGIN_X} ${(y - 14).toFixed(2)} ${CONTENT_W} ${bandH} re f`,
      );
      ops.push("0.30 0.35 0.45 rg");
      ops.push(
        `BT /F1 9 Tf ${MARGIN_X + 10} ${(y - 2).toFixed(2)} Td (${encodeWinAnsi(text)}) Tj ET`,
      );
      return y - 28;
    }
    case "muted":
      ops.push("0.55 0.55 0.58 rg");
      ops.push(
        `BT /F1 9 Tf ${MARGIN_X} ${y.toFixed(2)} Td (${encodeWinAnsi(block.text)}) Tj ET`,
      );
      return y - 13;
    case "contact": {
      // Contact card
      const cardH = block.lines.length * 14 + 16;
      ops.push("0.97 0.98 1.00 rg");
      ops.push(`${MARGIN_X} ${(y - cardH + 8).toFixed(2)} ${CONTENT_W} ${cardH} re f`);
      ops.push("0.231 0.510 0.965 rg");
      ops.push(`${MARGIN_X} ${(y - cardH + 8).toFixed(2)} 3 ${cardH} re f`);
      ops.push("0.15 0.15 0.18 rg");
      let cy = y - 4;
      for (const line of block.lines) {
        ops.push(
          `BT /F2 10 Tf ${MARGIN_X + 14} ${cy.toFixed(2)} Td (${encodeWinAnsi(line)}) Tj ET`,
        );
        cy -= 14;
      }
      return y - cardH - 4;
    }
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

function paginateBlocks(
  blocks: PdfBlock[],
  headerReserve: number,
): PdfBlock[][] {
  const pages: PdfBlock[][] = [];
  let current: PdfBlock[] = [];
  let used = headerReserve;

  const maxY = PAGE_H - MARGIN_BOTTOM - 24;

  for (const block of blocks) {
    const h = estimateBlockHeight(block);
    if (used + h > maxY && current.length) {
      pages.push(current);
      current = [];
      used = headerReserve;
    }
    current.push(block);
    used += h;
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

function strToBytes(s: string): Uint8Array {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
}

/**
 * Build and download a styled analysis PDF for the given locale/content.
 */
export async function downloadAnalysisPdf(payload: AnalysisPdfPayload): Promise<void> {
  const t = copy(payload.locale);
  const logo = await loadLogoJpeg();
  const logoDrawH = logo ? Math.round((72 / logo.width) * logo.height) : 0;
  const headerUsed = (logo ? Math.max(logoDrawH, 28) + 38 : 48) + 8;

  const blocks = buildBlocks(payload);
  const pages = paginateBlocks(blocks, headerUsed + MARGIN_TOP);

  const pageStreams: string[] = [];
  for (let i = 0; i < pages.length; i++) {
    const ops: PageOps = [];
    let y = renderHeader(ops, payload.locale, Boolean(logo), logoDrawH);
    for (const block of pages[i]) {
      y = renderBlock(ops, block, y);
    }
    renderFooter(ops, i, pages.length);
    pageStreams.push(ops.join("\n"));
  }

  // Object IDs:
  // 1 Catalog, 2 Pages, 3 Font regular, 4 Font bold,
  // 5 Logo (optional), then page objs + content objs
  const objects: (string | Uint8Array)[] = [];
  const pushObj = (body: string | Uint8Array) => {
    objects.push(body);
    return objects.length; // 1-based id
  };

  pushObj("<< /Type /Catalog /Pages 2 0 R >>\n");
  // Pages placeholder — fill later
  const pagesObjIndex = pushObj("") - 1;

  const fontRegularId = pushObj(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\n",
  );
  const fontBoldId = pushObj(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\n",
  );

  let logoId = 0;
  if (logo) {
    const header =
      `<< /Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} ` +
      `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.bytes.length} >>\n` +
      `stream\n`;
    const footer = `\nendstream\n`;
    logoId = pushObj(
      concatBytes([strToBytes(header), logo.bytes, strToBytes(footer)]),
    );
  }

  const pageIds: number[] = [];
  for (const stream of pageStreams) {
    const contentId = pushObj(
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\n`,
    );

    const resources =
      `<< /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >>` +
      (logoId ? ` /XObject << /Im1 ${logoId} 0 R >>` : "") +
      ` >>`;

    const pageId = pushObj(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Contents ${contentId} 0 R /Resources ${resources} >>\n`,
    );
    pageIds.push(pageId);
  }

  objects[pagesObjIndex] =
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>\n`;

  // Assemble PDF binary
  const chunks: Uint8Array[] = [strToBytes("%PDF-1.4\n")];
  const offsets = [0];
  let size = chunks[0].length;

  for (let i = 0; i < objects.length; i++) {
    offsets.push(size);
    const header = strToBytes(`${i + 1} 0 obj\n`);
    const body =
      typeof objects[i] === "string"
        ? strToBytes(objects[i] as string)
        : (objects[i] as Uint8Array);
    const end = strToBytes("endobj\n");
    chunks.push(header, body, end);
    size += header.length + body.length + end.length;
  }

  const xrefStart = size;
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  xref += `startxref\n${xrefStart}\n%%EOF`;
  chunks.push(strToBytes(xref));

  const pdfBytes = concatBytes(chunks);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = t.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Compatibility stub — prefer downloadAnalysisPdf. */
export async function downloadSimplePdf(payload: AnalysisPdfPayload): Promise<void> {
  return downloadAnalysisPdf(payload);
}
