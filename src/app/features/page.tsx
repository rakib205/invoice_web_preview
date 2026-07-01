import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything Invoiceflint does: create invoices and estimates from your phone, live read receipts, payment status tracking, and one-tap estimate-to-invoice conversion.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features — Invoiceflint",
    description:
      "Create invoices and estimates from your phone, see when clients open them, and track payment status from Draft to Paid.",
    url: "/features",
    type: "website",
  },
};

const RUST = "#b8412a";

const FEATURES = [
  {
    title: "Create invoices and estimates from your phone",
    body: "Build professional invoices and estimates from a clean, mobile-first form. Add line items, quantities, rates, and tax — Invoiceflint handles the math and formatting so every document looks polished.",
  },
  {
    title: "Live read receipts",
    body: "See the exact moment a client opens your invoice. No more wondering whether it landed — a read receipt tells you when to follow up and when to sit tight.",
  },
  {
    title: "Payment status tracking",
    body: "Every invoice moves through clear stages: Draft → Sent → Viewed → Paid. A glance tells you which invoices are outstanding and which are done.",
  },
  {
    title: "Estimates that become invoices in one tap",
    body: "Send an estimate to win the job. When the client approves it, convert it into an invoice with a single tap — line items, client details, and totals carry over automatically.",
  },
  {
    title: "Share a secure link — no app required for clients",
    body: "Clients open your invoice or estimate through a secure link in any web browser. They can view, download a PDF, or respond to an estimate without installing anything or creating an account.",
  },
  {
    title: "Works on iPhone and Android",
    body: "Invoiceflint is available on the Apple App Store and Google Play, so you can invoice from whichever phone you carry.",
  },
];

export default function FeaturesPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Everything you need to invoice and get paid
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          Invoiceflint gives freelancers and small businesses a fast, mobile-first
          way to send professional invoices and estimates — and, crucially, to see
          what happens after you hit send.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <section
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold text-[#0a1729]">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: RUST }}
          >
            Download on the App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-[#0a1729] hover:bg-zinc-50"
          >
            Get it on Google Play
          </a>
          <Link
            href="/guides"
            className="text-sm font-medium text-[#b8412a] hover:underline"
          >
            Read the guides →
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
