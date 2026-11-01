import type { Trade } from "@/lib/trades/content";

/**
 * The free web invoice generator's document model. Everything lives in the
 * visitor's browser — drafts are kept in localStorage and the PDF is built
 * client-side — so nothing here touches the server.
 */

export type DraftLine = {
  id: string;
  description: string;
  qty: number;
  rate: number;
  /** Included in the taxable amount when a tax rate is set. */
  taxable: boolean;
};

export type InvoiceDraft = {
  title: string;
  number: string;
  /** yyyy-mm-dd; empty until the browser fills in today's date. */
  issueDate: string;
  dueDate: string;
  currency: string;
  from: { name: string; details: string };
  billTo: { name: string; details: string };
  lines: DraftLine[];
  taxLabel: string;
  /** Percent, e.g. 8 for 8%. */
  taxRate: number;
  notes: string;
  /** Logo as a PNG or JPEG data URL. */
  logo?: string;
};

export const CURRENCIES = [
  "USD", "EUR", "GBP", "CAD", "AUD", "NZD", "MXN", "INR", "ZAR", "NGN",
  "PHP", "SGD", "AED", "BRL", "CHF", "JPY", "COP", "ARS", "CLP", "PEN",
];

/** Random ids, so lines created on the server and in the browser never collide. */
export function newLine(partial: Partial<DraftLine> = {}): DraftLine {
  const id = Math.random().toString(36).slice(2, 10);
  return { id, description: "", qty: 1, rate: 0, taxable: true, ...partial };
}

export function blankDraft(locale: "en" | "es"): InvoiceDraft {
  return {
    title: locale === "es" ? "Factura" : "Invoice",
    number: locale === "es" ? "F-0001" : "INV-0001",
    issueDate: "",
    dueDate: "",
    currency: locale === "es" ? "EUR" : "USD",
    from: { name: "", details: "" },
    billTo: { name: "", details: "" },
    lines: [newLine()],
    taxLabel: locale === "es" ? "IVA" : "Sales tax",
    taxRate: 0,
    notes: "",
  };
}

/** A trade's example invoice as an editable draft, for the template pages. */
export function tradeDraft(trade: Trade): InvoiceDraft {
  const s = trade.sample;
  return {
    ...blankDraft("en"),
    number: s.number,
    from: { name: s.business, details: "" },
    billTo: { name: s.client, details: "" },
    lines: s.lines.map((l) =>
      newLine({ description: l.description, qty: l.qty, rate: l.rate, taxable: Boolean(l.taxable) }),
    ),
    taxLabel: s.taxLabel ?? "Sales tax",
    taxRate: s.taxRate ? Math.round(s.taxRate * 10000) / 100 : 0,
    notes: s.notes,
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function draftTotals(d: InvoiceDraft) {
  const amount = (l: DraftLine) => round2((Number(l.qty) || 0) * (Number(l.rate) || 0));
  const subtotal = round2(d.lines.reduce((sum, l) => sum + amount(l), 0));
  const taxable = d.lines.filter((l) => l.taxable).reduce((sum, l) => sum + amount(l), 0);
  const tax = d.taxRate ? round2((taxable * d.taxRate) / 100) : 0;
  return { amount, subtotal, tax, total: round2(subtotal + tax) };
}

export function isoDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return isoDate(new Date(y, m - 1, d + days));
}

export function formatDate(iso: string, locale: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(y, m - 1, d),
  );
}

export function money(n: number, currency: string, locale: string, display: "symbol" | "code" = "symbol") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: display }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export function quantity(n: number, locale: string) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(n);
}
