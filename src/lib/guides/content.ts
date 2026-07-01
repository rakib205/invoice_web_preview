/**
 * Long-form guide content for informational SEO and AI/LLM citation.
 *
 * Guides are authored here as structured blocks (no MDX/build-config needed).
 * `src/app/guides/[slug]/page.tsx` renders them and emits Article + Breadcrumb
 * JSON-LD; `sitemap.ts` maps over `GUIDES` so new entries index automatically.
 *
 * Dates are ISO (YYYY-MM-DD) so they can feed schema.org datePublished/Modified.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Guide = {
  slug: string;
  title: string;
  /** Meta description + card summary; keep under ~155 chars. */
  description: string;
  datePublished: string;
  dateModified: string;
  body: Block[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-invoice-a-client",
    title: "How to Invoice a Client: A Step-by-Step Guide",
    description:
      "Learn how to invoice a client the right way — what to include, how to send it, and how to follow up so you get paid on time.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    body: [
      {
        type: "p",
        text: "Sending a clear, professional invoice is the difference between getting paid on time and chasing a client for weeks. This guide walks through exactly what to put on an invoice, how to send it, and how to follow up — whether you use a template or an app like Invoiceflint.",
      },
      { type: "h2", text: "What every invoice should include" },
      {
        type: "p",
        text: "A complete invoice removes any ambiguity about who owes what, and by when. At a minimum, include the following:",
      },
      {
        type: "ul",
        items: [
          "Your business name and contact details (and logo, if you have one).",
          "The client's name and billing details.",
          "A unique invoice number so both sides can reference it later.",
          "The invoice date and a clear due date (for example, 'Net 15' or 'Due July 1').",
          "An itemized list of work or products, with quantity, rate, and line total.",
          "Subtotal, any tax, and the final total amount due.",
          "Accepted payment methods and instructions.",
        ],
      },
      { type: "h2", text: "Step by step: from work done to money in the bank" },
      {
        type: "ol",
        items: [
          "List each item of work or product with a short, specific description.",
          "Set the quantity and rate for each line so the totals calculate correctly.",
          "Add any applicable tax and confirm the grand total.",
          "Set clear payment terms — a specific due date gets paid faster than 'due on receipt'.",
          "Send the invoice as soon as the work is delivered, while it's still fresh.",
          "Track whether the client has opened it, and follow up politely if the due date passes.",
        ],
      },
      { type: "h2", text: "How to get paid faster" },
      {
        type: "p",
        text: "The two biggest levers are speed and visibility. Invoice immediately after delivering work, and use a tool that tells you the moment a client views the invoice — so a follow-up is a gentle reminder, not a guess. Invoiceflint sends invoices from your phone and shows a live read receipt and payment status (Draft → Sent → Viewed → Paid) so you always know where you stand.",
      },
      {
        type: "p",
        text: "If a client hasn't paid by the due date, send a short, friendly reminder that references the invoice number and the amount. Most late payments are simple oversights, not refusals.",
      },
    ],
  },
  {
    slug: "estimate-vs-invoice",
    title: "Estimate vs. Invoice: What's the Difference?",
    description:
      "Estimates and invoices look similar but do different jobs. Here's when to send each one — and how to turn an approved estimate into an invoice.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    body: [
      {
        type: "p",
        text: "Estimates and invoices are often confused because they contain similar information. The difference is timing and intent: an estimate is a proposal before work begins, and an invoice is a request for payment after work is agreed or delivered.",
      },
      { type: "h2", text: "What is an estimate?" },
      {
        type: "p",
        text: "An estimate (sometimes called a quote) is a non-binding document you send before starting a job. It tells the client what you expect the work to cost so they can approve it. Estimates typically include the scope of work, itemized costs, and an expiry date. No payment is due from an estimate.",
      },
      { type: "h2", text: "What is an invoice?" },
      {
        type: "p",
        text: "An invoice is a formal request for payment. You send it once work is agreed or completed. It includes a due date, payment terms, and a total amount owed. Unlike an estimate, an invoice creates an expectation of payment and is used for your accounting records.",
      },
      { type: "h2", text: "When to send each" },
      {
        type: "ul",
        items: [
          "Send an estimate when a client asks 'how much will this cost?' before committing.",
          "Send an invoice once the estimate is approved, or once the work is delivered.",
          "For long projects, you might send an estimate first, then invoice in stages (deposit, milestone, final).",
        ],
      },
      { type: "h2", text: "Turning an estimate into an invoice" },
      {
        type: "p",
        text: "Re-typing an approved estimate into a new invoice wastes time and invites errors. In Invoiceflint you can convert an approved estimate into an invoice with one tap — the line items, client, and totals carry over, so you only change what's different.",
      },
    ],
  },
  {
    slug: "get-paid-faster-as-a-freelancer",
    title: "How to Get Paid Faster as a Freelancer",
    description:
      "Practical, proven ways freelancers can shorten payment times — from clear terms to read receipts and timely follow-ups.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    body: [
      {
        type: "p",
        text: "Late payments are one of the most common frustrations for freelancers and small businesses. The good news: most of the delay is fixable with a few habits and the right tools. Here's how to shorten the gap between finishing work and getting paid.",
      },
      { type: "h2", text: "1. Invoice immediately" },
      {
        type: "p",
        text: "The longer you wait to send an invoice, the longer you wait to get paid — and the less fresh the work is in your client's mind. Send the invoice the same day you deliver. Sending from your phone means you can invoice on the spot instead of waiting until you're back at a desk.",
      },
      { type: "h2", text: "2. Set specific, short payment terms" },
      {
        type: "p",
        text: "'Due on receipt' is vague. A concrete due date like 'Due July 1' or 'Net 7' gives the client a clear deadline and gives you a clear point to follow up. Shorter terms generally get paid sooner.",
      },
      { type: "h2", text: "3. Know when your invoice was opened" },
      {
        type: "p",
        text: "One of the most stressful parts of freelancing is not knowing whether a client even saw your invoice. A read receipt removes the guesswork — if it's been viewed but not paid, a reminder is appropriate; if it hasn't been opened, it may have gone to spam. Invoiceflint shows the exact moment a client opens your invoice.",
      },
      { type: "h2", text: "4. Follow up without friction" },
      {
        type: "ul",
        items: [
          "Reference the invoice number and amount so there's no ambiguity.",
          "Keep the tone friendly — most late payments are oversights.",
          "Track payment status so you only chase invoices that are actually overdue.",
        ],
      },
    ],
  },
  {
    slug: "free-invoice-template-vs-app",
    title: "Free Invoice Template vs. an Invoice App: Which Should You Use?",
    description:
      "A free invoice template is fine to start, but an invoice app saves time and shows when clients pay. Here's how to choose.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    body: [
      {
        type: "p",
        text: "If you send only the occasional invoice, a free template in a word processor or spreadsheet can work. But as invoicing becomes a regular part of your business, the manual work and blind spots add up. Here's an honest comparison to help you choose.",
      },
      { type: "h2", text: "Where free templates work" },
      {
        type: "ul",
        items: [
          "You send only a handful of invoices a year.",
          "You're comfortable formatting and calculating totals by hand.",
          "You don't need to know when a client opens or pays an invoice.",
        ],
      },
      { type: "h2", text: "Where templates fall short" },
      {
        type: "ul",
        items: [
          "No automatic invoice numbering, so it's easy to duplicate or lose track.",
          "Manual math means rounding and tax mistakes creep in.",
          "No visibility — you can't tell whether an invoice was received, opened, or ignored.",
          "Turning an estimate into an invoice means retyping everything.",
        ],
      },
      { type: "h2", text: "What an invoice app adds" },
      {
        type: "p",
        text: "A dedicated app handles numbering, calculations, and tax automatically, and — crucially — shows you what happens after you hit send. Invoiceflint is free on iOS and Android: you create and send professional invoices and estimates from your phone, see the moment a client views an invoice, track status from Draft to Paid, and convert an approved estimate into an invoice with one tap.",
      },
      {
        type: "p",
        text: "The rule of thumb: use a template if invoicing is rare and you don't care about tracking. Use an app once invoicing is routine, or the first time you find yourself wondering whether a client actually saw your invoice.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
