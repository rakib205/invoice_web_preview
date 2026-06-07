import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Need help with Invoiceflint? Report a bug, ask about billing, or get help with an invoice or estimate. We're here to help.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support — Invoiceflint",
    description: "Get help with the Invoiceflint app.",
    url: "/support",
    type: "website",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
