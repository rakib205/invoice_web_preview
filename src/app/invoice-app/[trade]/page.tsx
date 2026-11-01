import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import StoreBadges from "@/components/StoreBadges";
import FeatureIcon from "@/components/FeatureIcon";
import SampleInvoice from "@/components/SampleInvoice";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { TRADES, audienceOf, getTrade, invoiceNameWithArticle } from "@/lib/trades/content";
import { getGuide } from "@/lib/guides/content";
import { SITE_URL } from "@/lib/site";
import {
  graph,
  jsonLdScript,
  webPageLd,
  breadcrumbLd,
  faqLd,
  softwareApplicationLd,
} from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade) return {};

  const url = `/invoice-app/${trade.slug}`;
  return pageMetadata({ title: trade.metaTitle, description: trade.description, path: url, ownImage: true });

}

export default async function TradePage({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade) notFound();

  const url = `${SITE_URL}/invoice-app/${trade.slug}`;
  const audience = audienceOf(trade);
  const guides = trade.guides.map(getGuide).filter((g) => g !== undefined);
  const others = TRADES.filter((t) => t.slug !== trade.slug);

  const jsonLd = graph(
    webPageLd({
      url,
      name: trade.metaTitle,
      description: trade.description,
      dateModified: trade.dateModified,
    }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Invoice app by trade", url: `${SITE_URL}/invoice-app` },
      { name: `Invoice app for ${audience}`, url },
    ]),
    softwareApplicationLd(),
    faqLd(trade.faqs),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />

      {/* Hero */}
      <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184,65,42,0.14) 0%, rgba(184,65,42,0.05) 50%, transparent 80%)" }}
      />
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:pt-10">
        <nav aria-label="Breadcrumb" className="relative text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/invoice-app" className="hover:text-ink">By trade</Link></li>
            <li aria-hidden>/</li>
            <li className="text-zinc-700" aria-current="page">{trade.label}</li>
          </ol>
        </nav>

        <div className="relative mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-rust-line bg-rust-soft px-3 py-1 text-xs font-medium text-rust">
              <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              Invoice &amp; estimate app for {audience}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
              {trade.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">{trade.intro}</p>
            <StoreBadges className="mt-8" placement="hero" />
            <p className="mt-5 text-sm text-zinc-500">
              Free to download for iPhone and Android ·{" "}
              <Link href="/pricing" className="font-medium text-rust hover:underline">Pro free trial</Link>
            </p>
          </div>
          <div>
            <SampleInvoice trade={trade} />
            <p className="mt-3 text-center text-xs text-zinc-500">
              Example {trade.invoiceName} made with Invoiceflint ·{" "}
              <Link href={`/invoice-templates/${trade.slug}`} className="font-medium text-rust hover:underline">
                Use it as a free template
              </Link>
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* What to include */}
      <section className="border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
              What to include on {invoiceNameWithArticle(trade)}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              A complete invoice gets approved and paid faster. Invoiceflint fills in the
              numbering, dates, and totals for you — here&rsquo;s what else belongs on it.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {trade.include.map((item, i) => (
              <li key={item} className="flex gap-3 rounded-xl bg-paper p-4 text-sm leading-relaxed text-zinc-700">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rust text-xs font-semibold text-white">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            How Invoiceflint helps {audience}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Built for invoicing on the job, not at a desk.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trade.features.map((f) => (
            <li key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust-soft text-rust">
                <FeatureIcon id={f.id} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/features" className="text-sm font-semibold text-rust hover:underline">
            See every feature →
          </Link>
        </p>
      </section>

      {/* Billing tips */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="rounded-3xl bg-ink px-6 py-12 text-white sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Billing tips for {audience}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {trade.tips.map((tip) => (
              <div key={tip.title}>
                <h3 className="text-lg font-semibold">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6 sm:pb-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
          Invoicing questions from {audience}
        </h2>
        <div className="mt-10">
          <FaqList items={trade.faqs} />
        </div>
      </section>

      {/* Guides + other trades */}
      <section className="border-t border-zinc-200 bg-white py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Related guides</h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {guides.map((g) => (
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

          <h2 className="mt-16 text-xl font-semibold tracking-tight text-ink">Invoiceflint for other trades</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/invoice-app/${t.slug}`}
                  className="block rounded-full border border-zinc-200 bg-paper px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust"
                >
                  Invoice app for {audienceOf(t)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-20">
        <CtaBand
          title={`Send your next ${trade.invoiceName} from your phone.`}
          body="Download Invoiceflint for iPhone or Android and create your first invoice in under a minute."
        />
      </div>
    </SiteShell>
  );
}
