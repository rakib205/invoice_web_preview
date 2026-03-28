import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const publicToken = token?.trim();
  if (!publicToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  let body: { action?: string };
  try {
    body = (await req.json()) as { action?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const action = String(body?.action ?? "")
    .trim()
    .toLowerCase();
  if (action !== "accept" && action !== "reject") {
    return NextResponse.json({ error: "action must be accept or reject" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !apiKey) {
    return NextResponse.json(
      { error: "Supabase environment is not configured" },
      { status: 500 },
    );
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/respond_public_estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ public_token: publicToken, action }),
    cache: "no-store",
  });

  const text = await res.text();
  try {
    return NextResponse.json(JSON.parse(text), { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Unexpected response from estimate service" },
      { status: res.status || 500 },
    );
  }
}
