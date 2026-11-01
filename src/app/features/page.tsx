import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import StoreBadges from "@/components/StoreBadges";
import FeatureIcon from "@/components/FeatureIcon";
import { FEATURES, LANGUAGES } from "@/lib/product";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description: "Everything Invoiceflint does: create invoices and estimates on your phone, send them by email or WhatsApp, see when clients open them, and track payments.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Everything you need to invoice and get paid
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          Invoiceflint gives freelancers and small businesses a fast, mobile-first
          way to send professional invoices and estimates — and, crucially, to see
          what happens after you hit send.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f.id} id={f.id} className="scroll-mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust-soft text-rust">
                <FeatureIcon id={f.id} />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-ink">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-zinc-600">
          Invoiceflint runs on iPhone, iPad, and Android, works offline, and is available
          in {LANGUAGES.join(", ")}. Some features are part of{" "}
          <Link href="/pricing" className="font-medium text-rust hover:underline">
            Invoiceflint Pro
          </Link>
          , which starts with a free trial.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <StoreBadges />
          <Link href="/guides" className="text-sm font-medium text-rust hover:underline">
            Read the guides →
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
