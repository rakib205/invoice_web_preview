import { renderDocumentOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/documentOg";

export const alt = "Invoice link preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// The card is built from live document data, so it must never be cached at build.
export const dynamic = "force-dynamic";

export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return renderDocumentOgImage(token);
}
