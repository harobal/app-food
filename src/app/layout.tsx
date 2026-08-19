import type { Metadata } from "next";
import { defaultMetadata } from "@/config/site";
import "./globals.css";
import { FoodsHeader } from "@/components/layout/foods-header";
import { FoodsFooter } from "@/components/layout/foods-footer";
import { FoodsQuoteRequestProvider } from "@/providers/quote-request-provider";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "Harobal Foods | Indian Agro & Food Commodity Exports",
    template: "%s | Harobal Foods",
  },
  description:
    "Export-ready Indian foods, spices, grains, pulses, and agricultural commodities with strict compliance discipline, quality certifications, and global container logistics.",
};

export default function FoodsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex flex-col min-h-screen bg-background">
        <FoodsQuoteRequestProvider>
          <FoodsHeader />
          <main className="flex-1">{children}</main>
          <FoodsFooter />
          <FloatingWhatsApp />
          <BackToTop />
          <CookieBanner />
        </FoodsQuoteRequestProvider>
      </body>
    </html>
  );
}
