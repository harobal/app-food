import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Agro Processing & Export Supply Chain Services",
  description:
    "Compliance-led sourcing, quality control alignment, customized export packaging, and container logistics for foods and agri programs.",
};

const services = [
  {
    title: "Sourcing & shortlisting",
    description:
      "Shortlist export-ready products by grade, form, origin cluster, and buyer channel (retail/wholesale/institutional).",
  },
  {
    title: "Compliance alignment",
    description:
      "Destination-aware documentation and certification readiness (where applicable) to reduce avoidable delays and rework.",
  },
  {
    title: "Quality & sampling support",
    description:
      "Batch-level QC options, sampling expectations alignment, and parameter confirmation before commercial finalization.",
  },
  {
    title: "Packaging formats",
    description:
      "Bulk, foodservice, and retail-ready formats depending on product category and buyer requirements.",
  },
  {
    title: "Cold-chain coordination",
    description:
      "Cold-chain handling notes for time-sensitive categories and shipment windows aligned to shelf-life and route risk.",
  },
  {
    title: "Documentation & shipment coordination",
    description:
      "Support for packing lists, labeling plans, and coordination checkpoints from packhouse/facility to loading.",
  },
] as const;

export default function FoodsServicesPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Services</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Compliance-led export support</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            We operate RFQ-first and execution-focused — aligning specs, packaging, documentation, and shipment planning to the destination market.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="elevated-card">
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{service.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
