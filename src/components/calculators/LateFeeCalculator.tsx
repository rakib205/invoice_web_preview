"use client";

import { useState } from "react";
import { lateFee, type FeeType } from "@/lib/calculators";
import { CALC_CURRENCIES, CalcCard, Labeled, ResultLine, Segmented, inputClass, money, num } from "@/components/calculators/ui";

export default function LateFeeCalculator() {
  const [amount, setAmount] = useState("1200");
  const [type, setType] = useState<FeeType>("monthly");
  const [rate, setRate] = useState("1.5");
  const [days, setDays] = useState("45");
  const [grace, setGrace] = useState("0");
  const [currency, setCurrency] = useState("USD");

  const a = num(amount);
  const fee = lateFee(a, type, num(rate), Math.floor(num(days)), Math.floor(num(grace) || 0));
  const valid = Number.isFinite(fee) && Number.isFinite(a);
  const chargeable = Math.max(0, Math.floor(num(days)) - Math.floor(num(grace) || 0));

  return (
    <CalcCard
      form={
        <>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Labeled label="Invoice amount">
              <input inputMode="decimal" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Labeled>
            <Labeled label="Currency">
              <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CALC_CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Labeled>
          </div>
          <Segmented
            label="Late fee type"
            value={type}
            onChange={setType}
            options={[
              { value: "monthly", label: "% per month" },
              { value: "annual", label: "% per year" },
              { value: "flat", label: "Flat fee" },
            ]}
          />
          <div className="grid grid-cols-3 gap-3">
            <Labeled label={type === "flat" ? "Fee" : "Rate (%)"}>
              <input inputMode="decimal" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
            </Labeled>
            <Labeled label="Days late">
              <input inputMode="numeric" className={inputClass} value={days} onChange={(e) => setDays(e.target.value)} />
            </Labeled>
            <Labeled label="Grace days">
              <input inputMode="numeric" className={inputClass} value={grace} onChange={(e) => setGrace(e.target.value)} />
            </Labeled>
          </div>
        </>
      }
      result={
        <>
          <ResultLine big label="Late fee" value={valid ? money(fee, currency) : "—"} />
          <ResultLine label="New balance due" value={valid ? money(a + fee, currency) : "—"} />
          {valid && type !== "flat" && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {rate}% per {type === "monthly" ? "month" : "year"} on {money(a, currency)} for {chargeable} chargeable{" "}
              {chargeable === 1 ? "day" : "days"}
              {type === "monthly" && ` (about ${(num(rate) * 12).toFixed(1)}% a year)`}.
            </p>
          )}
        </>
      }
    />
  );
}
