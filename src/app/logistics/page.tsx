import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cold Chain, Container Logistics & Incoterms",
  description:
    "Global container shipping, cold-chain preservation, export customs documentation, and multi-modal freight coordination.",
};

const topics = [
  {
    title: "Incoterms and routing",
    description:
      "We align quote expectations early (EXW/FOB/CIF/etc.) so pricing, timelines, and responsibilities are clear.",
  },
  {
    title: "Cold-chain handling (fresh)",
    description:
      "Shipment planning aligned to shelf-life, temperature requirements, and route risk for time-sensitive categories.",
  },
  {
    title: "Packaging and labeling",
    description:
      "Category-aware packing formats (bulk/retail), labeling cues, and handling notes to reduce damage and quality drift.",
  },
  {
    title: "Documentation readiness",
    description:
      "RFQs should capture destination port, certificate needs, and buyer-specific document expectations to avoid delays.",
  },
  {
    title: "Sampling and inspections",
    description:
      "If you require lab tests, inspections, or pre-shipment checks, include them in the RFQ so lead times are realistic.",
  },
  {
    title: "Delivery windows",
    description:
      "For seasonal categories, align the target shipment window with harvest availability and market timing.",
  },
] as const;

export default function FoodsLogisticsPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Logistics</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Shipment and delivery considerations</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Accurate quotes depend on route and requirements. Share destination port, incoterms, packaging format, and timing.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((item) => (
            <Card key={item.title} className="elevated-card">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
