import { Resend } from "resend";
import { checkSpam } from "@/lib/spam";

const resend = new Resend(process.env.RESEND_API_KEY);

const CATEGORIES = [
  "Billing & Subscription",
  "App Bug / Error",
  "Invoice / Estimate Issue",
  "Account Access",
  "Feature Request",
  "Other",
] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const spam = checkSpam({
    honeypot: body.website,
    formLoadedAt: body.formLoadedAt,
    ip,
  });

  if (spam.blocked) {
    console.warn("Support form blocked by spam check:", spam.reason, "ip:", ip);
    return Response.json({ ok: true });
  }

  const { name, email, category, message } = body;

  if (!name?.trim() || !email?.trim() || !category?.trim() || !message?.trim()) {
    return Response.json({ error: "All fields are required." }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 422 });
  }

  if (!CATEGORIES.includes(category)) {
    return Response.json({ error: "Invalid category." }, { status: 422 });
  }

  const { error } = await resend.emails.send({
    from: `InvoiceFlint <${process.env.RESEND_FROM!}>`,
    to: process.env.CONTACT_TO!,
    replyTo: email,
    subject: `Support [${category}] — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Category:</strong> ${category}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
  });

  if (error) {
    console.error("Resend error (support):", JSON.stringify(error));
    return Response.json({ error: "Failed to send. Try again later." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
