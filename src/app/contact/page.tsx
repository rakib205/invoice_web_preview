"use client";

import { useEffect, useRef, useState } from "react";
import SiteShell from "@/components/SiteShell";

const RUST = "#b8412a";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
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
          Contact Us
        </h1>
        <p className="mt-3 text-zinc-600">
          Have a question or just want to say hi? We&apos;d love to hear from you. Fill out the form
          below and we&apos;ll get back to you within one business day.
        </p>

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
            <h2 className="mt-4 text-lg font-semibold text-green-800">Message sent!</h2>
            <p className="mt-1 text-sm text-green-700">
              Thanks for reaching out. We&apos;ll reply to <strong>{email}</strong> within one
              business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
            {/* Honeypot — hidden from humans, filled by bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] opacity-0"
            />

            <Field label="Name" htmlFor="contact-name">
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className={inputCls}
              />
            </Field>

            <Field label="Email" htmlFor="contact-email">
              <input
                id="contact-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className={inputCls}
              />
            </Field>

            <Field label="Message" htmlFor="contact-message">
              <textarea
                id="contact-message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
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
              {status === "sending" ? "Sending…" : "Send message"}
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
