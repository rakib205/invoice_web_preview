import { NextResponse } from "next/server";

import { fetchPublicInvoiceByToken } from "@/lib/invoice/fetchPublicInvoice";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const bundle = await fetchPublicInvoiceByToken(token);
  if (!bundle) return new NextResponse("Not found", { status: 404 });

  const path = bundle.invoice.pdf_storage_path;
  if (!path) return new NextResponse("PDF not available", { status: 404 });

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.storage.from("invoice-pdfs").download(path);
  if (error || !data) return new NextResponse("Failed to load PDF", { status: 500 });

  const url = new URL(req.url);
  const asAttachment = url.searchParams.get("download") === "1";

  const bytes = Buffer.from(await data.arrayBuffer());
  const filename = `invoice_${bundle.invoice.invoice_number ?? bundle.invoice.id}.pdf`;

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${asAttachment ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "private, max-age=60",
    },
  });
}

