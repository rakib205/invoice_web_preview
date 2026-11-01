/**
 * Pure formulas for the /tools calculators. Kept out of the client components
 * so server pages can use them for worked examples and reference tables.
 */

export type FeeType = "monthly" | "annual" | "flat";

/** Late fee = balance × rate × (chargeable days ÷ period), or a flat fee. Simple interest only. */
export function lateFee(amount: number, type: FeeType, rate: number, daysLate: number, graceDays: number) {
  const days = Math.max(0, daysLate - graceDays);
  if (days === 0) return 0;
  const raw =
    type === "flat" ? rate : type === "monthly" ? amount * (rate / 100) * (days / 30) : amount * (rate / 100) * (days / 365);
  return Math.round(raw * 100) / 100;
}

export type PriceMode = "markup" | "margin" | "price";

/** Selling price from cost plus a markup %, a target margin %, or a known price. */
export function priceFor(cost: number, mode: PriceMode, value: number) {
  if (mode === "markup") return cost * (1 + value / 100);
  if (mode === "margin") return value < 100 ? cost / (1 - value / 100) : NaN;
  return value;
}

export const markupToMargin = (markup: number) => (markup / (100 + markup)) * 100;
export const marginToMarkup = (margin: number) => (margin / (100 - margin)) * 100;

export const TERMS = [
  { id: "receipt", label: "Due on receipt", days: 0 },
  { id: "net7", label: "Net 7", days: 7 },
  { id: "net10", label: "Net 10", days: 10 },
  { id: "net14", label: "Net 14", days: 14 },
  { id: "net15", label: "Net 15", days: 15 },
  { id: "net30", label: "Net 30", days: 30 },
  { id: "net45", label: "Net 45", days: 45 },
  { id: "net60", label: "Net 60", days: 60 },
  { id: "net90", label: "Net 90", days: 90 },
  { id: "eom", label: "End of month (EOM)", days: null },
  { id: "custom", label: "Custom number of days", days: null },
] as const;

export type TermId = (typeof TERMS)[number]["id"];

export function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function dueDate(invoiceIso: string, term: TermId, customDays: number) {
  const d = parseIso(invoiceIso);
  if (term === "eom") return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const days = term === "custom" ? customDays : (TERMS.find((t) => t.id === term)?.days ?? 0);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}
