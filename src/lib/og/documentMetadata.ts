import type { Metadata } from "next";

import { fetchPublicInvoiceByToken } from "@/lib/invoice/fetchPublicInvoice";

// Private, token-gated client documents — must never be indexed.
const ROBOTS: Metadata["robots"] = { index: false, follow: false, nocache: true };

// Link-preview text for a shared invoice/estimate. Like the OG image, this is
// identity only — no amount, client name, or paid status — because unfurl
// scrapers read it unauthenticated and it shows to everyone the link reaches.
export async function buildDocumentMetadata(token: string): Promise<Metadata> {
  const bundle = await fetchPublicInvoiceByToken(token);
  if (!bundle) return { robots: ROBOTS };

  const isEstimate = bundle.invoice.document_type === "estimate";
  const docLabel = isEstimate ? "Estimate" : "Invoice";
  const number = bundle.invoice.invoice_number?.trim();
  const businessName = bundle.business?.name?.trim();

  const title = number ? `${docLabel} #${number}` : `Shared ${docLabel.toLowerCase()}`;
  const description = businessName
    ? `${docLabel} from ${businessName}. Open the secure link to view or download it.`
    : `Open the secure link to view or download this ${docLabel.toLowerCase()}.`;

  return {
    title,
    description,
    robots: ROBOTS,
    openGraph: { type: "website", title, description, siteName: "Invoiceflint" },
    twitter: { card: "summary_large_image", title, description },
  };
}
