import { NextResponse } from "next/server";
import { isValidPublicToken } from "@/lib/invoice/fetchPublicInvoice";

export const runtime = "nodejs";

// Crawlers, link unfurlers, and audit tools that render JS must not mark an
// invoice "Viewed" or push a notification to its owner.
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|headlesschrome|google-inspectiontool/i;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  if (BOT_UA.test(req.headers.get("user-agent") ?? "")) {
    return NextResponse.json({ skipped: "bot" });
  }

  const { token } = await params;
  const publicToken = token?.trim() ?? "";
  if (!isValidPublicToken(publicToken)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !apiKey) {
    return NextResponse.json(
      { error: "Supabase environment is not configured" },
      { status: 500 },
    );
  }

  const res = await fetch(
    `${supabaseUrl}/functions/v1/track_public_invoice_view`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ public_token: publicToken }),
      cache: "no-store",
    },
  );

  const text = await res.text();
  try {
    return NextResponse.json(JSON.parse(text), { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Unexpected response from tracking service" },
      { status: res.status || 500 },
    );
  }
}
