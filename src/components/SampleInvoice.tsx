import { sampleTotals, type Trade } from "@/lib/trades/content";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const quantity = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 });

/** An example invoice for a trade, rendered as a real HTML table. */
export default function SampleInvoice({ trade }: { trade: Trade }) {
  const { sample } = trade;
  const { subtotal, tax, total } = sampleTotals(sample);

  return (
    <figure className="rounded-2xl bg-white p-5 shadow-[0_30px_70px_-30px_rgba(10,23,41,0.45)] ring-1 ring-black/5 sm:p-7">
      <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rust">Invoice</p>
          <p className="mt-1 text-lg font-semibold text-ink">{sample.business}</p>
        </div>
        <div className="text-right text-xs text-zinc-500">
          <p className="font-medium text-ink">{sample.number}</p>
          <p className="mt-1">Bill to: {sample.client}</p>
        </div>
      </div>

      <table className="mt-4 w-full text-left text-[13px]">
        <caption className="sr-only">Example {trade.invoiceName}</caption>
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-zinc-400">
            <th scope="col" className="pb-2 font-medium">Description</th>
            <th scope="col" className="hidden pb-2 text-right font-medium sm:table-cell">Qty</th>
            <th scope="col" className="hidden pb-2 text-right font-medium sm:table-cell">Rate</th>
            <th scope="col" className="pb-2 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {sample.lines.map((line) => (
            <tr key={line.description}>
              <td className="py-2.5 pr-3 text-zinc-700">
                {line.description}
                <span className="block text-[11px] text-zinc-400 sm:hidden">
                  {quantity.format(line.qty)} × {money.format(line.rate)}
                </span>
              </td>
              <td className="hidden py-2.5 text-right tabular-nums text-zinc-500 sm:table-cell">{quantity.format(line.qty)}</td>
              <td className="hidden py-2.5 pl-3 text-right tabular-nums text-zinc-500 sm:table-cell">{money.format(line.rate)}</td>
              <td className="py-2.5 pl-3 text-right font-medium tabular-nums text-ink">{money.format(line.qty * line.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="ml-auto mt-3 w-full max-w-[300px] space-y-1.5 border-t border-zinc-200 pt-3 text-[13px]">
        <div className="flex justify-between text-zinc-500">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money.format(subtotal)}</dd>
        </div>
        {sample.taxRate ? (
          <div className="flex justify-between text-zinc-500">
            <dt>
              {sample.taxLabel ?? "Tax"} ({percent.format(sample.taxRate)})
            </dt>
            <dd className="tabular-nums">{money.format(tax)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between rounded-lg bg-ink px-3 py-2 font-semibold text-white">
          <dt>Total due</dt>
          <dd className="tabular-nums">{money.format(total)}</dd>
        </div>
      </dl>

      <figcaption className="mt-4 text-xs leading-relaxed text-zinc-500">{sample.notes}</figcaption>
    </figure>
  );
}
