import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import FaqList from "@/components/FaqList";
import StoreBadges from "@/components/StoreBadges";
import { blankDraft } from "@/lib/generator/draft";
import { SITE_URL } from "@/lib/site";
import { graph, jsonLdScript, webAppLd, breadcrumbLd, faqLd, type FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Generador de facturas gratis: crea tu factura en PDF";
const DESCRIPTION =
  "Haz una factura online gratis: añade tu logotipo, los conceptos y el IVA, y descárgala en PDF. Sin registro y sin subir tus datos a ningún servidor.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/es/generador-de-facturas",
  locale: "es_ES",
  languages: { en: "/invoice-generator", es: "/es/generador-de-facturas", "x-default": "/invoice-generator" },
});

const FAQS: FaqItem[] = [
  {
    question: "¿El generador de facturas es gratis?",
    answer:
      "Sí. Puedes crear y descargar todas las facturas que quieras, con tu logotipo, sin registrarte. El PDF solo lleva una pequeña línea al pie que indica que se hizo con Invoiceflint.",
  },
  {
    question: "¿Se guardan o se suben mis datos?",
    answer:
      "No se suben a ningún servidor. El PDF se crea en tu dispositivo y el borrador se guarda solo en este navegador, para que lo encuentres al volver.",
  },
  {
    question: "¿Qué debe incluir una factura?",
    answer:
      "Normalmente: número de factura correlativo, fecha, tus datos y los del cliente (con el NIF, RFC u otro identificador fiscal si se exige en tu país), la descripción de cada concepto con su precio, la base imponible, el impuesto aplicado (por ejemplo, el IVA) y el total. Los requisitos exactos dependen del país.",
  },
  {
    question: "¿Sirve como factura electrónica (VeriFactu o CFDI)?",
    answer:
      "No. Este generador crea facturas en PDF. Si tu país o tu actividad exigen factura electrónica oficial, como el CFDI en México o los sistemas de VeriFactu en España, necesitas un software homologado para ello.",
  },
  {
    question: "¿Puedo hacer un presupuesto o un recibo?",
    answer: "Sí. Cambia el título a Presupuesto, Cotización o Recibo y el PDF lo usará.",
  },
];

export default function GeneradorDeFacturas() {
  const url = `${SITE_URL}/es/generador-de-facturas`;
  const jsonLd = graph(
    webAppLd({ url, name: "Generador de facturas gratis de Invoiceflint", description: DESCRIPTION, inLanguage: "es" }),
    breadcrumbLd([
      { name: "Inicio", url: `${SITE_URL}/es` },
      { name: "Generador de facturas", url },
    ]),
    faqLd(FAQS),
  );

  return (
    <SiteShell locale="es">
      <script {...jsonLdScript(jsonLd)} />
      <PageHero
        crumbs={[{ href: "/es", label: "Inicio" }, { label: "Generador de facturas" }]}
        eyebrow="Gratis · Sin registro · Sin marca de agua"
        title="Generador de facturas gratis"
      >
        <p>
          Rellena tus datos y descarga una factura profesional en PDF en un par de minutos. Todo se
          queda en tu navegador: no se sube nada.
        </p>
      </PageHero>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <InvoiceGenerator initial={blankDraft("es")} locale="es" paper="a4" storageKey="invoiceflint:generator:es" />
      </section>

      <section className="border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">Cómo hacer una factura</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Tus datos y los del cliente", "Nombre o razón social, dirección, identificador fiscal y contacto; después, a quién facturas."],
                ["Los conceptos", "Una línea por servicio o producto, con cantidad y precio. Los totales y el impuesto se calculan solos."],
                ["Número, fechas y condiciones", "Usa una numeración correlativa, la fecha de hoy y una fecha de vencimiento concreta. Añade la forma de pago en las notas."],
                ["Descarga y envía", "Descarga el PDF y envíalo por email a tu cliente, o imprímelo."],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-rust text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-3xl bg-paper p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">¿Facturas a menudo? Usa la app</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Con Invoiceflint para iPhone y Android envías la factura por enlace, email o WhatsApp, sabes
              cuándo tu cliente la abre, controlas qué está pagado o vencido y conviertes presupuestos en
              facturas con un toque. La app está en español.
            </p>
            <StoreBadges className="mt-6" />
            <Link href="/es" className="mt-5 inline-block text-sm font-semibold text-rust hover:underline">
              Conoce la app →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Preguntas frecuentes</h2>
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
      </section>
    </SiteShell>
  );
}
