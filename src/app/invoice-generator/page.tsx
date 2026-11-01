import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { blankDraft } from "@/lib/generator/draft";
import { TRADES, templateName } from "@/lib/trades/content";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webAppLd, breadcrumbLd, faqLd, type FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Free Invoice Generator: Make a PDF Invoice Online";
const DESCRIPTION =
  "Create a professional invoice online for free. Add your logo, items, and tax, then download a PDF. No sign-up, no watermark, and nothing is uploaded.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/invoice-generator",
  languages: { en: "/invoice-generator", es: "/es/generador-de-facturas", "x-default": "/invoice-generator" },
});

const FAQS: FaqItem[] = [
  {
    question: "Is this invoice generator really free?",
    answer:
      "Yes. You can create and download as many invoices as you like, with your own logo, for free. There's no sign-up and no watermark — just a small line at the bottom of the PDF saying it was made with Invoiceflint.",
  },
  {
    question: "Is my invoice data saved or uploaded anywhere?",
    answer:
      "No. Everything happens in your browser: the PDF is created on your device and your draft is saved only in this browser's local storage, so it's there when you come back. Clearing your browser data removes it.",
  },
  {
    question: "Can I make an estimate, quote, or receipt instead?",
    answer:
      "Yes. Change the title to Estimate, Quote, or Receipt and the PDF will use it. For estimates clients can accept online, use the Invoiceflint app.",
  },
  {
    question: "Can I charge tax on only some items?",
    answer:
      "Yes. Set a tax name and rate, then untick the Tax box on any line that shouldn't be taxed — for example, labor in places where only materials are taxable.",
  },
  {
    question: "How do I send the invoice to my client?",
    answer:
      "Download the PDF and attach it to an email or message. If you'd like to send a link instead, see when your client opens it, and send automatic reminders, use the free Invoiceflint app for iPhone and Android.",
  },
  {
    question: "Which currencies are supported?",
    answer:
      "Twenty common currencies, including US dollars, euros, pounds, Canadian and Australian dollars, pesos, rand, naira, and rupees. Amounts are formatted for the currency you pick.",
  },
];

export default function InvoiceGeneratorPage() {
  const url = `${SITE_URL}/invoice-generator`;
  const jsonLd = graph(
    webAppLd({ url, name: "Invoiceflint Free Invoice Generator", description: DESCRIPTION }),
    breadcrumbLd([
      { name: "Home", url: SITE_URL },
      { name: "Free tools", url: `${SITE_URL}/tools` },
      { name: "Invoice generator", url },
    ]),
    faqLd(FAQS),
  );

  return (
    <SiteShell>
      <script {...jsonLdScript(jsonLd)} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/tools", label: "Free tools" }, { label: "Invoice generator" }]}
        eyebrow="Free · No sign-up · No watermark"
        title="Free invoice generator"
      >
        <p>
          Fill in your details and download a professional PDF invoice in a couple of minutes.
          Your invoice stays in your browser — nothing is uploaded.
        </p>
      </PageHero>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <InvoiceGenerator initial={blankDraft("en")} storageKey="invoiceflint:generator" />
      </section>

      <section className="border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">How to make an invoice</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Add your business and your client", "Your name or business name, contact details, and tax ID if you're registered — then who you're billing."],
                ["List what you're charging for", "One line per service or product, with quantity and rate. Totals and tax are calculated for you."],
                ["Set the dates and terms", "Use a unique invoice number, today's date, and a specific due date. Add payment instructions in the notes."],
                ["Download and send", "Download the PDF and email it to your client, or print it."],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-rust text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-zinc-600">
              More detail in{" "}
              <Link href="/guides/how-to-invoice-a-client" className="font-medium text-rust hover:underline">how to invoice a client</Link>{" "}
              and{" "}
              <Link href="/guides/how-to-number-invoices" className="font-medium text-rust hover:underline">how to number invoices</Link>.
            </p>
          </div>

          <div className="rounded-3xl bg-paper p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Invoicing often? Use the app</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              A PDF is fine once in a while. Invoiceflint for iPhone and Android does the rest of the job:
            </p>
            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-zinc-400">
                  <th className="pb-2 font-semibold" />
                  <th className="pb-2 text-center font-semibold">This page</th>
                  <th className="pb-2 text-center font-semibold">App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {[
                  ["PDF with your logo", true, true],
                  ["Send by link, email, or WhatsApp", false, true],
                  ["Know when the client opens it", false, true],
                  ["Estimates clients accept online", false, true],
                  ["Paid and overdue tracking", false, true],
                  ["Automatic payment reminders", false, "Pro"],
                ].map(([label, web, app]) => (
                  <tr key={String(label)}>
                    <td className="py-2.5 pr-3 text-zinc-700">{label}</td>
                    <td className="py-2.5 text-center">{web === true ? "✓" : <span className="text-zinc-300">—</span>}</td>
                    <td className="py-2.5 text-center font-medium text-rust">{app === true ? "✓" : app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/#download" className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90">
              Get the free app
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Invoice templates by trade</h2>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Start from an example invoice for your line of work — the items are filled in, so you only change the prices and details.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {TRADES.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/invoice-templates/${t.slug}`}
                className="block rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-rust-line hover:text-rust"
              >
                {templateName(t)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Questions</h2>
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </section>

      <CtaBand
        title="Send invoices from your phone"
        body="Invoiceflint sends a link by email or WhatsApp and tells you the moment your client opens it. Free to download."
      />
    </SiteShell>
  );
}
