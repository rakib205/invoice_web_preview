import { renderMarketingOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/marketingOg";
import { TRADES, audienceOf, getTrade } from "@/lib/trades/content";

export const alt = "Invoiceflint invoice app";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  return renderMarketingOg({
    eyebrow: "Invoice & estimate app",
    title: "The invoice app for",
    accent: trade ? `${audienceOf(trade)}.` : "every trade.",
    subtitle: "Create, send, and track invoices and estimates from your phone.",
  });
}
