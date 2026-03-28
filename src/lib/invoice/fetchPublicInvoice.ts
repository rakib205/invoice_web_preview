import { createSupabaseAdmin } from "@/lib/supabase/admin";

export type PublicInvoiceBundle = {
  invoice: {
    id: string;
    business_id: string;
    customer_id: string | null;
    invoice_number: string | null;
    public_token: string | null;
    status: string | null;
    subtotal: string | null;
    tax: string | null;
    discount: string | null;
    total: string | null;
    due_date: string | null;
    expiry_date: string | null;
    invoice_date: string | null;
    currency: string | null;
    document_type: string | null;
    payment_method: string | null;
    notes: string | null;
    paid_at: string | null;
    pdf_storage_path: string | null;
    pdf_hash: string | null;
    invoice_version: number;
  };
  business: {
    id: string;
    name: string;
    currency: string;
    logo_url: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
  customer: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
  items: Array<{
    id: string;
    name: string;
    description: string | null;
    quantity: number | null;
    unit_price: string | null;
    taxable?: boolean | null;
    discount?: string | null;
    unit_type?: string | null;
    sort_order?: number | null;
  }>;
  payments: Array<{
    id: string;
    invoice_id: string;
    amount: string;
    method?: string | null;
    paid_at?: string | null;
    notes?: string | null;
  }>;
};

export async function fetchPublicInvoiceByToken(
  token: string,
): Promise<PublicInvoiceBundle | null> {
  const supabase = createSupabaseAdmin();

  const { data: invoice, error: invErr } = await supabase
    .from("invoices")
    .select("*")
    .eq("public_token", token)
    .maybeSingle();

  if (invErr || !invoice) return null;

  const [{ data: items }, { data: business }, { data: customer }, { data: payments }] =
    await Promise.all([
      supabase.from("invoice_items").select("*").eq("invoice_id", invoice.id),
      supabase.from("businesses").select("*").eq("id", invoice.business_id).maybeSingle(),
      invoice.customer_id
        ? supabase.from("customers").select("*").eq("id", invoice.customer_id).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase.from("invoice_payments").select("*").eq("invoice_id", invoice.id),
    ]);

  return {
    invoice,
    business: business ?? null,
    customer: customer ?? null,
    items: (items ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    payments: payments ?? [],
  } as PublicInvoiceBundle;
}

