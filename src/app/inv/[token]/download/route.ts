import { NextResponse } from "next/server";

import { fetchPublicInvoiceByToken } from "@/lib/invoice/fetchPublicInvoice";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const bundle = await fetchPublicInvoiceByToken(token);
  if (!bundle) return new NextResponse("Not found", { status: 404 });
  const url = new URL(req.url);
  return NextResponse.redirect(
    new URL(`/inv/${bundle.invoice.public_token}/pdf?download=1`, url.origin),
    { status: 302 },
  );
}

