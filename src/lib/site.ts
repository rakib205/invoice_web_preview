/** Canonical production origin. Override with NEXT_PUBLIC_SITE_URL for previews. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://invoiceflint.com"
).replace(/\/$/, "");

export const SITE_NAME = "Invoiceflint";

export const SITE_DESCRIPTION =
  "Create, send, and track professional invoices and estimates from your phone. See the moment a client opens your invoice and get paid faster. Free on iOS and Android.";

export const APP_STORE_URL = "https://apps.apple.com/app/id6761787578";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mrblab.invoice";
