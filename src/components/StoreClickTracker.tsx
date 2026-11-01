"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

/**
 * Reports every App Store / Google Play link click to Vercel Analytics as a
 * `store_click` event with the page it came from and where on the page it was
 * (the nearest `data-placement`, e.g. "hero", "cta-band", "footer"). Links with
 * a `data-track` attribute report that event name instead (e.g. the nav's "Get
 * the app"). One delegated listener covers server-rendered links too.
 */
export default function StoreClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const store = href.startsWith(APP_STORE_URL) ? "ios" : href.startsWith(PLAY_STORE_URL) ? "android" : null;
      const custom = link.getAttribute("data-track");
      if (!store && !custom) return;

      const placement = link.closest("[data-placement]")?.getAttribute("data-placement") ?? "other";
      const path = window.location.pathname;
      if (store) track("store_click", { store, path, placement });
      else if (custom) track(custom, { path, placement });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
