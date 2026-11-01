import type { FaqItem } from "@/lib/jsonLd";

/**
 * Homepage FAQ. Single source of truth for both the visible <section> and the
 * FAQPage JSON-LD, so the two never drift apart. Answers are written as
 * self-contained prose that reads well when an AI answer engine quotes them.
 */
export const FAQS: FaqItem[] = [
  {
    question: "What is Invoiceflint?",
    answer:
      "Invoiceflint is an invoice and estimate maker app for iPhone and Android. Freelancers, contractors, and small businesses use it to create professional invoices and estimates on their phone, send them by link, email, WhatsApp, or PDF, and get notified the moment a client opens them.",
  },
  {
    question: "Is Invoiceflint free?",
    answer:
      "Invoiceflint is free to download, and you can create and preview unlimited invoices and estimates for free. Invoiceflint Pro unlocks unlimited sending, all 14 invoice templates, automatic payment reminders, signatures, attachments, and multiple businesses. Pro starts with a free trial, and prices are shown in the app in your local currency.",
  },
  {
    question: "What is the best invoice app for freelancers and contractors?",
    answer:
      "The best invoice app is one you'll actually use right after finishing a job — which usually means one on your phone. Invoiceflint is built mobile-first for freelancers and contractors: you can create and send an invoice in under a minute, see when the client opens it, and send automatic reminders if it's overdue.",
  },
  {
    question: "How do I know when a client views my invoice?",
    answer:
      "Invoiceflint sends you a push notification the moment a client opens your invoice or responds to an estimate. Each invoice's status moves through Draft, Sent, Viewed, and Paid, so you always know whether to wait or follow up.",
  },
  {
    question: "Do my clients need to install an app?",
    answer:
      "No. Clients open your invoice or estimate through a secure link in any web browser. They can view it, download a PDF, and accept or decline an estimate without installing an app or creating an account.",
  },
  {
    question: "Can I turn an estimate into an invoice?",
    answer:
      "Yes. Clients can accept an estimate online, and you can convert an approved estimate into an invoice with one tap. The line items, client details, and totals carry over automatically.",
  },
  {
    question: "How can I send an invoice from my phone?",
    answer:
      "In Invoiceflint, create the invoice, tap Send, and choose how to deliver it: share a secure link through any app, email it to the client directly, open WhatsApp with a prefilled message, send the PDF file, or print it.",
  },
  {
    question: "Does Invoiceflint work in my currency and language?",
    answer:
      "Invoiceflint lets you choose your business currency, and the app is available in English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, and Arabic.",
  },
  {
    question: "Does Invoiceflint work offline?",
    answer:
      "Yes. Invoiceflint stores your invoices on your device, so you can create and edit them without a connection. You can even start without an account; create one later to back up your data and sign in on other devices.",
  },
  {
    question: "Does Invoiceflint work on both iPhone and Android?",
    answer:
      "Yes. Invoiceflint is available on the Apple App Store for iPhone and iPad and on Google Play for Android phones and tablets.",
  },
];
