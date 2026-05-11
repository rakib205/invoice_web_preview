import Image from "next/image";
import Link from "next/link";

const RUST = "#b8412a";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950 flex flex-col">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="InvoiceFlint"
            width={200}
            height={52}
            className="h-10 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
          <Link href="/#features" className="hover:text-zinc-950">Features</Link>
          <Link href="/#download" className="hover:text-zinc-950">Download</Link>
          <Link href="/support" className="hover:text-zinc-950">Support</Link>
        </nav>
        <Link
          href="/#download"
          className="rounded-full px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          style={{ backgroundColor: RUST }}
        >
          Get the app
        </Link>
      </header>

      <div className="flex-1">{children}</div>

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
            <Link href="/privacy" className="hover:text-zinc-900">Privacy</Link>
            <Link href="/contact" className="hover:text-zinc-900">Contact</Link>
            <Link href="/support" className="hover:text-zinc-900">Support</Link>
          </div>
          <div>© {new Date().getFullYear()} Invoiceflint</div>
        </div>
      </footer>
    </main>
  );
}
