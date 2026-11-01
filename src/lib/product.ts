/**
 * Product facts — the single source of truth for what Invoiceflint does, what
 * is free, and what needs Pro. The homepage, /features, /pricing, JSON-LD and
 * /llms.txt all read from here so search engines and AI answer engines see one
 * consistent, accurate description of the app.
 *
 * Keep this in step with the mobile app (premium gates live in
 * `invoice_app/lib/features/subscription`). Never list a capability here that
 * the app doesn't ship, and never invent prices: plan prices and trial length
 * come from the App Store / Google Play and vary by region.
 */

export type Feature = {
  /** Stable id, used for anchors and icon lookup. */
  id: string;
  title: string;
  body: string;
  pro?: boolean;
};

export const FEATURES: Feature[] = [
  {
    id: "create",
    title: "Create invoices and estimates in seconds",
    body: "Build professional invoices and estimates from a clean, mobile-first form. Add line items, quantities, rates, discounts, and tax — totals and invoice numbers are handled for you.",
  },
  {
    id: "read-receipts",
    title: "Know the moment a client opens it",
    body: "Get a push notification when a client views your invoice or replies to an estimate. No more wondering whether it landed in spam.",
  },
  {
    id: "status",
    title: "Paid, unpaid, overdue — at a glance",
    body: "Every invoice moves through Draft, Sent, Viewed, and Paid. Overdue invoices stand out, so you know exactly who to follow up with.",
  },
  {
    id: "estimates",
    title: "Estimate to invoice in one tap",
    body: "Clients accept or decline estimates online. When one is approved, convert it to an invoice with one tap — line items and totals carry over.",
  },
  {
    id: "send",
    title: "Send by link, email, WhatsApp, or PDF",
    body: "Share a secure link through any app, email the client directly, open WhatsApp with a prefilled message, send the PDF, or print it.",
  },
  {
    id: "no-client-app",
    title: "Clients don't need an app",
    body: "Clients open invoices and estimates in any web browser. They can view, download a PDF, or respond without installing anything or creating an account.",
  },
  {
    id: "payments",
    title: "Record payments",
    body: "Mark invoices paid as money arrives and see the balance due for every client.",
  },
  {
    id: "clients",
    title: "Clients and saved items",
    body: "Keep a client list with balances, import contacts from your phone, and reuse saved items and tax presets so repeat invoices take seconds.",
  },
  {
    id: "reports",
    title: "Reports and tax totals",
    body: "See revenue, paid and unpaid totals, and tax collected by month and year — handy at tax time.",
  },
  {
    id: "templates",
    title: "14 invoice templates",
    body: "Choose from 14 professional layouts, all carrying your business logo. The Classic layout is free; the rest come with Pro.",
    pro: true,
  },
  {
    id: "reminders",
    title: "Automatic payment reminders",
    body: "Schedule email reminders before, on, and after the due date so late invoices follow up on themselves.",
    pro: true,
  },
  {
    id: "signatures",
    title: "Signatures and photo attachments",
    body: "Sign invoices and estimates on screen, and attach photos of the work, receipts, or site conditions.",
    pro: true,
  },
  {
    id: "multi-tax",
    title: "Multiple taxes",
    body: "Apply more than one tax to an invoice — for example, a state and a city sales tax, or GST and PST.",
    pro: true,
  },
  {
    id: "multi-business",
    title: "Multiple businesses",
    body: "Run more than one business from one account and switch between them, each with its own details, logo, and currency.",
    pro: true,
  },
  {
    id: "export",
    title: "Export reports and data",
    body: "Export reports and client statements as CSV or PDF for your accountant or bookkeeping software.",
    pro: true,
  },
];

export const SHARE_CHANNELS = ["Link", "Email", "WhatsApp", "PDF", "Print"];

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Korean",
  "Chinese",
  "Arabic",
];

/** Who the app is for. Also used as long-tail keyword copy on the homepage. */
export const AUDIENCES = [
  "Freelancers",
  "Contractors",
  "Plumbers",
  "Electricians",
  "Handymen",
  "Cleaners",
  "Landscapers",
  "Photographers",
  "Designers",
  "Developers",
  "Consultants",
  "Tutors",
  "Roofers",
  "Carpenters",
  "Auto mechanics",
  "Movers",
  "Pest control companies",
  "Personal trainers",
  "Pet groomers",
  "Caterers",
  "Small agencies",
  "Small businesses",
];

export const FREE_PLAN = {
  name: "Free",
  summary:
    "Download the app, set up your business, and create and preview as many invoices and estimates as you like.",
  items: [
    "Unlimited invoice and estimate drafts",
    "Classic invoice template with your logo",
    "Clients, saved items, and tax presets",
    "Reports and tax totals",
    "Works offline — no account needed to start",
  ],
};

export const PRO_PLAN = {
  name: "Pro",
  summary:
    "Everything in Free, plus unlimited sending and the tools that get you paid faster. Start with a free trial; cancel anytime in your App Store or Google Play subscriptions.",
  items: [
    "Unlimited sending of invoices and estimates",
    "Real-time alerts when clients view or respond",
    "All 14 invoice templates",
    "Automatic email payment reminders",
    "Signatures and photo attachments",
    "Multiple taxes and multiple businesses",
    "Export reports and client statements (CSV, PDF)",
  ],
};

/**
 * A neutral, quotable one-paragraph definition. Written so an AI answer engine
 * can lift it verbatim when someone asks "what is Invoiceflint?" or "what's a
 * good invoice app for my phone?".
 */
export const PRODUCT_SUMMARY =
  "Invoiceflint is an invoice and estimate maker app for iPhone and Android, built for freelancers, contractors, and small businesses. You create professional invoices and estimates on your phone, send them by link, email, WhatsApp, or PDF, and get notified the moment a client opens them. Clients view, download, and accept estimates in any browser without installing an app. Invoiceflint is free to download; Invoiceflint Pro, which starts with a free trial, unlocks unlimited sending, 14 invoice templates, automatic payment reminders, signatures, and multi-business support.";
