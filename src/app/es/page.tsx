import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import StoreBadges from "@/components/StoreBadges";
import FeatureIcon from "@/components/FeatureIcon";
import FaqList from "@/components/FaqList";
import { SITE_URL } from "@/lib/site";
import { LANGUAGES } from "@/lib/product";
import { graph, jsonLdScript, organizationLd, softwareApplicationLd, faqLd, type FaqItem } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Invoiceflint: app para hacer facturas y presupuestos";
const DESCRIPTION =
  "Crea y envía facturas y presupuestos desde tu teléfono por email o WhatsApp, y recibe un aviso cuando tu cliente los abre. Gratis para iPhone y Android.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/es",
  locale: "es_ES",
  languages: { en: "/", es: "/es", "x-default": "/" },
});

/** Spanish versions of the main features in `@/lib/product`; keep them in step. */
const FUNCIONES = [
  { id: "create", title: "Facturas y presupuestos en segundos", body: "Añade el cliente y los conceptos; los totales, el IVA y la numeración se calculan solos." },
  { id: "read-receipts", title: "Sabes cuándo tu cliente la abre", body: "Recibe un aviso en el teléfono en cuanto tu cliente abre la factura o responde a un presupuesto." },
  { id: "status", title: "Pagada, pendiente o vencida", body: "Cada factura muestra su estado y las vencidas destacan, para saber a quién reclamar." },
  { id: "estimates", title: "Del presupuesto a la factura con un toque", body: "Tu cliente acepta el presupuesto online y lo conviertes en factura sin volver a escribir nada." },
  { id: "send", title: "Por enlace, email, WhatsApp o PDF", body: "Comparte un enlace seguro, envíalo por email, abre WhatsApp con el mensaje listo o manda el PDF." },
  { id: "no-client-app", title: "Tu cliente no necesita la app", body: "La factura se abre en cualquier navegador: puede verla, descargarla o aceptar el presupuesto sin registrarse." },
  { id: "clients", title: "Clientes y conceptos guardados", body: "Guarda tus clientes y tus servicios con su precio para que repetir una factura lleve segundos." },
  { id: "reminders", title: "Recordatorios automáticos", body: "Programa recordatorios por email antes y después del vencimiento (Pro)." },
  { id: "templates", title: "14 plantillas con tu logotipo", body: "Elige entre 14 diseños profesionales; la plantilla Clásica es gratis y el resto viene con Pro." },
];

const FAQS: FaqItem[] = [
  {
    question: "¿Invoiceflint es gratis?",
    answer:
      "Invoiceflint se descarga gratis y puedes crear y previsualizar todas las facturas y presupuestos que quieras. Invoiceflint Pro añade envíos ilimitados, 14 plantillas, recordatorios automáticos, firmas, fotos y varias empresas. Pro empieza con una prueba gratis y el precio aparece en la app en tu moneda.",
  },
  {
    question: "¿La app está en español?",
    answer: `Sí. Invoiceflint está disponible en español y en otros idiomas: ${LANGUAGES.join(", ")}. Puedes facturar en tu moneda.`,
  },
  {
    question: "¿Puedo enviar facturas por WhatsApp?",
    answer:
      "Sí. Invoiceflint abre WhatsApp con el enlace de la factura y un mensaje listo para enviar. Tu cliente la abre en el navegador, sin instalar nada, y tú recibes un aviso cuando la ve.",
  },
  {
    question: "¿Sirve para la factura electrónica (VeriFactu o CFDI)?",
    answer:
      "No. Invoiceflint crea facturas y presupuestos en PDF y por enlace, pero no emite facturas electrónicas oficiales como el CFDI de México ni está integrada con VeriFactu en España. Si tu país o tu actividad las exige, consulta con tu asesor qué sistema necesitas.",
  },
  {
    question: "¿Para quién es Invoiceflint?",
    answer:
      "Para autónomos, freelancers, profesionales de oficios y pequeñas empresas que quieren facturar desde el teléfono justo al terminar un trabajo: fontaneros, electricistas, reformas, limpieza, jardinería, fotógrafos, diseñadores, consultores, profesores particulares y más.",
  },
];

export default function SpanishHome() {
  const jsonLd = graph(organizationLd(), { ...softwareApplicationLd(), inLanguage: LANGUAGES }, faqLd(FAQS), {
    "@type": "WebPage",
    "@id": `${SITE_URL}/es#webpage`,
    url: `${SITE_URL}/es`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "es",
    about: { "@id": `${SITE_URL}/#app` },
  });

  return (
    <SiteShell locale="es">
      <script {...jsonLdScript(jsonLd)} />

      <div className="relative overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(184,65,42,0.15) 0%, rgba(184,65,42,0.05) 50%, transparent 80%)" }}
        />
        <section className="relative mx-auto w-full max-w-4xl px-4 pb-20 pt-10 text-center sm:px-6 lg:pt-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-rust-line bg-rust-soft px-3 py-1 text-xs font-medium text-rust">
            <span className="h-1.5 w-1.5 rounded-full bg-rust" />
            App de facturas y presupuestos para iPhone y Android
          </p>
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-6xl">
            Envía facturas desde tu teléfono. <span className="text-rust">Cobra antes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Invoiceflint es la app de facturas para autónomos, profesionales y pequeñas empresas.
            Crea una factura o un presupuesto profesional, envíalo por email o WhatsApp y recibe un
            aviso en cuanto tu cliente lo abre.
          </p>
          <div id="descargar" className="scroll-mt-24">
            <StoreBadges className="mt-8 justify-center" placement="hero" />
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-zinc-500">
            {["Descarga gratis", "Prueba gratis de Pro", "Tu cliente no necesita la app"].map((t) => (
              <li key={t}>✓ {t}</li>
            ))}
          </ul>
        </section>
      </div>

      <section id="funciones" className="scroll-mt-8 border-y border-zinc-200 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            Todo lo que necesitas para facturar y cobrar
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCIONES.map((f) => (
              <li key={f.id} className="rounded-2xl border border-zinc-200 bg-paper p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rust-soft text-rust">
                  <FeatureIcon id={f.id} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-ink p-8 text-white sm:p-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">¿Solo necesitas una factura?</h2>
            <p className="mt-3 text-zinc-300">
              Usa nuestro generador de facturas gratis: rellena tus datos, añade tu logotipo y descarga el PDF.
              Sin registro y sin subir nada.
            </p>
          </div>
          <Link href="/es/generador-de-facturas" className="justify-self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-zinc-100 md:justify-self-end">
            Crear una factura gratis →
          </Link>
        </div>
      </section>

      <section id="precios" className="mx-auto w-full max-w-5xl scroll-mt-8 px-4 pb-20 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
          Empieza gratis. Pasa a Pro cuando quieras enviar.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              name: "Gratis",
              items: ["Borradores ilimitados de facturas y presupuestos", "Plantilla Clásica con tu logotipo", "Clientes, conceptos guardados e impuestos", "Informes y totales de impuestos", "Funciona sin conexión y sin cuenta"],
            },
            {
              name: "Pro",
              items: ["Envío ilimitado de facturas y presupuestos", "Avisos cuando el cliente abre o responde", "Las 14 plantillas", "Recordatorios automáticos por email", "Firmas y fotos adjuntas", "Varios impuestos y varias empresas"],
            },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-3xl p-8 ${plan.name === "Pro" ? "bg-ink text-white" : "border border-zinc-200 bg-white"}`}>
              <h3 className={`text-xl font-semibold ${plan.name === "Pro" ? "" : "text-ink"}`}>{plan.name}</h3>
              <ul className={`mt-6 space-y-3 text-sm ${plan.name === "Pro" ? "text-zinc-200" : "text-zinc-700"}`}>
                {plan.items.map((i) => (
                  <li key={i}>✓ {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Pro empieza con una prueba gratis. Se cancela cuando quieras desde App Store o Google Play.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Preguntas frecuentes</h2>
        <div className="mt-8">
          <FaqList items={FAQS} />
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-ink">Descarga Invoiceflint gratis</p>
          <StoreBadges className="justify-center" placement="bottom" />
        </div>
      </section>
    </SiteShell>
  );
}
