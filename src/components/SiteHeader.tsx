"use client";

import { useSearchParams } from "next/navigation";
import SiteNav from "@/components/SiteNav";

/** Site navigation, hidden when a page is opened inside the app (`?app`). */
export default function SiteHeader({ locale = "en" }: { locale?: "en" | "es" }) {
  const params = useSearchParams();
  if (params.has("app")) return null;

  return <SiteNav locale={locale} />;
}
