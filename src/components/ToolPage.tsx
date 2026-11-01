import Link from "next/link";
import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webAppLd, breadcrumbLd, faqLd, type FaqItem } from "@/lib/jsonLd";

export const TOOLS = [
  { href: "/invoice-generator", name: "Invoice generator", body: "Make a PDF invoice with your logo in a couple of minutes." },
  { href: "/invoice-templates", name: "Invoice templates", body: "Editable example invoices for 22 trades." },
  { href: "/tools/late-fee-calculator", name: "Late fee calculator", body: "Work out interest or a flat fee on an overdue invoice." },
  { href: "/tools/markup-calculator", name: "Markup and margin calculator", body: "Price materials and products, and convert markup to margin." },
  { href: "/tools/invoice-due-date-calculator", name: "Invoice due date calculator", body: "Find the due date for Net 30, Net 60, EOM, and other terms." },
];

/**
 * Layout for a calculator page: hero, the calculator, explanatory content,
 * FAQs, related guides, and other tools. Emits WebApplication, breadcrumb, and
 * FAQ structured data.
 */
export default function ToolPage({
  path,
  name,
  title,
  description,
  intro,
  calculator,
  children,
  faqs,
  guides,
}: {
  path: string;
  name: string;
  title: string;
  description: string;
  intro: ReactNode;
  calculator: ReactNode;
  children: ReactNode;
  faqs: FaqItem[];
  guides: Array<{ href: string; label: string }>;
}) {
  const url = `${SITE_URL}${path}`;
  const jsonLd = graph(
    webAppLd({ url, name: `Invoiceflint ${name}`, description }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Free tools", url: `${SITE_URL}/tools` },
      { name, url },
    ]),
    faqLd(faqs),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero crumbs={[{ href: "/", label: "Home" }, { href: "/tools", label: "Free tools" }, { label: name }]} eyebrow="Free calculator" title={title} width="5xl">
        {intro}
      </PageHero>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">{calculator}</section>

      <article className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-zinc-700 [&_table]:mt-6">
        {children}
      </article>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Questions</h2>
        <div className="mt-6">
          <FaqList items={faqs} openCount={1} />
        </div>
        <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Related guides</h2>
          <ul className="mt-3 space-y-2">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="font-medium text-rust hover:underline">
                  {g.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-semibold text-ink">More free tools</h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TOOLS.filter((t) => t.href !== path).map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="block h-full rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-rust-line">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="mt-1 text-sm text-zinc-600">{t.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Get paid without the math"
        body="Invoiceflint calculates totals and tax, tracks due dates, and sends payment reminders from your phone."
      />
    </SiteShell>
  );
}

/** Simple bordered table for the calculator pages' reference content. */
export function RefTable({ head, rows }: { head: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-paper text-xs uppercase tracking-wider text-zinc-500">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-ink" : "text-zinc-600"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
