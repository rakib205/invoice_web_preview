"use client";

import { useEffect, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";

const RUST = "#b8412a";

const CATEGORIES = [
  "Billing & Subscription",
  "App Bug / Error",
  "Invoice / Estimate Issue",
  "Account Access",
  "Feature Request",
  "Other",
] as const;

type Status = "idle" | "sending" | "success" | "error";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadedAt = useRef<number>(0);

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value;

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
          website: honeypot,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Support
        </h1>
        <p className="mt-3 text-zinc-600">
          Running into a problem? Tell us what&apos;s happening and we&apos;ll get you sorted. We
          respond to all support tickets as soon as possible.
        </p>

        {/* Quick help links */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              label: "Billing questions",
              desc: "Subscriptions, receipts, refunds",
              icon: (
                <path
                  d="M3 10h18M3 14h18M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ),
            },
            {
              label: "App issues",
              desc: "Bugs, crashes, errors",
              icon: (
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ),
            },
            {
              label: "Account access",
              desc: "Login, password, data",
              icon: (
                <>
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </>
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 flex items-start gap-3"
            >
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#fdf3f1", color: RUST }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  {item.icon}
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#0a1729]">{item.label}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {status === "success" ? (
          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto h-12 w-12 text-green-500"
              strokeWidth="1.8"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="mt-4 text-lg font-semibold text-green-800">Ticket submitted!</h2>
            <p className="mt-1 text-sm text-green-700">
              We&apos;ve received your request and will reply to <strong>{email}</strong> soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
              className="absolute left-[-9999px] opacity-0"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Name" htmlFor="support-name">
                <input
                  id="support-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className={inputCls}
                />
              </Field>

              <Field label="Email" htmlFor="support-email">
                <input
                  id="support-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Category" htmlFor="support-category">
              <select
                id="support-category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputCls} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Select a category…
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Describe the issue" htmlFor="support-message">
              <textarea
                id="support-message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What happened? What were you trying to do? Include any error messages."
                className={`${inputCls} resize-none`}
              />
            </Field>

            {status === "error" && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: RUST }}
            >
              {status === "sending" ? "Submitting…" : "Submit ticket"}
            </button>
          </form>
        )}
      </section>
    </SiteShell>
  );
}

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-[#b8412a] focus:ring-2 focus:ring-[#b8412a]/20";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
      {children}
    </div>
  );
}
