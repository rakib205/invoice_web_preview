import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Hand-built app screens for the home page tour (AppShowcase). Each screen sits
 * inside a `group` whose `data-on` is "true" while it's the active step; the
 * animation classes below only run then, so every visit to a step replays its
 * animation. Base styles are always the *final* state, so reduced-motion users
 * (motion-safe: off) and the screen fading out both show the finished picture.
 */

const IN = "motion-safe:group-data-[on=true]:animate-showcase-in";
const POP = "motion-safe:group-data-[on=true]:animate-showcase-pop";
const DROP = "motion-safe:group-data-[on=true]:animate-showcase-drop";
const SHEET = "motion-safe:group-data-[on=true]:animate-showcase-sheet";
const FADE = "motion-safe:group-data-[on=true]:animate-showcase-fade";
const OUT = "motion-safe:group-data-[on=true]:animate-showcase-out";
const GROW = "motion-safe:group-data-[on=true]:animate-showcase-grow";
const GROW_X = "motion-safe:group-data-[on=true]:animate-showcase-grow-x";
const DRAW = "motion-safe:group-data-[on=true]:animate-showcase-draw";
const TAP = "motion-safe:group-data-[on=true]:animate-showcase-tap";

const at = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className={IN}>
      <p className="text-[11px] font-medium text-zinc-500">{eyebrow}</p>
      <p className="mt-0.5 font-serif text-[24px] font-bold leading-tight text-ink">{title}</p>
    </div>
  );
}

function Pill({ tone, children, className = "", style }: { tone: keyof typeof TONES; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={`inline-block rounded px-1.5 py-px text-[10px] font-medium ${TONES[tone]} ${className}`} style={style}>
      {children}
    </span>
  );
}

const TONES = {
  paid: "bg-emerald-50 text-emerald-700",
  viewed: "bg-sky-50 text-sky-700",
  sent: "bg-zinc-100 text-zinc-600",
  overdue: "bg-red-50 text-red-700",
  draft: "bg-amber-50 text-amber-700",
};

function Glyph({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${className}`} aria-hidden>
      <path d={d} />
    </svg>
  );
}

const CHECK = "m5 12.5 4.5 4.5L19 7.5";

/* 1 — Create an invoice */
function CreateScreen() {
  const lines = [
    { name: "Brand identity design", qty: "1 × $2,500.00", amount: "$2,500.00" },
    { name: "Menu photography", qty: "1 × $950.00", amount: "$950.00" },
    { name: "Website copy (pages)", qty: "4 × $120.00", amount: "$480.00" },
  ];
  return (
    <div className="px-4 pt-11">
      <Header eyebrow="INV-1047 · Draft" title="New invoice" />
      <div className={`mt-3 flex items-center gap-3 rounded-xl bg-white p-3 ${IN}`} style={at(0.15)}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rust-soft text-[12px] font-semibold text-rust">BC</span>
        <div>
          <p className="text-[13px] font-semibold text-ink">Bluebird Cafe</p>
          <p className="text-[10.5px] text-zinc-400">hello@bluebird.cafe</p>
        </div>
      </div>
      <p className={`mt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ${IN}`} style={at(0.3)}>Items</p>
      <ul className="mt-1.5 space-y-1.5">
        {lines.map((line, i) => (
          <li key={line.name} className={`flex items-center justify-between rounded-xl bg-white px-3 py-2 ${IN}`} style={at(0.45 + i * 0.3)}>
            <div>
              <p className="text-[12px] font-semibold text-ink">{line.name}</p>
              <p className="text-[10px] text-zinc-400">{line.qty}</p>
            </div>
            <p className="text-[12px] font-semibold tabular-nums text-ink">{line.amount}</p>
          </li>
        ))}
      </ul>
      <div className={`mt-3 space-y-1 rounded-xl bg-white px-3 py-2.5 text-[11px] text-zinc-500 ${IN}`} style={at(1.45)}>
        <p className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">$3,930.00</span></p>
        <p className="flex justify-between"><span>Sales tax (8%)</span><span className="tabular-nums">$314.40</span></p>
        <p className="flex justify-between border-t border-zinc-100 pt-1.5 text-[13px] font-semibold text-ink">
          <span>Total</span><span className="tabular-nums text-rust">$4,244.40</span>
        </p>
      </div>
      <div className={`mt-3 rounded-xl border border-dashed border-zinc-300 bg-white/60 px-3 pb-1 pt-2 ${IN}`} style={at(1.75)}>
        <p className="text-[9.5px] uppercase tracking-wider text-zinc-400">Signature</p>
        <svg viewBox="0 0 200 44" className="h-10 w-full text-ink" aria-hidden>
          <path
            d="M8 30c10-18 18-22 20-12s-6 18 2 14 14-24 20-20-6 22 2 18 10-14 16-12 0 12 8 8 12-16 20-12 4 10 12 8 16-8 30-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            className={DRAW}
            style={at(2.0)}
          />
        </svg>
      </div>
      <div className={`mt-3 rounded-xl bg-ink py-2.5 text-center text-[13px] font-semibold text-white ${POP}`} style={at(3.0)}>
        Save &amp; send
      </div>
    </div>
  );
}

/* 2 — Send by link, email, WhatsApp, PDF, print */
function SendScreen() {
  const options = [
    { label: "Share link", hint: "Any app on your phone", d: "M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1 1M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1-1", tone: "bg-indigo-50 text-indigo-600" },
    { label: "Email", hint: "Straight to the client", d: "M3 6h18v12H3zM3 7l9 6 9-6", tone: "bg-sky-50 text-sky-600" },
    { label: "WhatsApp", hint: "Prefilled message", d: "M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.3a8.5 8.5 0 1 1 15.8-4.2Z", tone: "bg-emerald-50 text-emerald-600", picked: true },
    { label: "Send PDF", hint: "Share the file", d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5", tone: "bg-red-50 text-red-600" },
    { label: "Print", hint: "Or save a paper copy", d: "M6 9V3h12v6M6 18H4v-7h16v7h-2M6 14h12v7H6z", tone: "bg-zinc-100 text-zinc-600" },
  ];
  return (
    <div className="relative h-full px-4 pt-11">
      <Header eyebrow="Bluebird Cafe" title="INV-1047" />
      <div className="mt-3 rounded-xl bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rust text-[10px] font-bold text-white">LS</span>
          <span className="text-[11px] font-semibold tracking-widest text-zinc-300">INVOICE</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {[80, 64, 72, 48].map((w) => (
            <div key={w} className="h-1.5 rounded-full bg-zinc-100" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="mt-3 text-right text-[13px] font-semibold text-ink">$4,244.40</p>
      </div>
      <div className={`absolute inset-0 bg-ink/40 ${FADE}`} style={at(0.2)} />
      <div className={`absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-4 pb-6 pt-2.5 ${SHEET}`} style={at(0.3)}>
        <div className="mx-auto h-1 w-9 rounded-full bg-zinc-200" />
        <p className="mt-3 text-[14px] font-semibold text-ink">Send invoice</p>
        <p className="text-[10.5px] text-zinc-400">Choose how to deliver INV-1047</p>
        <ul className="mt-3 space-y-1.5">
          {options.map((o, i) => (
            <li
              key={o.label}
              className={`relative flex items-center gap-3 rounded-xl px-2.5 py-2 ring-1 ${o.picked ? "bg-emerald-50/70 ring-emerald-200" : "ring-zinc-100"} ${IN}`}
              style={at(0.75 + i * 0.12)}
            >
              {o.picked && <span className={`absolute inset-0 rounded-xl ${TAP}`} style={at(1.9)} />}
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${o.tone}`}>
                <Glyph d={o.d} />
              </span>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-ink">{o.label}</p>
                <p className="text-[10px] text-zinc-400">{o.hint}</p>
              </div>
              <Glyph d="m9 6 6 6-6 6" className="h-3.5 w-3.5 text-zinc-300" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 3 — Read receipts on the lock screen */
function NotifyScreen() {
  const alerts = [
    { title: "Invoice INV-1047 viewed", body: "Bluebird Cafe just opened your invoice.", when: "now" },
    { title: "Estimate EST-0212 accepted", body: "Harbor Dental accepted your $1,850.00 estimate.", when: "4m ago" },
    { title: "Invoice INV-1041 viewed", body: "Oakline Builders just opened your invoice.", when: "1h ago" },
  ];
  return (
    <div className="h-full bg-[radial-gradient(120%_80%_at_30%_0%,#3a2a3f_0%,#0a1729_55%)] px-3.5 pt-14 text-white">
      <div className={`text-center ${FADE}`}>
        <p className="text-[12px] font-medium text-white/70">Saturday, November 1</p>
        <p className="mt-0.5 text-[64px] font-semibold leading-none tracking-tight">9:41</p>
      </div>
      <ul className="mt-8 space-y-2">
        {alerts.map((a, i) => (
          <li key={a.title} className={`flex gap-2.5 rounded-2xl bg-white/90 p-2.5 text-ink shadow-lg backdrop-blur ${DROP}`} style={at(0.5 + i * 0.7)}>
            <Image src="/icon-192.png" alt="" width={32} height={32} className="h-8 w-8 flex-none rounded-lg" unoptimized />
            <div className="min-w-0 flex-1">
              <p className="flex items-center justify-between gap-2 text-[11.5px] font-semibold">
                {a.title}
                <span className="flex-none font-normal text-zinc-400">{a.when}</span>
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-zinc-600">{a.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 4 — Estimate accepted, convert to invoice */
function EstimateScreen() {
  const timeline = [
    { label: "Sent", when: "Oct 28" },
    { label: "Viewed by client", when: "Oct 29" },
    { label: "Accepted online", when: "Today", highlight: true },
  ];
  return (
    <div className="px-4 pt-11">
      <Header eyebrow="Estimate · EST-0212" title="Harbor Dental" />
      <div className={`mt-3 rounded-xl bg-white p-3 ${IN}`} style={at(0.15)}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-zinc-400">Status</p>
          <span className="relative inline-flex h-5 items-center">
            <Pill tone="sent" className={`absolute right-0 opacity-0 ${OUT}`} style={at(1.5)}>Sent</Pill>
            <Pill tone="paid" className={POP} style={at(1.6)}>Accepted</Pill>
          </span>
        </div>
        <div className="mt-2.5 space-y-1.5 border-t border-zinc-100 pt-2.5 text-[11.5px]">
          <p className="flex justify-between text-ink"><span>Reception redesign – labor</span><span className="tabular-nums">$1,200.00</span></p>
          <p className="flex justify-between text-ink"><span>Custom millwork</span><span className="tabular-nums">$650.00</span></p>
          <p className="flex justify-between border-t border-zinc-100 pt-1.5 text-[13px] font-semibold text-ink">
            <span>Total</span><span className="tabular-nums">$1,850.00</span>
          </p>
        </div>
      </div>
      <p className={`mt-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 ${IN}`} style={at(0.3)}>Activity</p>
      <ol className="mt-2 space-y-0 rounded-xl bg-white px-3 py-2">
        {timeline.map((t, i) => (
          <li key={t.label} className={`flex items-center gap-2.5 py-1.5 ${IN}`} style={at(0.45 + i * 0.4)}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${t.highlight ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-400"}`}>
              <Glyph d={CHECK} className="h-3 w-3" />
            </span>
            <span className={`flex-1 text-[12px] ${t.highlight ? "font-semibold text-ink" : "text-zinc-600"}`}>{t.label}</span>
            <span className="text-[10.5px] text-zinc-400">{t.when}</span>
          </li>
        ))}
      </ol>
      <div className={`mt-5 rounded-xl bg-rust py-3 text-center text-[13px] font-semibold text-white ${POP}`} style={at(2.1)}>
        <span className={`block rounded-xl ${TAP}`} style={at(2.9)}>Convert to invoice →</span>
      </div>
      <p className={`mt-2.5 text-center text-[10.5px] text-zinc-400 ${FADE}`} style={at(2.4)}>Line items and totals carry over</p>
    </div>
  );
}

/* 5 — Paid, unpaid, overdue */
function StatusScreen() {
  const rows: Array<{ client: string; number: string; amount: string; tone: keyof typeof TONES; status: string; note?: string; flip?: boolean }> = [
    { client: "Bluebird Cafe", number: "INV-1047", amount: "$4,244.40", tone: "paid", status: "Paid", flip: true },
    { client: "Oakline Builders", number: "INV-1041", amount: "$1,320.00", tone: "viewed", status: "Viewed" },
    { client: "Northwind Media", number: "INV-1038", amount: "$860.00", tone: "overdue", status: "Overdue", note: "12 days late" },
    { client: "Harbor Dental", number: "INV-1048", amount: "$1,850.00", tone: "sent", status: "Sent" },
    { client: "Maple & Co.", number: "INV-1049", amount: "$410.00", tone: "draft", status: "Draft" },
  ];
  return (
    <div className="px-4 pt-11">
      <Header eyebrow="Lumen Studio ▾" title="Invoices" />
      <div className={`mt-3 rounded-2xl bg-rust px-4 py-3 text-white ${IN}`} style={at(0.15)}>
        <p className="text-[11px] opacity-80">Outstanding</p>
        <p className="font-serif text-[24px] font-bold leading-tight">$4,440.00</p>
      </div>
      <div className={`mt-3 flex gap-1 rounded-xl bg-white p-1 text-[11px] font-medium text-zinc-500 ${IN}`} style={at(0.3)}>
        <span className="flex-1 rounded-lg bg-paper py-1 text-center text-ink">All 5</span>
        <span className="flex-1 py-1 text-center">Unpaid 4</span>
        <span className="flex-1 py-1 text-center">Paid 1</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.number} className={`flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ${IN}`} style={at(0.45 + i * 0.15)}>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-ink">{r.client}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-zinc-400">
                {r.flip ? (
                  <span className="relative inline-flex">
                    <Pill tone="viewed" className={`absolute left-0 opacity-0 ${OUT}`} style={at(1.9)}>Viewed</Pill>
                    <Pill tone="paid" className={POP} style={at(2.0)}>Paid</Pill>
                  </span>
                ) : (
                  <Pill tone={r.tone}>{r.status}</Pill>
                )}
                {r.note ? <span className="text-red-600">{r.note}</span> : r.number}
              </p>
            </div>
            <p className="text-[12.5px] font-semibold tabular-nums text-ink">{r.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 6 — Reports and tax totals */
function ReportsScreen() {
  const tiles = [
    { label: "Total revenue", value: "$7,730.00" },
    { label: "Paid", value: "3" },
    { label: "Unpaid amount", value: "$720.00" },
    { label: "Tax collected", value: "$618.40" },
  ];
  const months = [
    { m: "Jun", h: 42 },
    { m: "Jul", h: 58 },
    { m: "Aug", h: 50 },
    { m: "Sep", h: 72 },
    { m: "Oct", h: 64 },
    { m: "Nov", h: 92 },
  ];
  return (
    <div className="px-4 pt-11">
      <Header eyebrow="Lumen Studio ▾" title="Reports" />
      <div className="mt-3 grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={t.label} className={`rounded-xl bg-white px-3 py-2.5 ${IN}`} style={at(0.15 + i * 0.12)}>
            <p className="text-[10px] text-zinc-400">{t.label}</p>
            <p className="mt-0.5 text-[15px] font-semibold tabular-nums text-ink">{t.value}</p>
          </div>
        ))}
      </div>
      <div className={`mt-3 rounded-xl bg-white p-3 ${IN}`} style={at(0.6)}>
        <p className="flex items-center justify-between text-[11.5px] font-semibold text-ink">
          Revenue <span className="font-normal text-zinc-400">Last 6 months</span>
        </p>
        <div className="mt-3 flex h-[120px] items-end gap-2.5">
          {months.map((b, i) => (
            <div key={b.m} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`w-full origin-bottom rounded-md ${i === months.length - 1 ? "bg-rust" : "bg-rust/25"} ${GROW}`}
                style={{ height: `${b.h}px`, ...at(0.8 + i * 0.12) }}
              />
              <span className="text-[9.5px] text-zinc-400">{b.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ${IN}`} style={at(1.6)}>
        <div>
          <p className="text-[11.5px] font-semibold text-ink">Paid vs. unpaid</p>
          <p className="text-[10px] text-zinc-400">5 invoices this month</p>
        </div>
        <div className="flex h-2 w-24 overflow-hidden rounded-full bg-amber-400">
          <div className={`h-full w-[60%] origin-left bg-emerald-500 ${GROW_X}`} style={at(1.8)} />
        </div>
      </div>
      <div className={`mt-3 rounded-xl bg-ink py-2.5 text-center text-[13px] font-semibold text-white ${POP}`} style={at(2.2)}>
        Export report
      </div>
    </div>
  );
}

export const SHOWCASE_SCREENS: Record<string, () => ReactNode> = {
  create: CreateScreen,
  send: SendScreen,
  notify: NotifyScreen,
  estimate: EstimateScreen,
  status: StatusScreen,
  reports: ReportsScreen,
};
