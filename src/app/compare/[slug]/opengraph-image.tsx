import { renderMarketingOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/marketingOg";
import { COMPETITORS, getCompetitor } from "@/lib/compare/content";

export const alt = "Invoiceflint comparison";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  return renderMarketingOg({
    eyebrow: c ? `${c.name} alternative` : "Compare",
    title: "Invoiceflint vs.",
    accent: c ? `${c.name}` : "the rest",
    subtitle: "An honest side-by-side: plans, limits, and features.",
  });
}
