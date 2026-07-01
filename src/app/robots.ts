import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Private, token-gated client documents and internal endpoints — never index.
const DISALLOW = ["/inv/", "/est/", "/api/"];

// AI / answer-engine crawlers we explicitly welcome to public pages. They're
// already covered by the "*" rule, but naming them signals intent and guards
// against an accidental future block.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
