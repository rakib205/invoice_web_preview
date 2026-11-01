import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

/**
 * App Store + Google Play download buttons. `tone="dark"` is for light
 * backgrounds (ink buttons); `tone="light"` is for dark backgrounds.
 */
export default function StoreBadges({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const button =
    tone === "dark"
      ? "bg-ink text-white hover:bg-ink/90"
      : "bg-white text-ink hover:bg-zinc-100";
  const overline = tone === "dark" ? "text-zinc-300" : "text-zinc-500";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Invoiceflint on the App Store"
        className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-sm transition ${button}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
          <path d="M16.365 12.86c.02 2.62 2.296 3.49 2.32 3.5-.02.06-.36 1.24-1.18 2.46-.71 1.06-1.45 2.11-2.61 2.13-1.14.03-1.51-.67-2.81-.67-1.31 0-1.71.65-2.79.7-1.13.05-1.99-1.14-2.7-2.2-1.45-2.16-2.56-6.1-1.07-8.77.74-1.32 2.06-2.16 3.49-2.18 1.1-.02 2.13.74 2.81.74.67 0 1.93-.92 3.26-.78.55.02 2.1.22 3.09 1.68-.08.05-1.85 1.08-1.83 3.22M14.2 5.4c.6-.74 1.01-1.76.9-2.79-.87.04-1.93.59-2.55 1.32-.56.65-1.05 1.69-.92 2.7.97.07 1.96-.49 2.57-1.23" />
        </svg>
        <div className="text-left leading-tight">
          <div className={`text-[10px] uppercase tracking-wide ${overline}`}>Download on the</div>
          <div className="text-base font-semibold">App Store</div>
        </div>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Invoiceflint on Google Play"
        className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-sm transition ${button}`}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9.2-9.7L3.6 2.3Z" fill="#34d399" />
          <path d="M16.4 9 13.7 11.8l2.7 2.8 3.4-2c.9-.5.9-1.7 0-2.2L16.4 9Z" fill="#fbbf24" />
          <path d="M3.6 21.7c.4.4 1.1.5 1.8.1l11-6.5-2.7-2.8L3.6 21.7Z" fill="#ef4444" />
          <path d="M3.6 2.3 13.7 12l2.7-2.8L5.4 2.7c-.7-.4-1.4-.4-1.8-.4Z" fill="#60a5fa" />
        </svg>
        <div className="text-left leading-tight">
          <div className={`text-[10px] uppercase tracking-wide ${overline}`}>Get it on</div>
          <div className="text-base font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  );
}
