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

function fmtExpiry(d: string | null): string {
  if (!d) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d.trim());
  if (!m) return d;
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5 8.5 15 16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.5 5.5 14.5 14.5M14.5 5.5 5.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 6.5v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

  if (!respondable && !finalized) return null;

  /* ── Finalized state ── */
  if (finalized) {
    const accepted = status === "accepted";
    return (
      <div
        className={`border-b print:hidden ${
          accepted
            ? "border-emerald-100 bg-gradient-to-r from-emerald-50 to-emerald-50/20"
            : "border-zinc-100 bg-zinc-50/80"
        }`}
      >
        <div className="relative px-6 py-5 sm:px-10">
          <div
            className="absolute inset-y-0 left-0 w-1.5"
            style={{ backgroundColor: "#b8412a" }}
          />
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
                accepted ? "bg-emerald-600 text-white" : "bg-zinc-400 text-white"
              }`}
            >
              {accepted ? <IconCheck className="h-4.5 w-4.5" /> : <IconX className="h-4 w-4" />}
            </div>
            <div>
              <p
                className={`text-sm font-semibold ${
                  accepted ? "text-emerald-900" : "text-zinc-700"
                }`}
              >
                {accepted ? "You accepted this estimate" : "You declined this estimate"}
              </p>
              <p className={`mt-0.5 text-xs ${accepted ? "text-emerald-700" : "text-zinc-500"}`}>
                The sender has been notified.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Awaiting response ── */
  return (
    <div
      className={`border-b print:hidden ${
        expired
          ? "border-amber-100 bg-gradient-to-r from-amber-50 to-amber-50/10"
          : "border-emerald-100 bg-gradient-to-r from-emerald-50/90 to-white"
      }`}
    >
      <div className="relative px-6 py-5 sm:px-10">
        <div
          className="absolute inset-y-0 left-0 w-1.5"
          style={{ backgroundColor: "#b8412a" }}
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: context */}
          <div className="flex items-start gap-3.5">
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
                expired ? "bg-amber-400 text-white" : "bg-emerald-600 text-white"
              }`}
            >
              {expired ? <IconClock className="h-4.5 w-4.5" /> : <IconCheck className="h-4.5 w-4.5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {expired ? "This estimate has expired" : "Your response is needed"}
              </p>
              <p className="mt-0.5 text-sm text-zinc-600">
                {expired
                  ? "The acceptance window has closed. You may still decline to notify the sender."
                  : "Accept to move forward, or decline if you’d like to pass on this estimate."}
              </p>
              {expiryDate && !expired ? (
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-zinc-500">
                  <IconClock className="h-3.5 w-3.5 text-zinc-400" />
                  Valid until {fmtExpiry(expiryDate)}
                </p>
              ) : null}
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2.5 sm:shrink-0 sm:pl-4">
            {!expired ? (
              <button
                type="button"
                disabled={Boolean(loading)}
                onClick={() => void post("accept")}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconCheck className="h-4 w-4" />
                {loading === "accept" ? "Working…" : "Accept estimate"}
              </button>
            ) : null}
            <button
              type="button"
              disabled={Boolean(loading)}
              onClick={() => void post("reject")}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconX className="h-3.5 w-3.5" />
              {loading === "reject" ? "Working…" : "Decline"}
            </button>
          </div>
        </div>

        {message ? (
          <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-amber-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
