import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/invoice-app", label: "Who it's for" },
  { href: "/guides", label: "Guides" },
  { href: "/support", label: "Support" },
];

/**
 * Top navigation. A server component so the links are in the initial HTML for
 * crawlers. `SiteHeader` wraps it to hide it inside the mobile app's webview.
 */
export default function SiteNav() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link href="/" aria-label="Invoiceflint home" className="shrink-0">
        <Image
          src="/logo.png"
          alt="Invoiceflint"
          width={240}
          height={40}
          className="h-8 w-auto object-contain sm:h-10"
          priority
          unoptimized
        />
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#download"
          className="rounded-full bg-rust px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Get the app
        </Link>
      </nav>
    </header>
  );
}
