import type { Metadata } from "next";
import { defaultMetadata } from "@/config/site";
import "./globals.css";
import { FoodsHeader } from "@/components/layout/foods-header";
import { FoodsFooter } from "@/components/layout/foods-footer";
import { FoodsQuoteRequestProvider } from "@/features/quote-request";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { themeInitializationScript } from "@/lib/theme";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = defaultMetadata;

export default function FoodsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <OrganizationJsonLd />
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-background">
        <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg transition-transform focus:translate-y-0">Skip to main content</a>
        <ThemeProvider><FoodsQuoteRequestProvider>
          <FoodsHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <FoodsFooter />
          <FloatingWhatsApp />
          <BackToTop />
          <CookieBanner />
        </FoodsQuoteRequestProvider></ThemeProvider>
      </body>
    </html>
  );
}
