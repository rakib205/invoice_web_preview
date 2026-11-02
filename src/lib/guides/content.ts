/**
 * Long-form guide content for informational SEO and AI/LLM citation.
 *
 * Guides are authored here as structured blocks (no MDX/build-config needed).
 * `src/app/guides/[slug]/page.tsx` renders them and emits Article + Breadcrumb
 * JSON-LD; `sitemap.ts` maps over `GUIDES` so new entries index automatically.
 *
 * Dates are ISO (YYYY-MM-DD) so they can feed schema.org datePublished/Modified.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** A data table. The first column of each row is rendered as a row header. */
  | { type: "table"; head: string[]; rows: string[][] }
  /** A ready-to-send message the reader can copy (emails, WhatsApp texts). */
  | { type: "template"; label: string; text: string }
  | { type: "tip"; text: string };

export type Guide = {
  slug: string;
  title: string;
  /** Meta description + card summary; keep under ~155 chars. */
  description: string;
  datePublished: string;
  dateModified: string;
  body: Block[];
  /** Slugs of related guides, shown at the end of the article. */
  related?: string[];
  /** Slugs of related trade pages (`@/lib/trades/content`). */
  trades?: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-invoice-a-client",
    title: "How to Invoice a Client: A Step-by-Step Guide",
    description:
      "Learn how to invoice a client the right way — what to include, how to send it, and how to follow up so you get paid on time.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    related: ["invoice-payment-terms", "how-to-follow-up-on-unpaid-invoice", "can-you-send-an-invoice-through-zelle-venmo-cash-app", "how-to-number-invoices"],
    trades: ["freelancers", "handymen", "consultants"],
    body: [
      {
        type: "p",
        text: "Sending a clear, professional invoice is the difference between getting paid on time and chasing a client for weeks. This guide walks through exactly what to put on an invoice, how to send it, and how to follow up — whether you use a template or an app like Invoiceflint.",
      },
      { type: "h2", text: "What every invoice should include" },
      {
        type: "p",
        text: "A complete invoice removes any ambiguity about who owes what, and by when. At a minimum, include the following:",
      },
      {
        type: "ul",
        items: [
          "Your business name and contact details (and logo, if you have one).",
          "The client's name and billing details.",
          "A unique invoice number so both sides can reference it later.",
          "The invoice date and a clear due date (for example, 'Net 15' or 'Due July 1').",
          "An itemized list of work or products, with quantity, rate, and line total.",
          "Subtotal, any tax, and the final total amount due.",
          "Accepted payment methods and instructions.",
        ],
      },
      { type: "h2", text: "Step by step: from work done to money in the bank" },
      {
        type: "ol",
        items: [
          "List each item of work or product with a short, specific description.",
          "Set the quantity and rate for each line so the totals calculate correctly.",
          "Add any applicable tax and confirm the grand total.",
          "Set clear payment terms — a specific due date gets paid faster than 'due on receipt'.",
          "Send the invoice as soon as the work is delivered, while it's still fresh.",
          "Track whether the client has opened it, and follow up politely if the due date passes.",
        ],
      },
      { type: "h2", text: "How to get paid faster" },
      {
        type: "p",
        text: "The two biggest levers are speed and visibility. Invoice immediately after delivering work, and use a tool that tells you the moment a client views the invoice — so a follow-up is a gentle reminder, not a guess. Invoiceflint sends invoices from your phone and shows a live read receipt and payment status (Draft → Sent → Viewed → Paid) so you always know where you stand.",
      },
      {
        type: "p",
        text: "If a client hasn't paid by the due date, send a short, friendly reminder that references the invoice number and the amount. Most late payments are simple oversights, not refusals.",
      },
    ],
  },
  {
    slug: "estimate-vs-invoice",
    title: "Estimate vs. Invoice: What's the Difference?",
    description:
      "Estimates and invoices look similar but do different jobs. Here's when to send each one — and how to turn an approved estimate into an invoice.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    related: ["how-to-write-an-estimate", "how-to-ask-for-a-deposit", "invoice-vs-receipt"],
    trades: ["contractors", "painters", "electricians"],
    body: [
      {
        type: "p",
        text: "Estimates and invoices are often confused because they contain similar information. The difference is timing and intent: an estimate is a proposal before work begins, and an invoice is a request for payment after work is agreed or delivered.",
      },
      { type: "h2", text: "What is an estimate?" },
      {
        type: "p",
        text: "An estimate (sometimes called a quote) is a non-binding document you send before starting a job. It tells the client what you expect the work to cost so they can approve it. Estimates typically include the scope of work, itemized costs, and an expiry date. No payment is due from an estimate.",
      },
      { type: "h2", text: "What is an invoice?" },
      {
        type: "p",
        text: "An invoice is a formal request for payment. You send it once work is agreed or completed. It includes a due date, payment terms, and a total amount owed. Unlike an estimate, an invoice creates an expectation of payment and is used for your accounting records.",
      },
      { type: "h2", text: "When to send each" },
      {
        type: "ul",
        items: [
          "Send an estimate when a client asks 'how much will this cost?' before committing.",
          "Send an invoice once the estimate is approved, or once the work is delivered.",
          "For long projects, you might send an estimate first, then invoice in stages (deposit, milestone, final).",
        ],
      },
      { type: "h2", text: "Turning an estimate into an invoice" },
      {
        type: "p",
        text: "Re-typing an approved estimate into a new invoice wastes time and invites errors. In Invoiceflint you can convert an approved estimate into an invoice with one tap — the line items, client, and totals carry over, so you only change what's different.",
      },
    ],
  },
  {
    slug: "get-paid-faster-as-a-freelancer",
    title: "How to Get Paid Faster as a Freelancer",
    description:
      "Practical, proven ways freelancers can shorten payment times — from clear terms to read receipts and timely follow-ups.",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    related: ["how-to-follow-up-on-unpaid-invoice", "invoice-payment-terms", "can-you-send-an-invoice-through-zelle-venmo-cash-app", "how-to-charge-late-fees"],
    trades: ["freelancers", "graphic-designers", "web-developers", "photographers"],
    body: [
      {
        type: "p",
        text: "Late payments are one of the most common frustrations for freelancers and small businesses. The good news: most of the delay is fixable with a few habits and the right tools. Here's how to shorten the gap between finishing work and getting paid.",
      },
      { type: "h2", text: "1. Invoice immediately" },
      {
        type: "p",
        text: "The longer you wait to send an invoice, the longer you wait to get paid — and the less fresh the work is in your client's mind. Send the invoice the same day you deliver. Sending from your phone means you can invoice on the spot instead of waiting until you're back at a desk.",
      },
      { type: "h2", text: "2. Set specific, short payment terms" },
      {
        type: "p",
        text: "'Due on receipt' is vague. A concrete due date like 'Due July 1' or 'Net 7' gives the client a clear deadline and gives you a clear point to follow up. Shorter terms generally get paid sooner.",
      },
      { type: "h2", text: "3. Know when your invoice was opened" },
      {
        type: "p",
        text: "One of the most stressful parts of freelancing is not knowing whether a client even saw your invoice. A read receipt removes the guesswork — if it's been viewed but not paid, a reminder is appropriate; if it hasn't been opened, it may have gone to spam. Invoiceflint shows the exact moment a client opens your invoice.",
      },
      { type: "h2", text: "4. Follow up without friction" },
      {
        type: "ul",
        items: [
          "Reference the invoice number and amount so there's no ambiguity.",
          "Keep the tone friendly — most late payments are oversights.",
          "Track payment status so you only chase invoices that are actually overdue.",
        ],
      },
    ],
  },
  {
    slug: "free-invoice-template-vs-app",
    title: "Free Invoice Template vs. Invoice App: Which Should You Use?",
    description:
      "A free invoice template is fine to start, but an invoice app saves time and shows when clients pay. Here's how to choose.",
    datePublished: "2026-06-01",
    dateModified: "2026-10-31",
    related: ["how-to-invoice-a-client", "how-to-number-invoices", "how-to-send-an-invoice-on-whatsapp"],
    trades: ["freelancers", "handymen", "cleaners"],
    body: [
      {
        type: "p",
        text: "If you send only the occasional invoice, a free template in a word processor or spreadsheet can work. But as invoicing becomes a regular part of your business, the manual work and blind spots add up. Here's an honest comparison to help you choose.",
      },
      { type: "h2", text: "Where free templates work" },
      {
        type: "ul",
        items: [
          "You send only a handful of invoices a year.",
          "You're comfortable formatting and calculating totals by hand.",
          "You don't need to know when a client opens or pays an invoice.",
        ],
      },
      { type: "h2", text: "Where templates fall short" },
      {
        type: "ul",
        items: [
          "No automatic invoice numbering, so it's easy to duplicate or lose track.",
          "Manual math means rounding and tax mistakes creep in.",
          "No visibility — you can't tell whether an invoice was received, opened, or ignored.",
          "Turning an estimate into an invoice means retyping everything.",
        ],
      },
      { type: "h2", text: "What an invoice app adds" },
      {
        type: "p",
        text: "A dedicated app handles numbering, calculations, and tax automatically, and — crucially — shows you what happens after you hit send. Invoiceflint, free to download on iOS and Android, lets you create and send professional invoices and estimates from your phone, see the moment a client views an invoice, track status from Draft to Paid, and convert an approved estimate into an invoice with one tap.",
      },
      {
        type: "p",
        text: "The rule of thumb: use a template if invoicing is rare and you don't care about tracking. Use an app once invoicing is routine, or the first time you find yourself wondering whether a client actually saw your invoice.",
      },
    ],
  },
  {
    slug: "invoice-payment-terms",
    title: "Invoice Payment Terms Explained: Net 30, Due on Receipt & More",
    description:
      "What Net 7, Net 30, due on receipt, and other invoice payment terms mean — and which terms get you paid fastest.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["how-to-charge-late-fees", "how-to-follow-up-on-unpaid-invoice", "how-to-ask-for-a-deposit", "can-i-send-an-invoice-through-zelle"],
    trades: ["consultants", "freelancers", "contractors"],
    body: [
      {
        type: "p",
        text: "Payment terms tell your client when an invoice must be paid and how. Clear terms are one of the simplest ways to get paid on time: they set a deadline, give you a fair point to follow up, and avoid the awkward 'when did you need this by?' conversation.",
      },
      { type: "h2", text: "Common invoice payment terms" },
      {
        type: "table",
        head: ["Term", "What it means", "Typical use"],
        rows: [
          ["Due on receipt", "Payment is expected as soon as the client receives the invoice.", "Small jobs and one-off customers"],
          ["Net 7", "Payment is due 7 days after the invoice date.", "Freelancers and trades who want fast payment"],
          ["Net 15", "Payment is due 15 days after the invoice date.", "Small business clients"],
          ["Net 30", "Payment is due 30 days after the invoice date.", "Larger companies with accounts payable teams"],
          ["Net 60 / Net 90", "Payment is due 60 or 90 days after the invoice date.", "Large enterprises and some public-sector clients"],
          ["EOM (end of month)", "Payment is due at the end of the month the invoice is issued.", "Clients who pay suppliers in a monthly batch"],
          ["50% upfront", "Half is paid before work starts, the balance on completion.", "Projects, custom work, and jobs with expensive materials"],
          ["2/10 Net 30", "A 2% discount if paid within 10 days; otherwise the full amount is due in 30.", "Encouraging early payment from business clients"],
        ],
      },
      { type: "h2", text: "Which payment terms should you use?" },
      {
        type: "p",
        text: "Shorter terms generally get paid sooner. 'Net' terms count from the invoice date, not the date the work finished — so the faster you send the invoice, the faster the clock starts.",
      },
      {
        type: "ul",
        items: [
          "Homeowners and individual customers: due on receipt or Net 7. They pay personally and don't have a payment cycle to wait for.",
          "Small business clients: Net 7 or Net 15.",
          "Larger companies: ask what their standard terms are before you start. Many only pay on Net 30 and will need a purchase order (PO) number on your invoice.",
          "Long or expensive projects: a deposit upfront, then invoices at agreed milestones.",
        ],
      },
      { type: "h2", text: "'Due on receipt' vs. a specific date" },
      {
        type: "p",
        text: "'Due on receipt' sounds urgent, but many clients read it as 'whenever'. A specific due date — 'Due November 14' — is harder to ignore and gives you a clear day to follow up. Invoiceflint lets you set the due date on each invoice and flags invoices automatically once they're overdue.",
      },
      { type: "h2", text: "How to write payment terms on an invoice" },
      {
        type: "ul",
        items: [
          "Put the due date near the total, where the client's eye lands.",
          "List the payment methods you accept and the details needed to pay.",
          "If you charge a late fee, state it — and make sure it was agreed before the work started.",
          "Show any deposit already paid so the balance due is unambiguous.",
        ],
      },
      {
        type: "template",
        label: "Example payment terms",
        text: "Payment due within 7 days (by November 14). Pay by bank transfer to [account details]. A late fee of 1.5% per month applies to balances more than 30 days overdue.",
      },
      {
        type: "tip",
        text: "Agree on payment terms before you start the work, not when you send the invoice. Put them on your estimate so the client has already accepted them.",
      },
    ],
  },
  {
    slug: "how-to-follow-up-on-unpaid-invoice",
    title: "How to Follow Up on an Unpaid Invoice (With Message Templates)",
    description:
      "A simple follow-up schedule for unpaid invoices, plus copy-and-paste reminder messages that stay polite and get results.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["invoice-payment-terms", "how-to-charge-late-fees", "get-paid-faster-as-a-freelancer"],
    trades: ["freelancers", "contractors", "consultants"],
    body: [
      {
        type: "p",
        text: "Most late invoices aren't refusals — they're forgotten, buried in an inbox, or waiting on someone else's approval. A short, friendly, well-timed reminder fixes most of them. Here's a follow-up schedule that works and the exact messages to send.",
      },
      { type: "h2", text: "First, check whether the invoice was opened" },
      {
        type: "p",
        text: "Before you chase, find out what actually happened. If the client never opened the invoice, it may have gone to spam or to the wrong person — resend it to the right contact. If they opened it but haven't paid, a reminder is appropriate. Invoiceflint notifies you the moment a client views an invoice, so you know which situation you're in.",
      },
      { type: "h2", text: "A follow-up schedule that works" },
      {
        type: "table",
        head: ["When", "What to send", "Tone"],
        rows: [
          ["3 days before the due date", "A courtesy heads-up with the amount and due date", "Friendly"],
          ["On the due date", "A short note that payment is due today", "Friendly"],
          ["7 days overdue", "A reminder with the invoice link", "Polite and direct"],
          ["14 days overdue", "A firmer reminder that mentions late fees, if your terms include them", "Firm"],
          ["30+ days overdue", "A final notice with a deadline and next steps", "Formal"],
        ],
      },
      { type: "h2", text: "Reminder templates" },
      { type: "h3", text: "Before the due date" },
      {
        type: "template",
        label: "Email or message",
        text: "Hi [Name], just a quick heads-up that invoice [INV-0001] for [amount] is due on [date]. You can view and download it here: [link]. Thanks again for the work — let me know if you have any questions.",
      },
      { type: "h3", text: "On the due date" },
      {
        type: "template",
        label: "Email or message",
        text: "Hi [Name], a friendly reminder that invoice [INV-0001] for [amount] is due today. Here's the link again in case it's handy: [link]. Thank you!",
      },
      { type: "h3", text: "7 days overdue" },
      {
        type: "template",
        label: "Email or message",
        text: "Hi [Name], I'm following up on invoice [INV-0001] for [amount], which was due on [date]. Could you let me know when I can expect payment? If it's already on its way, please ignore this — and thank you.",
      },
      { type: "h3", text: "14 days overdue" },
      {
        type: "template",
        label: "Email",
        text: "Hi [Name], invoice [INV-0001] for [amount] is now two weeks overdue. Please arrange payment by [date]. As set out in the invoice terms, a late fee of [fee] applies to balances more than [X] days overdue. If something is holding this up, reply and let's sort it out.",
      },
      { type: "h3", text: "Final notice" },
      {
        type: "template",
        label: "Email",
        text: "Hi [Name], this is a final notice for invoice [INV-0001] for [amount], now [X] days overdue. If payment isn't received by [date], I'll need to [pause further work / refer this to a collections service]. I'd much rather resolve it directly — please get in touch today.",
      },
      { type: "h2", text: "Tips for following up" },
      {
        type: "ul",
        items: [
          "Always include the invoice number, the amount, and a link to the invoice.",
          "Keep it short. A reminder is not the place to re-explain the project.",
          "Use the channel the client actually reads. WhatsApp or a text often gets a faster reply than email.",
          "Pick up the phone after the second reminder — a call resolves most stuck payments.",
          "Pause new work for a client with a significantly overdue balance.",
        ],
      },
      { type: "h2", text: "Automate the routine reminders" },
      {
        type: "p",
        text: "Writing every reminder by hand is tedious, and easy to forget on a busy week. Invoiceflint Pro sends automatic email reminders before, on, and after the due date, so the polite nudges go out on schedule and you only step in personally when an invoice is seriously late.",
      },
    ],
  },
  {
    slug: "how-to-write-an-estimate",
    title: "How to Write an Estimate for a Job (That Clients Approve)",
    description:
      "What to include in a job estimate, how to price it, and how to send it so clients say yes — with an example estimate.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["estimate-vs-invoice", "how-to-ask-for-a-deposit", "how-to-invoice-labor-and-materials"],
    trades: ["painters", "contractors", "roofers", "movers"],
    body: [
      {
        type: "p",
        text: "A good estimate does two jobs: it tells the client what the work will cost, and it convinces them you're the right person to do it. Clear, itemized, quickly delivered estimates win more work than vague ones — even when the price is higher.",
      },
      { type: "h2", text: "Estimate vs. quote" },
      {
        type: "p",
        text: "The terms are often used interchangeably. Strictly, an estimate is an informed approximation that can change if the job turns out differently, while a quote is a fixed price. Whichever word you use, say on the document whether the price is fixed or may change, and under what conditions.",
      },
      { type: "h2", text: "What to include in an estimate" },
      {
        type: "ul",
        items: [
          "Your business name, contact details, and logo.",
          "The client's name and the job address.",
          "An estimate number and date, so you can refer to it later.",
          "A clear scope of work: what you will do, and what you won't (exclusions).",
          "Itemized line items for labor and materials, with quantities and prices.",
          "Tax and the total.",
          "An expiry date — prices for materials change.",
          "Deposit requirements and payment terms.",
          "How to accept: a signature, a reply, or a one-tap online approval.",
        ],
      },
      { type: "h2", text: "Example estimate" },
      {
        type: "table",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Interior painting – living room walls, 2 coats", "1", "$850.00", "$850.00"],
          ["Ceiling – living room", "1", "$240.00", "$240.00"],
          ["Paint and primer (gallons)", "5", "$52.00", "$260.00"],
          ["Surface prep and minor drywall repair (hours)", "2", "$60.00", "$120.00"],
          ["Total", "", "", "$1,470.00"],
        ],
      },
      {
        type: "p",
        text: "Notes: Valid for 30 days. A 30% deposit secures the start date. Price assumes walls are in sound condition; significant repairs will be quoted separately.",
      },
      { type: "h2", text: "How to price the job" },
      {
        type: "ul",
        items: [
          "Labor: estimate the hours and multiply by your rate, or use a flat price for jobs you do often.",
          "Materials: list what you'll buy, with your markup included.",
          "Contingency: for jobs with unknowns, say so and explain how surprises will be priced.",
          "Minimum charge: small jobs should still cover your travel and setup time.",
        ],
      },
      { type: "h2", text: "How to get more estimates approved" },
      {
        type: "ol",
        items: [
          "Send it fast — ideally the same day you see the job. The first professional estimate often wins.",
          "Itemize it. A breakdown builds trust; a single lump sum invites haggling.",
          "Offer options where it makes sense, such as standard and premium materials.",
          "Set an expiry date to create a natural decision point.",
          "Make it easy to say yes. Let the client approve online instead of printing, signing, and scanning.",
          "Follow up once if you haven't heard back within a few days.",
        ],
      },
      {
        type: "p",
        text: "In Invoiceflint, clients open your estimate from a link and accept or decline it in their browser. You're notified when they view it and when they respond, and an accepted estimate converts to an invoice with one tap.",
      },
    ],
  },
  {
    slug: "how-to-ask-for-a-deposit",
    title: "How to Ask for a Deposit (and Invoice It Properly)",
    description:
      "When to ask clients for a deposit, how much to charge, what to say, and how to show the deposit on the final invoice.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["how-to-write-an-estimate", "invoice-payment-terms", "estimate-vs-invoice", "can-i-send-an-invoice-through-zelle"],
    trades: ["contractors", "roofers", "caterers", "web-developers"],
    body: [
      {
        type: "p",
        text: "A deposit protects you from no-shows and unpaid materials, and it filters out clients who aren't serious. Asking for one is normal in most trades and creative work — the key is to ask clearly, early, and in writing.",
      },
      { type: "h2", text: "When to ask for a deposit" },
      {
        type: "ul",
        items: [
          "You need to buy materials or equipment before the job starts.",
          "You're reserving a date that you'd otherwise sell to someone else, like a wedding or event.",
          "The work is custom and hard to resell if the client walks away.",
          "The project is large or long.",
          "It's a new client with no payment history.",
        ],
      },
      { type: "h2", text: "How much should a deposit be?" },
      {
        type: "p",
        text: "Deposits commonly range from 10% to 50% of the job. Materials-heavy work should at least cover the materials; creative projects often ask for 30–50% upfront; date-based bookings often use a fixed retainer. Some places limit how much a home-improvement contractor can collect upfront — California, for example — so check the rules where you work.",
      },
      { type: "h2", text: "What to say" },
      {
        type: "template",
        label: "Message after the estimate is approved",
        text: "Thanks for approving the estimate! To lock in your start date of [date] and order materials, I ask for a [30%] deposit of [amount]. Here's the deposit invoice: [link]. Once it's paid, you're on the schedule.",
      },
      { type: "h2", text: "How to invoice a deposit" },
      {
        type: "ol",
        items: [
          "Send a separate deposit invoice that references the estimate number.",
          "Record the payment when it arrives.",
          "When the job is done, invoice the full amount and subtract the deposit as its own line, referencing the deposit invoice.",
          "Show the remaining balance due clearly.",
        ],
      },
      {
        type: "table",
        head: ["Final invoice line", "Amount"],
        rows: [
          ["Kitchen cabinet installation – labor and materials", "$6,000.00"],
          ["Less deposit received (INV-0042)", "–$1,800.00"],
          ["Balance due", "$4,200.00"],
        ],
      },
      { type: "h2", text: "Refundable or non-refundable?" },
      {
        type: "p",
        text: "Decide in advance and write it on the estimate. A booking retainer for a date is often non-refundable, while a materials deposit is usually credited to the final bill. Either way, clients accept the policy more readily when they've seen it before paying.",
      },
    ],
  },
  {
    slug: "how-to-charge-late-fees",
    title: "How to Charge Late Fees on Invoices",
    description:
      "How to add a late payment fee to your invoices, how much to charge, and how to enforce it without losing the client.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["invoice-payment-terms", "how-to-follow-up-on-unpaid-invoice", "get-paid-faster-as-a-freelancer"],
    trades: ["consultants", "contractors", "cleaners"],
    body: [
      {
        type: "p",
        text: "A late fee gives clients a reason to pay on time and compensates you when they don't. Used well, it's rarely charged — its main job is to move your invoice up the client's priority list.",
      },
      { type: "h2", text: "Agree on it before the work starts" },
      {
        type: "p",
        text: "A late fee that appears for the first time on an overdue invoice feels like a penalty sprung on the client, and may not be enforceable. Put your late fee policy in your estimate or contract, then repeat it on every invoice.",
      },
      { type: "h2", text: "Common late fee structures" },
      {
        type: "table",
        head: ["Type", "Example", "Notes"],
        rows: [
          ["Flat fee", "$25 if payment is more than 15 days late", "Simple and easy to explain"],
          ["Monthly percentage", "1.5% per month on the overdue balance", "Common with business clients"],
          ["One-time percentage", "5% of the invoice total once overdue", "Scales with the size of the job"],
        ],
      },
      { type: "h2", text: "Check the legal limits" },
      {
        type: "p",
        text: "Rules on late fees and interest vary by country and state, and often differ for consumers and businesses. In the UK and the EU, businesses have a statutory right to claim interest on late payments from other businesses. In the US, limits are set state by state. If you're unsure, check with a local accountant or lawyer before setting your rate.",
      },
      { type: "h2", text: "Example wording" },
      {
        type: "template",
        label: "On your estimate and invoices",
        text: "Payment is due within 14 days of the invoice date. Balances unpaid after 30 days incur a late fee of 1.5% per month.",
      },
      { type: "h2", text: "Should you actually charge it?" },
      {
        type: "p",
        text: "Use judgment. Waiving the fee once for a good client who apologizes builds goodwill; enforcing it consistently for clients who are always late protects your cash flow. What matters most is that the policy is clear, so the conversation is about the agreed terms rather than your feelings.",
      },
      {
        type: "p",
        text: "Invoiceflint flags overdue invoices automatically, and Invoiceflint Pro can send email reminders before and after the due date, so most invoices get paid before a late fee ever comes up.",
      },
    ],
  },
  {
    slug: "invoice-vs-receipt",
    title: "Invoice vs. Receipt: What's the Difference?",
    description:
      "An invoice asks for payment; a receipt confirms it. Here's what each one includes, when to send it, and whether you need both.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["estimate-vs-invoice", "how-to-number-invoices", "how-to-invoice-a-client"],
    trades: ["cleaners", "handymen", "pet-groomers", "auto-mechanics"],
    body: [
      {
        type: "p",
        text: "Invoices and receipts look similar and both record a sale, but they sit on opposite sides of the payment. An invoice is sent before payment to ask for it; a receipt is sent after payment to confirm it.",
      },
      {
        type: "table",
        head: ["", "Invoice", "Receipt"],
        rows: [
          ["Purpose", "Requests payment", "Confirms payment"],
          ["When it's sent", "Before the client pays", "After the client pays"],
          ["Key details", "Amount owed, due date, payment terms", "Amount paid, payment date, payment method"],
          ["What it shows", "Money owed to you", "Money received by you"],
        ],
      },
      { type: "h2", text: "What an invoice includes" },
      {
        type: "ul",
        items: [
          "A unique invoice number and the invoice date.",
          "Your details and the client's details.",
          "Itemized products or services, with quantities and prices.",
          "Tax, the total due, the due date, and how to pay.",
        ],
      },
      { type: "h2", text: "What a receipt includes" },
      {
        type: "ul",
        items: [
          "A receipt number, or a reference to the invoice it settles.",
          "The amount paid and the date it was paid.",
          "The payment method, such as card, cash, or bank transfer.",
          "What the payment was for.",
        ],
      },
      { type: "h2", text: "Do you need both?" },
      {
        type: "p",
        text: "For many small businesses, a paid invoice is enough of a record. But clients claiming the cost as a business expense, or paying in cash, often ask for a receipt. A simple approach: when payment arrives, mark the invoice as paid and send the client a copy that shows it's been settled.",
      },
      { type: "h2", text: "Invoice vs. estimate vs. receipt" },
      {
        type: "ul",
        items: [
          "Estimate: before the work — what it will probably cost.",
          "Invoice: after the work is agreed or done — what the client owes.",
          "Receipt: after payment — proof the client paid.",
        ],
      },
    ],
  },
  {
    slug: "how-to-send-an-invoice-on-whatsapp",
    title: "How to Send an Invoice on WhatsApp",
    description:
      "Step by step: how to send a professional invoice to a client on WhatsApp — as a link or a PDF — and what to write in the message.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["how-to-follow-up-on-unpaid-invoice", "how-to-invoice-a-client", "can-you-send-an-invoice-through-zelle-venmo-cash-app", "get-paid-faster-as-a-freelancer"],
    trades: ["tutors", "personal-trainers", "cleaners", "pet-groomers"],
    body: [
      {
        type: "p",
        text: "For a lot of clients, WhatsApp is where messages actually get read. Sending your invoice there — instead of an email that sits unopened — can shorten the time it takes to get paid, especially with homeowners and small businesses.",
      },
      { type: "h2", text: "Send a link or a PDF?" },
      {
        type: "p",
        text: "A link opens a web version of the invoice that the client can read on any phone and download as a PDF — and, with an app like Invoiceflint, it tells you when the client has opened it. A PDF attachment is self-contained, but you can't tell whether it was read. For most clients a link is the better default; send the PDF too if a client asks for a file for their records.",
      },
      { type: "h2", text: "How to send an invoice on WhatsApp with Invoiceflint" },
      {
        type: "ol",
        items: [
          "Create the invoice in the app, or open one you've already made.",
          "Tap Send and choose WhatsApp.",
          "WhatsApp opens with a prefilled message and the invoice link. Pick the client's chat and send it.",
          "Invoiceflint notifies you when the client opens the invoice, and its status changes from Sent to Viewed.",
        ],
      },
      { type: "h2", text: "What to write" },
      {
        type: "template",
        label: "WhatsApp message",
        text: "Hi [Name], thanks for choosing [Business]! Here's your invoice [INV-0001] for [amount], due [date]: [link]. You can view and download it from the link. Any questions, just reply here.",
      },
      { type: "h2", text: "Tips for invoicing on WhatsApp" },
      {
        type: "ul",
        items: [
          "Send from your business number — a WhatsApp Business account keeps work chats separate and looks more professional.",
          "Put the amount and the due date in the message itself, not only in the link.",
          "Follow up in the same chat so the invoice and the conversation stay together.",
          "Keep payment details in the invoice rather than scattered across messages.",
        ],
      },
    ],
  },
  {
    slug: "how-to-invoice-labor-and-materials",
    title: "How to Invoice for Labor and Materials (and Mark Up Materials)",
    description:
      "How trades and contractors should list labor and materials on an invoice, how to calculate materials markup, and how to handle tax.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["how-to-write-an-estimate", "how-to-ask-for-a-deposit", "how-to-invoice-a-client"],
    trades: ["plumbers", "electricians", "auto-mechanics", "carpenters"],
    body: [
      {
        type: "p",
        text: "For plumbers, electricians, contractors, and handymen, almost every invoice combines two things: your time and the stuff you installed. Showing them clearly — and pricing materials properly — makes invoices easier to approve and protects your margin.",
      },
      { type: "h2", text: "Separate labor from materials" },
      {
        type: "p",
        text: "List labor and materials as separate lines. Customers trust an itemized bill more than a lump sum, tax often applies differently to each, and you can see at a glance which part of the job made money.",
      },
      { type: "h2", text: "Three ways to bill labor" },
      {
        type: "ul",
        items: [
          "Hourly: hours × your rate. Fair for unpredictable work like diagnostics and repairs.",
          "Flat rate: one price for a defined job, such as replacing a faucet. Customers like the certainty, and you're rewarded for working efficiently.",
          "Day rate: common for larger projects and crews.",
        ],
      },
      { type: "h2", text: "How to list materials" },
      {
        type: "ul",
        items: [
          "Itemize significant materials with a quantity and unit price — '50-gal water heater × 1', 'cable (ft) × 45'.",
          "Group small consumables into one line such as 'fittings and shop supplies'.",
          "Keep the supplier receipts in case a customer questions a price.",
        ],
      },
      { type: "h2", text: "Marking up materials" },
      {
        type: "p",
        text: "A markup covers the time you spend sourcing, collecting, and storing materials, plus the risk of warrantying them. The price to the customer is your cost × (1 + markup). Markup is not the same as margin: a 25% markup gives a 20% margin.",
      },
      {
        type: "table",
        head: ["Your cost", "Markup", "Price to customer", "Margin"],
        rows: [
          ["$200", "20%", "$240", "16.7%"],
          ["$200", "25%", "$250", "20.0%"],
          ["$200", "50%", "$300", "33.3%"],
        ],
      },
      {
        type: "p",
        text: "Markups vary widely by trade and job size. Pick a policy, apply it consistently, and be ready to explain it if a customer asks.",
      },
      { type: "h2", text: "Handling sales tax" },
      {
        type: "p",
        text: "Whether labor, materials, or both are taxable depends on where you work and the type of job. Some places tax materials but not labor; others tax the whole invoice. Check your local rules, then set your tax up once so it applies the same way every time. Invoiceflint lets you save tax presets, and Invoiceflint Pro supports more than one tax on an invoice.",
      },
      { type: "h2", text: "Example: labor and materials on one invoice" },
      {
        type: "table",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Service call", "1", "$89.00", "$89.00"],
          ["Labor – replace water heater (hours)", "3", "$95.00", "$285.00"],
          ["50-gal gas water heater", "1", "$1,150.00", "$1,150.00"],
          ["Expansion tank, fittings, and supplies", "1", "$86.40", "$86.40"],
          ["Subtotal", "", "", "$1,610.40"],
        ],
      },
    ],
  },
  {
    slug: "how-to-number-invoices",
    title: "How to Number Invoices: Simple Systems and Examples",
    description:
      "Why invoice numbers matter, the most common invoice numbering systems with examples, and what to do if you make a mistake.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    related: ["how-to-invoice-a-client", "invoice-vs-receipt", "invoice-payment-terms"],
    trades: ["freelancers", "consultants", "contractors", "pest-control"],
    body: [
      {
        type: "p",
        text: "An invoice number is how you, your client, and your accountant refer to a specific bill. Good numbering prevents duplicate payments, makes follow-ups unambiguous, and keeps your records tidy at tax time. In many countries — across the EU, for example — tax rules require invoice numbers to be unique and sequential.",
      },
      { type: "h2", text: "Rules for good invoice numbers" },
      {
        type: "ul",
        items: [
          "Unique: never use the same number twice.",
          "Sequential: each new invoice gets the next number.",
          "Consistent: pick a format and stick with it.",
          "Permanent: don't reuse the number of a cancelled invoice — mark it void and move on.",
        ],
      },
      { type: "h2", text: "Common numbering systems" },
      {
        type: "table",
        head: ["System", "Example", "Good for"],
        rows: [
          ["Simple sequential", "INV-0001, INV-0002, INV-0003", "Most small businesses and freelancers"],
          ["Year-based", "2026-001, 2026-002", "Seeing at a glance which year an invoice belongs to"],
          ["Client-based", "ACME-001, ACME-002", "A few large clients billed often"],
          ["Project-based", "KITCHEN-01, KITCHEN-02", "Contractors billing one project in stages"],
        ],
      },
      { type: "h2", text: "Does it matter where you start?" },
      {
        type: "p",
        text: "No. Starting at 0001 is fine, and so is starting at a higher number. What matters is that the sequence continues without gaps or repeats from wherever you begin.",
      },
      { type: "h2", text: "Number your estimates too" },
      {
        type: "p",
        text: "Give estimates their own sequence, such as EST-0001, so they never collide with invoice numbers. Invoiceflint numbers invoices (INV-0001) and estimates (EST-0001) automatically, and when you convert an accepted estimate it creates an invoice with the next invoice number.",
      },
      { type: "h2", text: "What if you make a mistake?" },
      {
        type: "ul",
        items: [
          "If an invoice hasn't been sent yet, just correct it.",
          "If it has been sent, don't delete it and reuse the number. Void or cancel it and issue a new invoice with the next number.",
          "If the client has already paid and you need to reduce the amount, issue a credit note that references the original invoice.",
        ],
      },
    ],
  },
  {
    slug: "can-you-send-an-invoice-through-zelle-venmo-cash-app",
    title: "Can You Send an Invoice Through Zelle, Venmo, or Cash App?",
    description:
      "Zelle, Cash App, and Chime can't send invoices, and Venmo only can from a business profile. Here's how to invoice clients who pay with these apps.",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    related: ["how-to-invoice-a-client", "get-paid-faster-as-a-freelancer", "how-to-send-an-invoice-on-whatsapp", "can-i-send-an-invoice-through-zelle"],
    trades: ["cleaners", "handymen", "tutors"],
    body: [
      {
        type: "p",
        text: "Mostly no: as of November 2026, Zelle, Cash App, and Chime have no invoicing feature, and Venmo only lets you send invoices from a Venmo business profile. The reliable way to bill clients who pay with these apps is to send your own invoice — with the amount, the due date, and exact payment instructions for each app — and let the client pay through the app they already use.",
      },
      {
        type: "p",
        text: "That approach gives you a proper record for taxes and bookkeeping, gives the client something to approve or forward to whoever pays the bills, and keeps you free of card processing fees when clients pay through Zelle. Below is what each app can and can't do today, a ready-to-copy payment section, and an example invoice.",
      },
      { type: "h2", text: "Which payment apps can send an invoice?" },
      {
        type: "p",
        text: "Payment apps are built to move money between people, not to bill customers. Here's how the four most-searched apps compare, based on their own websites and terms as of November 2026.",
      },
      {
        type: "table",
        head: ["App", "Sends invoices?", "Can you request money?", "Business use"],
        rows: [
          ["Zelle", "No", "Yes, from people already enrolled in Zelle", "Only if your bank offers Zelle for your business account"],
          ["Venmo", "Business profiles only, in the app", "Yes", "Business profile: 1.9% + $0.10 per payment received"],
          ["Cash App", "No", "Yes", "Cash App offers a separate Business Account for goods and services payments"],
          ["Chime", "No", "Yes, from other Chime members", "Chime checking is a personal account and not designed for business use"],
        ],
      },
      { type: "h2", text: "Can you send an invoice through Zelle?" },
      {
        type: "p",
        text: "No. Zelle sends and requests money, but it has no invoice feature, and a payment request can only go to someone already enrolled in Zelle. Zelle now runs inside banking apps — it announced in October 2024 that it was phasing out payments in its standalone app — so your client pays from their own bank's app.",
      },
      {
        type: "ul",
        items: [
          "Business accounts: your bank or credit union has to offer Zelle for your business account type, and not every bank that offers Zelle to consumers does.",
          "Fees: Zelle says there are typically no fees for consumers; for small businesses, fees depend on your bank.",
          "No undo: Zelle payments can't be reversed, so put the exact email or phone number you receive with on the invoice.",
        ],
      },
      { type: "h2", text: "Can you send an invoice on Venmo?" },
      {
        type: "p",
        text: "Yes, but only from a Venmo business profile, and only in the Venmo app. A business profile has no monthly or setup fee; Venmo charges the seller 1.9% + $0.10 per payment received. On a personal profile there's no invoice option — you can request money, and if the client marks a payment as goods and services, you pay a 2.99% seller fee.",
      },
      {
        type: "p",
        text: "If you already invoice through PayPal, US clients can pay a PayPal invoice with Venmo. PayPal charges 3.49% + $0.49 for those payments.",
      },
      { type: "h2", text: "Can you send an invoice through Cash App?" },
      {
        type: "p",
        text: "No. Cash App lets you send and request money, and its terms describe a separate Cash App Business Account for receiving payment for goods and services, but there's no invoice feature in the app. If you want a true invoice that clients can pay with Cash App, Square Invoices (from the same parent company, Block) accepts Cash App Pay at 2.9% + 30¢ per invoice on its free plan. Otherwise, send your own invoice and put your $Cashtag in the payment section.",
      },
      { type: "h2", text: "Can you send an invoice through Chime?" },
      {
        type: "p",
        text: "No. Chime's Pay Anyone feature is peer-to-peer: you can send money, and request money from other Chime members, with no fees to send, receive, or cash out. But Chime's deposit account agreements say the checking account is not designed for business use and that Chime may close it if it's being used for business purposes. If clients pay you regularly, a business bank account is the safer place to receive it.",
      },
      { type: "h2", text: "How do you invoice a client who pays by Zelle, Venmo, or Cash App?" },
      {
        type: "ol",
        items: [
          "Create an invoice with your business details, the client's name, a unique invoice number, the date, and a specific due date.",
          "List the work as line items with quantities and rates, so the total is easy to check.",
          "Add a payment section that names each app you accept and the exact handle, email, or phone number to send to.",
          "Ask the client to put the invoice number in the payment memo, so you can match the payment to the invoice.",
          "Send the invoice by text, WhatsApp, or email — wherever the client actually reads messages.",
          "When the money arrives, check the amount and memo, mark the invoice paid, and send a receipt if the client wants one.",
        ],
      },
      { type: "h2", text: "What should the payment section say?" },
      {
        type: "p",
        text: "Most payment-app mix-ups come from vague instructions: the client sends to an old number, picks the wrong Venmo account, or leaves the memo blank. Spell everything out. Copy this into your invoice notes and fill in your details:",
      },
      {
        type: "template",
        label: "Payment instructions for your invoice",
        text: "How to pay — please include invoice number [INV-0042] in the memo.\nZelle: [billing@yourbusiness.com] (shows as [Your Business LLC])\nVenmo: [@YourBusiness] (business profile)\nCash App: [$YourBusiness]\nPayment is due by [November 16, 2026]. Please check the name before you send — Zelle payments can't be reversed.",
      },
      { type: "h2", text: "Example: a cleaning invoice paid by payment app" },
      {
        type: "p",
        text: "Here's what a complete invoice looks like for a house cleaner whose clients pay by Zelle or Venmo. The line items show exactly what was done, and the payment section sits in the notes right below the total.",
      },
      {
        type: "table",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Deep clean – 3-bed, 2-bath home", "1", "$240.00", "$240.00"],
          ["Inside oven", "1", "$35.00", "$35.00"],
          ["Inside fridge", "1", "$30.00", "$30.00"],
          ["Interior windows", "8", "$5.00", "$40.00"],
          ["Total due by Nov 16, 2026", "", "", "$345.00"],
        ],
      },
      {
        type: "p",
        text: "If the client pays $345 by Zelle with 'INV-0042' in the memo, you can match it in seconds. If you'd received the same $345 through a Venmo business profile instead, Venmo's 1.9% + $0.10 fee would be about $6.66, leaving about $338.34.",
      },
      { type: "h2", text: "What should you text the client?" },
      {
        type: "template",
        label: "Text or WhatsApp message",
        text: "Hi [Name], thanks for having us today! Here's your invoice [INV-0042] for [$345], due [Nov 16]: [link]. You can pay by Zelle, Venmo, or Cash App — the details are at the bottom of the invoice. Please add the invoice number in the memo. Thank you!",
      },
      { type: "h2", text: "Should you use PayPal or Square invoices instead?" },
      {
        type: "p",
        text: "If clients want to pay by card, a payment processor's invoices make sense. If most clients already pay you by Zelle or Venmo, you may not need one. US fees as of November 2026:",
      },
      {
        type: "table",
        head: ["Option", "Real invoices?", "Fee on a paid invoice"],
        rows: [
          ["Zelle", "No", "Typically none for consumers; business fees depend on your bank"],
          ["Venmo business profile", "Yes, in the app", "1.9% + $0.10"],
          ["PayPal Invoicing", "Yes", "3.49% + $0.49 paid with PayPal or Venmo; 2.99% + $0.49 by card"],
          ["Square Invoices (free plan)", "Yes", "3.3% + 30¢ by card; 2.9% + 30¢ with Cash App Pay; 1% (min $1) by ACH"],
        ],
      },
      {
        type: "p",
        text: "On a $345 job, PayPal's card rate would cost you about $10.81 and Square's card rate about $11.69. That's worth paying if card payment gets you paid days sooner; it's money left on the table if your client would happily have sent a Zelle.",
      },
      { type: "h2", text: "Tips for getting paid through payment apps" },
      {
        type: "ul",
        items: [
          "Always send an invoice first, even for small jobs. A payment with no invoice is hard to explain at tax time.",
          "Use one handle per app and keep it the same on every invoice, so clients never send money to an old account.",
          "Never accept an 'overpayment' and refund the difference — it's a common scam pattern on payment apps.",
          "For larger jobs, ask for a deposit before you start and invoice the balance at the end.",
          "Keep your records in one place: the invoice, the payment confirmation, and the date it arrived.",
        ],
      },
      { type: "h2", text: "How Invoiceflint handles payment-app invoices" },
      {
        type: "p",
        text: "Invoiceflint doesn't process payments, so it never takes a cut — your clients pay you directly by Zelle, Venmo, Cash App, or however you prefer. You create the invoice on your phone, add your payment details in the notes, and send it as a link, by email, on WhatsApp, or as a PDF. The client opens it in any browser without installing anything, you get a notification when they view it, and when the money lands you mark the invoice paid so every client's balance stays up to date.",
      },
    ],
  },
  {
    slug: "can-i-send-an-invoice-through-zelle",
    title: "Can I Send an Invoice Through Zelle? (2026 Answer)",
    description:
      "No — Zelle can't send invoices, only payment requests. See how to invoice a client who pays by Zelle, with a copyable payment block and example invoice.",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    related: ["can-you-send-an-invoice-through-zelle-venmo-cash-app", "how-to-invoice-a-client", "invoice-payment-terms"],
    trades: ["handymen", "cleaners", "contractors"],
    body: [
      {
        type: "p",
        text: "No. As of November 2026, Zelle has no invoicing feature: you can send money and request money from people enrolled in Zelle, but you can't create or send an invoice with line items, an invoice number, or a due date. To bill a client who pays by Zelle, send them a regular invoice with your Zelle email, phone number, or Zelle tag in the payment instructions, and they pay it from their own banking app.",
      },
      {
        type: "p",
        text: "That's actually a good setup for many small businesses: Zelle says there are typically no fees for consumers to send or receive money, and the money usually lands in your bank account within minutes. This guide covers what a Zelle request can and can't do, how to use Zelle as a business, what to put on the invoice, and a worked example you can copy.",
      },
      { type: "h2", text: "What's the difference between a Zelle request and an invoice?" },
      {
        type: "p",
        text: "A Zelle request is a message that says \"please send me $X.\" An invoice is a business document that explains what the money is for. Clients, accountants, and the IRS care about the second one.",
      },
      {
        type: "table",
        head: ["", "Zelle payment request", "Invoice with Zelle instructions"],
        rows: [
          ["Who can receive it", "Only people already enrolled in Zelle", "Anyone — by email, text, WhatsApp, or link"],
          ["Line items and quantities", "No", "Yes"],
          ["Invoice number and due date", "No", "Yes"],
          ["Sales tax shown separately", "No", "Yes"],
          ["Works as a record for bookkeeping", "Weak — just an amount and a memo", "Yes"],
          ["How the client pays", "From their banking app", "From their banking app, using the details on the invoice"],
          ["Fees", "Typically none for consumers; business fees depend on your bank", "Same — the invoice doesn't change Zelle's fees"],
        ],
      },
      {
        type: "p",
        text: "You can use both: send the invoice first so the client knows exactly what they're paying for, then follow up with a Zelle request for the same amount if your client prefers to tap \"approve\" in their banking app.",
      },
      { type: "h2", text: "Can I use Zelle for my business?" },
      {
        type: "p",
        text: "Yes, if your bank or credit union offers Zelle for small business accounts. Not every bank that offers Zelle to consumers offers it for business accounts, so check with yours first. A few things worth knowing before you put Zelle on your invoices:",
      },
      {
        type: "ul",
        items: [
          "Zelle only works inside banking apps now. Its standalone app stopped sending and receiving payments on April 1, 2025, so clients pay you from their own bank's app or website.",
          "Clients pay you using your business email, U.S. mobile number, or Zelle tag — a custom handle that only eligible small business account holders can create, if their bank supports it.",
          "Some banks support Zelle QR codes. If yours does, you can print the code on your invoice or job paperwork so clients can scan and pay.",
          "Sending limits are set by each bank, not by Zelle, and new business enrollments often start lower. If a client is paying a large invoice, they may hit their bank's daily limit and need to split the payment over two days.",
          "Zelle's network user agreement describes the service as intended for personal use, while allowing eligible small businesses to enroll through participating banks. If you take business payments, use a business account at a bank that supports it.",
        ],
      },
      { type: "h2", text: "How do I invoice a client who pays by Zelle?" },
      {
        type: "ol",
        items: [
          "Confirm your Zelle details. Open your banking app and check the exact email, phone number, or Zelle tag your business receives with, and the name clients will see when they send.",
          "Create the invoice. Include your business name and contact details, the client's name, a unique invoice number, the invoice date, and a specific due date such as \"due November 16, 2026\" rather than \"due on receipt.\"",
          "List the work as line items. Separate labor, materials, and any trip or disposal charges, with quantities and rates, so the client can check the total.",
          "Add a payment section. Write \"Pay by Zelle to …\" with your exact details, and ask the client to put the invoice number in the memo.",
          "Send it where the client will see it. Email works for most clients; for homeowners, a text or WhatsApp message often gets opened faster.",
          "Match the payment. When the Zelle notification arrives, check the amount and memo against the invoice and mark it paid.",
          "Send a receipt if asked. Some clients need one for their records or for reimbursement.",
        ],
      },
      { type: "h2", text: "What should I write in the Zelle payment section?" },
      {
        type: "p",
        text: "Vague instructions cause most Zelle problems: a client sends to an old phone number, or to a personal account with a similar name, and once the recipient is enrolled the payment can't be cancelled. Spell it out. Copy this into the notes or payment terms of your invoice:",
      },
      {
        type: "template",
        label: "Zelle payment instructions for an invoice",
        text: "How to pay: Zelle\nSend to: [billing@yourbusiness.com] (or Zelle tag: [YourBusiness])\nName shown in Zelle: [Your Business LLC]\nAmount: [$407.00]\nDue: [November 16, 2026]\nPlease include invoice number [INV-0107] in the memo.\nZelle payments can't be cancelled once sent — please double-check the name before you confirm.",
      },
      { type: "h2", text: "Example: a handyman invoice paid by Zelle" },
      {
        type: "p",
        text: "Here's a complete invoice for a half-day handyman job. The labor, materials, and trip charge are listed separately, and the Zelle instructions sit in the notes right below the total.",
      },
      {
        type: "table",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Labor – install two ceiling fans", "3 hrs", "$75.00", "$225.00"],
          ["Mount 65\" TV on drywall", "1", "$120.00", "$120.00"],
          ["Fan-rated mounting brace", "2", "$18.50", "$37.00"],
          ["Trip charge", "1", "$25.00", "$25.00"],
          ["Total due by Nov 16, 2026", "", "", "$407.00"],
        ],
      },
      {
        type: "p",
        text: "If your state taxes materials or certain services, add a sales tax line before the total. When the client sends $407.00 with \"INV-0107\" in the memo, you can match it to this invoice in seconds — and if your bank doesn't charge business Zelle fees, you keep the full $407.00. For comparison, PayPal Invoicing's US card rate of 2.99% + $0.49 would cost about $12.66 on the same invoice.",
      },
      { type: "h2", text: "What message should I send with the invoice?" },
      {
        type: "template",
        label: "Text, WhatsApp, or email message",
        text: "Hi [Name], thanks again for today. Here's your invoice [INV-0107] for [$407.00], due [Nov 16]: [link]. The easiest way to pay is Zelle to [billing@yourbusiness.com] — it should show as [Your Business LLC]. Please add the invoice number in the memo. Let me know if you have any questions!",
      },
      { type: "h2", text: "Is it safe to accept Zelle payments for a business?" },
      {
        type: "p",
        text: "For the business receiving money, Zelle is low-risk in one important way: once an enrolled client sends a payment, Zelle says it can't be reversed, so there's no card-style chargeback weeks later. The flip side is that clients have no purchase protection. Zelle states that it doesn't offer a protection program for authorized payments, which is why some new clients hesitate to pay a business they don't know. A clear, professional invoice with your business name and contact details goes a long way toward earning that trust.",
      },
      {
        type: "ul",
        items: [
          "Never accept an \"overpayment\" and send back the difference. It's a common scam pattern.",
          "Don't start large jobs on a promise to pay later. Ask for a deposit by Zelle, then invoice the balance when the work is done.",
          "Keep your Zelle details identical on every invoice so clients never send to an old account.",
        ],
      },
      { type: "h2", text: "Does Zelle report payments to the IRS?" },
      {
        type: "p",
        text: "No. Zelle says it does not report transactions on its network to the IRS, including payments for goods and services, so you won't get a Form 1099-K from Zelle. That doesn't make the income tax-free: you still have to report it yourself. Sending an invoice for every Zelle payment gives you the record you need to do that — what the job was, who paid, and when.",
      },
      { type: "h2", text: "What if the client says Zelle isn't working?" },
      {
        type: "ul",
        items: [
          "\"I can't find you\": the client may be searching a different email or phone number. Send them the exact one from your invoice.",
          "\"The payment is pending\": if the email or phone number isn't enrolled in Zelle yet, the money waits for the recipient to enroll and expires after 14 days, returning to the sender. Make sure the details on your invoice are the ones you've enrolled.",
          "\"It's over my limit\": banks set their own daily and monthly limits. The client can split the payment across two days, or pay part by Zelle and the rest another way.",
          "\"My bank doesn't have Zelle\": list a second payment method on the invoice, such as a check or another payment app.",
        ],
      },
      { type: "h2", text: "How Invoiceflint handles Zelle invoices" },
      {
        type: "p",
        text: "Invoiceflint doesn't process payments, so it never takes a cut of a Zelle payment — the money goes straight from your client's bank to yours. You create the invoice on your phone, add your Zelle details in the notes, and send it as a link, by email, on WhatsApp, or as a PDF. The client opens it in any browser without installing an app, you get a notification when they view it, and when the Zelle payment arrives you mark the invoice paid so each client's balance stays accurate.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
