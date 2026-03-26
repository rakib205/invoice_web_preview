"use client";

export function PdfPrintButton({
  iframeId,
  className,
}: {
  iframeId: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
        iframe?.contentWindow?.focus();
        iframe?.contentWindow?.print();
      }}
    >
      Print
    </button>
  );
}

