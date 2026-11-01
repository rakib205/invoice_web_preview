import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import StoreBadges from "@/components/StoreBadges";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { COMPETITORS, getCompetitor } from "@/lib/compare/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webPageLd, breadcrumbLd, faqLd, softwareApplicationLd } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  const url = `/compare/${c.slug}`;
  return pageMetadata({ title: c.metaTitle, description: c.description, path: url, type: "article", published: c.checked, ownImage: true });

}

const checkedLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const url = `${SITE_URL}/compare/${c.slug}`;
  const others = COMPETITORS.filter((o) => o.slug !== c.slug);
  const jsonLd = graph(
    webPageLd({ url, name: c.metaTitle, description: c.description, dateModified: c.checked }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Compare", url: `${SITE_URL}/compare` },
      { name: `Invoiceflint vs. ${c.name}`, url },
    ]),
    softwareApplicationLd(),
    faqLd(c.faqs),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/compare", label: "Compare" }, { label: `vs. ${c.name}` }]}
        eyebrow={`${c.name} alternative`}
        title={`Invoiceflint vs. ${c.name}`}
        width="5xl"
      >
        <p>{c.summary}</p>
        <p className="mt-4 text-sm text-zinc-500">
          {c.name} details checked {checkedLabel(c.checked)} from{" "}
          <a href={c.source.url} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-ink">
            {c.source.label}
          </a>
          . Plans and prices change — check their site for the latest.
        </p>
      </PageHero>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
        <h2 className="sr-only">At a glance</h2>
        {/* A grid with table roles, so on phones the feature name can sit above the two answers. */}
        <div role="table" aria-label={`Invoiceflint vs. ${c.name}`} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white text-sm">
          <div role="row" className="grid grid-cols-2 border-b border-zinc-200 sm:grid-cols-[22%_1fr_1fr]">
            <span role="columnheader" className="hidden px-5 py-4 sm:block" />
            <span role="columnheader" className="bg-rust-soft px-4 py-3 font-semibold text-rust sm:px-5 sm:py-4">Invoiceflint</span>
            <span role="columnheader" className="px-4 py-3 font-semibold text-ink sm:px-5 sm:py-4">{c.name}</span>
          </div>
          {c.rows.map((r) => (
            <div key={r.label} role="row" className="grid grid-cols-2 border-b border-zinc-100 last:border-0 sm:grid-cols-[22%_1fr_1fr]">
              <span role="rowheader" className="col-span-2 px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:col-span-1 sm:px-5 sm:py-4 sm:text-sm sm:normal-case sm:tracking-normal sm:text-ink">
                {r.label}
              </span>
              <span role="cell" className="bg-rust-soft/50 px-4 py-3 text-zinc-700 sm:px-5 sm:py-4">{r.us}</span>
              <span role="cell" className="px-4 py-3 text-zinc-700 sm:px-5 sm:py-4">{r.them}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-4 pb-16 sm:px-6 md:grid-cols-2">
        <div className="rounded-3xl bg-ink p-7 text-white">
          <h2 className="text-xl font-semibold">Choose Invoiceflint if…</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-200">
            {c.chooseUs.map((x) => (
              <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rust" />{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-7">
          <h2 className="text-xl font-semibold text-ink">Choose {c.name} if…</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-700">
            {c.chooseThem.map((x) => (
              <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-zinc-400" />{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Key differences</h2>
        <div className="mt-8 space-y-8">
          {c.differences.map((d) => (
            <div key={d.title}>
              <h3 className="text-lg font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-700">{d.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
          <p className="font-semibold text-ink">Try Invoiceflint free</p>
          <p className="mt-1 text-sm text-zinc-600">Free to download for iPhone and Android. Pro starts with a free trial.</p>
          <StoreBadges className="mt-4" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Questions</h2>
        <div className="mt-8">
          <FaqList items={c.faqs} />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-zinc-400">
          {c.name} is a trademark of its owner. Invoiceflint is not affiliated with or endorsed by {c.name}.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-semibold text-ink">Other comparisons</h2>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/compare/${o.slug}`} className="block rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust">
                Invoiceflint vs. {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Invoices that tell you when they're opened" body="Create, send, and track invoices and estimates from your phone. Free to download." />
    </SiteShell>
  );
}
