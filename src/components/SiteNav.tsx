import Image from "next/image";
import Link from "next/link";

const NAV = {
  en: {
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/invoice-app", label: "Who it's for" },
      { href: "/tools", label: "Free tools" },
      { href: "/guides", label: "Guides" },
      { href: "/support", label: "Support" },
    ],
    home: "/",
    homeLabel: "Invoiceflint home",
    cta: { href: "/#download", label: "Get the app" },
  },
  es: {
    links: [
      { href: "/es#funciones", label: "Funciones" },
      { href: "/es#precios", label: "Precios" },
      { href: "/es/generador-de-facturas", label: "Generador de facturas" },
      { href: "/", label: "English" },
    ],
    home: "/es",
    homeLabel: "Invoiceflint inicio",
    cta: { href: "/es#descargar", label: "Descargar la app" },
  },
};

/**
 * Top navigation. A server component so the links are in the initial HTML for
 * crawlers. `SiteHeader` wraps it to hide it inside the mobile app's webview.
 */
export default function SiteNav({ locale = "en" }: { locale?: "en" | "es" }) {
  const nav = NAV[locale];
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link href={nav.home} aria-label={nav.homeLabel} className="shrink-0">
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
        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.links.map((l) => (
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
          href={nav.cta.href}
          data-track="get_app_click"
          data-placement="nav"
          className="rounded-full bg-rust px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          {nav.cta.label}
        </Link>
      </nav>
    </header>
  );
}
