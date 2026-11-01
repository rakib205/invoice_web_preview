import { renderMarketingOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/marketingOg";
import { TRADES, getTrade, templateName } from "@/lib/trades/content";

export const alt = "Free invoice template";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return TRADES.map((t) => ({ trade: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  return renderMarketingOg({
    eyebrow: "Free · Editable · PDF",
    title: trade ? templateName(trade) : "Invoice Template",
    subtitle: "Edit online, add your logo, and download a PDF.",
  });
}
