import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { GUIDES } from "@/lib/guides/content";
import { TRADES, audienceOf } from "@/lib/trades/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Invoicing Guides",
  description: "Free guides on invoicing, estimates, payment terms, deposits, late fees, and getting paid faster — for freelancers, contractors, and small businesses.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Invoicing guides
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          Straightforward, practical advice on invoicing, estimates, and getting
          paid — written for freelancers, contractors, and small business owners.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-sm"
              >
                <h2 className="text-lg font-semibold text-ink">
                  {guide.title}
                </h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-zinc-600">
                  {guide.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-rust">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Invoicing for your trade</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {TRADES.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/invoice-app/${t.slug}`}
                  className="block rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust"
                >
                  Invoice app for {audienceOf(t)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteShell>
  );
}
