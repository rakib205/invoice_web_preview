import { renderMarketingOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/marketingOg";

export const alt =
  "Invoiceflint — Invoice and estimate maker app for iPhone and Android.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderMarketingOg({
    title: "Invoices that get",
    accent: "paid faster.",
    subtitle: "Send invoices from your phone and know the moment clients open them.",
  });
}
