import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Breadcrumb + H1 + intro used by the tool, template, and comparison pages.
 * The last crumb is the current page (no href).
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  children,
  center = false,
  width = "7xl",
}: {
  crumbs: Array<{ href?: string; label: string }>;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
  /** Match the content column below, so the headline lines up with it. */
  width?: "7xl" | "5xl";
}) {
  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184,65,42,0.13) 0%, rgba(184,65,42,0.05) 50%, transparent 80%)" }}
      />
      <section className={`relative mx-auto w-full ${width === "5xl" ? "max-w-5xl" : "max-w-7xl"} px-4 pb-10 pt-6 sm:px-6 lg:pt-10`}>
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-zinc-700" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={`mt-8 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
          {eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full border border-rust-line bg-rust-soft px-3 py-1 text-xs font-medium text-rust">
              <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-5xl">
            {title}
          </h1>
          {children && <div className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">{children}</div>}
        </div>
      </section>
    </div>
  );
}
