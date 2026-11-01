import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import StoreBadges from "@/components/StoreBadges";
import FeatureIcon from "@/components/FeatureIcon";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import AppShowcase, { type ShowcaseStep } from "@/components/AppShowcase";
import {
  graph,
  jsonLdScript,
  organizationLd,
  websiteLd,
  softwareApplicationLd,
  faqLd,
} from "@/lib/jsonLd";
import { FAQS } from "@/lib/faq";
import { GUIDES } from "@/lib/guides/content";
import { TRADES, audienceOf } from "@/lib/trades/content";
import {
  FEATURES,
  FREE_PLAN,
  LANGUAGES,
  PRO_PLAN,
  PRODUCT_SUMMARY,
  SHARE_CHANNELS,
} from "@/lib/product";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", es: "/es", "x-default": "/" } },
};

const jsonLd = graph(
  organizationLd(),
  websiteLd(),
  softwareApplicationLd(),
  faqLd(FAQS),
);

const FACTS = [
  { value: "1 min", label: "to create and send an invoice" },
  { value: String(SHARE_CHANNELS.length), label: "ways to send: link, email, WhatsApp, PDF, print" },
  { value: "14", label: "professional invoice templates" },
  { value: String(LANGUAGES.length), label: "app languages, plus your currency" },
];

const TOUR: ShowcaseStep[] = [
  {
    id: "create",
    eyebrow: "Create",
    title: "Professional invoices and estimates, made on your phone",
    body: "Add your client and line items — quantities, rates, discounts, and tax calculate themselves, and invoice numbers are assigned for you. Your logo goes on every document.",
    points: [
      "Totals, tax, and numbering done for you",
      "Your business logo on every invoice",
      "Sign on screen and attach photos",
    ],
    alt: "Illustration of the Invoiceflint invoice maker: a new invoice with client, line items, tax, total, and a signature",
  },
  {
    id: "send",
    eyebrow: "Send anywhere",
    title: "Email, WhatsApp, a link, or a PDF",
    body: "Send the invoice the way your client actually reads messages. Share a secure link through any app, email it directly, open WhatsApp with a prefilled message, send the PDF, or print it.",
    points: [
      "Clients open it in any browser — no app or account",
      "Clients can download a PDF copy",
      "Automatic email reminders for late invoices (Pro)",
    ],
    alt: "Illustration of the Invoiceflint send sheet with share link, email, WhatsApp, PDF, and print options",
  },
  {
    id: "notify",
    eyebrow: "Read receipts",
    title: "Know the moment a client opens your invoice",
    body: "Stop wondering whether your invoice landed in spam. Invoiceflint sends a push alert the second a client views an invoice or replies to an estimate — so you follow up at the right time, not on a hunch.",
    points: [
      "Instant alerts when an invoice is viewed",
      "Alerts when an estimate is accepted or declined",
      "No noise — only the notifications that matter",
    ],
    alt: "Illustration of lock-screen notifications showing a client viewed an invoice and accepted an estimate",
  },
  {
    id: "estimate",
    eyebrow: "Estimates & quotes",
    title: "Win the job, then bill it in one tap",
    body: "Send a professional estimate, let the client accept it online, and convert it to an invoice with one tap. Line items, client details, and totals carry over — nothing to retype.",
    points: [
      "Clients accept or decline estimates online",
      "One-tap estimate-to-invoice conversion",
      "Tax and totals calculated automatically",
    ],
    alt: "Illustration of an accepted estimate with its activity timeline and a Convert to invoice button",
  },
  {
    id: "status",
    eyebrow: "Payment tracking",
    title: "See who's paid, unpaid, and overdue",
    body: "Every invoice moves through Draft, Sent, Viewed, and Paid. Overdue invoices are flagged with how many days late they are, and every client shows a running balance due.",
    points: [
      "Status for every invoice at a glance",
      "Overdue invoices flagged automatically",
      "Client balances and revenue reports",
    ],
    alt: "Illustration of the Invoiceflint invoice list with paid, viewed, overdue, sent, and draft statuses",
  },
  {
    id: "reports",
    eyebrow: "Reports",
    title: "Revenue and tax totals, ready at tax time",
    body: "See total revenue, what's paid and unpaid, and tax collected by month and year. Export reports and client statements for your accountant.",
    points: [
      "Paid and unpaid totals at a glance",
      "Tax collected by month and year",
      "CSV and PDF export for your accountant",
    ],
    alt: "Illustration of Invoiceflint reports with revenue, tax collected, and a monthly revenue chart",
  },
];

const STEPS = [
  {
    title: "Create",
    body: "Add your client and line items. Quantities, rates, tax, and totals calculate themselves, and invoice numbers are assigned for you.",
  },
  {
    title: "Send",
    body: "Send a secure link by email, WhatsApp, or any app — or share the PDF. Your client opens it in any browser.",
  },
  {
    title: "Get paid",
    body: "Get notified when it's viewed, send a reminder if it's late, and mark it paid when the money lands.",
  },
];

type Cell = string | boolean;
const COMPARISON: Array<{ label: string; app: Cell; template: Cell; desktop: Cell }> = [
  { label: "Create and send from your phone", app: true, template: false, desktop: "Sometimes" },
  { label: "Totals, tax, and numbering done for you", app: true, template: false, desktop: true },
  { label: "Know when the client opens it", app: true, template: false, desktop: "Sometimes" },
  { label: "Clients accept estimates online", app: true, template: false, desktop: "Sometimes" },
  { label: "Automatic payment reminders", app: "Pro", template: false, desktop: "Often" },
  { label: "Time to learn", app: "Minutes", template: "Minutes", desktop: "Hours to days" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-paper text-zinc-950">
      <script {...jsonLdScript(jsonLd)} />
      <SiteNav />

      <div className="flex-1 overflow-x-clip">
        {/* Hero */}
        <section className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(184,65,42,0.16) 0%, rgba(184,65,42,0.06) 50%, transparent 80%)" }}
          />

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-rust-line bg-rust-soft px-3 py-1 text-xs font-medium text-rust">
              <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              Invoice &amp; estimate maker for iPhone and Android
            </p>
            <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance text-ink sm:text-6xl lg:text-[4.1rem]">
              Send invoices from your phone.{" "}
              <span className="text-rust">Get paid faster.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Invoiceflint is the invoice app for freelancers, contractors, and small
              businesses. Create a professional invoice or estimate in a minute, send it
              by email or WhatsApp, and get notified the moment your client opens it.
            </p>

            <div id="download" className="scroll-mt-24">
              <StoreBadges className="mt-8" placement="hero" />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
              {["Free to download", "Free trial of Pro", "Clients need no app"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-rust" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <HeroMock />
        </section>

        {/* Facts */}
        <section aria-label="Invoiceflint at a glance" className="border-y border-zinc-200 bg-white">
          <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label} className="px-2 text-center lg:border-l lg:border-zinc-200 lg:first:border-l-0">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">{f.value}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* What is Invoiceflint */}
        <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            The invoice app that tells you when clients open your invoice
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">{PRODUCT_SUMMARY}</p>
        </section>

        {/* App tour */}
        <section id="features" aria-labelledby="tour-title" className="mx-auto w-full max-w-6xl scroll-mt-8 px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-rust">Take the tour</p>
            <h2 id="tour-title" className="mt-3 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              From first invoice to paid, all on your phone
            </h2>
          </div>
          <AppShowcase steps={TOUR} className="mt-12 sm:mt-16" />
        </section>

        {/* Feature grid */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
                Everything you need to invoice and get paid
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                Simple enough to use on a job site, complete enough to run your billing.
              </p>
            </div>
            <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <li key={f.id} className="rounded-2xl border border-zinc-200 bg-paper p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust-soft text-rust">
                    <FeatureIcon id={f.id} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{f.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-center">
              <Link href="/features" className="text-sm font-semibold text-rust hover:underline">
                See all features →
              </Link>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto w-full max-w-7xl scroll-mt-8 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              How to send an invoice with Invoiceflint
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              From finished job to sent invoice in about a minute.
            </p>
          </div>
          <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-zinc-200 bg-white p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rust text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Who it's for */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="rounded-3xl border border-zinc-200 bg-white px-6 py-12 sm:px-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
                  Built for people who bill for their own work
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                  If you finish a job and then have to sit down at a computer to bill
                  for it, the invoice goes out late — and so does the payment.
                  Invoiceflint lets you invoice on the spot, from the van, the studio, or
                  the client&rsquo;s doorstep. No accounting knowledge or desktop software
                  needed.
                </p>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">
                  New to invoicing? Start with{" "}
                  <Link href="/guides/how-to-invoice-a-client" className="font-medium text-rust hover:underline">
                    how to invoice a client
                  </Link>
                  .
                </p>
              </div>
              <div>
                <ul aria-label="Invoiceflint by trade" className="flex flex-wrap gap-2.5">
                  {TRADES.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/invoice-app/${t.slug}`}
                        title={`Invoice app for ${audienceOf(t)}`}
                        className="block rounded-full border border-zinc-200 bg-paper px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust"
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/invoice-app" className="mt-5 inline-block text-sm font-semibold text-rust hover:underline">
                  Example invoices for every trade →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              Invoice app vs. templates vs. accounting software
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Word and Excel templates are fine for the odd invoice. Accounting suites are
              built for bookkeepers. Invoiceflint sits in between: fast, mobile, and focused
              on getting paid.
            </p>
          </div>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">
                Comparison of Invoiceflint, invoice templates, and desktop accounting software
              </caption>
              <thead>
                <tr className="border-b border-zinc-200">
                  <th scope="col" className="px-5 py-4 font-medium text-zinc-500"><span className="sr-only">Capability</span></th>
                  <th scope="col" className="bg-rust-soft px-5 py-4 font-semibold text-rust">Invoiceflint</th>
                  <th scope="col" className="px-5 py-4 font-semibold text-ink">Word / Excel template</th>
                  <th scope="col" className="px-5 py-4 font-semibold text-ink">Accounting software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {COMPARISON.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-5 py-4 font-medium text-zinc-700">{row.label}</th>
                    <td className="bg-rust-soft/60 px-5 py-4"><CellValue value={row.app} /></td>
                    <td className="px-5 py-4"><CellValue value={row.template} /></td>
                    <td className="px-5 py-4"><CellValue value={row.desktop} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            More detail in{" "}
            <Link href="/guides/free-invoice-template-vs-app" className="font-medium text-rust hover:underline">
              free invoice template vs. an invoice app
            </Link>
            .
          </p>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-5xl scroll-mt-8 px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              Start free. Upgrade when you&rsquo;re ready to send.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Download Invoiceflint for free and set up your business. Pro starts with a free
              trial, and you can cancel anytime from your App Store or Google Play account.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[FREE_PLAN, PRO_PLAN].map((plan) => {
              const pro = plan === PRO_PLAN;
              return (
                <div
                  key={plan.name}
                  className={`rounded-3xl p-8 ${pro ? "bg-ink text-white shadow-xl" : "border border-zinc-200 bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-semibold ${pro ? "text-white" : "text-ink"}`}>{plan.name}</h3>
                    {pro && (
                      <span className="rounded-full bg-rust px-3 py-1 text-xs font-semibold text-white">
                        Free trial
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed ${pro ? "text-zinc-300" : "text-zinc-600"}`}>
                    {plan.summary}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className={`flex items-start gap-3 text-sm ${pro ? "text-zinc-100" : "text-zinc-700"}`}>
                        <Check className={`mt-0.5 h-4 w-4 flex-none ${pro ? "text-[#f0a58f]" : "text-rust"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Plan prices are shown in the app in your local currency.{" "}
            <Link href="/pricing" className="font-medium text-rust hover:underline">
              Pricing details →
            </Link>
          </p>
        </section>

        {/* Guides */}
        <section className="border-t border-zinc-200 bg-white py-20 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
                  Invoicing guides
                </h2>
                <p className="mt-3 text-zinc-600">Practical advice on billing clients and getting paid on time.</p>
              </div>
              <Link href="/guides" className="text-sm font-semibold text-rust hover:underline">
                All guides →
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-paper p-6 transition hover:border-zinc-300 hover:shadow-sm"
                  >
                    <h3 className="text-base font-semibold leading-snug text-ink">{g.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{g.description}</p>
                    <span className="mt-4 text-sm font-medium text-rust">Read guide →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-8 px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqList items={FAQS} />
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Still have a question?{" "}
            <Link href="/support" className="font-medium text-rust hover:underline">
              Contact support
            </Link>
            .
          </p>
        </section>

        {/* CTA band */}
        <CtaBand
          title="Send your next invoice from your phone."
          body="Download Invoiceflint for iPhone or Android and create your first invoice in under a minute."
        />
      </div>

      <SiteFooter />
    </main>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
        <Check className="h-4 w-4" />
        Yes
      </span>
    );
  }
  if (value === false) return <span className="text-zinc-400">No</span>;
  return <span className="text-zinc-700">{value}</span>;
}

const MOCK_INVOICES = [
  { client: "Lighthouse Media", number: "INV-1048", amount: "$3,667.30", status: "Draft" },
  { client: "Bluebird Cafe", number: "INV-1046", amount: "$1,302.00", status: "Viewed" },
  { client: "Harbor & Lane", number: "INV-1045", amount: "$1,898.75", status: "Overdue" },
  { client: "Olive & Co.", number: "INV-1047", amount: "$4,557.00", status: "Paid" },
  { client: "Meridian Health", number: "INV-1044", amount: "$3,255.00", status: "Sent" },
] as const;

const STATUS_STYLE: Record<(typeof MOCK_INVOICES)[number]["status"], string> = {
  Draft: "bg-zinc-100 text-zinc-600",
  Sent: "bg-sky-50 text-sky-700",
  Viewed: "bg-amber-50 text-amber-700",
  Overdue: "bg-red-50 text-red-600",
  Paid: "bg-emerald-50 text-emerald-700",
};

/**
 * Hero product shot, built in HTML rather than a screenshot so it stays crisp
 * at any size and costs nothing on LCP. Mirrors the app's invoice list.
 */
function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]" aria-label="Invoiceflint app showing invoice statuses and a notification that a client viewed an invoice" role="img">
      <div className="relative mx-auto w-[292px] rounded-[46px] bg-ink p-3 shadow-[0_40px_90px_-25px_rgba(10,23,41,0.5)] ring-1 ring-black/5 sm:w-[316px]">
        <div className="relative overflow-hidden rounded-[36px] bg-[#f4f2f1] px-4 pb-6 pt-11">
          <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
          <p className="text-[11px] font-medium text-zinc-500">Lumen Studio ▾</p>
          <p className="mt-1 font-serif text-[26px] font-bold leading-tight text-ink">Invoices</p>

          <div className="mt-3 rounded-2xl bg-rust px-4 py-3.5 text-white">
            <p className="text-[11px] opacity-80">Paid this month</p>
            <p className="font-serif text-[26px] font-bold leading-tight">$4,770.00</p>
          </div>

          <div className="mt-3 flex gap-1 rounded-xl bg-white p-1 text-[11px] font-medium text-zinc-500">
            <span className="flex-1 rounded-lg bg-paper py-1 text-center text-ink">All 7</span>
            <span className="flex-1 py-1 text-center">Unpaid 4</span>
            <span className="flex-1 py-1 text-center">Paid 3</span>
          </div>

          <ul className="mt-3 space-y-2">
            {MOCK_INVOICES.map((inv) => (
              <li key={inv.number} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">{inv.client}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-zinc-400">
                    <span className={`rounded px-1.5 py-px font-medium ${STATUS_STYLE[inv.status]}`}>{inv.status}</span>
                    {inv.number}
                  </p>
                </div>
                <p className="text-[13px] font-semibold tabular-nums text-ink">{inv.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notification toast */}
      <div className="absolute -top-7 left-0 w-[248px] rounded-2xl bg-white/95 p-3 shadow-[0_20px_50px_-15px_rgba(10,23,41,0.35)] ring-1 ring-black/5 backdrop-blur motion-safe:animate-toast sm:-left-4">
        <div className="flex items-start gap-2.5">
          <Image src="/icon-192.png" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" unoptimized />
          <div className="min-w-0 text-left">
            <p className="flex items-center justify-between gap-2 text-[12px] font-semibold text-ink">
              Invoice INV-1046 viewed <span className="font-normal text-zinc-400">now</span>
            </p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-zinc-500">Bluebird Cafe just opened your invoice.</p>
          </div>
        </div>
      </div>

      {/* Paid chip */}
      <div className="absolute -bottom-5 right-0 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_20px_50px_-15px_rgba(10,23,41,0.35)] ring-1 ring-black/5 motion-safe:animate-toast [animation-delay:900ms] sm:-right-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
        <span className="text-[13px] font-semibold text-ink">Paid · $4,557.00</span>
      </div>
    </div>
  );
}
