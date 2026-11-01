"use client";

import { useState } from "react";
import { priceFor, type PriceMode } from "@/lib/calculators";
import { CALC_CURRENCIES, CalcCard, Labeled, ResultLine, Segmented, inputClass, money, num } from "@/components/calculators/ui";

const pct = (n: number) => (Number.isFinite(n) ? `${(Math.round(n * 10) / 10).toLocaleString("en-US")}%` : "—");

export default function MarkupCalculator() {
  const [cost, setCost] = useState("60");
  const [mode, setMode] = useState<PriceMode>("markup");
  const [value, setValue] = useState("50");
  const [currency, setCurrency] = useState("USD");

  const c = num(cost);
  const price = priceFor(c, mode, num(value));
  const profit = price - c;
  const markup = c > 0 ? (profit / c) * 100 : NaN;
  const margin = price > 0 ? (profit / price) * 100 : NaN;

  return (
    <CalcCard
      form={
        <>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <Labeled label="Your cost" hint="What the materials, product, or labor cost you.">
              <input inputMode="decimal" className={inputClass} value={cost} onChange={(e) => setCost(e.target.value)} />
            </Labeled>
            <Labeled label="Currency">
              <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CALC_CURRENCIES.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </Labeled>
          </div>
          <Segmented
            label="I know the…"
            value={mode}
            onChange={setMode}
            options={[
              { value: "markup", label: "Markup %" },
              { value: "margin", label: "Margin %" },
              { value: "price", label: "Price" },
            ]}
          />
          <Labeled label={mode === "price" ? "Selling price" : mode === "markup" ? "Markup (%)" : "Target margin (%)"}>
            <input inputMode="decimal" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
          </Labeled>
        </>
      }
      result={
        <>
          <ResultLine big label="Selling price" value={money(price, currency)} />
          <ResultLine label="Profit" value={money(profit, currency)} />
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <div>
              <p className="text-sm text-zinc-400">Markup</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{pct(markup)}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Margin</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{pct(margin)}</p>
            </div>
          </div>
        </>
      }
    />
  );
}
