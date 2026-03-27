"use client";

import { useEffect } from "react";

const TRACK_DELAY_MS = 2500;

export function ViewTracker({ token }: { token: string }) {
  useEffect(() => {
    const key = `invoice_view_tracked_${token}`;
    if (sessionStorage.getItem(key) === "1") return;

    const handle = window.setTimeout(() => {
      fetch(`/api/public/viewed/${encodeURIComponent(token)}`, {
        method: "POST",
        cache: "no-store",
        keepalive: true,
      }).catch(() => {
        // Best-effort tracking; failures are intentionally silent for public viewers.
      });
      sessionStorage.setItem(key, "1");
    }, TRACK_DELAY_MS);

    return () => window.clearTimeout(handle);
  }, [token]);

  return null;
}
