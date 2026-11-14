import type { FaqItem } from "@/lib/jsonLd";

/**
 * Trade landing pages ("Invoice app for plumbers", …) for long-tail SEO and AI
 * answer engines.
 *
 * Each trade carries its own example invoice, billing advice, and FAQs. Keep
 * them genuinely specific to the trade: near-identical pages with the trade
 * name swapped are treated as doorway pages by search engines and hurt the
 * whole site. `src/app/invoice-app/[trade]/page.tsx` renders these;
 * `sitemap.ts` and `/llms.txt` pick up new entries automatically.
 */

export type SampleLine = {
  description: string;
  qty: number;
  rate: number;
  /** Included in the taxable subtotal when the sample has a `taxRate`. */
  taxable?: boolean;
};

export type TradeFeature = {
  /** A feature id from `@/lib/product` (picks the icon), or "offline". */
  id: string;
  title: string;
  body: string;
};

export type TradeGroup = "trades" | "services" | "professional";

/** Hub sections, in display order. */
export const TRADE_GROUPS: Array<{ id: TradeGroup; title: string }> = [
  { id: "trades", title: "Trades and repair" },
  { id: "services", title: "Home, personal, and event services" },
  { id: "professional", title: "Creative and professional services" },
];

export type Trade = {
  slug: string;
  /** Plural audience name used in "Invoice app for …". */
  name: string;
  /** Short card label on the hub and home page. */
  label: string;
  /** Section the trade is listed under on the /invoice-app hub. */
  group: TradeGroup;
  /** Kind of invoice, lower case: "plumbing invoice". */
  invoiceName: string;
  /** <title> before the site suffix. Keep under ~55 characters. */
  metaTitle: string;
  /** Meta description; keep under ~155 characters. */
  description: string;
  headline: string;
  intro: string;
  sample: {
    business: string;
    client: string;
    number: string;
    lines: SampleLine[];
    taxLabel?: string;
    taxRate?: number;
    notes: string;
  };
  include: string[];
  tips: Array<{ title: string; body: string }>;
  features: TradeFeature[];
  faqs: FaqItem[];
  guides: string[];
  dateModified: string;
  /**
   * Optional trade-specific detail rendered on /invoice-templates/<slug> only
   * when present. Rolled out one trade at a time; rate figures must be sourced.
   */
  templateDetail?: TemplateDetail;
};

export type TemplateDetail = {
  /** Typical line items for this trade's invoices. */
  lineItems: Array<{ item: string; note: string }>;
  /** Typical rates, with the month they were checked ("as of …"). */
  rates: { summary: string; asOf: string; source: { label: string; url: string } };
  /** Things this trade should make obvious on the invoice. */
  mustShow: string[];
};

export const TRADES: Trade[] = [
  {
    slug: "plumbers",
    name: "Plumbers",
    label: "Plumbers",
    group: "trades",
    invoiceName: "plumbing invoice",
    metaTitle: "Invoice App for Plumbers: Plumbing Invoices & Quotes",
    description:
      "Create plumbing invoices and estimates on your phone. Bill call-out fees, labor, and parts, send by text or WhatsApp, and see when customers open them.",
    headline: "The invoice app for plumbers",
    intro:
      "Invoice the job before you leave the driveway. Invoiceflint lets plumbers write up a plumbing invoice or estimate on their phone — call-out fee, labor, parts, and tax — send it by text, WhatsApp, or email, and get notified when the customer opens it.",
    sample: {
      business: "Northside Plumbing",
      client: "Dana Whitfield",
      number: "INV-0318",
      lines: [
        { description: "Service call-out fee", qty: 1, rate: 89 },
        { description: "Labor – replace water heater (hours)", qty: 3, rate: 95 },
        { description: "50-gal gas water heater", qty: 1, rate: 1150, taxable: true },
        { description: "Expansion tank and fittings", qty: 1, rate: 86.4, taxable: true },
        { description: "Haul-away and disposal of old unit", qty: 1, rate: 45 },
      ],
      taxLabel: "Sales tax on parts",
      taxRate: 0.07,
      notes: "Parts carry a 1-year manufacturer warranty; labor guaranteed for 90 days. Payment due within 7 days.",
    },
    include: [
      "Your business name, phone number, and license number if your state or city requires it on paperwork.",
      "The customer's name and the service address — it often differs from the billing address for landlords and property managers.",
      "Invoice number, date of service, and a specific due date.",
      "Your call-out or trip fee as its own line.",
      "Labor, either as hours × rate or as a flat price for the job.",
      "Parts and fixtures with quantities, so the customer can see exactly what was installed.",
      "Sales tax on whatever is taxable where you work.",
      "Warranty terms and how to pay.",
    ],
    tips: [
      {
        title: "Flat rate or time and materials — itemize parts either way",
        body: "Many plumbing companies price common jobs, like a toilet rebuild or water heater swap, at a flat rate and bill unusual work as time and materials. Whichever you use, list parts on their own lines. Customers accept a bigger total more easily when the water heater is clearly separate from your labor.",
      },
      {
        title: "Get emergency work approved before you start",
        body: "For a burst pipe at 11pm, send a quick estimate with your after-hours rate and let the customer accept it on their phone before you start. It turns a likely argument about the bill into a price they've already agreed to.",
      },
      {
        title: "Invoice before you leave the job",
        body: "Homeowners pay fastest while the fixed leak is fresh in their mind. Create the invoice in the van, send it on the spot, and you'll know when they've opened it.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Quotes customers accept on their phone",
        body: "Send a water heater or repipe estimate, let the homeowner accept it online, then turn it into the invoice with one tap when the job's done.",
      },
      {
        id: "offline",
        title: "Works in basements and crawl spaces",
        body: "No signal under the house? Invoiceflint works offline, so you can write up the job where you are and send it once you're back in range.",
      },
      {
        id: "signatures",
        title: "Sign-off and before-and-after photos",
        body: "Add a signature and attach photos of the leak and the repair — useful evidence if a customer questions the bill later.",
      },
      {
        id: "reminders",
        title: "Reminders that chase payment for you",
        body: "Schedule email reminders before and after the due date, so you're not phoning customers about money between jobs.",
      },
    ],
    faqs: [
      {
        question: "What should a plumbing invoice include?",
        answer:
          "A plumbing invoice should include your business details and license number if required, the customer's name and service address, an invoice number and due date, the call-out fee, labor (hourly or flat rate), itemized parts with quantities, sales tax where it applies, warranty terms, and how to pay.",
      },
      {
        question: "Should plumbers put the call-out fee on the invoice?",
        answer:
          "Yes. If you charge a service or call-out fee, list it as its own line so it's clear it covers travel and diagnosis. If you waive or credit it when the customer goes ahead with the repair, say so on the invoice too.",
      },
      {
        question: "Can I send a plumbing estimate and turn it into an invoice?",
        answer:
          "Yes. In Invoiceflint you send the estimate as a link, the customer accepts it in their browser, and you convert it to an invoice with one tap. The parts, labor, and totals carry over.",
      },
      {
        question: "Can I write an invoice where there's no phone signal?",
        answer:
          "Yes. Invoiceflint stores your invoices on your phone and works offline, so you can create the invoice in a basement or crawl space and send it when you have a connection again.",
      },
    ],
    guides: ["how-to-invoice-labor-and-materials", "how-to-write-an-estimate", "how-to-send-an-invoice-on-whatsapp"],
    dateModified: "2026-10-31",
    templateDetail: {
      lineItems: [
        { item: "Service call / trip fee", note: "Covers travel and diagnosis. Say whether it is credited if the customer approves the repair." },
        { item: "Labor", note: "Hours × hourly rate, or one flat price for standard jobs such as a water heater swap." },
        { item: "Fixtures and parts", note: "One line each (faucet, valve, expansion tank) with quantity and unit price." },
        { item: "After-hours surcharge", note: "Show it as its own line so the customer sees what the emergency rate added." },
        { item: "Permit and disposal fees", note: "List pass-through costs separately from your labor." },
      ],
      rates: {
        summary:
          "One industry guide puts typical US residential plumbing labor at about $75 to $150 per hour, with a service call fee of $50 to $250 and emergency or after-hours calls at 1.5 to 3 times the standard rate. Local rates vary widely, so treat these as a starting point and use your own.",
        asOf: "November 2026",
        source: { label: "Housecall Pro: how to price plumbing jobs", url: "https://www.housecallpro.com/resources/how-to-price-plumbing-jobs/" },
      },
      mustShow: [
        "The service address, which often differs from the billing address.",
        "Your license number where your state or city requires it on paperwork.",
        "Warranty terms for parts and for labor, stated separately.",
        "Whether the call-out fee was waived or credited toward the repair.",
      ],
    },
  },
  {
    slug: "electricians",
    name: "Electricians",
    label: "Electricians",
    group: "trades",
    invoiceName: "electrical invoice",
    metaTitle: "Invoice App for Electricians: Electrical Invoices",
    description:
      "Create electrical invoices and estimates on your phone. Itemize wire, breakers, and permits, win panel and EV charger jobs, and get paid faster.",
    headline: "The invoice app for electricians",
    intro:
      "From a quick outlet repair to a panel upgrade, Invoiceflint lets electricians quote and invoice from the job site. Itemize labor, wire by the foot, breakers, and permit fees, send it in seconds, and know the moment the customer opens it.",
    sample: {
      business: "Brightline Electric",
      client: "Marcus Hale",
      number: "INV-1207",
      lines: [
        { description: "Service call", qty: 1, rate: 75 },
        { description: "Labor – dedicated 240V circuit for EV charger (hours)", qty: 4, rate: 105 },
        { description: "60A double-pole breaker", qty: 1, rate: 48, taxable: true },
        { description: "6/3 NM-B cable (ft)", qty: 45, rate: 3.2, taxable: true },
        { description: "Level 2 EV charger (customer-selected)", qty: 1, rate: 549, taxable: true },
        { description: "Electrical permit and inspection fee (pass-through)", qty: 1, rate: 120 },
      ],
      taxLabel: "Sales tax on materials",
      taxRate: 0.0625,
      notes: "Work performed under permit; final inspection scheduled. Payment due on completion.",
    },
    include: [
      "Your business details and electrical license number where it's required.",
      "The service address and a clear description of the work — which circuits, rooms, or equipment.",
      "Labor as hours × rate or a flat price per task.",
      "Materials itemized by unit: wire by the foot, breakers, devices, fixtures.",
      "Permit and inspection fees as separate pass-through lines.",
      "Tax on materials or the whole job, depending on local rules.",
      "Payment terms, and any deposit already received.",
    ],
    tips: [
      {
        title: "Show permit fees separately",
        body: "Customers sometimes assume permits are part of your profit. Listing the permit and inspection fee as its own pass-through line, at cost, makes it clear it's paid to the city — and keeps it out of any tax you charge on materials.",
      },
      {
        title: "Take a deposit on panel upgrades and EV chargers",
        body: "Big-ticket jobs often mean buying a panel or charger before you start. Send an estimate with a deposit requirement, invoice the deposit when it's accepted, and subtract it on the final invoice.",
      },
      {
        title: "Itemize wire and devices by the unit",
        body: "'Wire (ft) × 45' reads as fair; 'materials – $310' invites questions. Unit pricing also makes it easy to reuse the same saved items on every job.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Win panel upgrades and EV installs",
        body: "Send a professional, itemized estimate the same day you see the job. The customer accepts it online and it becomes the invoice with one tap.",
      },
      {
        id: "clients",
        title: "Saved items for breakers, wire, and devices",
        body: "Save the parts you use every week with your prices, and build each invoice from them in seconds instead of typing every line.",
      },
      {
        id: "multi-tax",
        title: "More than one tax on an invoice",
        body: "If your work is subject to more than one tax — for example state and local sales tax — apply each one on the same invoice.",
      },
      {
        id: "read-receipts",
        title: "Know when the customer has seen it",
        body: "Get a notification when the homeowner or general contractor opens your invoice, so you know whether to wait or follow up.",
      },
    ],
    faqs: [
      {
        question: "What should an electrical invoice include?",
        answer:
          "An electrical invoice should include your business details and license number where required, the service address, a description of the work, labor, itemized materials such as wire, breakers, and devices, permit and inspection fees, applicable tax, the total, a due date, and payment instructions.",
      },
      {
        question: "Should electricians charge for permits on the invoice?",
        answer:
          "Yes — list permit and inspection fees as their own line, usually at cost, so the customer can see they're paid to the local authority. Agree in your estimate who is responsible for pulling the permit.",
      },
      {
        question: "Do electricians bill hourly or by the job?",
        answer:
          "Both are common. Many electricians use flat prices for standard tasks such as installing a fixture or an EV charger circuit, and hourly billing for troubleshooting where the time is unpredictable.",
      },
      {
        question: "Can I invoice a general contractor instead of the homeowner?",
        answer:
          "Yes. Add the contractor as the client, put the job address and any purchase order number on the invoice, and send it to their accounts contact. Invoiceflint keeps a running balance for each client.",
      },
    ],
    guides: ["how-to-invoice-labor-and-materials", "how-to-ask-for-a-deposit", "how-to-write-an-estimate"],
    dateModified: "2026-10-31",
    templateDetail: {
      lineItems: [
        { item: "Service call / dispatch fee", note: "Covers travel, setup, and diagnosis. State whether the first hour is included." },
        { item: "Labor", note: "Hours × hourly rate, or a flat price for repeatable jobs such as swapping a switch or outlet." },
        { item: "Materials and fixtures", note: "Breakers, wire, outlets, and fixtures as separate lines with quantity and unit price." },
        { item: "Panel or circuit work", note: "Itemize by circuit or panel so the customer sees what each upgrade cost." },
        { item: "Permit and inspection fees", note: "List pass-through costs separately from your labor." },
        { item: "After-hours surcharge", note: "Show emergency pricing as its own line so the premium is visible." },
      ],
      rates: {
        summary:
          "Housecall Pro's guide puts typical US electrician rates at about $50 to $130 per hour, plus a service call fee of $100 to $200. Local rates, licensing, and job type shift these numbers a lot, so treat them as a starting point and use your own.",
        asOf: "November 2026",
        source: { label: "Housecall Pro: how to price electrical work", url: "https://www.housecallpro.com/resources/how-to-price-electrical-work/" },
      },
      mustShow: [
        "Your contractor or electrical license number where your state or city requires it.",
        "The service address, which often differs from the billing address.",
        "Permit and inspection numbers when the work required them.",
        "Warranty terms for labor and for parts, stated separately.",
      ],
    },
  },
  {
    slug: "contractors",
    name: "Contractors",
    label: "Contractors",
    group: "trades",
    invoiceName: "contractor invoice",
    metaTitle: "Invoice App for Contractors: Estimates & Progress Invoices",
    description:
      "An invoice and estimate app for contractors and remodelers. Send estimates, bill deposits and progress payments, document change orders, and get paid on time.",
    headline: "The invoice app for contractors",
    intro:
      "Remodels and builds are billed in stages — a deposit, progress payments, change orders, and a final invoice. Invoiceflint lets small contractors and remodelers handle all of it from their phone, with estimates clients approve online and invoices you can track to the dollar.",
    sample: {
      business: "Oakline Builders",
      client: "Sarah & Tom Parker",
      number: "INV-0207",
      lines: [
        { description: "Kitchen remodel – demolition and haul-away (complete)", qty: 1, rate: 1800 },
        { description: "Cabinet installation – labor", qty: 1, rate: 2400 },
        { description: "Cabinets and hardware – materials", qty: 1, rate: 6850 },
        { description: "Change order #1 – relocate sink plumbing", qty: 1, rate: 650 },
        { description: "Less deposit received (INV-0201)", qty: 1, rate: -2500 },
      ],
      notes: "Progress invoice 2 of 3 per estimate EST-0112. Payment due within 10 days.",
    },
    include: [
      "Project name and job address, plus a reference to the signed estimate or contract.",
      "Which stage or milestone this invoice covers — 'progress invoice 2 of 3'.",
      "Work completed in this period, with labor and materials separated.",
      "Each approved change order as its own line, numbered.",
      "Deposits and earlier payments received, subtracted from the total.",
      "Retainage, if your contract holds some back until completion.",
      "Payment terms and the balance due.",
    ],
    tips: [
      {
        title: "Bill in stages, not at the end",
        body: "Waiting until a three-month remodel is finished to invoice means financing the whole job yourself. Agree on milestones in your estimate — deposit, rough-in, completion — and invoice the day each one is reached.",
      },
      {
        title: "Put every change order in writing",
        body: "'While you're here, can you move the sink?' is how margins disappear. Send a quick estimate for the change, get it accepted, and add it to the next invoice as a numbered change order.",
      },
      {
        title: "Show the deposit on the final invoice",
        body: "List the full value of the work, then subtract each payment already received. The client sees exactly how the balance was reached, which prevents 'didn't I already pay for that?' disputes.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Estimates that become invoices",
        body: "Send detailed estimates, let clients accept them online, and convert them to invoices with one tap — line items and totals carry over.",
      },
      {
        id: "signatures",
        title: "Signatures and progress photos",
        body: "Attach photos of completed work to each progress invoice and add a signature, so the client sees what they're paying for.",
      },
      {
        id: "status",
        title: "Every invoice's status at a glance",
        body: "See which progress invoices are sent, viewed, paid, or overdue, and each client's running balance.",
      },
      {
        id: "multi-business",
        title: "Run more than one company",
        body: "Run a remodeling business and a handyman brand? Keep each one's details, logo, and currency separate and switch between them.",
      },
    ],
    faqs: [
      {
        question: "How do contractors invoice for a large project?",
        answer:
          "Most contractors use progress billing: a deposit before work starts, invoices at agreed milestones, and a final invoice on completion. Each invoice references the original estimate or contract and subtracts payments already received.",
      },
      {
        question: "How should I bill a change order?",
        answer:
          "Get the change approved before doing the work — a short estimate the client accepts is enough — then add it to the next invoice as its own numbered line, such as 'Change order #1 – relocate sink plumbing'.",
      },
      {
        question: "Should the deposit appear on the final invoice?",
        answer:
          "Yes. List the full value of the work, then subtract the deposit and any progress payments as separate lines that reference their invoice numbers. The remaining amount is the balance due.",
      },
      {
        question: "Is Invoiceflint construction accounting software?",
        answer:
          "No. Invoiceflint is an invoicing and estimating app built for small contractors and remodelers. It doesn't do job costing, payroll, or bookkeeping, but Invoiceflint Pro can export reports as CSV or PDF for your accountant.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "how-to-write-an-estimate", "how-to-invoice-labor-and-materials"],
    dateModified: "2026-10-31",
    templateDetail: {
      lineItems: [
        { item: "Deposit", note: "A first invoice due before work starts. Reference the signed estimate or contract." },
        { item: "Milestone or progress payment", note: "Name the stage, such as rough-in complete, and show 'progress invoice 2 of 3'." },
        { item: "Labor", note: "Separate from materials, as hours × rate or a stage price from your estimate." },
        { item: "Materials and subcontractors", note: "List cabinets, lumber, and subcontractor work on their own lines." },
        { item: "Change orders", note: "One numbered line per approved change, such as 'Change order #1 – relocate sink'." },
        { item: "Payments received", note: "Negative lines for the deposit and earlier invoices, with their invoice numbers." },
      ],
      rates: {
        summary:
          "Angi's 2026 guide puts general contractor hourly rates at about $50 to $150, and says most general contractors instead charge a fee of roughly 10% to 20% of the project cost. Angi's own articles give slightly different percentages, so use your own overhead and profit numbers.",
        asOf: "November 2026",
        source: { label: "Angi: how much contractors charge", url: "https://www.angi.com/articles/how-much-do-general-contractors-charge-hourly-rates.htm" },
      },
      mustShow: [
        "Your contractor license number where your state or city requires one.",
        "The project name and job site address, plus the estimate or contract number.",
        "Which milestone this invoice covers and what remains to bill.",
        "Retainage held back, if your contract includes it, and when it will be released.",
      ],
    },
  },
  {
    slug: "handymen",
    name: "Handymen",
    label: "Handymen",
    group: "trades",
    invoiceName: "handyman invoice",
    metaTitle: "Invoice App for Handymen: Quick Handyman Invoices",
    description:
      "A handyman invoice app for your phone. Bill several small jobs on one invoice, add materials and trip charges, and get paid before you reach the next job.",
    headline: "The invoice app for handymen",
    intro:
      "A handyman visit is rarely one job — it's a TV mount, a sticky door, and a new bathroom fan. Invoiceflint lets you list every task on one clear invoice from your phone, add materials and your trip charge, and send it before you've packed up your tools.",
    sample: {
      business: "Steady Hand Home Repairs",
      client: "Linda Osei",
      number: "INV-0452",
      lines: [
        { description: "Mount 65\" TV and conceal cables (hours)", qty: 1.5, rate: 70 },
        { description: "Replace bathroom exhaust fan – labor (hours)", qty: 1, rate: 70 },
        { description: "Bathroom exhaust fan", qty: 1, rate: 89, taxable: true },
        { description: "Plane and rehang sticking bedroom door", qty: 1, rate: 60 },
        { description: "Drywall patch kit and touch-up paint", qty: 1, rate: 24, taxable: true },
        { description: "Trip charge", qty: 1, rate: 35 },
      ],
      taxLabel: "Sales tax on materials",
      taxRate: 0.08,
      notes: "Thanks for having me back! Payment due on receipt by card or bank transfer.",
    },
    include: [
      "Every task as its own line, so the customer can see what each part of the visit cost.",
      "Hours × rate for open-ended work, or a set price for standard tasks.",
      "Materials you bought for the job, ideally with the receipt on file.",
      "Your trip charge or minimum service charge.",
      "Tax on materials or labor where it applies.",
      "A due date and how to pay — many handymen ask for payment on completion.",
    ],
    tips: [
      {
        title: "Bill multi-task visits line by line",
        body: "One lump sum for a half-day of odd jobs invites 'that seems like a lot'. A line for each task shows the value of every fix and makes the total easy to accept.",
      },
      {
        title: "Set a minimum charge",
        body: "A 15-minute job still costs you the drive and setup. A minimum service charge or trip fee, stated on your estimate and invoice, keeps small jobs worth taking.",
      },
      {
        title: "Save your common jobs as items",
        body: "TV mounts, faucet swaps, and door adjustments come up every week. Save them with your standard prices and you'll build most invoices with a few taps.",
      },
    ],
    features: [
      {
        id: "clients",
        title: "Saved items and repeat customers",
        body: "Save your go-to jobs and materials with prices, and keep every customer's details and balance in one list.",
      },
      {
        id: "send",
        title: "Text or WhatsApp the invoice",
        body: "Send the invoice the way your customers actually read messages — by text, WhatsApp, email, or as a PDF.",
      },
      {
        id: "estimates",
        title: "Quick quotes for bigger jobs",
        body: "Quote a deck repair or a bathroom refresh on the spot, let the customer accept online, and invoice it with one tap when it's done.",
      },
      {
        id: "signatures",
        title: "Photos of receipts and finished work",
        body: "Attach photos of material receipts and the finished job, and sign the invoice before you send it.",
      },
    ],
    faqs: [
      {
        question: "Should a handyman charge by the hour or by the job?",
        answer:
          "Many handymen use both: a set price for common tasks such as mounting a TV or replacing a faucet, and an hourly rate for repairs where the time is hard to predict. Whichever you use, show each task as its own line on the invoice.",
      },
      {
        question: "How do I invoice materials I bought for a job?",
        answer:
          "List each significant item with its quantity and price, group small supplies into one line, and keep the receipts. Many handymen add a markup to cover the time spent buying and collecting materials — just be consistent.",
      },
      {
        question: "Should a handyman have a minimum charge?",
        answer:
          "It's common and sensible. A minimum service charge or trip fee covers travel and setup on very small jobs. State it on your estimates and invoices so customers know in advance.",
      },
      {
        question: "Can I invoice a customer right after the job?",
        answer:
          "Yes. With Invoiceflint you create the invoice on your phone and send it by text, WhatsApp, or email before you leave. You'll get a notification when the customer opens it.",
      },
    ],
    guides: ["how-to-invoice-labor-and-materials", "how-to-send-an-invoice-on-whatsapp", "invoice-vs-receipt"],
    dateModified: "2026-11-12",
    templateDetail: {
      lineItems: [
        { item: "Each task as its own line", note: "TV mount, door adjustment, and fan swap are three lines, not one lump sum for the visit." },
        { item: "Labor (hourly or flat)", note: "Hours × rate for open-ended repairs, or a set price for standard tasks you do every week." },
        { item: "Materials and parts", note: "List significant items with quantity and price; group screws, anchors, and caulk into one supplies line." },
        { item: "Trip charge or minimum service charge", note: "Show it separately so a short job still makes sense to the customer." },
        { item: "Disposal or haul-away", note: "Charge old fixtures, drywall scraps, and packaging removal as its own line." },
        { item: "Second-visit or return trip", note: "If you had to come back for a part, say so on the invoice instead of absorbing the cost." },
      ],
      rates: {
        summary:
          "Housecall Pro's 2026 handyman pricing guide puts most US handymen at about $50 to $150 per hour (self-employed pros mostly $50 to $80, companies $75 to $125) and suggests a minimum service charge of $125 to $200 for small jobs. Other sources quote lower minimums, so check your local market before you set yours.",
        asOf: "November 2026",
        source: { label: "Housecall Pro: how to price handyman jobs", url: "https://www.housecallpro.com/resources/how-to-price-handyman-jobs/" },
      },
      mustShow: [
        "A short description of every task completed, written the way the customer would describe it.",
        "Your trip or minimum service charge, stated the same way as on your estimate.",
        "Whether the materials are billed at cost or with a markup, applied consistently.",
        "Your contractor or handyman license number where your state or city requires one for the work performed.",
      ],
    },
  },
  {
    slug: "cleaners",
    name: "Cleaning Businesses",
    label: "Cleaners",
    group: "services",
    invoiceName: "cleaning invoice",
    metaTitle: "Invoice App for Cleaning Businesses & House Cleaners",
    description:
      "Invoice house cleaning, office cleaning, and Airbnb turnovers from your phone. Bill visits and add-ons, invoice property managers, and get paid on time.",
    headline: "The invoice app for cleaning businesses",
    intro:
      "Whether you clean homes, offices, or holiday rentals, you're invoicing the same clients again and again. Invoiceflint keeps your clients, rates, and add-ons ready so each invoice takes seconds — and tells you when the client has opened it.",
    sample: {
      business: "Sparkle & Co. Cleaning",
      client: "Harbor View Rentals",
      number: "INV-0781",
      lines: [
        { description: "Standard clean – 2-bed apartment, Unit 4B (visits)", qty: 4, rate: 110 },
        { description: "Deep clean add-on – oven and fridge", qty: 1, rate: 60 },
        { description: "Short-stay turnover with linen change – Unit 2A (visits)", qty: 6, rate: 75 },
        { description: "Lockout fee – no access on Oct 14", qty: 1, rate: 40 },
      ],
      notes: "Services for October 1–31. Payment due within 14 days.",
    },
    include: [
      "The service period, such as 'October 1–31', and the dates of each visit.",
      "Each property or unit address — essential when invoicing property managers.",
      "The type of clean: standard, deep, move-out, turnover.",
      "Add-ons like ovens, fridges, windows, or laundry as separate lines.",
      "Lockout or late-cancellation fees, if your policy includes them.",
      "Payment terms and how to pay.",
    ],
    tips: [
      {
        title: "Invoice regular clients on a fixed cycle",
        body: "Pick a rhythm — after each clean, weekly, or monthly — and stick to it. With the client and your rates saved, each cycle's invoice takes a few taps, and the client learns when to expect it.",
      },
      {
        title: "Spell out add-ons",
        body: "If the base price covers a standard clean, list extras like inside the oven or windows separately. Clients see the value, and the add-ons stop quietly becoming 'included'.",
      },
      {
        title: "Put your cancellation policy on every invoice",
        body: "Lockouts and same-day cancellations cost you a slot you can't refill. A short policy line on your invoices makes charging the fee a matter of agreed terms.",
      },
    ],
    features: [
      {
        id: "clients",
        title: "Clients, properties, and saved rates",
        body: "Save each client with their rates and add-ons, and see their balance due across every visit.",
      },
      {
        id: "read-receipts",
        title: "Know when property managers open it",
        body: "Get notified when the client views your invoice — no more guessing whether it reached the right inbox.",
      },
      {
        id: "reminders",
        title: "Automatic payment reminders",
        body: "Set email reminders before and after the due date so monthly invoices don't slip past.",
      },
      {
        id: "reports",
        title: "See your month at a glance",
        body: "Track revenue, paid and unpaid totals, and tax collected by month.",
      },
    ],
    faqs: [
      {
        question: "How do I invoice recurring cleaning clients?",
        answer:
          "Choose a billing cycle — per visit, weekly, or monthly — and send the invoice on the same day each cycle. List each visit date and any add-ons. Saving the client and your rates in an app like Invoiceflint makes each invoice quick to create.",
      },
      {
        question: "Should cleaners charge per hour or per clean?",
        answer:
          "Both are common. Flat rates per clean, based on the size of the property, are easier for clients to budget for; hourly rates suit irregular or deep-clean work. Whichever you use, list add-ons separately.",
      },
      {
        question: "Can I charge a lockout or cancellation fee?",
        answer:
          "Yes, if the client agreed to it in advance. Put the policy on your estimate or service agreement and on each invoice, then add the fee as its own line, with the date, when it applies.",
      },
      {
        question: "How do I invoice a property manager for several units?",
        answer:
          "Use one invoice per billing period and add a line for each unit and visit, including the unit number or address. This lets the property manager allocate costs to each owner.",
      },
    ],
    guides: ["how-to-send-an-invoice-on-whatsapp", "how-to-charge-late-fees", "invoice-vs-receipt"],
    dateModified: "2026-11-13",
    templateDetail: {
      lineItems: [
        { item: "Each visit or clean, by date", note: "List every visit with its date so a monthly invoice matches your calendar and the client's." },
        { item: "Clean type", note: "Standard, deep, move-out, and turnover cleans are different jobs at different prices; name the type on each line." },
        { item: "Add-ons as separate lines", note: "Inside the oven or fridge, interior windows, and laundry each get their own line instead of being folded into the base price." },
        { item: "Supplies or equipment fee", note: "If you charge for products or equipment, show it as one clear line (or say supplies are included)." },
        { item: "Lockout or late-cancellation fee", note: "Name the date and refer to the policy the client agreed to." },
        { item: "Recurring-plan discount", note: "Show a weekly or biweekly discount as a negative line so the client sees the saving." },
      ],
      rates: {
        summary:
          "Angi's city cost pages list average house cleaning rates of roughly $35 an hour in Orlando, $45 in Denver, $54 in Atlanta, and $85 in San Francisco, with flat per-visit averages around $176 in Denver and $187 in Atlanta. Rates swing a lot by city, so check what cleaners near you charge.",
        asOf: "November 2026",
        source: { label: "Angi: house cleaning cost in Atlanta, GA", url: "https://www.angi.com/articles/how-much-does-it-cost-hire-house-cleaner/ga/atlanta" },
      },
      mustShow: [
        "The date of every visit and, for property managers, the unit or address of each one.",
        "The type of clean performed, matching the scope on your quote.",
        "Add-ons and extra charges on their own lines, so the base price stays recognizable.",
        "Your cancellation and lockout policy in a short line near the payment terms.",
      ],
    },
  },
  {
    slug: "landscapers",
    name: "Landscapers & Lawn Care",
    label: "Landscapers",
    group: "services",
    invoiceName: "landscaping invoice",
    metaTitle: "Invoice App for Landscapers & Lawn Care Businesses",
    description:
      "Invoice lawn care and landscaping jobs from your phone. Bill weekly mowing, cleanups, and mulch by the yard, and quote installs customers approve online.",
    headline: "The invoice app for landscapers and lawn care",
    intro:
      "Lawn care runs on routes and repeat visits; landscaping runs on quotes and materials. Invoiceflint handles both from your phone — invoice a month of mowing in seconds, quote a planting project on site, and bill mulch and stone by the yard.",
    sample: {
      business: "Greenway Lawn & Landscape",
      client: "Robert Castillo",
      number: "INV-0634",
      lines: [
        { description: "Weekly mowing, edging, and blowing (visits)", qty: 4, rate: 45 },
        { description: "Spring cleanup – beds and leaf removal", qty: 1, rate: 220 },
        { description: "Brown mulch (cubic yards)", qty: 6, rate: 48, taxable: true },
        { description: "Mulch installation – labor (hours)", qty: 3, rate: 55 },
        { description: "Shrub trimming – front beds", qty: 1, rate: 85 },
      ],
      taxLabel: "Sales tax on materials",
      taxRate: 0.06,
      notes: "Services for April. Payment due within 14 days.",
    },
    include: [
      "The service period and the number of visits.",
      "Recurring services like mowing as a per-visit line.",
      "Seasonal and one-off work as separate lines.",
      "Materials by the unit — mulch and soil by the yard, plants by the each.",
      "The property address, especially for clients with more than one site.",
      "Payment terms and how to pay.",
    ],
    tips: [
      {
        title: "Bill maintenance monthly",
        body: "Sending an invoice after every mow means dozens of small invoices to chase. One monthly invoice listing each visit is easier for you and your customers.",
      },
      {
        title: "Quote installs on site",
        body: "Walk the property, build the estimate on your phone, and send it before you leave. Customers comparing landscapers often go with the first clear, itemized quote.",
      },
      {
        title: "Price materials by the unit",
        body: "'Mulch (cu yd) × 6' shows the customer exactly what was delivered and makes it easy to adjust if the job takes more or less.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "On-site quotes for installs",
        body: "Send itemized estimates for planting, hardscaping, and cleanups. Customers accept online and you convert to an invoice with one tap.",
      },
      {
        id: "offline",
        title: "Works anywhere on your route",
        body: "Invoiceflint works offline, so poor coverage at a rural property doesn't stop you writing up the job.",
      },
      {
        id: "clients",
        title: "Saved services and customer list",
        body: "Save mowing, cleanups, and materials with your prices, and see every customer's balance in one place.",
      },
      {
        id: "reports",
        title: "Seasonal revenue at a glance",
        body: "See revenue and paid versus unpaid totals by month and year — useful when planning for the off-season.",
      },
    ],
    faqs: [
      {
        question: "How should I invoice lawn care customers?",
        answer:
          "Most lawn care businesses invoice monthly, listing the number of visits at a per-visit price plus any extra services. Monthly billing means fewer invoices to send and chase than invoicing after every visit.",
      },
      {
        question: "How do I bill mulch, soil, and stone?",
        answer:
          "Bill materials by the unit — usually by the cubic yard or bag — with installation labor on a separate line. This makes the invoice easy to check and adjust.",
      },
      {
        question: "Should I charge per visit or a seasonal contract?",
        answer:
          "Per-visit pricing is simple and flexible; seasonal contracts give you predictable income. Many landscapers offer both. Either way, state what's included in your estimate.",
      },
      {
        question: "Can I quote landscaping jobs from my phone?",
        answer:
          "Yes. Invoiceflint lets you build an itemized estimate on site and send it as a link the customer can accept in their browser. You'll be notified when they view and accept it.",
      },
    ],
    guides: ["how-to-write-an-estimate", "how-to-invoice-labor-and-materials", "invoice-payment-terms"],
    dateModified: "2026-11-14",
    templateDetail: {
      lineItems: [
        { item: "Recurring mowing as a per-visit line", note: "Show the number of visits and the price per visit (for example, 4 visits at $45) so a monthly invoice matches your route." },
        { item: "Edging, trimming, and blowing", note: "Say whether these are included in the visit price or billed separately, and keep it consistent from month to month." },
        { item: "Seasonal and one-off jobs", note: "Spring and fall cleanups, aeration, overseeding, and shrub trimming each get their own line with a flat price." },
        { item: "Materials by the unit", note: "Mulch, topsoil, and stone by the cubic yard, and plants by the each, so the customer can see what was delivered." },
        { item: "Installation labor", note: "Bill labor for installs on its own line, by the hour or as a flat amount, apart from materials." },
        { item: "Disposal or dump fee", note: "If you haul away debris, show the fee as a separate line rather than raising other prices." },
      ],
      rates: {
        summary:
          "Lawn Love reports that lawn mowing typically costs about $45 to $75 per visit in the U.S., with most homeowners paying around $60. Lot size, how often you mow, and local labor costs move prices a lot, so check what competitors near you charge before setting yours.",
        asOf: "November 2026",
        source: { label: "Lawn Love: how much does lawn mowing cost?", url: "https://lawnlove.com/blog/lawn-mowing-cost/" },
      },
      mustShow: [
        "The service period and the date or count of each visit, matching your route log.",
        "The property address, for customers with more than one site.",
        "Materials in the unit you sold them in, such as cubic yards of mulch, separate from labor.",
        "Whether sales tax applies to materials, shown on its own line if you charge it.",
      ],
    },
  },
  {
    slug: "painters",
    name: "Painters",
    label: "Painters",
    group: "trades",
    invoiceName: "painting invoice",
    metaTitle: "Invoice App for Painters: Painting Estimates & Invoices",
    description:
      "Send painting estimates and invoices from your phone. Price by the room or square foot, record paint colors, take deposits, and get paid on time.",
    headline: "The invoice app for painters",
    intro:
      "Painting jobs are won on the estimate. Invoiceflint lets painters quote room by room on site, take a deposit when the client approves, and turn the estimate into the final invoice with one tap — paint, prep, and labor already itemized.",
    sample: {
      business: "True Coat Painting",
      client: "Emily Novak",
      number: "INV-0529",
      lines: [
        { description: "Interior walls – living room and hall, 2 coats (sq ft)", qty: 850, rate: 1.75 },
        { description: "Ceilings – living room and hall", qty: 1, rate: 320 },
        { description: "Trim, baseboards, and 4 doors", qty: 1, rate: 280 },
        { description: "Paint and primer (gallons)", qty: 9, rate: 52, taxable: true },
        { description: "Drywall repair and surface prep (hours)", qty: 2, rate: 60 },
        { description: "Less deposit received (INV-0521)", qty: 1, rate: -600 },
      ],
      taxLabel: "Sales tax on paint",
      taxRate: 0.07,
      notes: "Colors: walls 'Agreeable Gray' eggshell, trim 'Pure White' semi-gloss. Leftover paint left on site for touch-ups.",
    },
    include: [
      "The scope, room by room or surface by surface.",
      "Your pricing basis: per square foot, per room, or hours.",
      "Paint brand, color names, and sheen — invaluable for future touch-ups.",
      "Prep work and repairs as separate lines.",
      "Materials, with paint by the gallon.",
      "Any deposit received, and the balance due.",
    ],
    tips: [
      {
        title: "Price by the square foot or by the room",
        body: "Square-foot pricing is precise for big jobs; per-room pricing is easier for homeowners to compare. Either way, break the estimate into rooms or surfaces so clients can drop or add areas without a new quote.",
      },
      {
        title: "Record colors on the invoice",
        body: "Clients will need the exact color and sheen for touch-ups years later. Putting them on the invoice makes you the person they call back.",
      },
      {
        title: "Take a deposit to book the job",
        body: "A deposit secures your schedule and covers the paint. Invoice it when the estimate is accepted and subtract it on the final invoice.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Room-by-room estimates",
        body: "Quote on site, send the estimate as a link, and let the client accept it online. It converts to the invoice with one tap.",
      },
      {
        id: "templates",
        title: "Estimates that look the part",
        body: "Choose from 14 professional templates with your logo — a polished estimate helps justify a premium price.",
      },
      {
        id: "signatures",
        title: "Photos and sign-off",
        body: "Attach before-and-after photos and a signature to the final invoice.",
      },
      {
        id: "read-receipts",
        title: "Know when estimates are opened",
        body: "Get notified when a client views your estimate, so you can follow up while they're still deciding.",
      },
    ],
    faqs: [
      {
        question: "What should a painting invoice include?",
        answer:
          "A painting invoice should include the rooms or surfaces painted, your pricing basis (square foot, room, or hours), prep and repair work, paint quantities with brand, color, and sheen, any deposit received, the balance due, and payment terms.",
      },
      {
        question: "Should painters charge by the square foot or by the room?",
        answer:
          "Both work. Square-foot pricing is more precise for large or commercial jobs, while per-room pricing is simpler for homeowners. Breaking the estimate into rooms either way lets clients adjust the scope easily.",
      },
      {
        question: "Should painters ask for a deposit?",
        answer:
          "Many do, especially to cover paint and to secure a start date. Send a deposit invoice when the estimate is accepted, then subtract the deposit on the final invoice.",
      },
      {
        question: "Can I send painting estimates from my phone?",
        answer:
          "Yes. With Invoiceflint you build the estimate on site and send it as a link. The client accepts it in their browser, and you're notified when they view and respond.",
      },
    ],
    guides: ["how-to-write-an-estimate", "how-to-ask-for-a-deposit", "estimate-vs-invoice"],
    dateModified: "2026-10-31",
  },
  {
    slug: "hvac-technicians",
    name: "HVAC Technicians",
    label: "HVAC",
    group: "trades",
    invoiceName: "HVAC invoice",
    metaTitle: "Invoice App for HVAC Technicians & Contractors",
    description:
      "Create HVAC invoices and estimates on your phone. Bill diagnostics, parts, and refrigerant, record equipment details, and quote system replacements.",
    headline: "The invoice app for HVAC technicians",
    intro:
      "From a no-cool call in July to a full system replacement, Invoiceflint lets HVAC technicians invoice diagnostics, parts, and refrigerant on site, quote replacements customers can approve online, and track which invoices have been paid.",
    sample: {
      business: "Comfort Air Heating & Cooling",
      client: "Priya Raman",
      number: "INV-0915",
      lines: [
        { description: "Diagnostic fee – AC not cooling", qty: 1, rate: 99 },
        { description: "Run capacitor 45/5 MFD", qty: 1, rate: 65, taxable: true },
        { description: "Labor – replace capacitor (hours)", qty: 0.5, rate: 110 },
        { description: "R-410A refrigerant (lb)", qty: 2, rate: 85, taxable: true },
        { description: "Seasonal tune-up – coil clean and system check", qty: 1, rate: 129 },
      ],
      taxLabel: "Sales tax on parts",
      taxRate: 0.07,
      notes: "Unit: Carrier 24ACC636, serial 1219E12345. Recommend coil replacement within 2 seasons — estimate to follow.",
    },
    include: [
      "Equipment make, model, and serial number.",
      "The diagnostic or service-call fee.",
      "Parts with part numbers or specs.",
      "Refrigerant by the pound, with the type.",
      "Labor as hours × rate or a flat price.",
      "Findings and recommendations for future work.",
      "Warranty information and payment terms.",
    ],
    tips: [
      {
        title: "Record the equipment on every invoice",
        body: "Model and serial numbers on the invoice give you a service history for the next call and make warranty claims easier for the homeowner.",
      },
      {
        title: "Bill refrigerant by the pound",
        body: "Refrigerant is one of the most-questioned lines on an HVAC bill. Listing the type and pounds added is transparent and easy to justify.",
      },
      {
        title: "Turn recommendations into estimates",
        body: "If a coil or compressor is on its way out, note it on the invoice and send a replacement estimate the same day, while the customer is thinking about it.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Replacement quotes customers approve online",
        body: "Send itemized system-replacement estimates with options. Customers accept on their phone and you invoice with one tap.",
      },
      {
        id: "offline",
        title: "Works in attics and mechanical rooms",
        body: "Invoiceflint works offline, so you can finish the paperwork wherever the equipment is.",
      },
      {
        id: "signatures",
        title: "Photos of equipment and sign-off",
        body: "Attach photos of data plates and failed parts, and sign the invoice before sending.",
      },
      {
        id: "status",
        title: "Track every service call",
        body: "See which invoices are sent, viewed, paid, or overdue, and each customer's balance.",
      },
    ],
    faqs: [
      {
        question: "What should an HVAC invoice include?",
        answer:
          "An HVAC invoice should include the equipment make, model, and serial number, the diagnostic or service fee, parts, refrigerant by type and pound, labor, findings and recommendations, warranty details, tax where it applies, and payment terms.",
      },
      {
        question: "How should HVAC companies bill refrigerant?",
        answer:
          "List refrigerant on its own line by type and pounds added, at a per-pound price. This is transparent and makes the charge easy for the customer to understand.",
      },
      {
        question: "Should the diagnostic fee be on the invoice if the customer goes ahead with the repair?",
        answer:
          "List it either way. If your policy credits the diagnostic fee against the repair, show the fee and then a matching credit line so the customer can see it was applied.",
      },
      {
        question: "Can I quote a full system replacement from my phone?",
        answer:
          "Yes. Invoiceflint lets you send an itemized estimate as a link. The customer can accept it in their browser, and you convert it into an invoice with one tap when the job is done.",
      },
    ],
    guides: ["how-to-write-an-estimate", "how-to-invoice-labor-and-materials", "how-to-ask-for-a-deposit"],
    dateModified: "2026-10-31",
  },
  {
    slug: "photographers",
    name: "Photographers",
    label: "Photographers",
    group: "professional",
    invoiceName: "photography invoice",
    metaTitle: "Invoice App for Photographers: Photography Invoices",
    description:
      "Invoice photo sessions, weddings, and commercial shoots from your phone. Take retainers, bill packages and prints, and send balance reminders automatically.",
    headline: "The invoice app for photographers",
    intro:
      "Photography is booked months ahead and paid in parts — a retainer to hold the date, a balance before the shoot, extras afterwards. Invoiceflint lets photographers send polished, on-brand invoices from their phone and keeps every payment on track.",
    sample: {
      business: "Lena Moss Photography",
      client: "Avery & Jordan",
      number: "INV-0263",
      lines: [
        { description: "Wedding collection – 8 hours coverage", qty: 1, rate: 2800 },
        { description: "Second shooter (hours)", qty: 6, rate: 75 },
        { description: "Engagement session", qty: 1, rate: 350 },
        { description: "Printed album – 20 spreads", qty: 1, rate: 450 },
        { description: "Less retainer received (INV-0241)", qty: 1, rate: -900 },
      ],
      notes: "Event date: June 13, 2027. Balance due 30 days before the event. Online gallery delivered within 6 weeks.",
    },
    include: [
      "The session or event date and location.",
      "Coverage hours or the package booked.",
      "Deliverables: number of edited images, gallery, prints, albums.",
      "Retainer received and the balance due date.",
      "Usage or licensing terms for commercial work.",
      "Payment terms and methods.",
    ],
    tips: [
      {
        title: "Take a retainer to hold the date",
        body: "A wedding date you've reserved is a date you can't sell to anyone else. A non-refundable retainer, invoiced at booking, protects you if plans change.",
      },
      {
        title: "Collect the balance before the shoot",
        body: "Set the balance due date a few weeks before the event. Chasing a final payment after the gallery is delivered is much harder.",
      },
      {
        title: "Spell out licensing for commercial clients",
        body: "Brands pay for usage, not just photos. State on the invoice how and for how long the images may be used, so expanded use becomes a new line item rather than a dispute.",
      },
    ],
    features: [
      {
        id: "templates",
        title: "Invoices that match your brand",
        body: "Choose from 14 templates and add your logo, so invoices feel as considered as your work.",
      },
      {
        id: "reminders",
        title: "Automatic balance reminders",
        body: "Schedule email reminders ahead of the balance due date so you're not chasing couples before their wedding.",
      },
      {
        id: "estimates",
        title: "Package quotes clients accept online",
        body: "Send your collections as an estimate; when the client accepts, convert it to the retainer invoice in one tap.",
      },
      {
        id: "send",
        title: "Send by email or WhatsApp",
        body: "Send invoices wherever your clients reply fastest, as a link they can open on any device.",
      },
    ],
    faqs: [
      {
        question: "What should a photography invoice include?",
        answer:
          "A photography invoice should include the session or event date, the package or coverage hours, deliverables such as edited images, galleries, and albums, any retainer already paid, the balance and its due date, usage or licensing terms for commercial work, and payment details.",
      },
      {
        question: "How much retainer should a photographer charge?",
        answer:
          "Many wedding and event photographers take a retainer of 25–50% to book the date, with the balance due before the event. Whatever you choose, state on the invoice whether the retainer is refundable.",
      },
      {
        question: "Should usage rights be on a photography invoice?",
        answer:
          "For commercial work, yes. Describe how the client may use the images and for how long. Usage beyond that can then be quoted as a separate license fee.",
      },
      {
        question: "Can I send professional photography invoices from my phone?",
        answer:
          "Yes. Invoiceflint lets you create branded invoices and estimates on your phone and send them by email, WhatsApp, or link. Invoiceflint Pro adds 14 templates and automatic payment reminders.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "how-to-follow-up-on-unpaid-invoice", "invoice-payment-terms"],
    dateModified: "2026-10-31",
  },
  {
    slug: "graphic-designers",
    name: "Graphic Designers",
    label: "Designers",
    group: "professional",
    invoiceName: "design invoice",
    metaTitle: "Invoice App for Graphic Designers & Design Studios",
    description:
      "Invoice design projects from your phone. Bill deposits, milestones, and extra revisions, tie file handover to payment, and see when clients open invoices.",
    headline: "The invoice app for graphic designers",
    intro:
      "Design projects are billed in milestones, revised more than planned, and paid by clients who forget. Invoiceflint helps designers and small studios invoice deposits and milestones, bill extra revision rounds, and know exactly when a client has seen the invoice.",
    sample: {
      business: "Studio Kova",
      client: "Fernway Coffee Co.",
      number: "INV-0148",
      lines: [
        { description: "Brand identity – logo and mark (2 revision rounds included)", qty: 1, rate: 2400 },
        { description: "Brand guidelines document", qty: 1, rate: 900 },
        { description: "Packaging design (SKUs)", qty: 3, rate: 450 },
        { description: "Additional revision rounds (hours)", qty: 3, rate: 85 },
        { description: "Less deposit received (INV-0139)", qty: 1, rate: -1650 },
      ],
      notes: "Final source files and full usage rights transfer on receipt of payment. Payment due within 14 days.",
    },
    include: [
      "Project name and the deliverables completed.",
      "The milestone this invoice covers.",
      "How many revision rounds were included, and any extra rounds billed.",
      "Deposit received and balance due.",
      "Usage rights and when they transfer.",
      "Payment terms — often Net 14 for small clients.",
    ],
    tips: [
      {
        title: "Ask for 30–50% upfront",
        body: "A deposit commits the client and covers your time if the project stalls. Invoice it when the proposal is accepted.",
      },
      {
        title: "Define revision rounds, then bill extras",
        body: "Put the number of included revisions on the estimate. When feedback goes beyond it, extra rounds become a line item instead of free work.",
      },
      {
        title: "Tie file handover to payment",
        body: "State on the invoice that final files and usage rights transfer on payment. It's standard practice, and it puts your invoice near the top of the client's pile.",
      },
    ],
    features: [
      {
        id: "read-receipts",
        title: "Know when the client has seen it",
        body: "Get notified the moment a client opens your invoice or proposal — no more 'did you get my email?'.",
      },
      {
        id: "estimates",
        title: "Proposals that become invoices",
        body: "Send the project estimate, let the client accept it online, and convert it to the deposit invoice with one tap.",
      },
      {
        id: "templates",
        title: "Invoices worthy of a designer",
        body: "Pick from 14 templates and add your logo, so your invoices look as good as your work.",
      },
      {
        id: "export",
        title: "Export for your accountant",
        body: "Export reports and client statements as CSV or PDF at tax time.",
      },
    ],
    faqs: [
      {
        question: "How should graphic designers invoice clients?",
        answer:
          "Most designers invoice a deposit when the project is agreed, then milestones or a final invoice on delivery. Each invoice lists the deliverables, revision rounds included, any extra revisions, the deposit received, and when usage rights transfer.",
      },
      {
        question: "Should designers charge for extra revisions?",
        answer:
          "Yes, if the agreed number of revision rounds has been used. State how many rounds are included in your estimate, then bill extra rounds hourly or at a set price as their own line.",
      },
      {
        question: "When should usage rights transfer to the client?",
        answer:
          "Commonly on full payment. Stating this on the invoice protects your work and encourages prompt payment.",
      },
      {
        question: "What's a good invoice app for freelance designers?",
        answer:
          "A good invoice app for designers sends professional, branded invoices quickly and tells you when clients open them. Invoiceflint does both from your phone, converts accepted estimates into invoices, and sends automatic reminders with Pro.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "get-paid-faster-as-a-freelancer", "how-to-follow-up-on-unpaid-invoice"],
    dateModified: "2026-10-31",
  },
  {
    slug: "consultants",
    name: "Consultants",
    label: "Consultants",
    group: "professional",
    invoiceName: "consulting invoice",
    metaTitle: "Invoice App for Consultants: Consulting Invoices",
    description:
      "Invoice consulting hours, day rates, retainers, and expenses from your phone. Add PO numbers, attach receipts, and follow up automatically on late payments.",
    headline: "The invoice app for consultants",
    intro:
      "Consulting invoices go to accounts payable teams who need them exactly right — the PO number, the period, the hours, the expenses. Invoiceflint lets independent consultants send precise invoices from anywhere and follow up automatically when they sit unpaid.",
    sample: {
      business: "Hartwell Advisory",
      client: "Brightpath Logistics Ltd.",
      number: "INV-2026-041",
      lines: [
        { description: "Strategy workshop facilitation (days)", qty: 2, rate: 1800 },
        { description: "Advisory hours – October (hours)", qty: 12, rate: 175 },
        { description: "Market analysis report", qty: 1, rate: 2500 },
        { description: "Travel expenses at cost – receipts attached", qty: 1, rate: 386.2 },
      ],
      notes: "PO #BP-77821. Services for October 1–31. Payment due Net 30.",
    },
    include: [
      "The client's purchase order (PO) number, if they use one.",
      "The billing period.",
      "Hours or days with a short description of the work.",
      "Fixed-fee deliverables as their own lines.",
      "Expenses at cost, with receipts attached.",
      "Payment terms that match your agreement — often Net 15 or Net 30.",
      "Your tax ID, if the client or your local tax rules require it.",
    ],
    tips: [
      {
        title: "Always include the PO number",
        body: "Larger clients can't pay an invoice without a matching purchase order. A missing PO is one of the most common reasons consulting invoices sit unpaid for weeks.",
      },
      {
        title: "Send it to accounts payable, not just your contact",
        body: "Your sponsor approves the work; accounts payable releases the money. Ask who should receive invoices at the start of the engagement.",
      },
      {
        title: "Bill expenses separately and at cost",
        body: "List travel and expenses on their own lines with receipts attached. It makes approval faster and keeps your fees clearly separate.",
      },
    ],
    features: [
      {
        id: "read-receipts",
        title: "Know when AP has opened it",
        body: "See the moment the client views your invoice, so you know whether it reached the right person.",
      },
      {
        id: "reminders",
        title: "Automatic follow-ups on Net 30",
        body: "Schedule reminders before and after the due date, so long payment terms don't become longer.",
      },
      {
        id: "signatures",
        title: "Attach expense receipts",
        body: "Attach photos of receipts to the invoice so expenses are approved without back-and-forth.",
      },
      {
        id: "export",
        title: "Statements and reports",
        body: "Export client statements and reports as CSV or PDF for your records and your accountant.",
      },
    ],
    faqs: [
      {
        question: "What should a consulting invoice include?",
        answer:
          "A consulting invoice should include the client's purchase order number if they use one, the billing period, hours or days worked with descriptions, any fixed-fee deliverables, expenses at cost with receipts, the total, payment terms, and your business and tax details.",
      },
      {
        question: "How do consultants bill — hourly, daily, or by project?",
        answer:
          "All three are common. Hourly billing suits advisory work, day rates suit workshops and on-site engagements, and fixed project fees suit well-defined deliverables. Many consultants combine them on one invoice.",
      },
      {
        question: "How do I invoice a monthly retainer?",
        answer:
          "Send an invoice at the start of each month for the agreed retainer, describing what it covers. If extra hours are billed beyond the retainer, add them as a separate line on the next invoice.",
      },
      {
        question: "Why hasn't my consulting invoice been paid?",
        answer:
          "Common causes are a missing purchase order number, the invoice going to the wrong person, or the client's payment cycle. Confirm the invoice was opened, check it matches the PO, and send a polite reminder referencing the invoice number.",
      },
    ],
    guides: ["invoice-payment-terms", "how-to-follow-up-on-unpaid-invoice", "how-to-number-invoices"],
    dateModified: "2026-10-31",
  },
  {
    slug: "freelancers",
    name: "Freelancers",
    label: "Freelancers",
    group: "professional",
    invoiceName: "freelance invoice",
    metaTitle: "Invoice App for Freelancers: Create & Send Invoices",
    description:
      "A simple invoice app for freelancers. Create invoices on your phone, send them by email or WhatsApp, see when clients open them, and get paid faster.",
    headline: "The invoice app for freelancers",
    intro:
      "Freelancing means doing the work and then chasing the money. Invoiceflint takes care of the second part: create a professional invoice in a minute, send it from your phone, see the moment your client opens it, and let automatic reminders do the chasing.",
    sample: {
      business: "Sam Rivera – Copywriting",
      client: "Northwind Media",
      number: "INV-0087",
      lines: [
        { description: "Website copywriting (pages)", qty: 5, rate: 250 },
        { description: "SEO meta titles and descriptions (pages)", qty: 5, rate: 30 },
        { description: "Additional editing and revisions (hours)", qty: 2, rate: 60 },
      ],
      notes: "Thank you for the project! Payment due within 7 days.",
    },
    include: [
      "Your name or business name and contact details.",
      "The client's legal or company name and billing contact.",
      "A unique invoice number and the invoice date.",
      "The project and a short description of each deliverable.",
      "Your rate and the quantity — hours, pages, words, or a fixed fee.",
      "A specific due date and how to pay.",
      "Your tax ID or VAT number, if you're registered.",
    ],
    tips: [
      {
        title: "Invoice the day you deliver",
        body: "The work is never more valuable to the client than the day they receive it. Sending the invoice the same day shortens your wait.",
      },
      {
        title: "Use short, specific terms",
        body: "'Due in 7 days (by Nov 14)' gets paid faster than 'Net 30' or 'due on receipt'. Agree on terms before you start.",
      },
      {
        title: "Know whether it's been seen",
        body: "An unopened invoice and an ignored one need different follow-ups. Read receipts tell you which you're dealing with.",
      },
    ],
    features: [
      {
        id: "create",
        title: "A professional invoice in a minute",
        body: "Add your client and line items; numbering, totals, and tax are handled for you.",
      },
      {
        id: "read-receipts",
        title: "See when clients open it",
        body: "Get a notification the moment your client views the invoice.",
      },
      {
        id: "reminders",
        title: "Automatic reminders",
        body: "Let polite email reminders follow up before and after the due date, so you don't have to.",
      },
      {
        id: "multi-business",
        title: "More than one side business",
        body: "Run two brands or services? Keep each business's details, logo, and currency separate.",
      },
    ],
    faqs: [
      {
        question: "What is the best invoice app for freelancers?",
        answer:
          "The best invoice app for freelancers is fast to use, looks professional, and helps you get paid. Invoiceflint is built for this: you create and send invoices from your phone, see when clients open them, and send automatic reminders with Pro. It's free to download on iPhone and Android.",
      },
      {
        question: "What should a freelance invoice include?",
        answer:
          "A freelance invoice should include your name and contact details, the client's details, a unique invoice number, the invoice date, a description of the work, your rate and quantity, the total, a specific due date, payment instructions, and your tax ID if you're registered.",
      },
      {
        question: "Do I need a registered business to send an invoice?",
        answer:
          "In many countries you can invoice as an individual sole trader under your own name, but tax and registration rules vary. Check the requirements where you live, especially once your income passes local thresholds.",
      },
      {
        question: "How do I invoice clients in another country?",
        answer:
          "Agree on the currency up front, put it clearly on the invoice, and include any tax details your client needs. Invoiceflint lets you set your business currency, and with Pro you can run separate businesses with different currencies.",
      },
    ],
    guides: ["get-paid-faster-as-a-freelancer", "how-to-invoice-a-client", "invoice-payment-terms"],
    dateModified: "2026-10-31",
  },
  {
    slug: "auto-mechanics",
    name: "Auto Mechanics",
    label: "Auto Mechanics",
    group: "trades",
    invoiceName: "auto repair invoice",
    metaTitle: "Invoice App for Auto Mechanics: Auto Repair Invoices",
    description:
      "Write auto repair invoices and estimates on your phone. Bill diagnostics, labor, and parts, record the vehicle and mileage, and get approval for extra work.",
    headline: "The invoice app for auto mechanics",
    intro:
      "Whether you run a one-bay shop or a mobile repair van, Invoiceflint lets mechanics estimate and invoice from the phone in their pocket. Record the vehicle, list labor and parts, get the customer's approval on the estimate before you start, and send the invoice when the keys go back.",
    sample: {
      business: "Corner Garage Auto Repair",
      client: "Priya Natarajan",
      number: "INV-2214",
      lines: [
        { description: "Diagnostic – check engine light, scan and test", qty: 1, rate: 95 },
        { description: "Labor – front brake pads and rotors (hours)", qty: 1.8, rate: 120 },
        { description: "Front brake rotors", qty: 2, rate: 68, taxable: true },
        { description: "Ceramic brake pad set", qty: 1, rate: 54.5, taxable: true },
        { description: "Labor – replace upstream O2 sensor (hours)", qty: 0.6, rate: 120 },
        { description: "Upstream oxygen sensor", qty: 1, rate: 89, taxable: true },
        { description: "Shop supplies", qty: 1, rate: 18, taxable: true },
      ],
      taxLabel: "Sales tax on parts and supplies",
      taxRate: 0.0825,
      notes: "Vehicle: 2017 Honda Accord, VIN ending 4471, odometer in 86,412. Old parts available on request. 12-month / 12,000-mile parts and labor warranty.",
    },
    include: [
      "Your shop name, address, and any repair facility registration number your state requires.",
      "The customer's name and phone number.",
      "Vehicle year, make, model, VIN, and the odometer reading.",
      "The customer's complaint, what you found, and what you did to fix it.",
      "Labor for each repair, as hours × your labor rate or a flat price.",
      "Each part with its quantity and price — and whether it's new, used, or rebuilt, which some states require.",
      "Shop supplies or environmental fees as their own lines.",
      "Tax, your parts and labor warranty, and when payment is due.",
    ],
    tips: [
      {
        title: "Get approval before going over the estimate",
        body: "Many states require a written estimate and the customer's go-ahead before you do work that costs more than it. When you find a worn tie rod during a brake job, send a revised estimate the customer can accept on their phone — a record you won't get from a phone call.",
      },
      {
        title: "Record the VIN and mileage every time",
        body: "It ties the invoice to the vehicle for warranty claims and comebacks, builds the customer's service history, and settles any argument about which car the work was done on.",
      },
      {
        title: "Keep parts and labor on separate lines",
        body: "Parts and labor are often taxed differently, and customers look up parts prices online. Separate lines keep your tax right and make your labor rate easy to see and defend.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Approval before you pick up a wrench",
        body: "Send the estimate as a link, the customer accepts it from their phone, and it becomes the invoice with one tap when the car's ready.",
      },
      {
        id: "signatures",
        title: "Photos of the worn parts",
        body: "Attach photos of the cracked belt or scored rotor to the estimate, so the customer can see why the work is needed.",
      },
      {
        id: "clients",
        title: "Saved jobs and parts",
        body: "Save the jobs you do every day — oil change, brake pads, battery — with your prices, and build each invoice from them.",
      },
      {
        id: "read-receipts",
        title: "Know the customer has seen the estimate",
        body: "Get a notification when they open it, so you can call while the car is still on the lift.",
      },
    ],
    faqs: [
      {
        question: "What should an auto repair invoice include?",
        answer:
          "An auto repair invoice should include your shop details and any required registration number, the customer's name, the vehicle's year, make, model, VIN, and mileage, a description of the problem and the repair, labor hours and rate, each part with its price and condition (new, used, or rebuilt), shop fees, tax, warranty terms, and the total due.",
      },
      {
        question: "Do I need the customer's approval before doing extra repairs?",
        answer:
          "In many states, yes: auto repair laws require a written estimate and the customer's authorization before the bill goes over it. Even where it isn't required, written approval prevents disputes. With Invoiceflint you can send a revised estimate that the customer accepts online, which gives you a record of their approval.",
      },
      {
        question: "Should shop supplies be on the invoice?",
        answer:
          "If you charge for shop supplies such as rags, cleaners, and small hardware, list them as their own line and tell customers about the fee up front. Some states regulate how these fees are charged, so check your local rules.",
      },
      {
        question: "Can mobile mechanics use Invoiceflint?",
        answer:
          "Yes. It runs on your phone, works offline, and sends the invoice by text, WhatsApp, or email from the customer's driveway or parking lot.",
      },
    ],
    guides: ["how-to-write-an-estimate", "how-to-invoice-labor-and-materials", "invoice-vs-receipt"],
    dateModified: "2026-10-31",
  },
  {
    slug: "roofers",
    name: "Roofers",
    label: "Roofers",
    group: "trades",
    invoiceName: "roofing invoice",
    metaTitle: "Invoice App for Roofers: Roofing Estimates & Invoices",
    description:
      "Create roofing estimates and invoices on your phone. Price by the square, list tear-off and decking, take deposits, and attach photos of the roof.",
    headline: "The invoice app for roofers",
    intro:
      "Roofing jobs are won on the estimate. Invoiceflint lets roofers price and send an estimate from the driveway, invoice the deposit when the homeowner accepts, and send the final invoice — with photos of the finished roof — the day the crew packs up.",
    sample: {
      business: "Summit Ridge Roofing",
      client: "Greg & Tanya Ellis",
      number: "INV-0532",
      lines: [
        { description: "Tear-off existing shingles, 1 layer (squares)", qty: 24, rate: 65 },
        { description: "Architectural shingles, supplied and installed (squares)", qty: 26, rate: 340 },
        { description: "Synthetic underlayment and ice & water shield", qty: 1, rate: 780 },
        { description: "Replace rotted roof decking (4×8 sheets)", qty: 6, rate: 85 },
        { description: "Ridge vent (linear ft)", qty: 38, rate: 9 },
        { description: "Dumpster and debris disposal", qty: 1, rate: 450 },
        { description: "Less deposit received (INV-0519)", qty: 1, rate: -4000 },
      ],
      notes: "10-year workmanship warranty. Shingle manufacturer warranty registered in the homeowners' names. Balance due on completion.",
    },
    include: [
      "Your business details, plus license and insurance information where your state requires it.",
      "The property address.",
      "Roof size in squares, and the shingle brand, line, and color.",
      "Tear-off, underlayment, flashing, and ventilation as separate lines.",
      "Decking replacement priced per sheet.",
      "Dumpster, disposal, and permit fees.",
      "The deposit already received and the balance due.",
      "Workmanship and manufacturer warranty terms.",
    ],
    tips: [
      {
        title: "Price rotten decking per sheet up front",
        body: "You can't see the deck until the shingles come off. Put a per-sheet price for replacement decking on the estimate, so extra sheets are already agreed and simply become a quantity on the invoice.",
      },
      {
        title: "Take a deposit before ordering materials",
        body: "Shingles are ordered for the job and can't always go back. Invoice a deposit when the estimate is accepted — and check local rules, because some states limit deposits on home improvement work.",
      },
      {
        title: "Match insurance jobs to the adjuster's scope",
        body: "For storm damage, the homeowner's insurer will usually compare your invoice with the scope it approved. Use the same line items and attach before-and-after photos to avoid delays in the payout.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Estimates from the driveway",
        body: "Measure, price, and send the estimate before you leave. The homeowner accepts it online and it becomes the invoice with one tap.",
      },
      {
        id: "signatures",
        title: "Roof photos on the paperwork",
        body: "Attach photos of damaged areas, rotted decking, and the finished roof to estimates and invoices, and sign them on screen.",
      },
      {
        id: "read-receipts",
        title: "Know when they open your bid",
        body: "Homeowners collect several roofing bids. A notification when they open yours tells you when to follow up.",
      },
      {
        id: "reminders",
        title: "Collect the balance on time",
        body: "Schedule email reminders for the final payment, so you're not chasing homeowners while you're on the next roof.",
      },
    ],
    faqs: [
      {
        question: "What should a roofing invoice include?",
        answer:
          "A roofing invoice should include your business, license, and insurance details where required, the property address, the roof size in squares, materials by brand and type, tear-off, underlayment, flashing, ventilation, decking replacement, disposal and permit fees, the deposit received, the balance due, and warranty terms.",
      },
      {
        question: "How do roofers charge for replacing rotted decking?",
        answer:
          "Most roofers include a per-sheet price for replacement decking in the estimate, because the condition of the deck isn't known until the old roof is removed. The final invoice then shows how many sheets were actually replaced.",
      },
      {
        question: "How much deposit should a roofer ask for?",
        answer:
          "Deposits of 10% to 50% are common, often enough to cover materials. Some states cap deposits on home improvement contracts — California, for example, limits them to 10% of the contract price or $1,000, whichever is less — so check the rules where you work.",
      },
      {
        question: "Can I attach photos to a roofing invoice?",
        answer:
          "Yes. With Invoiceflint Pro you can attach photos to estimates and invoices — useful for showing storm damage, rotted decking, or the completed job.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "how-to-write-an-estimate", "how-to-invoice-labor-and-materials"],
    dateModified: "2026-10-31",
  },
  {
    slug: "carpenters",
    name: "Carpenters",
    label: "Carpenters",
    group: "trades",
    invoiceName: "carpentry invoice",
    metaTitle: "Invoice App for Carpenters: Carpentry Invoices & Quotes",
    description:
      "Quote and invoice carpentry jobs from your phone. Bill labor, lumber, and hardware, take a deposit on custom builds, and say clearly what's not included.",
    headline: "The invoice app for carpenters",
    intro:
      "Built-ins, decks, trim, cabinets — carpentry is priced job by job, and materials can be half the bill. Invoiceflint lets carpenters quote with itemized lumber and hardware, take a deposit before buying wood, and invoice the balance from the job site.",
    sample: {
      business: "Oak & Iron Carpentry",
      client: "Hannah Brooks",
      number: "INV-0148",
      lines: [
        { description: "Custom built-in bookcase, living room – labor (days)", qty: 3, rate: 480 },
        { description: "3/4\" paint-grade plywood (sheets)", qty: 6, rate: 72, taxable: true },
        { description: "Poplar face frame and trim (board ft)", qty: 40, rate: 6.5, taxable: true },
        { description: "Shelf pins, hinges, and fasteners", qty: 1, rate: 38, taxable: true },
        { description: "Materials pickup and delivery", qty: 1, rate: 60 },
        { description: "Less deposit received (INV-0139)", qty: 1, rate: -700 },
      ],
      taxLabel: "Sales tax on materials",
      taxRate: 0.06,
      notes: "Primed, ready for paint — painting not included. Balance due within 7 days of completion.",
    },
    include: [
      "Your business details and contractor license number where it's required.",
      "The job address and a description of what you built, installed, or repaired.",
      "Labor by the hour, the day, or a fixed price for the job.",
      "Lumber and sheet goods by quantity — board feet, linear feet, or sheets.",
      "Hardware, fasteners, and finishes.",
      "What's not included, such as painting or hauling away old cabinets.",
      "The deposit received and the balance due.",
    ],
    tips: [
      {
        title: "Quote materials separately from labor",
        body: "Lumber prices move. With materials on their own lines, you can say how long the price holds and update just those lines if the quote expires — without reopening your labor price.",
      },
      {
        title: "Take a deposit on custom work",
        body: "A built-in cut to fit one wall can't be sold to anyone else. Invoice a deposit that covers materials before you buy them.",
      },
      {
        title: "Say what's not included",
        body: "Painting, staining, drywall patching, and removing the old unit are the usual surprises. One line in the notes saying what's excluded heads off the argument.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Quotes clients accept online",
        body: "Send an itemized quote for the deck or built-in; the client accepts it in their browser and it converts to the invoice when you're done.",
      },
      {
        id: "signatures",
        title: "Photos of the finished work",
        body: "Attach photos of the completed job to the invoice, and add your signature on screen.",
      },
      {
        id: "clients",
        title: "Saved rates and materials",
        body: "Save your day rate and common materials with prices, and build each quote from them.",
      },
      {
        id: "status",
        title: "See which jobs are paid",
        body: "Every invoice shows Draft, Sent, Viewed, or Paid, and overdue ones stand out — so you know who owes you before you buy materials for the next job.",
      },
    ],
    faqs: [
      {
        question: "What should a carpentry invoice include?",
        answer:
          "A carpentry invoice should include your business details and license number where required, the job address, a description of the work, labor (hourly, daily, or fixed), itemized lumber, hardware, and finishes, anything not included, the deposit received, tax where it applies, the balance due, and a due date.",
      },
      {
        question: "Should carpenters charge by the hour or by the job?",
        answer:
          "Fixed prices suit well-defined jobs such as hanging doors or building a deck from plans. Hourly or day rates suit repairs and jobs where the scope may change. Many carpenters quote a fixed price and state an hourly rate for changes the client asks for.",
      },
      {
        question: "How should I bill for lumber?",
        answer:
          "List lumber and sheet goods by quantity — board feet, linear feet, or sheets — at your price. Many carpenters add a markup to cover the time spent sourcing, picking up, and handling materials.",
      },
      {
        question: "Can I send a carpentry quote from my phone?",
        answer:
          "Yes. Invoiceflint lets you write the quote on site, send it as a link by text, WhatsApp, or email, and turn it into an invoice with one tap once the client accepts.",
      },
    ],
    guides: ["how-to-invoice-labor-and-materials", "how-to-ask-for-a-deposit", "how-to-write-an-estimate"],
    dateModified: "2026-10-31",
  },
  {
    slug: "movers",
    name: "Movers",
    label: "Movers",
    group: "services",
    invoiceName: "moving invoice",
    metaTitle: "Invoice App for Movers: Moving Estimates & Invoices",
    description:
      "Create moving estimates and invoices on your phone. Bill crew hours, travel, packing materials, and extras, then send the invoice before the truck leaves.",
    headline: "The invoice app for movers",
    intro:
      "A move is quoted on an estimate and billed on the clock. Invoiceflint lets moving companies send an estimate after the walkthrough, then turn it into the final invoice with the actual crew hours, materials, and extras — sent from a phone before the truck pulls away.",
    sample: {
      business: "Two Rivers Moving Co.",
      client: "Elena Vasquez",
      number: "INV-0779",
      lines: [
        { description: "3 movers and 26' truck (hours)", qty: 6.5, rate: 185 },
        { description: "Travel fee – depot round trip", qty: 1, rate: 185 },
        { description: "Wardrobe boxes", qty: 6, rate: 18, taxable: true },
        { description: "Packing paper and tape", qty: 1, rate: 42, taxable: true },
        { description: "Upright piano handling", qty: 1, rate: 150 },
        { description: "Stairs at destination (3rd floor, no elevator)", qty: 1, rate: 75 },
      ],
      taxLabel: "Sales tax on materials",
      taxRate: 0.07,
      notes: "Start 8:00 am at origin, finish 2:30 pm at destination. Basic valuation coverage selected. Payment due on completion.",
    },
    include: [
      "Your business details, and your USDOT number or state license number where required.",
      "Origin and destination addresses and the move date.",
      "Crew size, truck, and hourly rate — or the flat price you agreed.",
      "Start and finish times, so the customer can check the hours.",
      "Travel time or a travel fee.",
      "Packing materials by quantity.",
      "Extras such as stairs, long carries, heavy items, or storage.",
      "The valuation coverage chosen, and how to pay.",
    ],
    tips: [
      {
        title: "Write start and finish times on the invoice",
        body: "Hours are the most disputed part of a moving bill. Recording when the crew started and finished — in the notes or the line description — answers the question before it's asked.",
      },
      {
        title: "Explain how travel time is charged",
        body: "Whether you bill a flat travel fee or an hour of drive time, put the policy in the estimate and show it as its own line on the invoice, separate from loading and unloading.",
      },
      {
        title: "Price the extras before move day",
        body: "Pianos, safes, stairs, and long carries should be on the estimate. Extras that first appear on the final invoice are the ones customers refuse to pay.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Estimates from the walkthrough",
        body: "Send the estimate before you leave the customer's home. Once they accept, it converts to the invoice — just update the hours on move day.",
      },
      {
        id: "send",
        title: "Invoice before the truck leaves",
        body: "Send the final invoice by text, WhatsApp, or email while you're still at the destination, so it's paid while the move is fresh.",
      },
      {
        id: "payments",
        title: "Track deposits and payments",
        body: "Record the booking deposit and the final payment as they arrive, and see what every customer still owes.",
      },
      {
        id: "multi-business",
        title: "Moving and storage, kept separate",
        body: "Run a storage business alongside your moving company? Keep each one's details, logo, and invoice numbers apart.",
      },
    ],
    faqs: [
      {
        question: "What should a moving invoice include?",
        answer:
          "A moving invoice should include your business details and any required USDOT or state license number, the origin and destination addresses, the move date, crew size and hourly rate (or the flat price), start and finish times, travel charges, packing materials, extra charges such as stairs or heavy items, the valuation coverage selected, the total, and payment instructions.",
      },
      {
        question: "How do movers charge for travel time?",
        answer:
          "Local movers commonly charge either a flat travel fee or bill the drive time from their depot at the hourly rate. Whichever you use, state it on the estimate and list it as its own line on the invoice.",
      },
      {
        question: "Should a moving company take a deposit?",
        answer:
          "Many do, to reserve the date — especially for weekends and the end of the month. Invoice the deposit when the customer books, then subtract it on the final invoice.",
      },
      {
        question: "Can I change the hours after converting the estimate to an invoice?",
        answer:
          "Yes. Convert the accepted estimate to an invoice in Invoiceflint, then update the hours and add any extras before you send it.",
      },
    ],
    guides: ["how-to-write-an-estimate", "how-to-ask-for-a-deposit", "invoice-vs-receipt"],
    dateModified: "2026-10-31",
  },
  {
    slug: "pest-control",
    name: "Pest Control Businesses",
    label: "Pest Control",
    group: "services",
    invoiceName: "pest control invoice",
    metaTitle: "Invoice App for Pest Control: Service Invoices",
    description:
      "Invoice pest control treatments from your phone. Bill inspections, treatments, and exclusion work, list products used, and keep quarterly plans on track.",
    headline: "The invoice app for pest control",
    intro:
      "Pest control runs on routes and repeat visits. Invoiceflint lets technicians invoice each service from the truck — what was treated, which products were applied, when the next visit is — and keeps every customer's balance in one place, so quarterly plans don't slip.",
    sample: {
      business: "Clearpath Pest Control",
      client: "Riverside Apartments – Building C",
      number: "INV-3381",
      lines: [
        { description: "Initial inspection and report", qty: 1, rate: 95 },
        { description: "General pest treatment – interior and exterior perimeter", qty: 1, rate: 165 },
        { description: "Rodent exclusion – seal entry points (hours)", qty: 2, rate: 85 },
        { description: "Tamper-resistant rodent bait stations", qty: 6, rate: 28 },
      ],
      notes: "Products applied: bifenthrin (exterior perimeter), cockroach gel bait (kitchens, units 1–4). Next quarterly service: February 2027. Payment due within 15 days.",
    },
    include: [
      "Your business details and pest control license number where it's required.",
      "The service address — with unit numbers for multi-unit properties.",
      "Date of service and the pests targeted.",
      "Each inspection, treatment, or service as its own line.",
      "Products applied and areas treated, which many states require you to give the customer.",
      "For service plans, which visit this invoice covers and when the next one is.",
      "Any re-treatment guarantee, and when payment is due.",
    ],
    tips: [
      {
        title: "List products and areas treated",
        body: "Many states require you to give customers a written record of the pesticides applied. Putting product names and treated areas in the invoice notes covers it, and gives you a record if questions come up later.",
      },
      {
        title: "Make every plan invoice look the same",
        body: "Quarterly and monthly customers pay faster when each invoice is familiar. Save the plan as an item and reuse it every visit, changing only the date.",
      },
      {
        title: "Bill exclusion work separately",
        body: "Sealing entry points is skilled labor, not a routine spray. Billing it as its own line shows the customer why this visit costs more than a regular one.",
      },
    ],
    features: [
      {
        id: "clients",
        title: "Saved plans and customers",
        body: "Keep every account — homes, restaurants, property managers — with its balance, and build invoices from saved services.",
      },
      {
        id: "signatures",
        title: "Photos of activity and entry points",
        body: "Attach photos of droppings, damage, or sealed gaps to the invoice, and add a signature on screen.",
      },
      {
        id: "reminders",
        title: "Reminders for commercial accounts",
        body: "Property managers and restaurants pay on cycles. Scheduled email reminders keep your invoice from being forgotten in their inbox.",
      },
      {
        id: "reports",
        title: "Revenue by month",
        body: "See what you've billed and collected each month and year — useful when you're planning the busy season.",
      },
    ],
    faqs: [
      {
        question: "What should a pest control invoice include?",
        answer:
          "A pest control invoice should include your business details and license number where required, the service address, the date of service, the pests targeted, each inspection or treatment with its price, the products applied and areas treated, the next scheduled visit for service plans, any guarantee, and the payment due date.",
      },
      {
        question: "Do pest control invoices need to list the chemicals used?",
        answer:
          "Many states require pest control companies to give customers a written record of the products applied, sometimes including the EPA registration number. Requirements vary, so check with your state's pesticide regulator. Adding the details to the invoice notes is a simple way to include them.",
      },
      {
        question: "How do I bill a quarterly pest control plan?",
        answer:
          "Most companies invoice each visit as it's done, using the same saved plan item every time. Some bill the year up front with a prepayment discount. Either way, note which visit the invoice covers.",
      },
      {
        question: "Can I invoice a property manager for several units?",
        answer:
          "Yes. Add the property management company as the client and put the building and unit numbers in the line items or notes. Invoiceflint keeps a running balance for each client.",
      },
    ],
    guides: ["how-to-number-invoices", "invoice-payment-terms", "how-to-follow-up-on-unpaid-invoice"],
    dateModified: "2026-10-31",
  },
  {
    slug: "tutors",
    name: "Tutors",
    label: "Tutors",
    group: "services",
    invoiceName: "tutoring invoice",
    metaTitle: "Invoice App for Tutors: Tutoring Invoices for Parents",
    description:
      "Invoice tutoring sessions and lesson packages from your phone. Send parents one clear monthly invoice by email or WhatsApp and see when they open it.",
    headline: "The invoice app for tutors",
    intro:
      "Tutors usually bill parents, often for a month of sessions at a time. Invoiceflint lets you list each session or package, send the invoice by email or WhatsApp, and see when it's been opened — so you don't have to bring up payment at the end of a lesson.",
    sample: {
      business: "Clara Osei Tutoring",
      client: "Michael Turner (for Jamie Turner)",
      number: "INV-0412",
      lines: [
        { description: "Algebra 2 – 60-min sessions (Oct 2, 9, 16, 23, 30)", qty: 5, rate: 65 },
        { description: "SAT math practice test and review (90 min)", qty: 1, rate: 95 },
        { description: "Late cancellation, Oct 19 – 50% of session fee", qty: 1, rate: 32.5 },
      ],
      notes: "November sessions: Thursdays at 4 pm. Payment due by Nov 7. Cancellations with less than 24 hours' notice are charged at 50%.",
    },
    include: [
      "Your name or business name and contact details.",
      "The parent or guardian as the client, and the student's name.",
      "Each session's date and length, or the package being billed.",
      "The subject or level.",
      "Your rate per session or the package price.",
      "Any cancellation charges, with your policy.",
      "A due date and how to pay.",
    ],
    tips: [
      {
        title: "Invoice once a month",
        body: "An invoice after every lesson means a lot of admin for you and the parent. One monthly invoice that lists every session is easier to pay and to check.",
      },
      {
        title: "Put your cancellation policy in writing",
        body: "A 24-hour cancellation policy only works if parents have agreed to it. Put it in your first invoice's notes, then charge it consistently.",
      },
      {
        title: "Offer packages paid up front",
        body: "A package of ten sessions paid in advance improves attendance and smooths your income. Invoice the package once and note how many sessions are left.",
      },
    ],
    features: [
      {
        id: "send",
        title: "Send where parents actually look",
        body: "Open WhatsApp with the invoice link ready to send, or email it — parents view it in their browser without installing anything.",
      },
      {
        id: "read-receipts",
        title: "Know it's been seen",
        body: "Get a notification when the parent opens the invoice, so you know whether a gentle reminder is needed.",
      },
      {
        id: "clients",
        title: "Every family in one list",
        body: "Keep each family with their balance, and save your session and package prices so a monthly invoice takes moments.",
      },
      {
        id: "reminders",
        title: "Reminders you don't have to send",
        body: "Scheduled email reminders follow up on unpaid invoices, so payment doesn't come up during lessons.",
      },
    ],
    faqs: [
      {
        question: "What should a tutoring invoice include?",
        answer:
          "A tutoring invoice should include your name and contact details, the parent or guardian's name, the student's name, the dates and length of each session (or the package), the subject, your rate, any cancellation charges, the total, a due date, and how to pay.",
      },
      {
        question: "Should I invoice the parent or the student?",
        answer:
          "Invoice whoever pays — usually the parent or guardian. Put the student's name in the client name or line descriptions so families with more than one child can tell invoices apart.",
      },
      {
        question: "Should tutors charge for late cancellations?",
        answer:
          "Many tutors charge 50% to 100% of the session fee for cancellations with less than 24 hours' notice, because the slot can't be filled at short notice. Agree on the policy in writing before the first session and show the charge as its own line.",
      },
      {
        question: "Do tutors need to charge sales tax or VAT?",
        answer:
          "It depends on where you live and how much you earn. Private tutoring is exempt from VAT in some countries, and many places don't apply sales tax to tutoring. Check your local rules — Invoiceflint lets you add tax only when you need it.",
      },
    ],
    guides: ["how-to-invoice-a-client", "how-to-send-an-invoice-on-whatsapp", "invoice-payment-terms"],
    dateModified: "2026-10-31",
  },
  {
    slug: "personal-trainers",
    name: "Personal Trainers",
    label: "Personal Trainers",
    group: "services",
    invoiceName: "personal training invoice",
    metaTitle: "Invoice App for Personal Trainers: Session Invoices",
    description:
      "Invoice personal training sessions, packages, and online coaching from your phone. Bill clients by email or WhatsApp and see when they open the invoice.",
    headline: "The invoice app for personal trainers",
    intro:
      "Personal trainers sell time in packages — ten sessions, a month of coaching, a program. Invoiceflint lets you invoice those packages from your phone between clients, send them by WhatsApp or email, and see who's opened them.",
    sample: {
      business: "Jordan Lee Fitness",
      client: "Rachel Kim",
      number: "INV-0256",
      lines: [
        { description: "10-session personal training package (60 min)", qty: 1, rate: 750 },
        { description: "Nutrition consultation and meal plan", qty: 1, rate: 120 },
        { description: "Online coaching – 4 weeks of remote check-ins", qty: 1, rate: 160 },
        { description: "Returning client discount", qty: 1, rate: -75 },
      ],
      notes: "Sessions valid for 12 weeks from the first session. 24-hour cancellation policy applies. Payment due before the first session.",
    },
    include: [
      "Your business name and contact details.",
      "The client's name.",
      "The package or sessions, with dates if you bill after the fact.",
      "Price per session or package, and any discount.",
      "How long a package is valid.",
      "Your cancellation policy.",
      "A due date and how to pay.",
    ],
    tips: [
      {
        title: "Invoice packages before the first session",
        body: "Payment up front means commitment up front. Clients who've paid for ten sessions are far more likely to show up for all ten.",
      },
      {
        title: "Put an expiry date on packages",
        body: "Unused sessions can hang over you for months. A validity period on the invoice — say 12 weeks — keeps schedules moving and avoids awkward conversations.",
      },
      {
        title: "Charge for travel to clients",
        body: "Training clients at home or in a park means time on the road. Add a travel line, or build it into a higher in-home rate and say so on the invoice.",
      },
    ],
    features: [
      {
        id: "clients",
        title: "Saved packages",
        body: "Save your 5-, 10-, and 20-session packages with prices, and invoice a renewal in a few taps.",
      },
      {
        id: "send",
        title: "Invoice by WhatsApp or email",
        body: "Send the invoice link wherever you already message clients. They open it in the browser — no app or account needed.",
      },
      {
        id: "read-receipts",
        title: "See when clients open it",
        body: "Get a notification when the client views the invoice, so you know before the next session whether it's been seen.",
      },
      {
        id: "reminders",
        title: "No money talk mid-workout",
        body: "Scheduled email reminders follow up on renewals and unpaid invoices for you.",
      },
    ],
    faqs: [
      {
        question: "What should a personal training invoice include?",
        answer:
          "A personal training invoice should include your business name and contact details, the client's name, the sessions or package being billed, the price and any discount, how long the package is valid, your cancellation policy, the total, a due date, and how to pay.",
      },
      {
        question: "Should personal trainers invoice before or after sessions?",
        answer:
          "For packages, invoice before the first session so the client is committed. For pay-as-you-go clients, many trainers invoice weekly or monthly for the sessions attended.",
      },
      {
        question: "Can I give a discount on a training package?",
        answer:
          "Yes. Add a discount to the invoice so the client can see the saving next to the full price — a good way to reward renewals and referrals.",
      },
      {
        question: "Does Invoiceflint work for online coaching?",
        answer:
          "Yes. Bill programs, monthly coaching, or check-ins the same way as in-person sessions, and send the invoice to clients anywhere by email or WhatsApp.",
      },
    ],
    guides: ["how-to-send-an-invoice-on-whatsapp", "invoice-payment-terms", "how-to-invoice-a-client"],
    dateModified: "2026-10-31",
  },
  {
    slug: "pet-groomers",
    name: "Pet Groomers",
    label: "Pet Groomers",
    group: "services",
    invoiceName: "pet grooming invoice",
    metaTitle: "Invoice App for Pet Groomers: Grooming Invoices",
    description:
      "Invoice dog and cat grooming from your phone, in the salon or the van. Price by size and coat, add extras like de-matting, and send it at pick-up.",
    headline: "The invoice app for pet groomers",
    intro:
      "Grooming prices depend on the dog — size, coat, condition, temperament. Invoiceflint lets groomers build each invoice from saved services and add-ons, send it by text, WhatsApp, or email at pick-up, and see what every client owes.",
    sample: {
      business: "Suds & Scissors Mobile Grooming",
      client: "Olivia Grant",
      number: "INV-1093",
      lines: [
        { description: "Full groom, large double coat – Bailey (Golden Retriever)", qty: 1, rate: 110 },
        { description: "De-shedding treatment – Bailey", qty: 1, rate: 25 },
        { description: "De-matting (per 15 minutes) – Bailey", qty: 2, rate: 15 },
        { description: "Bath and tidy, small dog – Pip (Yorkshire Terrier)", qty: 1, rate: 55 },
        { description: "Nail grind – Pip", qty: 1, rate: 15 },
        { description: "Mobile service fee", qty: 1, rate: 15 },
      ],
      notes: "Bailey had mats close to the skin behind the ears — brushing twice a week will help. Next appointment: Dec 12, 9:30 am.",
    },
    include: [
      "Your business name and contact details.",
      "The owner's name.",
      "Each pet's name and breed.",
      "The base service, priced by size and coat type.",
      "Add-ons such as nail grinding, teeth brushing, or de-shedding.",
      "Condition-related charges like de-matting or extra handling, with a short explanation.",
      "Mobile or travel fees, and any no-show charge.",
      "The next appointment and how to pay.",
    ],
    tips: [
      {
        title: "Explain de-matting charges",
        body: "Owners are often surprised by a matting fee. A one-line note about the coat's condition — and a photo — turns a complaint into advice they'll thank you for.",
      },
      {
        title: "Save your price list by size",
        body: "Set up small, medium, large, and giant services as saved items, plus your add-ons. Every invoice is then a few taps, and your prices stay consistent.",
      },
      {
        title: "Charge no-shows consistently",
        body: "For a mobile groomer, a no-show costs the slot and the drive. Tell clients your policy when they book, and invoice it the same way every time.",
      },
    ],
    features: [
      {
        id: "clients",
        title: "Saved services and add-ons",
        body: "Keep your full price list as saved items and every owner in your client list, with their balance.",
      },
      {
        id: "signatures",
        title: "Photos of coat condition",
        body: "Attach before-and-after photos to the invoice, so owners see why a de-matting charge was needed.",
      },
      {
        id: "send",
        title: "Send at pick-up",
        body: "Send the invoice by text, WhatsApp, or email while the owner is collecting their pet.",
      },
      {
        id: "status",
        title: "See who's paid",
        body: "Paid, unpaid, and overdue invoices are clear at a glance, so nothing slips between appointments.",
      },
    ],
    faqs: [
      {
        question: "What should a pet grooming invoice include?",
        answer:
          "A pet grooming invoice should include your business details, the owner's name, each pet's name and breed, the base service, add-ons, any de-matting or handling charges with a short explanation, travel or no-show fees, the total, the next appointment, and how to pay.",
      },
      {
        question: "How should groomers charge for matted dogs?",
        answer:
          "Many groomers charge de-matting by time, for example per 15 minutes, on top of the base groom, and explain the charge on the invoice. Agree on it with the owner before you start, and attaching a photo of the coat avoids disputes.",
      },
      {
        question: "Can I put more than one pet on the same invoice?",
        answer:
          "Yes. Add a line for each pet's service and include the pet's name in the description, so the owner can see who got what.",
      },
      {
        question: "Do mobile groomers charge a travel fee?",
        answer:
          "Many do, either a flat mobile service fee or a charge based on distance. Show it as its own line so clients can see it separately from the grooming price.",
      },
    ],
    guides: ["invoice-vs-receipt", "how-to-send-an-invoice-on-whatsapp", "how-to-follow-up-on-unpaid-invoice"],
    dateModified: "2026-10-31",
  },
  {
    slug: "caterers",
    name: "Caterers",
    label: "Caterers",
    group: "services",
    invoiceName: "catering invoice",
    metaTitle: "Invoice App for Caterers: Catering Invoices & Quotes",
    description:
      "Quote and invoice catering from your phone. Price per guest, add staff, rentals, and service charges, take a deposit, and bill the final guest count.",
    headline: "The invoice app for caterers",
    intro:
      "Catering is quoted months ahead and finalized days before the event. Invoiceflint lets caterers send a per-guest quote the client accepts online, invoice the deposit, and send the final invoice with the confirmed headcount, staff, and rentals.",
    sample: {
      business: "Saffron Table Catering",
      client: "Bennett & Cole LLP – Holiday Party",
      number: "INV-0624",
      lines: [
        { description: "Plated dinner, three courses (guests)", qty: 85, rate: 58, taxable: true },
        { description: "Passed hors d'oeuvres, 1 hour (guests)", qty: 85, rate: 14, taxable: true },
        { description: "Event servers – 6 staff × 5 hours (hours)", qty: 30, rate: 35 },
        { description: "Bartender (hours)", qty: 6, rate: 45 },
        { description: "Linen, china, and glassware rental (guests)", qty: 85, rate: 9, taxable: true },
        { description: "Service charge – 20% of food", qty: 1, rate: 1224 },
        { description: "Less deposit received (INV-0590)", qty: 1, rate: -3000 },
      ],
      taxLabel: "Sales tax",
      taxRate: 0.08,
      notes: "Event: Dec 18, 2026, 6–11 pm. Final count of 85 confirmed Dec 11. The service charge covers event coordination and is not a gratuity. Balance due 3 days before the event.",
    },
    include: [
      "The event date, time, and venue.",
      "The confirmed guest count and per-guest prices.",
      "The menu or package.",
      "Staff, with numbers and hours.",
      "Rentals such as linens, china, and glassware.",
      "Any service charge and any gratuity, each on its own line.",
      "Tax, the deposit received, the balance, and its due date.",
    ],
    tips: [
      {
        title: "Set a final headcount deadline",
        body: "Ask for the final guest count about a week before the event and bill that number, even if fewer guests turn up — you've already bought and prepared the food.",
      },
      {
        title: "Separate service charges from gratuity",
        body: "Guests often assume a service charge goes to staff. In some places you must explain what it covers, and it may be taxable. Say what it's for on the invoice and list any gratuity on its own line.",
      },
      {
        title: "Take a deposit to hold the date",
        body: "A booked date is one you can't sell to anyone else. Invoice a deposit when the quote is accepted and set the balance due before the event.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Quotes clients accept online",
        body: "Send a per-guest quote, let the client accept it in their browser, and convert it to the invoice once the final count is in.",
      },
      {
        id: "payments",
        title: "Deposits and balances",
        body: "Record the deposit and final payment for every event, and see what each client still owes.",
      },
      {
        id: "templates",
        title: "Invoices as polished as the plating",
        body: "Choose from 14 templates with your logo for corporate and wedding clients.",
      },
      {
        id: "reminders",
        title: "Balance reminders before the event",
        body: "Schedule email reminders ahead of the balance due date, so you're not chasing payment during prep week.",
      },
    ],
    faqs: [
      {
        question: "What should a catering invoice include?",
        answer:
          "A catering invoice should include the event date, time, and venue, the confirmed guest count, per-guest menu prices, staff and hours, rentals, any service charge and gratuity listed separately, tax, the deposit received, the balance due, and the due date.",
      },
      {
        question: "How much deposit do caterers usually take?",
        answer:
          "Many caterers take 25% to 50% when the booking is confirmed, with the balance due a few days to a week before the event. Put the payment schedule in your quote so it's agreed before you start.",
      },
      {
        question: "What's the difference between a service charge and a gratuity?",
        answer:
          "A service charge is a fee set by the caterer, often a percentage of food and beverage, that the business keeps or distributes as it chooses. A gratuity is a tip for staff. Rules on disclosing, taxing, and sharing service charges vary by place, so label each one clearly on the invoice.",
      },
      {
        question: "How do I bill the final guest count?",
        answer:
          "Quote using the expected count, then update the guest quantities when the client confirms the final number. In Invoiceflint, convert the accepted quote to an invoice and change the quantity — the totals and tax update automatically.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "how-to-write-an-estimate", "invoice-payment-terms"],
    dateModified: "2026-10-31",
  },
  {
    slug: "web-developers",
    name: "Web Developers",
    label: "Web Developers",
    group: "professional",
    invoiceName: "web development invoice",
    metaTitle: "Invoice App for Web Developers: Milestone Invoices",
    description:
      "Invoice web development projects by milestone, hour, or monthly retainer. Bill hosting and maintenance, send from your phone, and see when clients open it.",
    headline: "The invoice app for web developers",
    intro:
      "Web projects are billed in stages — a deposit to start, milestones as pages and features ship, then a monthly fee for hosting and fixes. Invoiceflint lets developers send each of those invoices from their phone and see the moment the client opens them.",
    sample: {
      business: "Patel Web Studio",
      client: "Greenleaf Dental",
      number: "INV-0219",
      lines: [
        { description: "Milestone 2 of 3 – 8 pages built and responsive", qty: 1, rate: 3200 },
        { description: "Online booking integration", qty: 1, rate: 900 },
        { description: "Out-of-scope changes, per change request #4 (hours)", qty: 3, rate: 95 },
        { description: "Domain renewal, 1 year (at cost)", qty: 1, rate: 22 },
        { description: "Hosting and maintenance – November", qty: 1, rate: 120 },
      ],
      notes: "Milestone 3 (launch and handover) is invoiced on go-live. Payment due within 14 days. Ownership of code and design transfers on final payment.",
    },
    include: [
      "The project name and the client's company details.",
      "The milestone or period being billed and what was delivered.",
      "Hourly work with hours and rate.",
      "Out-of-scope work on its own line, referencing the change request.",
      "Pass-through costs such as domains, plugins, and licenses.",
      "Hosting or maintenance fees and the period they cover.",
      "A due date, payment methods, and when ownership transfers.",
    ],
    tips: [
      {
        title: "Bill fixed-price projects by milestone",
        body: "Split the project into a deposit and two or three milestones tied to things the client can see — design approved, site built, launch. You're never more than one milestone out of pocket.",
      },
      {
        title: "Make scope creep a line item",
        body: "When a 'quick change' isn't in the spec, quote it, get it approved, and invoice it on its own line. Clients learn that changes cost money — and you get paid for them.",
      },
      {
        title: "Tie ownership to the final payment",
        body: "A contract clause, repeated on the invoice, that code and design ownership transfers on final payment gives clients a good reason to pay the last milestone on time.",
      },
    ],
    features: [
      {
        id: "estimates",
        title: "Quote change requests",
        body: "Send an estimate for each change request; when the client accepts, convert it to an invoice with one tap.",
      },
      {
        id: "read-receipts",
        title: "Know when it's been opened",
        body: "Get a notification when the client views your invoice — handy when it's waiting on someone in accounts.",
      },
      {
        id: "reminders",
        title: "Automatic follow-ups",
        body: "Schedule email reminders for milestone and maintenance invoices, so chasing payment isn't on your to-do list.",
      },
      {
        id: "export",
        title: "Clean numbers for your accountant",
        body: "Export reports and client statements as CSV or PDF at tax time.",
      },
    ],
    faqs: [
      {
        question: "What should a web development invoice include?",
        answer:
          "A web development invoice should include your details, the client's company details, the project name, the milestone or period being billed and what was delivered, hourly work with hours and rate, out-of-scope changes, pass-through costs like domains and licenses, hosting or maintenance fees, the total, a due date, and payment instructions.",
      },
      {
        question: "Should web developers charge hourly or per project?",
        answer:
          "Fixed-price projects with milestone payments suit well-defined builds, and clients like knowing the cost up front. Hourly billing suits ongoing work, support, and projects where the scope is unclear. Many developers do both: a fixed price for the build and an hourly rate for changes.",
      },
      {
        question: "How do I invoice a monthly website maintenance retainer?",
        answer:
          "Send an invoice at the start of each month for that month's hosting and maintenance, with the period in the line description. Saving the retainer as an item in Invoiceflint makes each month's invoice quick to create.",
      },
      {
        question: "Should I charge clients for hosting and domains?",
        answer:
          "If you pay for them on the client's behalf, yes. List them separately with the period they cover — at cost, or with a markup for managing them — so the client can see what they're paying for.",
      },
    ],
    guides: ["how-to-ask-for-a-deposit", "invoice-payment-terms", "get-paid-faster-as-a-freelancer"],
    dateModified: "2026-10-31",
  },
];

/** "a" or "an" for the trade's invoice name: "an HVAC invoice", "a plumbing invoice". */
export function invoiceNameWithArticle(trade: Trade): string {
  return `${/^(hvac|[aeiou])/i.test(trade.invoiceName) ? "an" : "a"} ${trade.invoiceName}`;
}

/** The trade's name for use mid-sentence: "plumbers", "HVAC technicians". */
export function audienceOf(trade: Trade): string {
  return trade.name.replace(/\b[A-Z][a-z]+\b/g, (word) => word.toLowerCase());
}

export function getTrade(slug: string): Trade | undefined {
  return TRADES.find((t) => t.slug === slug);
}

/** Subtotal, tax, and total for a trade's example invoice. */
export function sampleTotals(sample: Trade["sample"]) {
  const subtotal = sample.lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
  const taxable = sample.lines
    .filter((l) => l.taxable)
    .reduce((sum, l) => sum + l.qty * l.rate, 0);
  const tax = sample.taxRate ? Math.round(taxable * sample.taxRate * 100) / 100 : 0;
  return { subtotal, tax, total: subtotal + tax };
}

/** "Plumbing Invoice Template", "HVAC Invoice Template" — the trade's template page name. */
export function templateName(trade: Trade): string {
  const name = trade.invoiceName.replace(/\b[a-z]/g, (c) => c.toUpperCase());
  return `${name} Template`;
}
