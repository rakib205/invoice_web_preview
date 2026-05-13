"use client";

import { useState } from "react";

export function PrintButton({
  className,
  children,
  pdfUrl,
}: {
  className?: string;
  children?: React.ReactNode;
  pdfUrl?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    if (!pdfUrl) {
      window.print();
      return;
    }
    setLoading(true);

    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;visibility:hidden;";
    iframe.src = pdfUrl;

    const cleanup = () => {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      setLoading(false);
    };

    // Fallback: reset if load never fires (e.g. network error, browser blocks)
    const fallback = setTimeout(cleanup, 10000);

    iframe.onload = () => {
      clearTimeout(fallback);
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(cleanup, 500);
    };

    iframe.onerror = () => {
      clearTimeout(fallback);
      cleanup();
    };

    document.body.appendChild(iframe);
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        children ?? "Print"
      )}
    </button>
  );
}
