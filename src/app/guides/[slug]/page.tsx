import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import StoreBadges from "@/components/StoreBadges";
import { GUIDES, getGuide, type Block } from "@/lib/guides/content";
import { TRADES, audienceOf, getTrade } from "@/lib/trades/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, articleLd, breadcrumbLd } from "@/lib/jsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${guide.title} — Invoiceflint`,
      description: guide.description,
      url,
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const jsonLd = graph(
    articleLd({
      url,
      headline: guide.title,
      description: guide.description,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
    }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Guides", url: `${SITE_URL}/guides` },
      { name: guide.title, url },
    ]),
  );

  const related = (guide.related ?? GUIDES.filter((g) => g.slug !== guide.slug).map((g) => g.slug))
    .map(getGuide)
    .filter((g) => g !== undefined)
    .slice(0, 3);
  const trades = (guide.trades ?? TRADES.slice(0, 3).map((t) => t.slug))
    .map(getTrade)
    .filter((t) => t !== undefined);

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/guides" className="hover:text-ink">Guides</Link></li>
          </ol>
        </nav>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-[2.6rem] sm:leading-tight">
          {guide.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {guide.description}
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          By the Invoiceflint team · Updated{" "}
          <time dateTime={guide.dateModified}>{dateFormat.format(new Date(guide.dateModified))}</time>
        </p>

        <div className="mt-10 space-y-6 border-t border-zinc-200 pt-10">
          {guide.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <aside className="mt-14 rounded-2xl bg-ink p-6 text-white sm:p-8">
          <p className="text-lg font-semibold">Invoice from your phone with Invoiceflint</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Create, send, and track invoices and estimates — and see the moment a client
            opens them. Free to download on iOS and Android.
          </p>
          <StoreBadges tone="light" className="mt-5" />
        </aside>

        {trades.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-ink">Invoicing for your trade</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {trades.map((t) => (
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
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-ink">Related guides</h2>
            <ul className="mt-4 space-y-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
                  >
                    <span className="font-semibold text-ink">{g.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-zinc-600">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </SiteShell>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-6 text-2xl font-semibold tracking-tight text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-lg font-semibold text-ink">{block.text}</h3>;
    case "p":
      return <p className="text-[17px] leading-relaxed text-zinc-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-[17px] text-zinc-700 marker:text-rust">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-[17px] text-zinc-700 marker:font-semibold marker:text-rust">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-paper">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-medium text-zinc-800">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3 text-zinc-600">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "template":
      return (
        <figure className="rounded-2xl border border-rust-line bg-rust-soft/60 p-5">
          <figcaption className="text-xs font-semibold uppercase tracking-wider text-rust">
            {block.label}
          </figcaption>
          <blockquote className="mt-2 whitespace-pre-line leading-relaxed text-zinc-800">
            {block.text}
          </blockquote>
        </figure>
      );
    case "tip":
      return (
        <p className="rounded-2xl border-l-4 border-rust bg-white p-5 leading-relaxed text-zinc-700">
          <strong className="text-ink">Tip: </strong>
          {block.text}
        </p>
      );
  }
}
