import type { FaqItem } from "@/lib/jsonLd";

/**
 * Accordion of FAQs. Answers stay in the HTML when collapsed, so crawlers and
 * answer engines read them all; pair with `faqLd` for the structured data.
 */
export default function FaqList({ items, openCount = 2 }: { items: FaqItem[]; openCount?: number }) {
  return (
    <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
      {items.map((f, i) => (
        <details key={f.question} open={i < openCount} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <h3>{f.question}</h3>
            <span
              aria-hidden
              className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-paper text-zinc-500 transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
