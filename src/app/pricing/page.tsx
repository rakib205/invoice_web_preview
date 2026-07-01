import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Invoiceflint is free. Create, send, and track professional invoices and estimates from your phone on iOS and Android at no cost.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Invoiceflint",
    description:
      "Invoiceflint is free to download and use on iOS and Android. No subscription required to send invoices and estimates.",
    url: "/pricing",
    type: "website",
  },
};

const RUST = "#b8412a";

const INCLUDED = [
  "Create and send unlimited invoices and estimates",
  "Live read receipts — see when clients open your invoice",
  "Payment status tracking from Draft to Paid",
  "One-tap estimate-to-invoice conversion",
  "Secure client links — no app required for your clients",
  "iPhone and Android support",
];

export default function PricingPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Simple pricing: it&rsquo;s free
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          Invoiceflint is free to download and use on iOS and Android. You can
          create, send, and track professional invoices and estimates without a
          subscription. Get started in under a minute — no credit card required.
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold text-[#0a1729]">$0</span>
            <span className="text-zinc-500">/ forever</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Everything you need to invoice and get paid:
          </p>
          <ul className="mt-6 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: RUST }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
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
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          Want to see everything Invoiceflint can do? Explore the{" "}
          <Link href="/features" className="font-medium text-[#b8412a] hover:underline">
            full feature list
          </Link>
          .
        </p>
      </article>
    </SiteShell>
  );
}
