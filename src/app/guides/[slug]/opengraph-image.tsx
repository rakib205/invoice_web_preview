import { renderMarketingOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/marketingOg";
import { GUIDES, getGuide } from "@/lib/guides/content";

export const alt = "Invoiceflint invoicing guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  return renderMarketingOg({
    eyebrow: "Invoicing guide",
    title: guide?.title ?? "Invoicing guides",
    subtitle: "Free invoicing guide from Invoiceflint.",
  });
}
