import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsQuoteClient } from "@/components/pages/quote/quote-client";

export const metadata: Metadata = {
  title: "Request for Quotation (RFQ)",
  description:
    "Submit a consolidated Request for Quotation (RFQ) for Indian spices, grains, pulses, and processed foods with custom specifications.",
};

export default function FoodsRfqPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Send RFQ</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Send one consolidated RFQ</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Add quantities, include notes, and send a single RFQ via email or WhatsApp.
          </p>
        </div>

        <div className="mt-10">
          <FoodsQuoteClient />
        </div>
      </div>
    </section>
  );
}
