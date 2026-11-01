import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { draftTotals, formatDate, money, quantity, type InvoiceDraft } from "@/lib/generator/draft";
import type { GeneratorLabels } from "@/lib/generator/labels";

/**
 * Builds the generator's PDF in the browser with pdf-lib (loaded on demand).
 * Uses the built-in Helvetica fonts, which only cover Latin-1/WinAnsi text, so
 * every string goes through `safe()`; currency symbols that can't be drawn fall
 * back to the ISO code ("INR 1,200.00").
 */

const INK = rgb(0.04, 0.09, 0.16);
const MUTED = rgb(0.44, 0.44, 0.48);
const LINE = rgb(0.89, 0.89, 0.91);
const RUST = rgb(0.72, 0.25, 0.16);

export async function buildInvoicePdf(
  draft: InvoiceDraft,
  labels: GeneratorLabels,
  paper: "letter" | "a4",
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const supported = new Set(regular.getCharacterSet());
  const safe = (text: string) =>
    Array.from(text.replace(/[   ]/g, " "))
      .map((ch) => (ch === "\n" || supported.has(ch.codePointAt(0)!) ? ch : "?"))
      .join("");
  const locale = labels.intlLocale;
  const fmt = (n: number) => {
    const withSymbol = money(n, draft.currency, locale);
    return safe(withSymbol).includes("?") ? money(n, draft.currency, locale, "code") : withSymbol;
  };

  doc.setTitle(`${draft.title} ${draft.number}`.trim());
  doc.setCreator("Invoiceflint invoice generator");
  doc.setProducer("invoiceflint.com");

  const [W, H] = paper === "a4" ? [595.28, 841.89] : [612, 792];
  const M = 48;
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;

  const text = (s: string, x: number, yy: number, size: number, font: PDFFont = regular, color = INK) =>
    page.drawText(safe(s), { x, y: yy, size, font, color });
  const right = (s: string, xRight: number, yy: number, size: number, font: PDFFont = regular, color = INK) =>
    text(s, xRight - font.widthOfTextAtSize(safe(s), size), yy, size, font, color);
  const wrap = (s: string, width: number, size: number, font: PDFFont = regular) => {
    const out: string[] = [];
    for (const para of safe(s).split("\n")) {
      let line = "";
      for (const word of para.split(/\s+/)) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) <= width || !line) line = next;
        else {
          out.push(line);
          line = word;
        }
      }
      out.push(line);
    }
    return out;
  };

  // Header: logo or business name on the left, title block on the right.
  let logo: PDFImage | undefined;
  if (draft.logo) {
    try {
      const bytes = await fetch(draft.logo).then((r) => r.arrayBuffer());
      logo = draft.logo.startsWith("data:image/png") ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    } catch {
      logo = undefined;
    }
  }
  let leftY = y;
  if (logo) {
    const scale = Math.min(140 / logo.width, 56 / logo.height, 1);
    const w = logo.width * scale;
    const h = logo.height * scale;
    page.drawImage(logo, { x: M, y: leftY - h, width: w, height: h });
    leftY -= h + 14;
  }
  if (draft.from.name) {
    text(draft.from.name, M, leftY - 12, 13, bold);
    leftY -= 18;
  }
  for (const line of wrap(draft.from.details, 240, 9)) {
    text(line, M, leftY - 10, 9, regular, MUTED);
    leftY -= 12.5;
  }

  const xr = W - M;
  right(draft.title.toUpperCase(), xr, y - 22, 22, bold, RUST);
  let rightY = y - 42;
  const meta: Array<[string, string]> = [
    [labels.number, draft.number],
    [labels.issued, formatDate(draft.issueDate, locale)],
    [labels.due, formatDate(draft.dueDate, locale)],
  ];
  for (const [k, v] of meta) {
    if (!v) continue;
    right(v, xr, rightY, 9.5, bold);
    right(k, xr - 110, rightY, 9.5, regular, MUTED);
    rightY -= 14;
  }

  y = Math.min(leftY, rightY) - 22;

  // Bill to
  if (draft.billTo.name || draft.billTo.details) {
    text(labels.billedTo.toUpperCase(), M, y, 8, bold, MUTED);
    y -= 15;
    if (draft.billTo.name) {
      text(draft.billTo.name, M, y, 11, bold);
      y -= 14;
    }
    for (const line of wrap(draft.billTo.details, 260, 9)) {
      text(line, M, y, 9, regular, MUTED);
      y -= 12.5;
    }
    y -= 14;
  }

  // Items table
  const colQty = xr - 210;
  const colRate = xr - 120;
  const descWidth = colQty - M - 40;
  const tableHeader = () => {
    page.drawRectangle({ x: M, y: y - 6, width: W - 2 * M, height: 20, color: rgb(0.965, 0.969, 0.976) });
    text(labels.description.toUpperCase(), M + 8, y, 8, bold, MUTED);
    right(labels.qty.toUpperCase(), colQty, y, 8, bold, MUTED);
    right(labels.rate.toUpperCase(), colRate, y, 8, bold, MUTED);
    right(labels.amount.toUpperCase(), xr - 8, y, 8, bold, MUTED);
    y -= 24;
  };
  const ensure = (needed: number, repeatHeader = true) => {
    if (y - needed < M + 30) {
      page = doc.addPage([W, H]);
      y = H - M;
      if (repeatHeader) tableHeader();
    }
  };
  tableHeader();

  const totals = draftTotals(draft);
  for (const line of draft.lines) {
    if (!line.description && !line.rate) continue;
    const descLines = wrap(line.description || "—", descWidth, 10);
    ensure(descLines.length * 13 + 10);
    descLines.forEach((d, i) => text(d, M + 8, y - i * 13, 10));
    right(quantity(line.qty, locale), colQty, y, 10);
    right(fmt(line.rate), colRate, y, 10);
    right(fmt(totals.amount(line)), xr - 8, y, 10, bold);
    y -= descLines.length * 13 + 6;
    page.drawLine({ start: { x: M, y: y + 2 }, end: { x: xr, y: y + 2 }, thickness: 0.6, color: LINE });
    y -= 12;
  }

  // Totals
  ensure(90, false);
  y -= 4;
  const labelX = xr - 200;
  text(labels.subtotal, labelX, y, 10, regular, MUTED);
  right(fmt(totals.subtotal), xr - 8, y, 10);
  y -= 16;
  if (draft.taxRate) {
    text(`${draft.taxLabel || labels.tax} (${quantity(draft.taxRate, locale)}%)`, labelX, y, 10, regular, MUTED);
    right(fmt(totals.tax), xr - 8, y, 10);
    y -= 16;
  }
  y -= 8;
  page.drawRectangle({ x: labelX - 10, y: y - 9, width: xr - labelX + 10, height: 26, color: INK });
  text(labels.totalDue, labelX, y, 11, bold, rgb(1, 1, 1));
  right(fmt(totals.total), xr - 8, y, 11, bold, rgb(1, 1, 1));
  y -= 44;

  // Notes
  if (draft.notes.trim()) {
    const noteLines = wrap(draft.notes, W - 2 * M, 9.5);
    ensure(Math.min(noteLines.length * 13 + 20, 120), false);
    text(labels.notes.toUpperCase(), M, y, 8, bold, MUTED);
    y -= 15;
    for (const line of noteLines) {
      ensure(13, false);
      text(line, M, y, 9.5);
      y -= 13;
    }
  }

  for (const p of doc.getPages()) {
    const size = 7.5;
    const footer = safe(labels.footer);
    p.drawText(footer, {
      x: (W - regular.widthOfTextAtSize(footer, size)) / 2,
      y: 24,
      size,
      font: regular,
      color: rgb(0.66, 0.66, 0.69),
    });
  }

  return doc.save();
}
