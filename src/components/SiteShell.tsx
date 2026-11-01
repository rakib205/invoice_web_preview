import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Page chrome for marketing pages. `locale="es"` switches the nav and footer to
 * Spanish and marks the page content as Spanish (the root <html> stays "en").
 */
export default function SiteShell({ children, locale = "en" }: { children: React.ReactNode; locale?: "en" | "es" }) {
  return (
    <main lang={locale} className="min-h-screen bg-paper text-zinc-950 flex flex-col">
      <Suspense fallback={null}>
        <SiteHeader locale={locale} />
      </Suspense>

      <div className="flex-1">{children}</div>

      <SiteFooter locale={locale} />
    </main>
  );
}
