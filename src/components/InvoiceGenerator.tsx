"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import StoreBadges from "@/components/StoreBadges";
import {
  CURRENCIES,
  addDays,
  draftTotals,
  formatDate,
  isoDate,
  money,
  newLine,
  quantity,
  type DraftLine,
  type InvoiceDraft,
} from "@/lib/generator/draft";
import { GENERATOR_LABELS, type GeneratorLocale } from "@/lib/generator/labels";

const field =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-zinc-400 focus:border-rust focus:outline-none focus:ring-2 focus:ring-rust/15";

/**
 * Free web invoice generator. `initial` comes from the server (blank, or a
 * trade's example invoice on the template pages). With a `storageKey`, the
 * draft is kept in this browser's localStorage between visits; nothing is sent
 * to a server — the PDF is built client-side by `buildInvoicePdf`.
 */
export default function InvoiceGenerator({
  initial,
  locale = "en",
  storageKey,
  paper = "letter",
}: {
  initial: InvoiceDraft;
  locale?: GeneratorLocale;
  storageKey?: string;
  paper?: "letter" | "a4";
}) {
  const t = GENERATOR_LABELS[locale];
  const [draft, setDraft] = useState<InvoiceDraft>(initial);
  // Bumped when the draft is replaced wholesale, to remount uncontrolled number inputs.
  const [version, setVersion] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const loaded = useRef(false);

  // Restore a saved draft, and fill in today's dates (only known in the browser).
  useEffect(() => {
    let next = initial;
    if (storageKey) {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) next = { ...initial, ...(JSON.parse(saved) as InvoiceDraft) };
      } catch {
        // Private mode or corrupt data: start from `initial`.
      }
    }
    if (!next.issueDate) {
      const today = isoDate(new Date());
      next = { ...next, issueDate: today, dueDate: next.dueDate || addDays(today, 14) };
    }
    loaded.current = true;
    setDraft(next);
    setVersion((v) => v + 1);
  }, [initial, storageKey]);

  useEffect(() => {
    if (!storageKey || !loaded.current) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {
      // Storage full or blocked; the draft still works for this visit.
    }
  }, [draft, storageKey]);

  const set = (patch: Partial<InvoiceDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const setLine = (id: string, patch: Partial<DraftLine>) =>
    setDraft((d) => ({ ...d, lines: d.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));

  const onLogo = (file: File | undefined) => {
    if (!file || !/^image\/(png|jpeg)$/.test(file.type) || file.size > 1_000_000) return;
    const reader = new FileReader();
    reader.onload = () => set({ logo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const reset = () => {
    if (!window.confirm(t.resetConfirm)) return;
    const today = isoDate(new Date());
    setDraft({ ...initial, issueDate: today, dueDate: addDays(today, 14) });
    setVersion((v) => v + 1);
    setDone(false);
  };

  const download = async () => {
    setBusy(true);
    try {
      const { buildInvoicePdf } = await import("@/lib/generator/pdf");
      const bytes = await buildInvoicePdf(draft, t, paper);
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${draft.title}-${draft.number || "draft"}.pdf`.replace(/[^\w.-]+/g, "-");
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setDone(true);
      track("generator_download", { locale });
    } finally {
      setBusy(false);
    }
  };

  const totals = draftTotals(draft);
  const fmt = (n: number) => money(n, draft.currency, t.intlLocale);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      {/* Form */}
      <div className="space-y-5">
        <Card title={t.yourBusiness}>
          <div className="flex items-center gap-4">
            {draft.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- user-supplied data URL
              <img src={draft.logo} alt="" className="h-14 w-auto max-w-[140px] rounded-md object-contain ring-1 ring-zinc-200" />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-md border border-dashed border-zinc-300 text-[11px] text-zinc-400">
                {t.logo}
              </span>
            )}
            <label className="cursor-pointer rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-zinc-300">
              {t.addLogo}
              <input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(e) => onLogo(e.target.files?.[0])} />
            </label>
            {draft.logo && (
              <button type="button" onClick={() => set({ logo: undefined })} className="text-sm text-zinc-500 hover:text-ink">
                {t.removeLogo}
              </button>
            )}
          </div>
          <Field label={t.businessName}>
            <input className={field} value={draft.from.name} onChange={(e) => set({ from: { ...draft.from, name: e.target.value } })} />
          </Field>
          <Field label={t.businessDetails}>
            <textarea rows={3} className={field} value={draft.from.details} onChange={(e) => set({ from: { ...draft.from, details: e.target.value } })} />
          </Field>
        </Card>

        <Card title={t.billTo}>
          <Field label={t.clientName}>
            <input className={field} value={draft.billTo.name} onChange={(e) => set({ billTo: { ...draft.billTo, name: e.target.value } })} />
          </Field>
          <Field label={t.clientDetails}>
            <textarea rows={2} className={field} value={draft.billTo.details} onChange={(e) => set({ billTo: { ...draft.billTo, details: e.target.value } })} />
          </Field>
        </Card>

        <Card title={t.invoiceDetails}>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.documentTitle}>
              <select className={field} value={draft.title} onChange={(e) => set({ title: e.target.value })}>
                {[...new Set([...t.titles, draft.title])].map((title) => (
                  <option key={title}>{title}</option>
                ))}
              </select>
            </Field>
            <Field label={t.number}>
              <input className={field} value={draft.number} onChange={(e) => set({ number: e.target.value })} />
            </Field>
            <Field label={t.issueDate}>
              <input type="date" className={field} value={draft.issueDate} onChange={(e) => set({ issueDate: e.target.value })} />
            </Field>
            <Field label={t.dueDate}>
              <input type="date" className={field} value={draft.dueDate} onChange={(e) => set({ dueDate: e.target.value })} />
            </Field>
            <Field label={t.currency}>
              <select className={field} value={draft.currency} onChange={(e) => set({ currency: e.target.value })}>
                {CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card title={t.items}>
          <div className="hidden grid-cols-[minmax(0,1fr)_64px_96px_36px_28px] gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 sm:grid">
            <span>{t.description}</span>
            <span>{t.qty}</span>
            <span>{t.rate}</span>
            <span className="text-center">{t.taxable}</span>
            <span />
          </div>
          <ul className="space-y-3 sm:space-y-2">
            {draft.lines.map((line, i) => (
              <li
                key={line.id}
                className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 rounded-xl border border-zinc-100 p-2 sm:grid-cols-[minmax(0,1fr)_64px_96px_36px_28px] sm:items-center sm:border-0 sm:p-0"
              >
                <input
                  aria-label={`${t.description} ${i + 1}`}
                  placeholder={t.descriptionPlaceholder}
                  className={`${field} col-span-4 sm:col-span-1`}
                  value={line.description}
                  onChange={(e) => setLine(line.id, { description: e.target.value })}
                />
                <NumberInput
                  key={`q-${line.id}-${version}`}
                  label={`${t.qty} ${i + 1}`}
                  value={line.qty}
                  onChange={(qty) => setLine(line.id, { qty })}
                />
                <NumberInput
                  key={`r-${line.id}-${version}`}
                  label={`${t.rate} ${i + 1}`}
                  value={line.rate}
                  onChange={(rate) => setLine(line.id, { rate })}
                />
                <label className="flex items-center justify-center">
                  <span className="sr-only">{`${t.taxable} ${i + 1}`}</span>
                  <input
                    type="checkbox"
                    checked={line.taxable}
                    onChange={(e) => setLine(line.id, { taxable: e.target.checked })}
                    className="h-4 w-4 accent-rust"
                  />
                </label>
                <button
                  type="button"
                  aria-label={`${t.removeItem} ${i + 1}`}
                  onClick={() => set({ lines: draft.lines.filter((l) => l.id !== line.id) })}
                  disabled={draft.lines.length === 1}
                  className="flex h-8 w-7 items-center justify-center rounded-md text-lg leading-none text-zinc-400 hover:text-red-600 disabled:opacity-30"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => set({ lines: [...draft.lines, newLine()] })}
            className="text-sm font-semibold text-rust hover:underline"
          >
            + {t.addItem}
          </button>
        </Card>

        <Card title={t.tax}>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.taxName}>
              <input className={field} value={draft.taxLabel} onChange={(e) => set({ taxLabel: e.target.value })} />
            </Field>
            <Field label={t.taxRate}>
              <NumberInput key={`tax-${version}`} label={t.taxRate} value={draft.taxRate} onChange={(taxRate) => set({ taxRate })} />
            </Field>
          </div>
        </Card>

        <Card title={t.notes}>
          <textarea
            rows={3}
            aria-label={t.notes}
            placeholder={t.notesPlaceholder}
            className={field}
            value={draft.notes}
            onChange={(e) => set({ notes: e.target.value })}
          />
        </Card>
      </div>

      {/* Preview + download */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">{t.preview}</p>
        <div className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-35px_rgba(10,23,41,0.45)] ring-1 ring-zinc-200 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {draft.logo && (
                // eslint-disable-next-line @next/next/no-img-element -- user-supplied data URL
                <img src={draft.logo} alt="" className="mb-3 h-10 w-auto max-w-[120px] object-contain" />
              )}
              <p className="font-semibold text-ink">{draft.from.name || t.businessName}</p>
              <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-zinc-500">{draft.from.details}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold uppercase tracking-wide text-rust">{draft.title}</p>
              <dl className="mt-2 space-y-0.5 text-xs">
                {[
                  [t.number, draft.number],
                  [t.issued, formatDate(draft.issueDate, t.intlLocale)],
                  [t.due, formatDate(draft.dueDate, t.intlLocale)],
                ].map(([k, v]) =>
                  v ? (
                    <div key={k} className="flex justify-end gap-3">
                      <dt className="text-zinc-400">{k}</dt>
                      <dd className="font-medium text-ink">{v}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </div>
          </div>

          {(draft.billTo.name || draft.billTo.details) && (
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{t.billedTo}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{draft.billTo.name}</p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-zinc-500">{draft.billTo.details}</p>
            </div>
          )}

          <table className="mt-6 w-full text-xs">
            <thead>
              <tr className="bg-paper text-[10px] uppercase tracking-wider text-zinc-400">
                <th className="px-2 py-1.5 text-left font-semibold">{t.description}</th>
                <th className="px-2 py-1.5 text-right font-semibold">{t.qty}</th>
                <th className="hidden px-2 py-1.5 text-right font-semibold sm:table-cell">{t.rate}</th>
                <th className="px-2 py-1.5 text-right font-semibold">{t.amount}</th>
              </tr>
            </thead>
            <tbody>
              {draft.lines.map((l) => (
                <tr key={l.id} className="border-b border-zinc-100 align-top">
                  <td className="px-2 py-2 text-ink">{l.description || <span className="text-zinc-300">—</span>}</td>
                  <td className="px-2 py-2 text-right tabular-nums text-zinc-600">{quantity(l.qty, t.intlLocale)}</td>
                  <td className="hidden px-2 py-2 text-right tabular-nums text-zinc-600 sm:table-cell">{fmt(l.rate)}</td>
                  <td className="px-2 py-2 text-right font-semibold tabular-nums text-ink">{fmt(totals.amount(l))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="ml-auto mt-4 max-w-[260px] space-y-1 text-xs">
            <div className="flex justify-between text-zinc-500">
              <dt>{t.subtotal}</dt>
              <dd className="tabular-nums">{fmt(totals.subtotal)}</dd>
            </div>
            {draft.taxRate > 0 && (
              <div className="flex justify-between text-zinc-500">
                <dt>
                  {draft.taxLabel || t.tax} ({quantity(draft.taxRate, t.intlLocale)}%)
                </dt>
                <dd className="tabular-nums">{fmt(totals.tax)}</dd>
              </div>
            )}
            <div className="flex justify-between rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white">
              <dt>{t.totalDue}</dt>
              <dd className="tabular-nums">{fmt(totals.total)}</dd>
            </div>
          </dl>

          {draft.notes && <p className="mt-6 whitespace-pre-line border-t border-zinc-100 pt-4 text-xs leading-relaxed text-zinc-500">{draft.notes}</p>}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={download}
            disabled={busy}
            className="flex-1 rounded-full bg-rust px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 sm:flex-none"
          >
            {busy ? t.downloading : t.download}
          </button>
          <button type="button" onClick={reset} className="rounded-full px-4 py-3 text-sm font-medium text-zinc-500 hover:text-ink">
            {t.reset}
          </button>
        </div>
        <p className="mt-2 text-xs text-zinc-400">{t.savedNote}</p>

        {done && (
          <div role="status" className="mt-5 rounded-2xl bg-ink p-5 text-white">
            <p className="font-semibold">{t.doneTitle}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{t.doneBody}</p>
            <StoreBadges tone="light" className="mt-4" placement="generator-download" />
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden className="text-sm font-semibold text-ink">
        {title}
      </p>
      {children}
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-500">{label}</span>
      {children}
    </label>
  );
}

/** Uncontrolled so partial input like "1." or "-" survives; remount via `key` to reset. */
function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={label}
      defaultValue={value ? String(value) : ""}
      placeholder="0"
      onChange={(e) => {
        const n = Number(e.target.value.replace(",", "."));
        onChange(Number.isFinite(n) ? n : 0);
      }}
      className={`${field} tabular-nums`}
    />
  );
}
