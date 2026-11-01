import type { ReactNode } from "react";

/** Shared building blocks for the /tools calculators. */

export const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-base text-ink tabular-nums placeholder:text-zinc-400 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15";

export const CALC_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "INR"];

export function money(n: number, currency: string) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
}

export function num(text: string) {
  const n = Number(text.replace(/,/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

export function CalcCard({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm md:grid-cols-[1.15fr_1fr]">
      <div className="space-y-4 p-6 sm:p-8">{form}</div>
      <div aria-live="polite" className="flex flex-col justify-center bg-ink p-6 text-white sm:p-8">
        {result}
      </div>
    </div>
  );
}

export function Labeled({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-zinc-400">{hint}</span>}
    </label>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-zinc-700">{label}</legend>
      <div className="flex flex-wrap gap-1 rounded-xl bg-paper p-1">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rust/40 ${
              value === o.value ? "bg-white text-ink shadow-sm" : "text-zinc-500 hover:text-ink"
            }`}
          >
            <input type="radio" className="sr-only" checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ResultLine({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={big ? "" : "mt-4 border-t border-white/10 pt-4"}>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className={`mt-1 font-semibold tabular-nums tracking-tight ${big ? "text-4xl sm:text-5xl" : "text-xl"}`}>{value}</p>
    </div>
  );
}
