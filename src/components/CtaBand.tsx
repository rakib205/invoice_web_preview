import StoreBadges from "@/components/StoreBadges";

/** Closing download call-to-action used at the bottom of marketing pages. */
export default function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white sm:px-14">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rust/40 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
            <p className="mt-3 text-zinc-300">{body}</p>
          </div>
          <StoreBadges tone="light" />
        </div>
      </div>
    </section>
  );
}
