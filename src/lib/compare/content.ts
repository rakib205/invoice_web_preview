import type { FaqItem } from "@/lib/jsonLd";

/**
 * "Invoiceflint vs. X" comparison pages.
 *
 * Rules: every competitor fact must come from the competitor's own pricing page
 * or app store listing (`source`), and be re-checked when `checked` gets old.
 * When sources disagree, leave the fact out rather than guess. Be fair — say
 * plainly where the competitor is the better choice; that's what makes these
 * pages credible to readers and to AI answer engines.
 */

export type CompareRow = { label: string; us: string; them: string };

export type Competitor = {
  slug: string;
  name: string;
  metaTitle: string;
  description: string;
  summary: string;
  rows: CompareRow[];
  chooseUs: string[];
  chooseThem: string[];
  differences: Array<{ title: string; body: string }>;
  faqs: FaqItem[];
  source: { label: string; url: string };
  /** yyyy-mm-dd the competitor facts were last verified. */
  checked: string;
};

const US = {
  platforms: "iPhone, iPad, and Android",
  pricing: "Free to download. One Pro plan with unlimited sending; free trial, price shown in the app in your currency",
  payments: "Record payments as they arrive; no built-in card processing",
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "invoice-simple",
    name: "Invoice Simple",
    metaTitle: "Invoice Simple Alternative: Invoiceflint vs. Invoice Simple",
    description:
      "Comparing Invoiceflint and Invoice Simple: plans and invoice limits, read receipts, payments, and sending. An honest look at which invoice app fits you.",
    summary:
      "Invoice Simple and Invoiceflint are both mobile invoice apps with read receipts. Invoice Simple's plans are tiered by how many invoices you send each month and include online card payments; Invoiceflint has a single Pro plan with unlimited sending, sends by WhatsApp as well as email, and works offline — but doesn't process card payments.",
    rows: [
      { label: "Platforms", us: US.platforms, them: "iPhone, Android, and web" },
      { label: "Pricing", us: US.pricing, them: "Essentials $6.99/mo, Plus $14.99/mo, Premium $21.99/mo (US App Store); free trial" },
      { label: "Invoice limits", us: "Unlimited with Pro", them: "Essentials up to 3 invoices a month, Plus up to 10, Premium unlimited" },
      { label: "Read receipts", us: "Yes — notification when a client opens an invoice", them: "Yes, from Essentials" },
      { label: "Online card payments", us: "No", them: "Yes, from Essentials" },
      { label: "Photos and signatures", us: "Pro", them: "Plus and above" },
      { label: "Payment reminders", us: "Automatic email reminders (Pro)", them: "Due date reminders, Plus and above" },
    ],
    chooseUs: [
      "You send more than a handful of invoices a month and don't want per-invoice limits.",
      "Your clients live on WhatsApp.",
      "You often work without signal and need the app to work offline.",
      "You want estimates clients accept online and convert to invoices in one tap.",
    ],
    chooseThem: [
      "You want clients to pay by card straight from the invoice.",
      "You'd like to create invoices on a computer as well as your phone.",
      "You only send two or three invoices a month and want the lowest-priced plan.",
    ],
    differences: [
      {
        title: "Plans: invoice limits vs. unlimited sending",
        body: "Invoice Simple's plans step up by volume — 3 invoices a month on Essentials, 10 on Plus, unlimited on Premium. Invoiceflint has one Pro plan, and it includes unlimited sending, so a busy month doesn't push you into a higher tier.",
      },
      {
        title: "Getting paid",
        body: "Invoice Simple can take card payments online, which is its biggest advantage. Invoiceflint doesn't process payments: clients pay you the way they already do — bank transfer, cash, check, or your own payment link in the notes — and you mark the invoice paid.",
      },
      {
        title: "Sending and tracking",
        body: "Both apps tell you when a client opens an invoice. Invoiceflint also opens WhatsApp with the invoice link and a message ready to send, and clients view, download, or accept documents in their browser without an account.",
      },
    ],
    faqs: [
      {
        question: "Is Invoiceflint a good alternative to Invoice Simple?",
        answer:
          "Yes, if you want unlimited sending on one plan, WhatsApp sending, and an app that works offline. If taking card payments through the invoice is essential, Invoice Simple is the better fit, because Invoiceflint doesn't process payments.",
      },
      {
        question: "Does Invoiceflint limit how many invoices I can send?",
        answer:
          "No. Invoiceflint Pro includes unlimited sending of invoices and estimates. On the free plan you can create and preview unlimited drafts.",
      },
      {
        question: "Can I move my clients from Invoice Simple to Invoiceflint?",
        answer:
          "There's no automatic import from Invoice Simple. You can import clients from your phone's contacts and save your common items once, after which repeat invoices take seconds.",
      },
    ],
    source: { label: "Invoice Simple on the App Store", url: "https://apps.apple.com/us/app/invoice-simple-invoice-maker/id694831622" },
    checked: "2026-11-01",
  },
  {
    slug: "joist",
    name: "Joist",
    metaTitle: "Joist Alternative: Invoiceflint vs. Joist for Contractors",
    description:
      "Invoiceflint vs. Joist: pricing, document limits, payments, and estimates for contractors. Where each app fits, compared honestly.",
    summary:
      "Joist is a contractor estimating and invoicing app with online payments, homeowner financing, and — on higher plans — change orders and scheduling. Invoiceflint is a simpler invoice and estimate app for any trade, with unlimited sending on one Pro plan, WhatsApp sending, and offline use, but without payment processing or financing.",
    rows: [
      { label: "Platforms", us: US.platforms, them: "iPhone, Android, and web" },
      { label: "Pricing", us: US.pricing, them: "Basics $10/mo, Pro $17/mo, Elite $32/mo, Run $70/mo intro (monthly billing); 14-day free trial" },
      { label: "Document limits", us: "Unlimited with Pro", them: "Basics 5 documents a month; unlimited from Pro" },
      { label: "Estimates", us: "Yes; clients accept online, one-tap convert to invoice", them: "Yes, all plans" },
      { label: "Online payments", us: "No", them: "Yes, all plans" },
      { label: "Homeowner financing", us: "No", them: "Yes, from Basics" },
      { label: "Change orders", us: "No", them: "Elite and Run" },
      { label: "Scheduling", us: "No", them: "Run" },
    ],
    chooseUs: [
      "You want straightforward invoices and estimates without paying for contractor-management features you won't use.",
      "You send a lot of documents and want unlimited sending on a single plan.",
      "You work in basements, crawl spaces, or rural areas and need the app to work offline.",
      "You work outside construction — cleaning, landscaping, freelancing, tutoring — where Joist's contractor tools don't apply.",
    ],
    chooseThem: [
      "You want to take card payments and offer homeowner financing on big jobs.",
      "You manage change orders on remodels.",
      "You need job scheduling in the same app (Joist Run).",
    ],
    differences: [
      {
        title: "Who each app is built for",
        body: "Joist is built around residential contractors: financing, change orders, license and insurance details, and scheduling on its top plan. Invoiceflint covers estimates and invoices for any trade or freelancer and keeps the app simple.",
      },
      {
        title: "Payments and financing",
        body: "Joist processes payments and offers homeowner financing on every plan, which can help close larger jobs. Invoiceflint doesn't process payments or offer financing; you record payments as they arrive.",
      },
      {
        title: "Limits and pricing",
        body: "Joist's Basics plan allows 5 documents a month, with unlimited documents from Pro. Invoiceflint has a single Pro plan with unlimited sending; the price is shown in the app in your local currency.",
      },
    ],
    faqs: [
      {
        question: "Is Invoiceflint a good Joist alternative?",
        answer:
          "For contractors who mainly need estimates and invoices, yes — Invoiceflint covers estimates clients accept online, one-tap conversion to invoices, read receipts, photos, signatures, and reminders. If you rely on Joist's payments, financing, change orders, or scheduling, Joist remains the better fit.",
      },
      {
        question: "Does Invoiceflint have a free plan?",
        answer:
          "Invoiceflint is free to download, and you can create and preview unlimited invoices and estimates for free. Sending is part of Invoiceflint Pro, which starts with a free trial.",
      },
      {
        question: "Can I send estimates with photos in Invoiceflint?",
        answer:
          "Yes. With Invoiceflint Pro you can attach photos of the job and sign estimates and invoices on screen.",
      },
    ],
    source: { label: "Joist pricing", url: "https://www.joist.com/pricing" },
    checked: "2026-11-01",
  },
  {
    slug: "invoice2go",
    name: "Invoice2go",
    metaTitle: "Invoice2go Alternative: Invoiceflint vs. Invoice2go",
    description:
      "Invoiceflint vs. Invoice2go: invoice limits, payments, reminders, and features compared, so you can pick the right invoice app for your business.",
    summary:
      "Invoice2go is a broad small-business app with payments, a business bank account, expenses, time tracking, and appointments, with plans limited by invoices per year. Invoiceflint focuses on fast invoices and estimates from your phone, with unlimited sending on one Pro plan, WhatsApp sending, and offline use, but no payment processing.",
    rows: [
      { label: "Platforms", us: US.platforms, them: "iPhone, Android, and web" },
      { label: "Invoice limits", us: "Unlimited with Pro", them: "Starter 30 a year, Professional 100 a year, Premium unlimited" },
      { label: "Free trial", us: "Yes, for Pro", them: "30 days; card required" },
      { label: "Online payments", us: "No", them: "Card, PayPal, and ACH bank transfer" },
      { label: "Recurring invoices", us: "No", them: "Premium" },
      { label: "Payment reminders", us: "Automatic email reminders (Pro)", them: "All plans" },
      { label: "Expenses and time tracking", us: "No", them: "All plans" },
    ],
    chooseUs: [
      "You want unlimited sending without an annual invoice cap.",
      "You'd rather have a focused invoicing app than an all-in-one business suite.",
      "Your clients prefer WhatsApp, or you often work offline.",
      "You want to try the app without entering a card.",
    ],
    chooseThem: [
      "You want card, PayPal, or ACH payments built into your invoices.",
      "You need recurring invoices, expense tracking, or time tracking.",
      "You want a business bank account and debit card linked to your invoicing.",
    ],
    differences: [
      {
        title: "Focus",
        body: "Invoice2go has grown into a small-business platform: payments, banking, expenses, time tracking, appointments, and reviews. Invoiceflint does invoices and estimates and keeps them fast to create on a phone.",
      },
      {
        title: "Limits",
        body: "Invoice2go's Starter and Professional plans cap invoices at 30 and 100 a year. Invoiceflint Pro has no sending limit.",
      },
      {
        title: "Payments",
        body: "Invoice2go takes payments online, with card fees from 2.9% to 3.5% depending on plan. Invoiceflint doesn't process payments, so there are no processing fees — and no online payments either.",
      },
    ],
    faqs: [
      {
        question: "Is Invoiceflint a good alternative to Invoice2go?",
        answer:
          "If you mainly need invoices and estimates and want unlimited sending, yes. If you depend on Invoice2go's online payments, recurring invoices, expenses, or time tracking, those aren't part of Invoiceflint.",
      },
      {
        question: "Does Invoiceflint have recurring invoices?",
        answer:
          "No. You can duplicate an invoice and reuse saved items so a repeat invoice takes seconds, but Invoiceflint doesn't send invoices automatically on a schedule.",
      },
      {
        question: "Do I need a credit card to try Invoiceflint?",
        answer:
          "No card is needed to download Invoiceflint and create invoices. The Pro free trial is handled by the App Store or Google Play.",
      },
    ],
    source: { label: "Invoice2go pricing", url: "https://invoice.2go.com/pricing/" },
    checked: "2026-11-01",
  },
  {
    slug: "zoho-invoice",
    name: "Zoho Invoice",
    metaTitle: "Zoho Invoice Alternative: Invoiceflint vs. Zoho Invoice",
    description:
      "Invoiceflint vs. Zoho Invoice: a free web invoicing system vs. a mobile-first invoice app. Limits, features, and who each one suits.",
    summary:
      "Zoho Invoice is free invoicing software with quotes, recurring invoices, a client portal, time tracking, and expenses, capped at 500 invoices a year on its free plan. Invoiceflint is a mobile-first invoice and estimate app built for invoicing on the job, with read receipts, WhatsApp sending, and offline use.",
    rows: [
      { label: "Platforms", us: US.platforms, them: "Web, plus iPhone, Android, Windows, and Mac apps" },
      { label: "Price", us: US.pricing, them: "Free" },
      { label: "Limits", us: "Unlimited sending with Pro", them: "500 invoices a year, 2 users, 3 projects on the free plan" },
      { label: "Branding", us: "Your logo; no app branding on invoices", them: "\"Powered by Zoho Invoice\" on invoices" },
      { label: "Quotes and estimates", us: "Yes; clients accept online", them: "Yes" },
      { label: "Recurring invoices", us: "No", them: "Yes" },
      { label: "Client portal", us: "No; clients open each document by link", them: "Yes" },
      { label: "Time tracking and expenses", us: "No", them: "Yes" },
    ],
    chooseUs: [
      "You invoice from your phone at the job, not from a desk.",
      "You want to know the moment a client opens an invoice.",
      "Your clients prefer WhatsApp, or you work where there's no signal.",
      "You'd rather not have another company's branding on your invoices.",
    ],
    chooseThem: [
      "You want a free system and stay within 500 invoices a year.",
      "You need recurring invoices, time tracking, or a client portal.",
      "You do most of your billing on a computer, or already use other Zoho apps.",
    ],
    differences: [
      {
        title: "Desk vs. job site",
        body: "Zoho Invoice is a full invoicing system that's strongest on the web. Invoiceflint is designed for the phone: create the invoice in the van or on the client's doorstep and send it before you leave.",
      },
      {
        title: "Free vs. Pro",
        body: "Zoho Invoice is free, with caps on invoices, users, and projects and Zoho branding on invoices. Invoiceflint is free to download and draft with; sending and premium features come with Pro.",
      },
      {
        title: "Features",
        body: "Zoho Invoice includes recurring invoices, time tracking, expenses, and a client portal, which Invoiceflint doesn't. Invoiceflint adds read-receipt notifications, WhatsApp sending, and offline use.",
      },
    ],
    faqs: [
      {
        question: "Is Invoiceflint better than Zoho Invoice?",
        answer:
          "It depends on how you work. Zoho Invoice suits office-based billing with recurring invoices and time tracking. Invoiceflint suits people who invoice from their phone right after a job and want to know when clients open invoices.",
      },
      {
        question: "Is Invoiceflint free like Zoho Invoice?",
        answer:
          "Invoiceflint is free to download, and you can create and preview unlimited invoices and estimates. Unlimited sending, extra templates, reminders, and other premium features are part of Invoiceflint Pro, which starts with a free trial.",
      },
      {
        question: "Does Invoiceflint add its branding to my invoices?",
        answer:
          "No. Invoices carry your business name and logo.",
      },
    ],
    source: { label: "Zoho Invoice pricing", url: "https://www.zoho.com/us/invoice/pricing/" },
    checked: "2026-11-01",
  },
];

export function getCompetitor(slug: string) {
  return COMPETITORS.find((c) => c.slug === slug);
}
