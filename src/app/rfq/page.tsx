import { createPageMetadata } from "@/config/site";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsQuoteClient } from "@/components/pages/quote/quote-client";

export const metadata = createPageMetadata({
  title: "Request for Quotation (RFQ)",
  description:
    "Submit a consolidated Request for Quotation (RFQ) for Indian spices, grains, pulses, and processed foods with custom specifications.", path: "/rfq" });

export default function FoodsRfqPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-brand-ink text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.97),rgba(7,25,20,.8),rgba(7,25,20,.24)),url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-center" aria-hidden />
        <div className="container-shell relative py-10 sm:py-14">
        <div className="max-w-3xl">
          <div className="[&_a]:!text-white/65 [&_span]:!text-white/75 [&_svg]:!text-white/45"><PageBreadcrumbs /></div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Send RFQ</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Send one consolidated RFQ</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            Confirm quantities, add shipment requirements, and submit one structured brief. Email and copy remain available as delivery fallbacks.
          </p>
        </div>
        </div>
      </section>

      <section className="bg-hero-wash py-10 sm:py-14">
        <div className="container-shell">
          <FoodsQuoteClient />
        </div>
      </section>
    </>
  );
}
