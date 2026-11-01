import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, APP_STORE_ID } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import StoreClickTracker from "@/components/StoreClickTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Invoiceflint — Invoice Maker App for iPhone & Android";

export const viewport: Viewport = {
  themeColor: "#1E2850",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Invoiceflint",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "invoice app",
    "invoice maker",
    "invoice maker app",
    "estimate app",
    "estimate maker",
    "quote app",
    "invoice app for contractors",
    "invoice app for freelancers",
    "send invoices from phone",
    "invoice tracker",
    "small business invoicing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  // Safari on iPhone/iPad shows its native "Open / Get" app banner on every page.
  // Client-facing invoice and estimate pages switch it off (see documentMetadata).
  itunes: { appId: APP_STORE_ID },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes onto <body> after SSR, which would otherwise trip React's
          hydration mismatch warning. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
        <StoreClickTracker />
      </body>
    </html>
  );
}
