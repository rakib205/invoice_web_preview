import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const turbopackRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  turbopack: {
    root: turbopackRoot,
  },
  // Private, token-gated client documents. Sent as a header (not just the
  // page's <meta robots>) so it also covers the PDF and download routes, which
  // have no HTML. robots.txt deliberately lets crawlers fetch these paths —
  // a crawler blocked there would never see this noindex.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/inv/:path*", headers: noindex },
      { source: "/est/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
