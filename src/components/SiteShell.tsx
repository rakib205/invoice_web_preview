import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";


export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950 flex flex-col">
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>

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
