import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { TOOLS } from "@/components/ToolPage";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webPageLd, breadcrumbLd, itemListLd } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Free Invoicing Tools: Generator, Templates & Calculators";
const DESCRIPTION =
  "Free tools for freelancers and small businesses: an online invoice generator, editable invoice templates, and late fee, markup, and due date calculators.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tools",
});

export default function ToolsHub() {
  const url = `${SITE_URL}/tools`;
  const jsonLd = graph(
    webPageLd({ url, name: TITLE, description: DESCRIPTION }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Free tools", url },
    ]),
    itemListLd(TOOLS.map((t) => ({ name: t.name, url: `${SITE_URL}${t.href}` }))),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero crumbs={[{ href: "/", label: "Home" }, { label: "Free tools" }]} eyebrow="Free · No sign-up" title="Free invoicing tools">
        <p>Make an invoice, price a job, and work out due dates and late fees — free, in your browser.</p>
      </PageHero>
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <li key={t.href} className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <Link
                href={t.href}
                className={`flex h-full flex-col rounded-2xl p-6 transition ${
                  i === 0 ? "bg-ink text-white hover:bg-ink/95" : "border border-zinc-200 bg-white hover:border-rust-line hover:shadow-sm"
                }`}
              >
                <h2 className={`text-lg font-semibold ${i === 0 ? "text-white" : "text-ink"}`}>{t.name}</h2>
                <p className={`mt-2 flex-1 text-sm leading-relaxed ${i === 0 ? "text-zinc-300" : "text-zinc-600"}`}>{t.body}</p>
                <span className={`mt-4 text-sm font-semibold ${i === 0 ? "text-white" : "text-rust"}`}>Open →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand
        title="All of this, built into one app"
        body="Invoiceflint handles totals, tax, due dates, and reminders, and tells you when clients open your invoices."
      />
    </SiteShell>
  );
}
