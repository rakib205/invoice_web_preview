import type { Metadata } from "next";
import ToolPage, { RefTable } from "@/components/ToolPage";
import LateFeeCalculator from "@/components/calculators/LateFeeCalculator";
import { lateFee } from "@/lib/calculators";
import type { FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const PATH = "/tools/late-fee-calculator";
const TITLE = "Late Fee Calculator for Overdue Invoices";
const DESCRIPTION =
  "Calculate the late fee on an overdue invoice: interest per month or per year, or a flat fee, with an optional grace period. Free, with worked examples.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FAQS: FaqItem[] = [
  {
    question: "How do you calculate a late fee on an invoice?",
    answer:
      "For a monthly rate, multiply the overdue amount by the rate and by the number of days late divided by 30. For example, 1.5% per month on $1,200 that is 45 days late is $1,200 × 0.015 × 45 ÷ 30 = $27. For an annual rate, divide the days by 365 instead. A flat fee is simply added once.",
  },
  {
    question: "Is 1.5% per month a legal late fee?",
    answer:
      "1.5% per month (18% a year) is a common late fee in the US, but the maximum you can charge depends on your state and on whether your client is a consumer or a business. Check your state's rules before adding it to your terms.",
  },
  {
    question: "Can I charge a late fee if it wasn't agreed in advance?",
    answer:
      "Generally, a late fee needs to be in your contract or payment terms before the work starts — for example, printed on your estimate and invoice. In the UK and EU, businesses can claim statutory interest on late business-to-business payments even without a contract clause.",
  },
  {
    question: "How do I add a late fee to an invoice?",
    answer:
      "Add it as a separate line, such as \"Late fee – 1.5% per month, 45 days\", on an updated invoice or a new invoice that references the original invoice number. Send it with a polite note giving the original due date.",
  },
];

export default function LateFeeCalculatorPage() {
  const example = lateFee(1200, "monthly", 1.5, 45, 0);
  return (
    <ToolPage
      path={PATH}
      name="Late fee calculator"
      title="Late fee calculator"
      description={DESCRIPTION}
      intro={<p>Work out how much to charge on an overdue invoice — as interest per month, per year, or a flat fee.</p>}
      calculator={<LateFeeCalculator />}
      faqs={FAQS}
      guides={[
        { href: "/guides/how-to-charge-late-fees", label: "How to charge late fees on invoices" },
        { href: "/guides/how-to-follow-up-on-unpaid-invoice", label: "How to follow up on an unpaid invoice" },
        { href: "/guides/invoice-payment-terms", label: "Invoice payment terms explained" },
      ]}
    >
      <h2>How late fees are calculated</h2>
      <p>
        Most late fees are simple interest on the overdue amount. With a monthly rate, the fee grows in
        proportion to how many days the invoice is late, using 30 days as a month:
      </p>
      <p className="rounded-xl bg-white px-5 py-4 font-mono text-sm text-ink ring-1 ring-zinc-200">
        Late fee = amount × monthly rate × (days late ÷ 30)
      </p>
      <p>
        For example, an invoice for $1,200 that is 45 days late, at 1.5% per month, has a late fee of $1,200 ×
        0.015 × 1.5 = <strong>${example.toFixed(2)}</strong>. With an annual rate, divide the days by 365
        instead. If your terms include a grace period, only the days after it count.
      </p>

      <h2>Common late fee policies</h2>
      <RefTable
        head={["Policy", "How it works", "Where it's used"]}
        rows={[
          ["1–1.5% per month", "Interest on the overdue balance, charged per month late", "Common in US contracts; state limits apply"],
          ["Flat fee", "A fixed amount, such as $25 or $50, once the invoice is late", "Small invoices, where interest would be tiny"],
          ["UK statutory interest", "8% a year plus the Bank of England base rate, plus £40–£100 fixed compensation", "Late business-to-business payments in the UK"],
          ["EU statutory interest", "At least the ECB reference rate plus 8 points, plus €40 compensation", "Late business-to-business payments in the EU"],
        ]}
      />
      <p>
        Whatever you choose, put it in writing before the work starts — on your estimate, contract, and
        invoice — and apply it consistently. A late fee your client didn&rsquo;t agree to is hard to collect.
      </p>
    </ToolPage>
  );
}
