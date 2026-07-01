import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { GUIDES } from "@/lib/guides/content";

export const metadata: Metadata = {
  title: "Invoicing Guides",
  description:
    "Practical guides on invoicing, estimates, and getting paid faster — for freelancers, contractors, and small businesses.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Invoicing Guides — Invoiceflint",
    description:
      "How to invoice clients, the difference between estimates and invoices, and how to get paid faster.",
    url: "/guides",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Invoicing guides
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          Straightforward, practical advice on invoicing, estimates, and getting
          paid — written for freelancers, contractors, and small business owners.
        </p>

        <ul className="mt-10 space-y-4">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-sm"
              >
                <h2 className="text-lg font-semibold text-[#0a1729]">
                  {guide.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  {guide.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#b8412a]">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </SiteShell>
  );
}
