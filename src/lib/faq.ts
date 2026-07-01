import type { FaqItem } from "@/lib/jsonLd";

/**
 * Homepage FAQ. Single source of truth for both the visible <section> and the
 * FAQPage JSON-LD, so the two never drift apart. Answers are written as
 * self-contained prose that reads well when an AI answer engine quotes them.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Is Invoiceflint free?",
    answer:
      "Yes. Invoiceflint is free to download and use on iOS and Android. You can create, send, and track professional invoices and estimates at no cost.",
  },
  {
    question: "Can I send invoices from my phone?",
    answer:
      "Yes. Invoiceflint is built mobile-first. You can create an invoice or estimate and send it to a client directly from your iPhone or Android phone in seconds — no computer required.",
  },
  {
    question: "How do I know when a client views my invoice?",
    answer:
      "Invoiceflint shows a live read receipt: you see the exact moment a client opens your invoice. Its status moves through Draft, Sent, Viewed, and Paid so you always know where things stand.",
  },
  {
    question: "Can I turn an estimate into an invoice?",
    answer:
      "Yes. When a client approves an estimate, you can convert it into an invoice with one tap. The line items, client details, and totals carry over automatically.",
  },
  {
    question: "Do my clients need to install an app to view an invoice?",
    answer:
      "No. Clients open your invoice or estimate through a secure link in any web browser. They don't need an account or an app to view, download, or respond.",
  },
  {
    question: "Does Invoiceflint work on both iPhone and Android?",
    answer:
      "Yes. Invoiceflint is available on the Apple App Store for iPhone and iPad, and on Google Play for Android devices.",
  },
  {
    question: "What kind of businesses is Invoiceflint for?",
    answer:
      "Invoiceflint is designed for freelancers, contractors, and small business owners who need to send professional invoices and estimates quickly and get paid without the back-and-forth.",
  },
];
