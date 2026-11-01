/** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL for previews. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://invoiceflint.com"
).replace(/\/$/, "");

export const SITE_NAME = "Invoiceflint";

export const SITE_DESCRIPTION =
  "Invoice and estimate maker app for iPhone and Android. Send invoices from your phone by email or WhatsApp, see when clients open them, and get paid faster.";

export const APP_STORE_URL = "https://apps.apple.com/app/id6761787578";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mrblab.invoice";

/** Primary contact address surfaced in schema.org contactPoint. */
export const SUPPORT_EMAIL = "hello@invoiceflint.com";

/**
 * Authoritative external profiles for the Invoiceflint entity. Used as
 * schema.org `sameAs` to reinforce the knowledge-graph identity. Add social
 * profile URLs (X, LinkedIn, etc.) here as they come online.
 */
export const SAME_AS: string[] = [APP_STORE_URL, PLAY_STORE_URL];
