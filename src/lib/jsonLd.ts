/**
 * Shared schema.org (JSON-LD) builders.
 *
 * Every builder returns a plain object embedded via
 * `<script type="application/ld+json">`. The Organization and WebSite nodes use
 * stable `@id`s (`#organization`, `#website`) so other nodes — SoftwareApplication,
 * Article, BreadcrumbList — can reference them instead of duplicating data.
 */
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SUPPORT_EMAIL,
  SAME_AS,
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: SAME_AS,
    contactPoint: {
      "@type": "ContactPoint",
      email: SUPPORT_EMAIL,
      contactType: "customer support",
    },
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationLd() {
  return {
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
    sameAs: SAME_AS,
    publisher: { "@id": ORG_ID },
    // TODO: add real `aggregateRating` (ratingValue + ratingCount) once we have
    // verified App Store / Play Store review data. Do NOT invent numbers —
    // fabricated ratings violate Google's structured-data policy.
  };
}

export type FaqItem = { question: string; answer: string };

export function faqLd(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleLd(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@type": "Article",
    "@id": `${opts.url}#article`,
    mainEntityOfPage: opts.url,
    url: opts.url,
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** Wrap one or more nodes in a single schema.org graph document. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

/** Ready-to-render `<script>` props for a JSON-LD document. */
export function jsonLdScript(doc: object) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(doc) },
  };
}
