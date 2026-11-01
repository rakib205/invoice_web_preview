import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { TRADES, TRADE_GROUPS, templateName, sampleTotals } from "@/lib/trades/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webPageLd, breadcrumbLd, itemListLd } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Free Invoice Templates: Editable PDF Invoices by Trade";
const DESCRIPTION =
  "Free invoice templates for plumbers, electricians, contractors, cleaners, photographers, consultants, and more. Edit online and download as a PDF.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/invoice-templates",
});

export default function TemplatesHub() {
  const url = `${SITE_URL}/invoice-templates`;
  const jsonLd = graph(
    webPageLd({ url, name: TITLE, description: DESCRIPTION }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Invoice templates", url },
    ]),
    itemListLd(TRADES.map((t) => ({ name: templateName(t), url: `${url}/${t.slug}` }))),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero crumbs={[{ href: "/", label: "Home" }, { label: "Invoice templates" }]} eyebrow="Free · Editable · PDF" title="Free invoice templates">
        <p>
          Each template is filled in with a realistic example job — the right line items, units, and
          notes for that trade. Edit it in your browser and download a PDF, or{" "}
          <Link href="/invoice-generator" className="font-medium text-rust hover:underline">start from a blank invoice</Link>.
        </p>
      </PageHero>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        {TRADE_GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`tpl-${group.id}`} className="mt-10 first:mt-4">
            <h2 id={`tpl-${group.id}`} className="text-xl font-semibold tracking-tight text-ink">{group.title}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TRADES.filter((t) => t.group === group.id).map((t) => {
                const lines = t.sample.lines.filter((l) => l.rate > 0).slice(0, 3);
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/invoice-templates/${t.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-rust-line hover:shadow-sm"
                    >
                      <div className="rounded-xl bg-paper p-3.5 text-[11px] text-zinc-500">
                        <p className="font-semibold text-ink">{t.sample.business}</p>
                        <ul className="mt-2 space-y-1">
                          {lines.map((l) => (
                            <li key={l.description} className="truncate">{l.description}</li>
                          ))}
                        </ul>
                        <p className="mt-2 text-right font-semibold tabular-nums text-ink">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(sampleTotals(t.sample).total)}
                        </p>
                      </div>
                      <h3 className="mt-4 font-semibold text-ink group-hover:text-rust">{templateName(t)}</h3>
                      <span className="mt-1 text-sm text-zinc-500">Edit and download free →</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand
        title="Turn templates into a workflow"
        body="In the Invoiceflint app, save your items once and send invoices by link, email, or WhatsApp — then see when they're opened."
      />
    </SiteShell>
  );
}
