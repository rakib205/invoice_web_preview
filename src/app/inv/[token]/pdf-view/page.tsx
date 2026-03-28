import { notFound } from "next/navigation";

import Link from "next/link";

import { PdfPrintButton } from "@/components/PdfPrintButton";
import { fetchPublicInvoiceByToken } from "@/lib/invoice/fetchPublicInvoice";

const IFRAME_ID = "invoice-pdf-native-frame";

export default async function PdfViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const bundle = await fetchPublicInvoiceByToken(token);
  if (!bundle) notFound();

  if (!bundle.invoice.pdf_storage_path) {
    notFound();
  }

  const doc = bundle.invoice.document_type === "estimate" ? "Estimate" : "Invoice";
  const no = bundle.invoice.invoice_number ? ` ${bundle.invoice.invoice_number}` : "";
  const title = `${doc}${no}`;
  const pathPrefix = bundle.invoice.document_type === "estimate" ? "est" : "inv";
  const tok = bundle.invoice.public_token ?? "";
  const pdfUrl = `/${pathPrefix}/${tok}/pdf`;
  const downloadUrl = `/${pathPrefix}/${tok}/pdf?download=1`;
  // Most built-in PDF viewers support these hash flags (Chrome/Edge/Firefox vary).
  // If a browser ignores them, the PDF will still load correctly.
  const iframeUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{title}</div>
            <div className="mt-0.5 text-xs text-zinc-600">
              PDF toolbar is hidden in embedded mode.
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={downloadUrl}
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Download
            </a>
            <Link
              href={pdfUrl}
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium hover:bg-zinc-50"
              target="_blank"
              rel="noreferrer"
            >
              Open
            </Link>
            <PdfPrintButton
              iframeId={IFRAME_ID}
              className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-medium hover:bg-zinc-50"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 shadow-sm">
          <iframe
            id={IFRAME_ID}
            title={title}
            src={iframeUrl}
            className="h-[calc(100vh-116px)] w-full bg-zinc-50"
          />
        </div>
      </div>
    </div>
  );
}

