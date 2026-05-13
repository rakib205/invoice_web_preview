import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EstimateRespond } from "@/components/EstimateRespond";
import { OpenPdfButton } from "@/components/OpenPdfButton";
import { PrintButton } from "@/components/PrintButton";
import { ViewTracker } from "@/components/ViewTracker";
import {
  fetchPublicInvoiceByToken,
  type PublicInvoiceBundle,
} from "@/lib/invoice/fetchPublicInvoice";

const BRAND = "#b8412a";

function money(amount: string | number | null | undefined, currency: string | null) {
  if (amount === null || amount === undefined || amount === "") return "—";
  const n = typeof amount === "number" ? amount : Number(amount);
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

function fmtDate(d: string | null | undefined) {
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

function initials(name: string | null | undefined) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

function statusMeta(status: string | null, isEstimate: boolean): { label: string; tone: StatusTone } {
  const s = (status ?? "").toLowerCase();
  if (s === "paid") return { label: "Paid", tone: "success" };
  if (s === "partially_paid" || s === "partial") return { label: "Partially paid", tone: "info" };
  if (s === "overdue") return { label: "Overdue", tone: "danger" };
  if (s === "accepted") return { label: "Accepted", tone: "success" };
  if (s === "rejected" || s === "declined") return { label: "Declined", tone: "danger" };
  if (s === "viewed") return { label: "Viewed", tone: "info" };
  if (s === "sent") return { label: isEstimate ? "Awaiting response" : "Sent", tone: "info" };
  if (s === "draft") return { label: "Draft", tone: "neutral" };
  if (s === "expired") return { label: "Expired", tone: "warning" };
  if (!s) return { label: "—", tone: "neutral" };
  return { label: status as string, tone: "neutral" };
}

function StatusPill({ status, isEstimate }: { status: string | null; isEstimate: boolean }) {
  const { label, tone } = statusMeta(status, isEstimate);
  const toneClass: Record<StatusTone, string> = {
    neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    success: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    warning: "bg-amber-50 text-amber-800 ring-amber-200",
    danger: "bg-red-50 text-red-800 ring-red-200",
    info: "bg-sky-50 text-sky-800 ring-sky-200",
  };
  const dotClass: Record<StatusTone, string> = {
    neutral: "bg-zinc-400",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-sky-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneClass[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass[tone]}`} />
      {label}
    </span>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconEye({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconPrint({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 7V3h8v4M6 17h8v-5H6v5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 7h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3 6 7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4.5c0-.5.4-1 1-1h2c.4 0 .8.3.9.7l1 3a1 1 0 0 1-.3 1L7.3 9.4a10 10 0 0 0 3.3 3.3l1.2-1.3c.3-.3.6-.4 1-.3l3 1a1 1 0 0 1 .7.9v2c0 .6-.5 1-1 1A12 12 0 0 1 4 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ActionBar({
  bundle,
  pathPrefix,
}: {
  bundle: PublicInvoiceBundle;
  pathPrefix: "inv" | "est";
}) {
  const hasPdf = Boolean(bundle.invoice.pdf_storage_path);
  const tok = bundle.invoice.public_token ?? "";
  const pdfUrl = `/${pathPrefix}/${tok}/pdf`;
  if (!hasPdf) {
    return (
      <span
        className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-100 px-3 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-200 sm:h-10 sm:px-4 sm:text-sm"
        title="PDF will be available after the sender generates it."
      >
        PDF not ready
      </span>
    );
  }
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link
        href={`${pdfUrl}?download=1`}
        aria-label="Download PDF"
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-medium text-white shadow-sm transition hover:opacity-90 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
        style={{ backgroundColor: BRAND }}
      >
        <IconDownload className="h-4 w-4" />
        <span className="hidden sm:inline">Download</span>
        <span className="sm:hidden">PDF</span>
      </Link>
      <OpenPdfButton
        href={pdfUrl}
        aria-label="Open PDF"
        className="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-60 sm:h-10 sm:w-auto sm:px-4 sm:text-sm sm:font-medium"
      >
        <IconEye className="h-4 w-4" />
        <span className="hidden sm:inline">Open PDF</span>
      </OpenPdfButton>
      <PrintButton
        pdfUrl={pdfUrl}
        className="hidden h-10 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-60 sm:inline-flex"
      >
        <IconPrint className="h-4 w-4" />
        Print
      </PrintButton>
    </div>
  );
}

function PartyCard({
  label,
  name,
  address,
  email,
  phone,
  logoUrl,
  accent,
}: {
  label: string;
  name: string;
  address: string;
  email?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-3">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={name}
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-zinc-200"
          />
        ) : (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold ring-1 ring-zinc-200 ${
              accent ? "text-white" : "bg-zinc-100 text-zinc-700"
            }`}
            style={accent ? { backgroundColor: BRAND } : undefined}
          >
            {initials(name)}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            {label}
          </div>
          <div className="truncate text-base font-semibold text-zinc-900">{name}</div>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm text-zinc-700">
        {address ? (
          <div className="flex items-start gap-2">
            <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
            <span className="leading-snug">{address}</span>
          </div>
        ) : null}
        {email ? (
          <div className="flex items-center gap-2">
            <IconMail className="h-4 w-4 shrink-0 text-zinc-400" />
            <a href={`mailto:${email}`} className="truncate hover:text-zinc-900 hover:underline">
              {email}
            </a>
          </div>
        ) : null}
        {phone ? (
          <div className="flex items-center gap-2">
            <IconPhone className="h-4 w-4 shrink-0 text-zinc-400" />
            <a href={`tel:${phone}`} className="hover:text-zinc-900 hover:underline">
              {phone}
            </a>
          </div>
        ) : null}
      </dl>
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

  const inv = bundle.invoice;
  const hasPdf = Boolean(inv.pdf_storage_path);
  const b = bundle.business;
  const c = bundle.customer;
  const currency = inv.currency ?? b?.currency ?? null;
  const isEstimate = inv.document_type === "estimate";
  const pathPrefix: "inv" | "est" = isEstimate ? "est" : "inv";
  const docLabel = isEstimate ? "Estimate" : "Invoice";

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

  const totalNum = Number(inv.total ?? 0);
  const paidNum = bundle.payments.reduce(
    (sum, p) => sum + (Number.isFinite(Number(p.amount)) ? Number(p.amount) : 0),
    0,
  );
  const balanceNum = Math.max(0, totalNum - paidNum);
  const fullyPaid = paidNum > 0 && balanceNum < 0.005;
  const isPaid =
    !isEstimate &&
    (fullyPaid ||
      (inv.status ?? "").toLowerCase() === "paid" ||
      Boolean(inv.paid_at));
  const effectiveStatus = isPaid ? "paid" : inv.status;
  const lastPayment = bundle.payments.length > 0
    ? bundle.payments.reduce((latest, p) =>
        p.paid_at && (!latest.paid_at || p.paid_at > latest.paid_at) ? p : latest
      )
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 print:bg-white">
      <ViewTracker token={token} />

      {/* Top action bar — sticky, hidden in print */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur print:hidden">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-8 sm:py-3">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/logo.png"
              alt="Invoiceflint"
              width={140}
              height={36}
              className="h-6 w-auto object-contain sm:h-7"
              priority
              unoptimized
            />
          </Link>
          <ActionBar bundle={bundle} pathPrefix={pathPrefix} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12 print:px-0 print:py-0">
        {/* Document card */}
        <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 print:rounded-none print:shadow-none print:ring-0">
          {/* Hero band */}
          <header
            className="relative px-6 py-8 sm:px-10 sm:py-10"
            style={{
              background:
                "linear-gradient(135deg, #fff7f3 0%, #fdf4ee 40%, #ffffff 100%)",
            }}
          >
            <div
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundColor: BRAND }}
              aria-hidden
            />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    {docLabel}
                  </span>
                  <StatusPill status={effectiveStatus} isEstimate={isEstimate} />
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                  {inv.invoice_number ? `#${inv.invoice_number}` : docLabel}
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                  Issued by{" "}
                  <span className="font-medium text-zinc-900">{b?.name ?? "—"}</span>
                  {c?.name ? (
                    <>
                      {" "}for{" "}
                      <span className="font-medium text-zinc-900">{c.name}</span>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="shrink-0 rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-zinc-200 backdrop-blur sm:min-w-[240px]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {isEstimate ? "Estimate total" : isPaid ? "Amount paid" : "Amount due"}
                </div>
                <div className="mt-1 text-3xl font-semibold tabular-nums text-zinc-950">
                  {isEstimate
                    ? money(inv.total, currency)
                    : money(isPaid ? totalNum : balanceNum, currency)}
                </div>
                {!isEstimate && paidNum > 0 && !isPaid ? (
                  <div className="mt-1 text-xs text-zinc-600">
                    {money(paidNum, currency)} paid of {money(totalNum, currency)}
                  </div>
                ) : null}
                {isPaid ? (
                  <div className="mt-1 text-xs font-medium text-emerald-700">
                    {lastPayment?.paid_at
                      ? `Paid on ${fmtDate(lastPayment.paid_at)}`
                      : inv.paid_at
                        ? `Paid on ${fmtDate(inv.paid_at)}`
                        : "Paid in full"}
                  </div>
                ) : !isEstimate && inv.due_date ? (
                  <div className="mt-1 text-xs text-zinc-600">
                    Due {fmtDate(inv.due_date)}
                  </div>
                ) : null}
                {isEstimate && inv.expiry_date ? (
                  <div className="mt-1 text-xs text-zinc-600">
                    Valid until {fmtDate(inv.expiry_date)}
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <div className="px-6 pb-10 pt-8 sm:px-10">
            {!hasPdf ? (
              <div className="mb-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 print:hidden">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <div>
                  <div className="font-medium">PDF not available yet</div>
                  <div className="mt-1 text-amber-900/90">
                    {isEstimate ? (
                      <>
                        Ask the sender to open the estimate in the app and tap{" "}
                        <span className="font-semibold">Send estimate</span> again to generate and upload the PDF.
                      </>
                    ) : (
                      <>
                        Ask the sender to open the invoice in the app and tap{" "}
                        <span className="font-semibold">Send invoice</span> again to generate and upload the PDF.
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {/* From / To */}
            <div className="grid gap-4 sm:grid-cols-2">
              <PartyCard
                label="From"
                name={b?.name ?? "Business"}
                address={businessAddress}
                email={b?.email}
                phone={b?.phone}
                logoUrl={b?.logo_url ?? null}
                accent
              />
              <PartyCard
                label={isEstimate ? "Prepared for" : "Bill to"}
                name={c?.name ?? "Customer"}
                address={customerAddress}
                email={c?.email}
                phone={c?.phone}
              />
            </div>

            {/* Detail strip */}
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-3">
              <div className="bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {isEstimate ? "Estimate number" : "Invoice number"}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {inv.invoice_number ?? "—"}
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {isEstimate ? "Estimate date" : "Issue date"}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {fmtDate(inv.invoice_date) || "—"}
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  {isEstimate ? "Valid until" : "Due date"}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-900">
                  {isEstimate
                    ? fmtDate(inv.expiry_date) || "—"
                    : fmtDate(inv.due_date) || "—"}
                </div>
              </div>
            </div>

            {/* Estimate respond */}
            {isEstimate && inv.public_token ? (
              <EstimateRespond
                token={inv.public_token}
                initialStatus={inv.status}
                expiryDate={inv.expiry_date}
              />
            ) : null}

            {/* Items */}
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-zinc-900">Items</h2>
              <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-zinc-200">
                <div className="hidden sm:block">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold">Description</th>
                        <th className="px-5 py-3 text-right font-semibold">Qty</th>
                        <th className="px-5 py-3 text-right font-semibold">Unit price</th>
                        <th className="px-5 py-3 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                      {bundle.items.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-5 py-6 text-center text-sm text-zinc-500">
                            No items on this {docLabel.toLowerCase()}.
                          </td>
                        </tr>
                      ) : (
                        bundle.items.map((it) => {
                          const hasQty = it.quantity !== null && it.quantity !== undefined;
                          const qtyNum = hasQty ? Number(it.quantity) : 0;
                          const unitNum = it.price ? Number(it.price) : 0;
                          const storedTotal = it.total !== null && it.total !== undefined && it.total !== ""
                            ? Number(it.total)
                            : null;
                          const lineTotal =
                            storedTotal !== null && Number.isFinite(storedTotal)
                              ? storedTotal
                              : qtyNum * unitNum;
                          return (
                            <tr key={it.id} className="align-top">
                              <td className="px-5 py-4">
                                <div className="font-medium text-zinc-900">{it.name ?? ""}</div>
                                {it.description ? (
                                  <div className="mt-1 max-w-xl whitespace-pre-wrap text-sm text-zinc-600">
                                    {it.description}
                                  </div>
                                ) : null}
                              </td>
                              <td className="px-5 py-4 text-right tabular-nums text-zinc-700">
                                {hasQty ? (
                                  <>
                                    {qtyNum}
                                    {it.unit_type && it.unit_type.toLowerCase() !== "none" ? (
                                      <span className="ml-1 text-xs text-zinc-500">{it.unit_type}</span>
                                    ) : null}
                                  </>
                                ) : null}
                              </td>
                              <td className="px-5 py-4 text-right tabular-nums text-zinc-700">
                                {money(it.price, currency)}
                              </td>
                              <td className="px-5 py-4 text-right font-medium tabular-nums text-zinc-900">
                                {money(lineTotal, currency)}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile items */}
                <div className="divide-y divide-zinc-100 bg-white sm:hidden">
                  {bundle.items.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-zinc-500">
                      No items.
                    </div>
                  ) : (
                    bundle.items.map((it) => {
                      const hasQty = it.quantity !== null && it.quantity !== undefined;
                      const qtyNum = hasQty ? Number(it.quantity) : 0;
                      const unitNum = it.price ? Number(it.price) : 0;
                      const storedTotal = it.total !== null && it.total !== undefined && it.total !== ""
                        ? Number(it.total)
                        : null;
                      const lineTotal =
                        storedTotal !== null && Number.isFinite(storedTotal)
                          ? storedTotal
                          : qtyNum * unitNum;
                      const showUnit = it.unit_type && it.unit_type.toLowerCase() !== "none";
                      const meta: string[] = [];
                      if (hasQty) {
                        meta.push(`${qtyNum}${showUnit ? ` ${it.unit_type}` : ""}`);
                      }
                      if (it.price) {
                        meta.push(money(it.price, currency));
                      }
                      return (
                        <div key={it.id} className="px-4 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-medium text-zinc-900">{it.name ?? ""}</div>
                              {it.description ? (
                                <div className="mt-1 whitespace-pre-wrap text-sm text-zinc-600">
                                  {it.description}
                                </div>
                              ) : null}
                              {meta.length > 0 ? (
                                <div className="mt-2 text-xs text-zinc-500 tabular-nums">
                                  {meta.join(" × ")}
                                </div>
                              ) : null}
                            </div>
                            <div className="shrink-0 text-right text-sm font-semibold tabular-nums text-zinc-900">
                              {money(lineTotal, currency)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

            {/* Totals + notes */}
            <div className="mt-8 grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                {inv.notes ? (
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      Notes
                    </div>
                    <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                      {inv.notes}
                    </div>
                  </div>
                ) : null}

                {inv.payment_method ? (
                  <div className={`${inv.notes ? "mt-4" : ""} rounded-2xl border border-zinc-200 bg-white p-5`}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      Payment method
                    </div>
                    <div className="mt-1 text-sm font-medium text-zinc-900">
                      {inv.payment_method}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-zinc-600">Subtotal</dt>
                      <dd className="font-medium tabular-nums text-zinc-900">
                        {money(inv.subtotal, currency)}
                      </dd>
                    </div>
                    {inv.discount && Number(inv.discount) > 0 ? (
                      <div className="flex items-center justify-between">
                        <dt className="text-zinc-600">Discount</dt>
                        <dd className="font-medium tabular-nums text-zinc-900">
                          − {money(inv.discount, currency)}
                        </dd>
                      </div>
                    ) : null}
                    {inv.tax && Number(inv.tax) > 0 ? (
                      <div className="flex items-center justify-between">
                        <dt className="text-zinc-600">Tax</dt>
                        <dd className="font-medium tabular-nums text-zinc-900">
                          {money(inv.tax, currency)}
                        </dd>
                      </div>
                    ) : null}
                    <div className="!mt-4 flex items-center justify-between border-t border-zinc-200 pt-3">
                      <dt className="text-sm font-semibold text-zinc-900">Total</dt>
                      <dd className="text-lg font-semibold tabular-nums text-zinc-950">
                        {money(inv.total, currency)}
                      </dd>
                    </div>
                    {!isEstimate && paidNum > 0 ? (
                      <>
                        <div className="flex items-center justify-between">
                          <dt className="text-zinc-600">Paid to date</dt>
                          <dd className="font-medium tabular-nums text-emerald-700">
                            − {money(paidNum, currency)}
                          </dd>
                        </div>
                        {isPaid ? (
                          <div className="!mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-inset ring-emerald-200">
                            <dt className="flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                              </svg>
                              Paid in full
                            </dt>
                            <dd className="text-lg font-semibold tabular-nums text-emerald-700">
                              {money(0, currency)}
                            </dd>
                          </div>
                        ) : (
                          <div
                            className="!mt-3 flex items-center justify-between rounded-xl px-3 py-2"
                            style={{ backgroundColor: "#fdf4ee" }}
                          >
                            <dt className="text-sm font-semibold text-zinc-900">Amount due</dt>
                            <dd
                              className="text-lg font-semibold tabular-nums"
                              style={{ color: BRAND }}
                            >
                              {money(balanceNum, currency)}
                            </dd>
                          </div>
                        )}
                      </>
                    ) : null}
                  </dl>
                </div>
              </div>
            </div>

            {/* Payment history */}
            {!isEstimate && bundle.payments.length > 0 ? (
              <section className="mt-8">
                <h2 className="text-sm font-semibold text-zinc-900">Payment history</h2>
                <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-zinc-200">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-[11px] uppercase tracking-wider text-zinc-500">
                      <tr>
                        <th className="px-5 py-3 text-left font-semibold">Date</th>
                        <th className="px-5 py-3 text-left font-semibold">Method</th>
                        <th className="px-5 py-3 text-left font-semibold">Notes</th>
                        <th className="px-5 py-3 text-right font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                      {bundle.payments.map((p) => (
                        <tr key={p.id}>
                          <td className="px-5 py-3 text-zinc-700">{fmtDate(p.paid_at) || "—"}</td>
                          <td className="px-5 py-3 text-zinc-700">{p.method ?? "—"}</td>
                          <td className="px-5 py-3 text-zinc-600">{p.notes ?? ""}</td>
                          <td className="px-5 py-3 text-right font-medium tabular-nums text-emerald-700">
                            {money(p.amount, currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {/* Sign-off */}
            <div className="mt-10 flex flex-col items-center gap-2 border-t border-zinc-200 pt-6 text-center">
              <div className="text-sm text-zinc-600">
                Thank you for your business.
              </div>
              {b?.email ? (
                <div className="text-xs text-zinc-500">
                  Questions? Reach out to{" "}
                  <a
                    href={`mailto:${b.email}`}
                    className="font-medium text-zinc-700 hover:text-zinc-900 hover:underline"
                  >
                    {b.email}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-6 flex flex-col items-center gap-2 px-2 text-xs text-zinc-500 print:hidden sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src="/logo.png"
                alt="Invoiceflint"
                width={90}
                height={24}
                className="h-4 w-auto object-contain opacity-80"
                unoptimized
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-zinc-700">Privacy</Link>
            <Link href="/support" className="hover:text-zinc-700">Support</Link>
            <span className="font-mono text-[10px] text-zinc-400">
              {inv.public_token?.slice(0, 8)}…
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
