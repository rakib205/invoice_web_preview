import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import {
  TRADES,
  audienceOf,
  getTrade,
  invoiceNameWithArticle,
  templateName,
  type Trade,
} from "@/lib/trades/content";
import { tradeDraft } from "@/lib/generator/draft";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webAppLd, breadcrumbLd, faqLd, type FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t.slug }));
}

function meta(trade: Trade) {
  return {
    title: `${templateName(trade)} (Free, Editable PDF)`,
    description: `Free ${trade.invoiceName} template you can edit online. Change the example items and prices, add your logo, and download a PDF — no sign-up needed.`,
  };
}

function templateFaqs(trade: Trade): FaqItem[] {
  return [
    {
      question: `Is this ${trade.invoiceName} template free?`,
      answer: `Yes. Edit the template in your browser and download it as a PDF as often as you like. There's no sign-up, and your details stay in your browser.`,
    },
    {
      question: "Can I change the items and add my logo?",
      answer: `Yes. Every field is editable: replace the example ${audienceOf(trade)} line items with your own, add or remove lines, set your tax rate, and upload your logo.`,
    },
    {
      question: `How do I send ${invoiceNameWithArticle(trade)}?`,
      answer: `Download the PDF and email it to your client. To send it as a link by email or WhatsApp, know when your client opens it, and send reminders, use the free Invoiceflint app for iPhone and Android.`,
    },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade) return {};
  const { title, description } = meta(trade);
  const url = `/invoice-templates/${trade.slug}`;
  return pageMetadata({ title, description, path: url, ownImage: true });

}

export default async function TemplatePage({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade) notFound();

  const url = `${SITE_URL}/invoice-templates/${trade.slug}`;
  const name = templateName(trade);
  const { description } = meta(trade);
  const faqs = templateFaqs(trade);
  const others = TRADES.filter((t) => t.slug !== trade.slug);

  const jsonLd = graph(
    webAppLd({ url, name, description }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Invoice templates", url: `${SITE_URL}/invoice-templates` },
      { name, url },
    ]),
    faqLd(faqs),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/invoice-templates", label: "Invoice templates" }, { label: trade.label }]}
        eyebrow="Free · Editable · PDF"
        title={`${name}`}
      >
        <p>
          A free {trade.invoiceName} template, filled in with an example job so you can see what goes
          where. Change the items, prices, and details to your own, then download it as a PDF.
        </p>
      </PageHero>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <InvoiceGenerator initial={tradeDraft(trade)} storageKey={`invoiceflint:template:${trade.slug}`} />
      </section>

      <section className="border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">
              What goes on {invoiceNameWithArticle(trade)}
            </h2>
            <ul className="mt-6 space-y-3">
              {trade.include.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rust" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-3xl bg-paper p-8">
            <h2 className="text-xl font-semibold text-ink">Billing advice for {audienceOf(trade)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Pricing tips, common questions, and how to send {trade.invoiceName}s from your phone and
              know when the client has opened them.
            </p>
            <Link href={`/invoice-app/${trade.slug}`} className="mt-5 inline-block text-sm font-semibold text-rust hover:underline">
              Invoice app for {audienceOf(trade)} →
            </Link>
          </div>
        </div>
      </section>

      {trade.templateDetail && (
        <section className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Typical line items on {invoiceNameWithArticle(trade)}
          </h2>
          <ul className="mt-6 space-y-3">
            {trade.templateDetail.lineItems.map((l) => (
              <li key={l.item} className="text-sm leading-relaxed text-zinc-700 sm:text-base">
                <strong className="font-semibold text-ink">{l.item}.</strong> {l.note}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink">What {audienceOf(trade)} typically charge</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
            {trade.templateDetail.rates.summary} (As of {trade.templateDetail.rates.asOf}. Source:{" "}
            <a href={trade.templateDetail.rates.source.url} rel="noopener noreferrer" className="font-semibold text-rust hover:underline">
              {trade.templateDetail.rates.source.label}
            </a>
            .)
          </p>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink">Make these obvious on the invoice</h2>
          <ul className="mt-4 space-y-3">
            {trade.templateDetail.mustShow.map((m) => (
              <li key={m} className="flex gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rust" />
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Questions</h2>
        <div className="mt-8">
          <FaqList items={faqs} openCount={1} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-xl font-semibold text-ink">More invoice templates</h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          <li>
            <Link href="/invoice-generator" className="block rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust">
              Blank invoice
            </Link>
          </li>
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/invoice-templates/${t.slug}`}
                className="block rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title={`Send ${trade.invoiceName}s from your phone`}
        body="Invoiceflint sends a link by email or WhatsApp and tells you the moment your client opens it."
      />
    </SiteShell>
  );
}
