import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides/content";
import { TRADES } from "@/lib/trades/content";
import { COMPETITORS } from "@/lib/compare/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/features", changeFrequency: "monthly", priority: 0.8 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.7 },
    { path: "/invoice-app", changeFrequency: "monthly", priority: 0.8 },
    { path: "/invoice-generator", changeFrequency: "monthly", priority: 0.9 },
    { path: "/invoice-templates", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools", changeFrequency: "monthly", priority: 0.7 },
    { path: "/tools/late-fee-calculator", changeFrequency: "monthly", priority: 0.7 },
    { path: "/tools/markup-calculator", changeFrequency: "monthly", priority: 0.7 },
    { path: "/tools/invoice-due-date-calculator", changeFrequency: "monthly", priority: 0.7 },
    { path: "/compare", changeFrequency: "monthly", priority: 0.6 },
    { path: "/es", changeFrequency: "monthly", priority: 0.8 },
    { path: "/es/generador-de-facturas", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/support", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  // Guide detail pages, kept in sync with the content module automatically.
  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.dateModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tradeEntries: MetadataRoute.Sitemap = TRADES.map((trade) => ({
    url: `${SITE_URL}/invoice-app/${trade.slug}`,
    lastModified: new Date(trade.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const templateEntries: MetadataRoute.Sitemap = TRADES.map((trade) => ({
    url: `${SITE_URL}/invoice-templates/${trade.slug}`,
    lastModified: new Date(trade.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const compareEntries: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: new Date(c.checked),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...tradeEntries, ...templateEntries, ...compareEntries, ...guideEntries];
}
