import Link from "next/link";
import { notFound } from "next/navigation";

import { PrintButton } from "@/components/PrintButton";
import {
  fetchPublicInvoiceByToken,
  type PublicInvoiceBundle,
} from "@/lib/invoice/fetchPublicInvoice";

function money(amount: string | null, currency: string | null) {
  if (!amount) return "";
  const n = Number(amount);
  if (!Number.isFinite(n)) return String(amount);
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
    }).format(n);
  } catch {
    return String(amount);
  }
}

function fmtDate(d: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function joinParts(...parts: Array<string | null | undefined>) {
  return parts.filter((p): p is string => Boolean(p && p.trim())).join(", ");
}

function Title({ bundle }: { bundle: PublicInvoiceBundle }) {
  const doc = bundle.invoice.document_type === "estimate" ? "Estimate" : "Invoice";
  const no = bundle.invoice.invoice_number ? ` ${bundle.invoice.invoice_number}` : "";
  const hasPdf = Boolean(bundle.invoice.pdf_storage_path);
  return (
    <div className="sticky top-0 z-10 -mx-4 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur print:hidden sm:-mx-10 sm:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-900">
            {doc}
            {no}
          </div>
          <div className="mt-0.5 text-xs text-zinc-600">
            Status: <span className="font-medium text-zinc-900">{bundle.invoice.status ?? "-"}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {hasPdf ? (
            <>
              <Link
                href={`/inv/${bundle.invoice.public_token}/pdf?download=1`}
                className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Download
              </Link>
              <Link
                href={`/inv/${bundle.invoice.public_token}/pdf`}
                className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium hover:bg-zinc-50"
              >
                View PDF
              </Link>
              <Link
                href={`/inv/${bundle.invoice.public_token}/pdf-view`}
                className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium hover:bg-zinc-50"
              >
                PDF Viewer
              </Link>
              <PrintButton
                className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium hover:bg-zinc-50"
              />
            </>
          ) : (
            <span
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-200 px-4 text-sm font-medium text-zinc-600"
              title="PDF will be available after the sender generates it."
            >
              PDF not ready
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function InvoicePublicPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const bundle = await fetchPublicInvoiceByToken(token);
  if (!bundle) notFound();

  const hasPdf = Boolean(bundle.invoice.pdf_storage_path);
  const b = bundle.business;
  const c = bundle.customer;
  const currency = bundle.invoice.currency ?? b?.currency ?? null;

  const businessAddress = joinParts(
    b?.address_line1,
    b?.address_line2,
    joinParts(b?.city, b?.state, b?.postal_code),
    b?.country,
  );
  const customerAddress = joinParts(
    c?.address_line1,
    c?.address_line2,
    joinParts(c?.city, c?.state, c?.postal_code),
    c?.country,
  );

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950 print:bg-white">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 print:rounded-none print:p-0 print:shadow-none print:ring-0 sm:p-10">
        <Title bundle={bundle} />
        {!hasPdf ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 print:hidden">
            <div className="font-medium">PDF not available yet</div>
            <div className="mt-1 text-amber-900/90">
              Ask the sender to open the invoice in the app and tap <span className="font-semibold">Send invoice</span> again to
              generate and upload the PDF.
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">From</div>
            <div className="mt-2 text-sm text-zinc-900">
              <div className="font-semibold">{b?.name ?? "Business"}</div>
              {businessAddress ? <div className="mt-1 text-zinc-700">{businessAddress}</div> : null}
              {b?.email ? <div className="mt-1 text-zinc-700">{b.email}</div> : null}
              {b?.phone ? <div className="text-zinc-700">{b.phone}</div> : null}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Bill to</div>
            <div className="mt-2 text-sm text-zinc-900">
              <div className="font-semibold">{c?.name ?? "Customer"}</div>
              {customerAddress ? <div className="mt-1 text-zinc-700">{customerAddress}</div> : null}
              {c?.email ? <div className="mt-1 text-zinc-700">{c.email}</div> : null}
              {c?.phone ? <div className="text-zinc-700">{c.phone}</div> : null}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Invoice date</div>
            <div className="mt-1 text-sm font-medium text-zinc-900">{fmtDate(bundle.invoice.invoice_date)}</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Due date</div>
            <div className="mt-1 text-sm font-medium text-zinc-900">{fmtDate(bundle.invoice.due_date)}</div>
          </div>
          <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Total</div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-zinc-900">
              {money(bundle.invoice.total, currency)}
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl ring-1 ring-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Item</th>
                <th className="px-4 py-3 text-right font-semibold">Qty</th>
                <th className="px-4 py-3 text-right font-semibold">Price</th>
                <th className="px-4 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {bundle.items.map((it) => {
                const qty = it.quantity ?? 0;
                const unit = it.unit_price ? Number(it.unit_price) : 0;
                const lineTotal = qty * unit;
                return (
                  <tr key={it.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium">{it.name}</div>
                      {it.description ? <div className="mt-1 text-zinc-600">{it.description}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{qty}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{money(it.unit_price, currency)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{money(String(lineTotal.toFixed(2)), currency)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-zinc-700">
            {bundle.invoice.notes ? (
              <>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Notes</div>
                <div className="mt-2 whitespace-pre-wrap">{bundle.invoice.notes}</div>
              </>
            ) : null}
          </div>

          <div className="w-full max-w-sm rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium tabular-nums">{money(bundle.invoice.subtotal, currency)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-600">Discount</span>
              <span className="font-medium tabular-nums">{money(bundle.invoice.discount, currency)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-600">Tax</span>
              <span className="font-medium tabular-nums">{money(bundle.invoice.tax, currency)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-3">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-semibold tabular-nums">{money(bundle.invoice.total, currency)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-xs text-zinc-500 print:hidden">
          Token: <span className="font-mono">{bundle.invoice.public_token}</span>
        </div>
      </div>
    </div>
  );
}

