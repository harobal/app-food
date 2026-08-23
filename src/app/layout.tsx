import type { Metadata } from "next";
import { defaultMetadata } from "@/config/site";
import "./globals.css";
import { FoodsHeader } from "@/components/layout/foods-header";
import { FoodsFooter } from "@/components/layout/foods-footer";
import { FoodsQuoteRequestProvider } from "@/features/quote-request";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { BackToTop } from "@/components/layout/back-to-top";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = defaultMetadata;

export default function FoodsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="flex flex-col min-h-screen bg-background">
        <FoodsQuoteRequestProvider>
          <FoodsHeader />
          <main className="flex-1">{children}</main>
          <FoodsFooter />
          <FloatingWhatsApp />
          <BackToTop />
        </FoodsQuoteRequestProvider>
      </body>
    </html>
  );
}
