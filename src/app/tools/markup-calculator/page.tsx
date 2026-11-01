import type { Metadata } from "next";
import ToolPage, { RefTable } from "@/components/ToolPage";
import MarkupCalculator from "@/components/calculators/MarkupCalculator";
import { markupToMargin } from "@/lib/calculators";
import type { FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const PATH = "/tools/markup-calculator";
const TITLE = "Markup and Margin Calculator: Price Materials Right";
const DESCRIPTION =
  "Free markup calculator: find your selling price from cost and markup or target margin, and convert markup to margin. With formulas and a conversion table.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const FAQS: FaqItem[] = [
  {
    question: "What's the difference between markup and margin?",
    answer:
      "Markup is profit as a percentage of your cost; margin is profit as a percentage of the selling price. Buying something for $60 and selling it for $90 is a 50% markup but a 33.3% margin. The same dollar profit always gives a higher markup percentage than margin percentage.",
  },
  {
    question: "How do I convert markup to margin?",
    answer:
      "Margin = markup ÷ (1 + markup). A 25% markup is 0.25 ÷ 1.25 = 20% margin. To go the other way, markup = margin ÷ (1 − margin), so a 20% margin needs a 25% markup.",
  },
  {
    question: "How much should I mark up materials?",
    answer:
      "It varies by trade and market. Your markup should at least cover the time spent sourcing and collecting materials, waste and returns, and the warranty risk you take on the parts you install. Whatever you charge, list materials as their own lines on the invoice.",
  },
  {
    question: "Should markup be shown on the invoice?",
    answer:
      "Usually not as a separate line. Most businesses show materials at their selling price, which already includes markup. Cost-plus contracts are the exception: there, the contract sets the markup and the invoice shows cost and markup separately.",
  },
];

export default function MarkupCalculatorPage() {
  return (
    <ToolPage
      path={PATH}
      name="Markup and margin calculator"
      title="Markup and margin calculator"
      description={DESCRIPTION}
      intro={<p>Enter what something costs you and either your markup, your target margin, or your selling price.</p>}
      calculator={<MarkupCalculator />}
      faqs={FAQS}
      guides={[
        { href: "/guides/how-to-invoice-labor-and-materials", label: "How to invoice labor and materials" },
        { href: "/guides/how-to-write-an-estimate", label: "How to write an estimate" },
      ]}
    >
      <h2>Markup vs. margin</h2>
      <p>
        Both measure profit, but against different numbers. <strong>Markup</strong> compares profit with your
        cost; <strong>margin</strong> compares it with the selling price. Mixing them up is one of the most
        common pricing mistakes — a business aiming for a 30% margin that adds a 30% markup ends up with
        only 23% margin.
      </p>
      <p className="rounded-xl bg-white px-5 py-4 font-mono text-sm leading-7 text-ink ring-1 ring-zinc-200">
        Price = cost × (1 + markup)
        <br />
        Price = cost ÷ (1 − margin)
        <br />
        Margin = markup ÷ (1 + markup)
      </p>

      <h2>Markup to margin conversion table</h2>
      <RefTable
        head={["Markup", "Margin", "Cost $100 sells for"]}
        rows={[10, 15, 20, 25, 30, 40, 50, 60, 75, 100].map((m) => [
          `${m}%`,
          `${markupToMargin(m).toFixed(1)}%`,
          `$${(100 * (1 + m / 100)).toFixed(2)}`,
        ])}
      />
    </ToolPage>
  );
}
