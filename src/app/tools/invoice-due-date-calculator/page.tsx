import type { Metadata } from "next";
import ToolPage, { RefTable } from "@/components/ToolPage";
import DueDateCalculator from "@/components/calculators/DueDateCalculator";
import type { FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const PATH = "/tools/invoice-due-date-calculator";
const TITLE = "Invoice Due Date Calculator: Net 30, Net 60 & More";
const DESCRIPTION =
  "Find an invoice's due date for Net 7, Net 15, Net 30, Net 60, Net 90, or end-of-month terms, and see how many days are left. Free and instant.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FAQS: FaqItem[] = [
  {
    question: "What does Net 30 mean on an invoice?",
    answer:
      "Net 30 means the full amount is due 30 days after the invoice date. An invoice dated November 1 with Net 30 terms is due on December 1.",
  },
  {
    question: "Does Net 30 include weekends and holidays?",
    answer:
      "Yes. Net terms count calendar days, not business days. If the due date falls on a weekend or holiday, many businesses treat the next business day as the deadline, but the terms themselves don't change.",
  },
  {
    question: "Does the clock start on the invoice date or when the client receives it?",
    answer:
      "Normally the invoice date. If your terms say \"30 days from receipt\", the count starts when the client receives the invoice, which is harder to prove — another reason to use dated terms and send invoices promptly.",
  },
  {
    question: "What do EOM and 2/10 Net 30 mean?",
    answer:
      "EOM (end of month) means payment is due on the last day of the month the invoice is dated. 2/10 Net 30 offers a 2% discount if the client pays within 10 days; otherwise the full amount is due in 30 days.",
  },
];

export default function DueDateCalculatorPage() {
  return (
    <ToolPage
      path={PATH}
      name="Invoice due date calculator"
      title="Invoice due date calculator"
      description={DESCRIPTION}
      intro={<p>Pick the invoice date and payment terms to see exactly when payment is due.</p>}
      calculator={<DueDateCalculator />}
      faqs={FAQS}
      guides={[
        { href: "/guides/invoice-payment-terms", label: "Invoice payment terms explained" },
        { href: "/guides/how-to-charge-late-fees", label: "How to charge late fees on invoices" },
      ]}
    >
      <h2>Common payment terms</h2>
      <RefTable
        head={["Term", "Payment is due", "Typical use"]}
        rows={[
          ["Due on receipt", "As soon as the invoice is received", "Small jobs, homeowners, one-off clients"],
          ["Net 7 / Net 14", "7 or 14 days after the invoice date", "Freelancers and trades who want faster cash flow"],
          ["Net 15", "15 days after the invoice date", "Small businesses and repeat clients"],
          ["Net 30", "30 days after the invoice date", "The default for business clients"],
          ["Net 45 / 60 / 90", "45, 60, or 90 days after the invoice date", "Large companies with set payment cycles"],
          ["EOM", "Last day of the invoice's month", "Clients who pay all bills at month end"],
          ["2/10 Net 30", "30 days; 2% discount if paid within 10", "Encouraging early payment"],
        ]}
      />
      <p>
        Shorter terms get you paid sooner. When you can, write the actual date on the invoice — &ldquo;Due
        December 1&rdquo; is clearer than &ldquo;Net 30&rdquo;, and clear invoices get paid faster.
      </p>
    </ToolPage>
  );
}
