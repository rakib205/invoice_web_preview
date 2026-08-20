import type { Metadata } from "next";

import { buildDocumentMetadata } from "@/lib/og/documentMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  return buildDocumentMetadata(token);
}

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
