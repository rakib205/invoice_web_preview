"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RUST = "#b8412a";

export default function SiteHeader() {
  const params = useSearchParams();
  if (params.has("app")) return null;

  return (
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
      <Link
        href="/#download"
        className="rounded-full px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        style={{ backgroundColor: RUST }}
      >
        Get the app
      </Link>
    </header>
  );
}
