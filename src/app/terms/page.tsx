import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Terms of Use — Invoiceflint",
  description: "The terms and conditions governing your use of Invoiceflint.",
};

const LAST_UPDATED = "May 14, 2026";

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0a1729] sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10 text-zinc-700 leading-relaxed">
          <Section title="1. Acceptance of Terms">
            <p>
              By downloading, installing, or using Invoiceflint (the &ldquo;Service&rdquo;), you agree
              to be bound by these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree, do not use
              the Service. These Terms apply to all users, including freelancers, small business owners,
              and anyone else who accesses Invoiceflint.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old to use Invoiceflint. By using the Service, you represent
              that you meet this age requirement. If you are using Invoiceflint on behalf of a business
              or other legal entity, you represent that you have the authority to bind that entity to
              these Terms.
            </p>
          </Section>

          <Section title="3. Your Account">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activity that occurs under your account. You agree to:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Provide accurate and complete information when creating your account.</li>
              <li>Keep your password secure and not share it with others.</li>
              <li>
                Notify us immediately at{" "}
                <a href="mailto:hello@invoiceflint.com" className="text-[#b8412a] hover:underline">
                  hello@invoiceflint.com
                </a>{" "}
                if you suspect unauthorised access to your account.
              </li>
            </ul>
            <p className="mt-3">
              We are not liable for any loss or damage arising from your failure to protect your
              account credentials.
            </p>
          </Section>

          <Section title="4. Permitted Use">
            <p>
              Invoiceflint is designed to help you create, send, and manage invoices and estimates for
              legitimate business purposes. You may use the Service only for lawful purposes and in
              accordance with these Terms. You agree not to:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Use the Service to commit fraud or issue false, misleading, or fictitious invoices.</li>
              <li>Violate any applicable law or regulation.</li>
              <li>Upload or transmit malicious code, spam, or harmful content.</li>
              <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure.</li>
              <li>Reverse-engineer, decompile, or disassemble the Service.</li>
              <li>Resell or sublicense access to the Service without our written consent.</li>
            </ul>
          </Section>

          <Section title="5. Your Content">
            <p>
              You retain ownership of the data you enter into Invoiceflint, including client details,
              invoice line items, and business information (&ldquo;Your Content&rdquo;). By using the
              Service, you grant us a limited, non-exclusive licence to store and process Your Content
              solely to provide and improve the Service.
            </p>
            <p className="mt-3">
              You are solely responsible for the accuracy and legality of Your Content. We do not review
              invoices or estimates you create and are not responsible for any disputes between you and
              your clients.
            </p>
          </Section>

          <Section title="6. Shared Invoice Links">
            <p>
              When you share an invoice or estimate link, your client can view the document and, where
              enabled, respond to estimates. You acknowledge that:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                Anyone with the link can view the associated document. Treat links as confidential.
              </li>
              <li>
                We record a view timestamp when a shared link is opened so you can see read receipts.
              </li>
              <li>
                We are not a party to any transaction between you and your client and bear no
                responsibility for payment disputes.
              </li>
            </ul>
          </Section>

          <Section title="7. Fees & Subscriptions">
            <p>
              Certain features of Invoiceflint may require a paid subscription. Where applicable:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                Subscription fees are billed through the Apple App Store or Google Play in accordance
                with their respective billing terms.
              </li>
              <li>
                All purchases are final unless otherwise required by applicable law or platform policy.
              </li>
              <li>
                We reserve the right to change pricing with reasonable notice. Continued use after a
                price change constitutes acceptance of the new price.
              </li>
            </ul>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All rights, title, and interest in and to the Invoiceflint application, website, and
              associated materials — including software, design, logos, and trademarks — remain the
              exclusive property of Invoiceflint. Nothing in these Terms grants you any right to use our
              name, logo, or branding without our prior written consent.
            </p>
          </Section>

          <Section title="9. Disclaimers">
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, express or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We do not warrant
              that the Service will be uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
            <p className="mt-3">
              Invoiceflint is not a financial, accounting, or legal service. Nothing in the Service
              constitutes professional advice. Consult a qualified professional for guidance specific to
              your situation.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Invoiceflint and its operators shall
              not be liable for any indirect, incidental, special, consequential, or punitive damages —
              including loss of profits, data, or goodwill — arising out of or in connection with your
              use of the Service, even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-3">
              Our total liability to you for any claim arising out of these Terms or your use of the
              Service shall not exceed the amount you paid to us in the twelve months preceding the
              claim, or $50 USD, whichever is greater.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              You may stop using the Service and delete your account at any time. We reserve the right
              to suspend or terminate your account, without notice, if we reasonably believe you have
              violated these Terms or applicable law. Upon termination, your right to use the Service
              ceases immediately. Sections 5, 8, 9, 10, and 12 survive termination.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any disputes
              arising from these Terms or your use of the Service shall be resolved in the competent
              courts of the jurisdiction in which Invoiceflint operates, and you consent to personal
              jurisdiction in such courts.
            </p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>
              We may update these Terms from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page and, where changes are material,
              notify you via email or an in-app notice. Continued use of the Service after changes are
              posted constitutes your acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>
              Questions about these Terms? Reach us at{" "}
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
