"use client";

import { useState, useSyncExternalStore } from "react";
import { TERMS, dueDate, parseIso, toIso, type TermId } from "@/lib/calculators";
import { CalcCard, Labeled, ResultLine, inputClass } from "@/components/calculators/ui";

const noopSubscribe = () => () => {};

export default function DueDateCalculator() {
  // Today is only known in the browser; the server renders a fixed example date.
  const todayIso = useSyncExternalStore(noopSubscribe, () => toIso(new Date()), () => null);
  const [picked, setPicked] = useState<string | null>(null);
  const [term, setTerm] = useState<TermId>("net30");
  const [custom, setCustom] = useState("21");
  const invoiceDate = picked ?? todayIso ?? "2026-11-01";
  const today = todayIso ? parseIso(todayIso) : null;

  const valid = /^\d{4}-\d{2}-\d{2}$/.test(invoiceDate) && (term !== "custom" || Number(custom) >= 0);
  const due = valid ? dueDate(invoiceDate, term, Math.floor(Number(custom))) : null;
  const weekend = due && (due.getDay() === 0 || due.getDay() === 6);
  const daysFromToday = due && today ? Math.round((due.getTime() - today.getTime()) / 86_400_000) : null;

  return (
    <CalcCard
      form={
        <>
          <Labeled label="Invoice date">
            <input type="date" className={inputClass} value={invoiceDate} onChange={(e) => setPicked(e.target.value)} />
          </Labeled>
          <Labeled label="Payment terms">
            <select className={inputClass} value={term} onChange={(e) => setTerm(e.target.value as TermId)}>
              {TERMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Labeled>
          {term === "custom" && (
            <Labeled label="Days after the invoice date">
              <input inputMode="numeric" className={inputClass} value={custom} onChange={(e) => setCustom(e.target.value)} />
            </Labeled>
          )}
        </>
      }
      result={
        <>
          <ResultLine
            big
            label={due ? `Payment is due on ${due.toLocaleDateString("en-US", { weekday: "long" })}` : "Payment is due"}
            value={due ? due.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}
          />
          {daysFromToday !== null && (
            <ResultLine
              label="From today"
              value={
                daysFromToday === 0
                  ? "Due today"
                  : daysFromToday > 0
                    ? `${daysFromToday} ${daysFromToday === 1 ? "day" : "days"} left`
                    : `${-daysFromToday} ${daysFromToday === -1 ? "day" : "days"} overdue`
              }
            />
          )}
          {weekend && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              This falls on a weekend. If you&rsquo;re paid by bank transfer, expect the money the next business day.
            </p>
          )}
        </>
      }
    />
  );
}
