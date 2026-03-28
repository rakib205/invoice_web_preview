"use client";

import { useCallback, useMemo, useState } from "react";

function isExpiredUtc(expiryDate: string | null): boolean {
  if (!expiryDate || !expiryDate.trim()) return false;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(expiryDate.trim());
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const today = new Date();
  const utcToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const utcExpiry = Date.UTC(y, mo - 1, d);
  return utcExpiry < utcToday;
}

type Props = {
  token: string;
  initialStatus: string | null;
  expiryDate: string | null;
};

export function EstimateRespond({ token, initialStatus, expiryDate }: Props) {
  const [status, setStatus] = useState((initialStatus ?? "").toLowerCase());
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const expired = useMemo(() => isExpiredUtc(expiryDate), [expiryDate]);

  const respondable = status === "sent" || status === "viewed";
  const finalized = status === "accepted" || status === "rejected";

  const post = useCallback(
    async (action: "accept" | "reject") => {
      setLoading(action);
      setMessage(null);
      try {
        const res = await fetch(`/api/public/estimate-respond/${encodeURIComponent(token)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
          cache: "no-store",
        });
        const data = (await res.json().catch(() => ({}))) as {
          changed?: boolean;
          status?: string;
          error_code?: string;
        };
        if (res.status === 404) {
          setMessage("This estimate could not be found.");
          return;
        }
        if (data.error_code === "expired" && action === "accept") {
          setMessage("This estimate is no longer valid (past its expiry date).");
          return;
        }
        if (data.status === "accepted" || data.status === "rejected") {
          setStatus(data.status);
          return;
        }
        if (!data.changed && respondable) {
          setMessage("Could not update — please refresh the page.");
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(null);
      }
    },
    [token, respondable],
  );

  if (!respondable && !finalized) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 print:hidden">
      <div className="text-sm font-semibold text-zinc-900">Your response</div>
      {finalized ? (
        <p className="mt-2 text-sm text-zinc-700">
          You {status === "accepted" ? "accepted" : "declined"} this estimate. The sender has been notified.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-zinc-600">
            {expired
              ? "This estimate has expired. You can still decline it below."
              : "You can accept or decline this estimate."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={Boolean(loading) || expired}
              onClick={() => void post("accept")}
              className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading === "accept" ? "Working…" : "Accept"}
            </button>
            <button
              type="button"
              disabled={Boolean(loading)}
              onClick={() => void post("reject")}
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading === "reject" ? "Working…" : "Decline"}
            </button>
          </div>
        </>
      )}
      {message ? <p className="mt-3 text-sm text-amber-800">{message}</p> : null}
    </div>
  );
}
