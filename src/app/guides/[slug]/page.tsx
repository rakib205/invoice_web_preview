import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { GUIDES, getGuide, type Block } from "@/lib/guides/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, articleLd, breadcrumbLd } from "@/lib/jsonLd";

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

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <nav className="text-sm text-zinc-500">
          <Link href="/guides" className="hover:text-zinc-900">
            Guides
          </Link>{" "}
          <span aria-hidden>/</span>{" "}
          <span className="text-zinc-700">{guide.title}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
          {guide.description}
        </p>

        <div className="mt-10 space-y-6">
          {guide.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-base font-semibold text-[#0a1729]">
            Invoice from your phone with Invoiceflint
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
            Create, send, and track invoices and estimates — and see the moment a
            client opens them. Free on iOS and Android.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            <Link href="/features" className="text-[#b8412a] hover:underline">
              See the features →
            </Link>
            <Link href="/guides" className="text-[#b8412a] hover:underline">
              More guides →
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-4 text-xl font-semibold tracking-tight text-[#0a1729]">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="leading-relaxed text-zinc-700">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-zinc-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-zinc-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
  }
}
