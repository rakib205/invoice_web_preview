import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides/content";
import { TRADES, audienceOf } from "@/lib/trades/content";

const COLUMNS: Array<{
  title: string;
  links: Array<{ href: string; label: string; external?: boolean }>;
}> = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: APP_STORE_URL, label: "iPhone app", external: true },
      { href: PLAY_STORE_URL, label: "Android app", external: true },
    ],
  },
  {
    title: "Invoice app for",
    links: [
      ...TRADES.slice(0, 6).map((t) => ({ href: `/invoice-app/${t.slug}`, label: audienceOf(t).replace(/^./, (c) => c.toUpperCase()) })),
      { href: "/invoice-app", label: "All trades" },
    ],
  },
  {
    title: "Guides",
    links: [
      ...GUIDES.slice(0, 6).map((g) => ({ href: `/guides/${g.slug}`, label: g.title.split(":")[0] })),
      { href: "/guides", label: "All guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/support", label: "Support" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Image
            src="/logo.png"
            alt="Invoiceflint"
            width={168}
            height={28}
            className="h-7 w-auto object-contain"
            unoptimized
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            The invoice and estimate maker for iPhone and Android. Send
            invoices from your phone and know the moment clients open them.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-ink">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-100">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} Invoiceflint
        </div>
      </div>
    </footer>
  );
}
