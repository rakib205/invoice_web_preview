import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import StoreBadges from "@/components/StoreBadges";
import { FREE_PLAN, PRO_PLAN } from "@/lib/product";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Invoiceflint is free to download. Create unlimited invoices and estimates for free, and upgrade to Pro — with a free trial — for unlimited sending, 14 templates, and automatic reminders.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Invoiceflint",
    description:
      "Free to download on iOS and Android. Invoiceflint Pro starts with a free trial and unlocks unlimited sending, templates, and payment reminders.",
    url: "/pricing",
    type: "website",
  },
};

const NOTES = [
  {
    q: "How much does Invoiceflint Pro cost?",
    a: "Pro is billed through the App Store or Google Play. Prices depend on your country and the plan you choose, and are shown in the app in your local currency before you subscribe.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Pro starts with a free trial, so you can send invoices and try every Pro feature before you pay. Cancel before the trial ends and you won't be charged.",
  },
  {
    q: "How do I cancel?",
    a: "Cancel anytime from your App Store or Google Play subscriptions. You keep Pro until the end of the period you've paid for, and your invoices stay in the app.",
  },
];

export default function PricingPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Start free. Upgrade when you&rsquo;re ready to send.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Invoiceflint is free to download on iOS and Android. Set up your business
            and create as many invoices and estimates as you like, then start a free
            trial of Pro to send them and unlock everything else.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[FREE_PLAN, PRO_PLAN].map((plan) => {
            const pro = plan === PRO_PLAN;
            return (
              <section
                key={plan.name}
                className={`rounded-3xl p-8 ${pro ? "bg-ink text-white shadow-xl" : "border border-zinc-200 bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-semibold ${pro ? "text-white" : "text-ink"}`}>{plan.name}</h2>
                  {pro && (
                    <span className="rounded-full bg-rust px-3 py-1 text-xs font-semibold text-white">
                      Free trial
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${pro ? "text-zinc-300" : "text-zinc-600"}`}>
                  {plan.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${pro ? "text-zinc-100" : "text-zinc-700"}`}>
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs text-white ${pro ? "bg-rust" : "bg-ink"}`}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <StoreBadges />
        </div>

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Pricing questions</h2>
          <dl className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {NOTES.map((n) => (
              <div key={n.q} className="px-6 py-5">
                <dt className="font-semibold text-ink">{n.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-600">{n.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-zinc-500">
            Want to see everything Invoiceflint can do? Explore the{" "}
            <Link href="/features" className="font-medium text-rust hover:underline">
              full feature list
            </Link>
            .
          </p>
        </section>
      </article>
    </SiteShell>
  );
}
