import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

const SUFFIX = ` — ${SITE_NAME}`;
/** Google shows roughly 60 characters of a title before cutting it off. */
const MAX_TITLE = 60;

/**
 * Metadata for a marketing page. Always use this rather than hand-writing
 * `openGraph`/`twitter`: Next.js replaces (not merges) those objects per
 * segment, so a page that sets its own `openGraph` without `images` silently
 * loses the site's social image, and the layout's `twitter` title would show
 * the home page's title on every page.
 *
 * - Adds " — Invoiceflint" only when the title still fits in ~60 characters.
 * - Uses the site-wide /opengraph-image unless `ownImage` is set. Routes with
 *   their own `opengraph-image.tsx` must pass `ownImage: true`: an image set
 *   here would win over the route's file.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  locale,
  languages,
  published,
  modified,
  ownImage = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  locale?: string;
  languages?: Record<string, string>;
  published?: string;
  modified?: string;
  ownImage?: boolean;
}): Metadata {
  const full = title.length + SUFFIX.length <= MAX_TITLE ? `${title}${SUFFIX}` : title;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: full,
      description,
      url: path,
      ...(locale ? { locale } : {}),
      ...(type === "article" && published ? { publishedTime: published, modifiedTime: modified ?? published } : {}),
      ...(ownImage ? {} : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} — invoice and estimate app` }] }),
    },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
