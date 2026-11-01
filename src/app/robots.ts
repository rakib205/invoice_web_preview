import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Internal endpoints — never crawl. Private client documents (/inv/, /est/)
// are intentionally NOT listed: a blocked URL can still be indexed from
// external links, and the crawler would never see its noindex. They're kept
// out of search by an X-Robots-Tag header (next.config.ts) and <meta robots>.
// /api/ stays blocked so rendering crawlers can't fire the "viewed" tracker.
const DISALLOW = ["/api/"];

// AI / answer-engine crawlers we explicitly welcome to public pages. They're
// already covered by the "*" rule, but naming them signals intent and guards
// against an accidental future block.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
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
