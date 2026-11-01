import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description: "Need help with Invoiceflint? Report a bug, ask about billing, or get help with an invoice or estimate. We're here to help.",
  path: "/support",
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
