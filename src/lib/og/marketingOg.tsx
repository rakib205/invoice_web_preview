import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const RUST = "#b8412a";
const INK = "#0a1729";

/**
 * Social card for marketing pages (home, trade pages, guides). `title` is the
 * ink part of the headline and `accent` the rust-colored part after it.
 */
export async function renderMarketingOg({
  eyebrow,
  title,
  accent,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle: string;
}) {
  const icon = `data:image/png;base64,${await readFile(
    join(process.cwd(), "public/icon-192.png"),
    "base64",
  )}`;
  const long = title.length + (accent?.length ?? 0) > 48;

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
          padding: "72px 80px",
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
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img src={icon} width={56} height={56} alt="" />
          <div style={{ fontSize: 34, fontWeight: 600, color: INK }}>
            Invoiceflint
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: RUST,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              fontSize: long ? 60 : eyebrow ? 74 : 84,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span>{title}</span>
            {accent && <span style={{ color: RUST }}>{accent}</span>}
          </div>
          <div style={{ fontSize: 30, color: "#52525b", maxWidth: 950 }}>
            {subtitle}
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
    { ...OG_SIZE },
  );
}
