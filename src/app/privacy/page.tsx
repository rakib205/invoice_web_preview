import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Invoiceflint collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 11, 2026";

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-zinc-700 leading-relaxed">
          <Section title="1. Who We Are">
            <p>
              Invoiceflint (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a mobile application and
              related web services that help freelancers and small businesses create, send, and track
              invoices and estimates. Our registered business contact is{" "}
              <a href="mailto:hello@invoiceflint.com" className="text-[#b8412a] hover:underline">
                hello@invoiceflint.com
              </a>
              .
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong>Account information</strong> — your name and email address when you create an
                account.
              </li>
              <li>
                <strong>Business data</strong> — clients, invoice line items, amounts, and payment
                statuses that you enter into the app.
              </li>
              <li>
                <strong>Usage data</strong> — anonymised analytics on feature usage, crash reports,
                and device information to improve the app.
              </li>
              <li>
                <strong>Communication data</strong> — messages you send us via our Contact or Support
                forms.
              </li>
              <li>
                <strong>Invoice view events</strong> — when your client opens a shared invoice link,
                we record the view timestamp so you can see read receipts.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and operate the Invoiceflint service.</li>
              <li>To send transactional emails related to your account and invoices.</li>
              <li>To respond to support and contact requests.</li>
              <li>To detect and prevent fraud, spam, and abuse.</li>
              <li>To improve app performance and fix bugs using anonymised usage data.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal data to third parties.
            </p>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>
              Your data is stored on{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b8412a] hover:underline"
              >
                Supabase
              </a>
              , which provides encrypted storage on infrastructure hosted in the United States. Data in
              transit is encrypted using TLS. We apply the principle of least privilege: only services
              that need access to your data are granted it.
            </p>
            <p className="mt-3">
              Despite our safeguards, no method of transmission or storage is 100% secure. We encourage
              you to use a strong, unique password for your account.
            </p>
          </Section>

          <Section title="5. Cookies & Tracking">
            <p>
              The Invoiceflint website uses a minimal session cookie required for functionality. We do
              not use advertising cookies or third-party tracking pixels. Invoice view-tracking relies
              on a one-time token stored in session storage on your client&apos;s browser — it is not
              shared with any ad network.
            </p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>We use the following sub-processors to operate the service:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong>Supabase</strong> — database and authentication.
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery.
              </li>
              <li>
                <strong>Vercel</strong> — web hosting and edge delivery.
              </li>
              <li>
                <strong>Apple / Google</strong> — app distribution via the App Store and Google Play.
              </li>
            </ul>
            <p className="mt-3">
              Each sub-processor is bound by their own privacy policy and applicable data protection
              laws.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Receive a portable copy of your data.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@invoiceflint.com" className="text-[#b8412a] hover:underline">
                hello@invoiceflint.com
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Data Retention">
            <p>
              We retain your account data for as long as your account is active. If you delete your
              account, we remove your personal data within 30 days, except where we are required by law
              to retain it longer (e.g. financial records).
            </p>
          </Section>

          <Section title="9. Children">
            <p>
              Invoiceflint is not directed at children under 13. We do not knowingly collect personal
              data from children. If you believe a child has provided us with personal data, please
              contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of Invoiceflint
              after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:hello@invoiceflint.com" className="text-[#b8412a] hover:underline">
                hello@invoiceflint.com
              </a>{" "}
              or through our{" "}
              <a href="/contact" className="text-[#b8412a] hover:underline">
                Contact page
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#0a1729]">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
