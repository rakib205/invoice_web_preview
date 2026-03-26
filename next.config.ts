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
};

export default nextConfig;
