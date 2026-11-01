import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import CtaBand from "@/components/CtaBand";
import { TRADES, TRADE_GROUPS, audienceOf } from "@/lib/trades/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webPageLd, breadcrumbLd, itemListLd } from "@/lib/jsonLd";

const TITLE = "Invoice App for Trades, Contractors & Freelancers";
const DESCRIPTION =
  "Invoice and estimate app for plumbers, electricians, contractors, mechanics, cleaners, movers, tutors, caterers, designers, and freelancers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/invoice-app" },
  openGraph: {
    title: `${TITLE} — Invoiceflint`,
    description: DESCRIPTION,
    url: "/invoice-app",
    type: "website",
  },
};

export default function TradesHubPage() {
  const url = `${SITE_URL}/invoice-app`;
  const jsonLd = graph(
    webPageLd({ url, name: TITLE, description: DESCRIPTION }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Invoice app by trade", url },
    ]),
    itemListLd(
      TRADES.map((t) => ({
        name: `Invoice app for ${audienceOf(t)}`,
        url: `${SITE_URL}/invoice-app/${t.slug}`,
      })),
    ),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance text-ink sm:text-5xl">
            An invoice app built for the way you work
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Every trade bills differently — call-out fees and parts, progress payments,
            retainers, day rates. Pick yours for an example invoice, what to put on it, and
            billing tips from the field.
          </p>
        </div>

        {TRADE_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="mt-14">
            <h2 id={`group-${group.id}`} className="text-xl font-semibold tracking-tight text-ink">
              {group.title}
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRADES.filter((t) => t.group === group.id).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/invoice-app/${t.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-rust-line hover:shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-ink">Invoice app for {audienceOf(t)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{t.description}</p>
                    <span className="mt-4 text-sm font-medium text-rust">See how it works →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-10 text-center text-sm text-zinc-500">
          Don&rsquo;t see your trade? Invoiceflint works for any business that sends invoices or
          estimates.{" "}
          <Link href="/features" className="font-medium text-rust hover:underline">
            See all features
          </Link>
          .
        </p>
      </section>

      <CtaBand
        title="Invoice from the job, not the desk."
        body="Download Invoiceflint for iPhone or Android and send your first invoice in under a minute."
      />
    </SiteShell>
  );
}
