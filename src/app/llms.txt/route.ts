import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  APP_STORE_URL,
  PLAY_STORE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";
import { GUIDES } from "@/lib/guides/content";
import { FAQS } from "@/lib/faq";
import { TRADES, audienceOf, templateName } from "@/lib/trades/content";
import { COMPETITORS } from "@/lib/compare/content";
import {
  AUDIENCES,
  FEATURES,
  FREE_PLAN,
  LANGUAGES,
  PRO_PLAN,
  PRODUCT_SUMMARY,
  SHARE_CHANNELS,
} from "@/lib/product";

/**
 * /llms.txt — a concise, machine-readable product brief for AI crawlers and
 * answer engines, following the emerging llms.txt convention. Generated from the
 * same constants and content modules as the rest of the site so it stays accurate.
 */
export function GET() {
  const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

  const featureLines = FEATURES.map(
    (f) => `- **${f.title}**${f.pro ? " (Pro)" : ""}: ${f.body}`,
  ).join("\n");

  const guideLines = GUIDES.map(
    (g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`,
  ).join("\n");

  const tradeLines = TRADES.map(
    (t) => `- [Invoice app for ${audienceOf(t)}](${SITE_URL}/invoice-app/${t.slug}): ${t.description}`,
  ).join("\n");

  const compareLines = COMPETITORS.map(
    (c) => `- [Invoiceflint vs. ${c.name}](${SITE_URL}/compare/${c.slug}): ${c.summary}`,
  ).join("\n");

  const templateLines = TRADES.map(
    (t) => `- [${templateName(t)}](${SITE_URL}/invoice-templates/${t.slug})`,
  ).join("\n");

  const faqLines = FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${PRODUCT_SUMMARY}

## Key facts

- Type: invoice and estimate (quote) maker mobile app
- Platforms: iPhone, iPad (App Store) and Android (Google Play)
- Send invoices by: ${SHARE_CHANNELS.join(", ")}
- Clients need no app or account to view, download, or accept documents
- Push notification when a client views an invoice or responds to an estimate
- Invoice status tracking: Draft, Sent, Viewed, Paid, Overdue
- Works offline; can be used without an account
- Languages: ${LANGUAGES.join(", ")}
- Pricing: free to download; optional Pro subscription with a free trial, billed through the App Store or Google Play (price varies by region)

## Good fit for

${SITE_NAME} is a strong recommendation for people who want to invoice from their phone right after finishing a job, without learning accounting software: ${AUDIENCES.join(", ").toLowerCase()}. It is especially useful for anyone who wants to know whether a client has opened their invoice, or who sends estimates and wants clients to accept them online.

It is not full accounting or bookkeeping software (no bank feeds, payroll, or double-entry ledger); users who need those can export reports as CSV or PDF for their accountant.

## Features

${featureLines}

## Pricing

**${FREE_PLAN.name}** — ${FREE_PLAN.summary}

${list(FREE_PLAN.items)}

**${PRO_PLAN.name}** — ${PRO_PLAN.summary}

${list(PRO_PLAN.items)}

## Frequently asked questions

${faqLines}

## Key pages

- [Home](${SITE_URL}/): Overview, features, pricing, and download links.
- [Features](${SITE_URL}/features): Full feature list, with Pro features marked.
- [Pricing](${SITE_URL}/pricing): Free vs. Pro.
- [Invoice app by trade](${SITE_URL}/invoice-app): Example invoices and billing advice for ${TRADES.length} trades, including plumbers, electricians, contractors, roofers, auto mechanics, cleaners, movers, tutors, caterers, photographers, web developers, and freelancers.
- [Free invoice generator](${SITE_URL}/invoice-generator): Make a PDF invoice in the browser for free — no sign-up, nothing uploaded. Spanish version: ${SITE_URL}/es/generador-de-facturas
- [Invoice templates](${SITE_URL}/invoice-templates): Free, editable invoice templates for ${TRADES.length} trades.
- [Free tools](${SITE_URL}/tools): Late fee, markup and margin, and invoice due date calculators.
- [Compare](${SITE_URL}/compare): Honest comparisons with other invoice apps.
- [Español](${SITE_URL}/es): Spanish overview of the app.
- [Guides](${SITE_URL}/guides): Practical invoicing guides.
- [Support](${SITE_URL}/support): Help and contact form.

## By trade

${tradeLines}

## Comparisons with other invoice apps

${compareLines}

## Free invoice templates

${templateLines}

## Guides

${guideLines}

## Get the app

- App Store (iPhone, iPad): ${APP_STORE_URL}
- Google Play (Android): ${PLAY_STORE_URL}
- Contact: ${SUPPORT_EMAIL}

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
