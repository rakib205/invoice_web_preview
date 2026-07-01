import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/lib/site";
import { GUIDES } from "@/lib/guides/content";

/**
 * /llms.txt — a concise, machine-readable product summary for AI crawlers and
 * answer engines, following the emerging llms.txt convention. Generated from the
 * same constants and content module as the rest of the site so it stays accurate.
 */
export function GET() {
  const guideLines = GUIDES.map(
    (g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`,
  ).join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a free invoicing app for freelancers, contractors, and small businesses. Create, send, and track professional invoices and estimates from your phone, see the moment a client opens an invoice, and convert an approved estimate into an invoice with one tap. Available on iOS and Android.

## Key pages

- [Home](${SITE_URL}/): Overview and download links.
- [Features](${SITE_URL}/features): What ${SITE_NAME} does — read receipts, payment status tracking, estimate-to-invoice conversion.
- [Pricing](${SITE_URL}/pricing): ${SITE_NAME} is free to download and use.
- [Guides](${SITE_URL}/guides): Practical invoicing guides.

## Guides

${guideLines}

## Get the app

- App Store (iOS): ${APP_STORE_URL}
- Google Play (Android): ${PLAY_STORE_URL}

## Notes

- Invoice and estimate documents shared with clients live under /inv/ and /est/ and are private, token-gated, and not indexed.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
