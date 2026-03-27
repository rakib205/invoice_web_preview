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
      })
        .then((res) => {
          // Persist dedupe only after a successful/no-op response.
          // If tracking fails (500/network), allow retry on next open.
          if (res.ok || res.status === 404) {
            sessionStorage.setItem(key, "1");
          }
        })
        .catch(() => {
          // Best-effort tracking; failures are intentionally silent for public viewers.
        });
    }, TRACK_DELAY_MS);

    return () => window.clearTimeout(handle);
  }, [token]);

  return null;
}
