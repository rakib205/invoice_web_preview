import { ImageResponse } from "next/og";

import { fetchPublicInvoiceByToken } from "@/lib/invoice/fetchPublicInvoice";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const RUST = "#b8412a";
const INK = "#0a1729";
const MUTED = "#5b6675";

// Satori decodes png/jpeg/gif only — svg and webp render as nothing, so a
// business logo in those formats falls back to the monogram instead.
const LOGO_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
const LOGO_TIMEOUT_MS = 2500;
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

// Inline the logo as a data URI. Any failure — missing url, slow host, wrong
// format, oversized file — returns null so the card renders the monogram.
async function loadLogo(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(LOGO_TIMEOUT_MS) });
    if (!res.ok) return null;

    const type = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    if (!LOGO_TYPES.includes(type)) return null;

    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.byteLength === 0 || bytes.byteLength > LOGO_MAX_BYTES) return null;

    return `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
  } catch {
    return null;
  }
}

// "Acme Plumbing Co" -> "AP", "Acme" -> "AC". Falls back to the app mark.
function monogram(name: string | null | undefined): string {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "IF";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function Mark({ logo, name }: { logo: string | null; name: string | null }) {
  if (logo) {
    return (
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          background: "white",
          border: "1px solid #e3e6ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={72} height={72} style={{ objectFit: "contain" }} alt="" />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: 24,
        background: RUST,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {monogram(name)}
    </div>
  );
}

// The link-preview card for a shared invoice/estimate.
//
// Deliberately shows identity only — document type, number, and the sending
// business. No amount, client name, or paid status: unfurl scrapers fetch these
// token URLs unauthenticated, and the card is visible to everyone in any chat
// the link is forwarded into.
function Card({
  docLabel,
  number,
  businessName,
  logo,
}: {
  docLabel: string;
  number: string | null;
  businessName: string | null;
  logo: string | null;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f7f9",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -160,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,65,42,0.22) 0%, rgba(184,65,42,0.06) 55%, transparent 80%)",
        }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 14, background: RUST }} />

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Mark logo={logo} name={businessName} />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: INK }}>
          {businessName ?? "Invoiceflint"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 6,
            color: RUST,
          }}
        >
          {docLabel.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: number ? 104 : 72, fontWeight: 700, color: INK }}>
          {number ? `#${number}` : `Shared ${docLabel.toLowerCase()}`}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: MUTED }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: RUST,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          I
        </div>
        <div style={{ display: "flex" }}>Secure document link · Invoiceflint</div>
      </div>
    </div>
  );
}

export async function renderDocumentOgImage(token: string) {
  const bundle = await fetchPublicInvoiceByToken(token);

  // Bad or revoked token: render the neutral card rather than a broken image,
  // and give away nothing about whether the token ever existed.
  if (!bundle) {
    return new ImageResponse(
      <Card docLabel="Document" number={null} businessName={null} logo={null} />,
      OG_SIZE,
    );
  }

  const isEstimate = bundle.invoice.document_type === "estimate";
  const businessName = bundle.business?.name?.trim() || null;
  const logo = await loadLogo(bundle.business?.logo_url);

  return new ImageResponse(
    <Card
      docLabel={isEstimate ? "Estimate" : "Invoice"}
      number={bundle.invoice.invoice_number?.trim() || null}
      businessName={businessName}
      logo={logo}
    />,
    OG_SIZE,
  );
}
