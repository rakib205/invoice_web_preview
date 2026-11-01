import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-paper text-zinc-950 flex flex-col">
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>

      <div className="flex-1">{children}</div>

      <SiteFooter />
    </main>
  );
}
