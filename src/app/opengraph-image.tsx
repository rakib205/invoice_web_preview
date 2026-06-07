import { ImageResponse } from "next/og";

export const alt =
  "Invoiceflint — Invoices that get paid faster. Free on iOS and Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RUST = "#b8412a";
const INK = "#0a1729";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f7f9",
          padding: "80px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: RUST,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            I
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: INK }}>
            Invoiceflint
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              fontSize: 84,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Invoices that get</span>
            <span style={{ color: RUST }}>paid faster.</span>
          </div>
          <div style={{ fontSize: 36, color: "#52525b", maxWidth: 900 }}>
            Create, send, and track invoices and estimates from your phone.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "white",
              background: INK,
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            iOS · Android
          </div>
          <div style={{ fontSize: 26, color: "#71717a" }}>invoiceflint.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
