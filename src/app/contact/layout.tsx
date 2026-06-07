import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Invoiceflint team. Questions about the app, billing, or partnerships — we'll get back to you.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Invoiceflint",
    description: "Get in touch with the Invoiceflint team.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
