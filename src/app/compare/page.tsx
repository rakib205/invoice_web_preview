import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { COMPETITORS } from "@/lib/compare/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webPageLd, breadcrumbLd, itemListLd } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Invoiceflint Alternatives and Comparisons";
const DESCRIPTION =
  "How Invoiceflint compares with Invoice Simple, Joist, Invoice2go, and Zoho Invoice — plans, limits, payments, and who each app suits best.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/compare",
});

export default function CompareHub() {
  const url = `${SITE_URL}/compare`;
  const jsonLd = graph(
    webPageLd({ url, name: TITLE, description: DESCRIPTION }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Compare", url },
    ]),
    itemListLd(COMPETITORS.map((c) => ({ name: `Invoiceflint vs. ${c.name}`, url: `${url}/${c.slug}` }))),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero crumbs={[{ href: "/", label: "Home" }, { label: "Compare" }]} eyebrow="Honest comparisons" title="How Invoiceflint compares" width="5xl">
        <p>
          Side-by-side comparisons with popular invoice apps, including where the other app is the
          better choice. Competitor details come from their own pricing pages and app listings.
        </p>
      </PageHero>
      <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COMPETITORS.map((c) => (
            <li key={c.slug}>
              <Link href={`/compare/${c.slug}`} className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-rust-line hover:shadow-sm">
                <h2 className="text-lg font-semibold text-ink">Invoiceflint vs. {c.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{c.summary}</p>
                <span className="mt-4 text-sm font-medium text-rust">Read the comparison →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="See for yourself" body="Invoiceflint is free to download for iPhone and Android. Pro starts with a free trial." />
    </SiteShell>
  );
}
