import Image from "next/image";

const RUST = "#b8412a";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950 overflow-hidden">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a href="/">
          <Image
            src="/logo.png"
            alt="InvoiceFlint"
            width={200}
            height={52}
            className="h-10 w-auto object-contain"
            priority
            unoptimized
          />
        </a>
        <a
          href="#download"
          className="rounded-full px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: RUST }}
        >
          Get the app
        </a>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pt-10 pb-24 lg:grid-cols-2 lg:gap-8 lg:pt-16">
        {/* Background blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(184,65,42,0.15) 0%, rgba(184,65,42,0.06) 50%, transparent 80%)" }}
        />

        <div className="relative flex flex-col justify-center">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
            style={{ borderColor: "#e8c4bc", backgroundColor: "#fdf3f1", color: RUST }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: RUST }} />
            Now available on iOS and Android
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#0a1729] sm:text-5xl lg:text-6xl">
            Invoices that get
            <br />
            <span style={{ color: RUST }}>paid faster.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
            Create, send, and track professional invoices and estimates from your phone. Know the moment a client opens your invoice — and get paid without the back-and-forth.
          </p>

          {/* CTA buttons */}
          <div id="download" className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://apps.apple.com/app/id6761787578"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: "#0a1729" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                <path d="M16.365 12.86c.02 2.62 2.296 3.49 2.32 3.5-.02.06-.36 1.24-1.18 2.46-.71 1.06-1.45 2.11-2.61 2.13-1.14.03-1.51-.67-2.81-.67-1.31 0-1.71.65-2.79.7-1.13.05-1.99-1.14-2.7-2.2-1.45-2.16-2.56-6.1-1.07-8.77.74-1.32 2.06-2.16 3.49-2.18 1.1-.02 2.13.74 2.81.74.67 0 1.93-.92 3.26-.78.55.02 2.1.22 3.09 1.68-.08.05-1.85 1.08-1.83 3.22M14.2 5.4c.6-.74 1.01-1.76.9-2.79-.87.04-1.93.59-2.55 1.32-.56.65-1.05 1.69-.92 2.7.97.07 1.96-.49 2.57-1.23"/>
              </svg>
              <div className="leading-tight text-left">
                <div className="text-[10px] uppercase tracking-wide text-zinc-300">Download on the</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mrblab.invoice"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: "#0a1729" }}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7">
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.2-9.7L3.6 2.3Z" fill="#34d399"/>
                <path d="M16.4 9 13.7 11.8l2.7 2.8 3.4-2c.9-.5.9-1.7 0-2.2L16.4 9Z" fill="#fbbf24"/>
                <path d="M3.6 21.7c.4.4 1.1.5 1.8.1l11-6.5-2.7-2.8L3.6 21.7Z" fill="#ef4444"/>
                <path d="M3.6 2.3 13.7 12l2.7-2.8L5.4 2.7c-.7-.4-1.4-.4-1.8-.4Z" fill="#60a5fa"/>
              </svg>
              <div className="leading-tight text-left">
                <div className="text-[10px] uppercase tracking-wide text-zinc-300">GET IT ON</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </a>
          </div>

        </div>

        {/* Phone frames */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative h-[620px] w-full max-w-[560px]">
            <PhoneFrame
              src="/screenshots/screen-2.png"
              className="absolute right-0 top-6 rotate-[6deg] sm:right-2"
            />
            <PhoneFrame
              src="/screenshots/screen-1.png"
              className="absolute left-0 top-0 -rotate-[4deg] sm:left-4"
            />
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Send in seconds",
              body: "Build invoices and estimates from a clean, mobile-first form.",
              icon: <path d="M3 12l18-9-9 18-2-7-7-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>,
            },
            {
              title: "Live read receipts",
              body: "See the moment a client views your invoice — no more guessing.",
              icon: (
                <>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                </>
              ),
            },
            {
              title: "Track payment status",
              body: "Draft → Sent → Viewed → Paid. Always know where you stand.",
              icon: (
                <>
                  <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.8"/>
                </>
              ),
            },
            {
              title: "Estimates → Invoices",
              body: "Convert an approved estimate to an invoice with one tap.",
              icon: <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>,
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#fdf3f1", color: RUST }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">{f.icon}</svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#0a1729]">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a1729] px-8 py-14 text-white sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(184,65,42,0.35)" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Start sending invoices today.
              </h2>
              <p className="mt-3 text-zinc-300">
                Download Invoiceflint on iPhone or Android and send your first invoice in under a minute.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://apps.apple.com/app/id6761787578" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-[#0a1729] hover:bg-zinc-100">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                  <path d="M16.365 12.86c.02 2.62 2.296 3.49 2.32 3.5-.02.06-.36 1.24-1.18 2.46-.71 1.06-1.45 2.11-2.61 2.13-1.14.03-1.51-.67-2.81-.67-1.31 0-1.71.65-2.79.7-1.13.05-1.99-1.14-2.7-2.2-1.45-2.16-2.56-6.1-1.07-8.77.74-1.32 2.06-2.16 3.49-2.18 1.1-.02 2.13.74 2.81.74.67 0 1.93-.92 3.26-.78.55.02 2.1.22 3.09 1.68-.08.05-1.85 1.08-1.83 3.22M14.2 5.4c.6-.74 1.01-1.76.9-2.79-.87.04-1.93.59-2.55 1.32-.56.65-1.05 1.69-.92 2.7.97.07 1.96-.49 2.57-1.23"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wide text-zinc-500">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.mrblab.invoice" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-[#0a1729] hover:bg-zinc-100">
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.2-9.7L3.6 2.3Z" fill="#10b981"/>
                  <path d="M16.4 9 13.7 11.8l2.7 2.8 3.4-2c.9-.5.9-1.7 0-2.2L16.4 9Z" fill="#f59e0b"/>
                  <path d="M3.6 21.7c.4.4 1.1.5 1.8.1l11-6.5-2.7-2.8L3.6 21.7Z" fill="#ef4444"/>
                  <path d="M3.6 2.3 13.7 12l2.7-2.8L5.4 2.7c-.7-.4-1.4-.4-1.8-.4Z" fill="#3b82f6"/>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] uppercase tracking-wide text-zinc-500">GET IT ON</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
          <Image
            src="/logo.png"
            alt="Invoiceflint"
            width={140}
            height={36}
            className="h-7 w-auto object-contain opacity-70"
            unoptimized
          />
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-zinc-900">Privacy</a>
            <a href="/contact" className="hover:text-zinc-900">Contact</a>
            <a href="/support" className="hover:text-zinc-900">Support</a>
          </div>
          <div>© {new Date().getFullYear()} Invoiceflint</div>
        </div>
      </footer>
    </main>
  );
}

function PhoneFrame({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div
      className={`relative h-[600px] w-[290px] rounded-[44px] bg-[#0a1729] p-3 shadow-[0_30px_80px_-20px_rgba(10,23,41,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-zinc-100">
        <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-[#0a1729]" />
        <Image
          src={src}
          alt="App screenshot"
          fill
          sizes="290px"
          className="object-cover object-top"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
