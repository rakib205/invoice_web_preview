import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const publicToken = token?.trim();
  if (!publicToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
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
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
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
