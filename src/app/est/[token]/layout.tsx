import type { Metadata } from "next";

// Private, token-gated client documents — must never be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
