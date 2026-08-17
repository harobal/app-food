import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Food Quality Assurance & Lab Compliance Standards",
  description:
    "Rigorous quality parameters, pesticide residue testing, phytosanitary clearance, and international food safety compliance.",
};

const pillars = [
  {
    title: "Product-grade alignment",
    description:
      "We align grade, form, and packaging to buyer channel needs (retail, wholesale, institutional) before quoting is finalized.",
  },
  {
    title: "Safety testing mindset",
    description:
      "Destination-aware residue and contamination considerations (as applicable) so the RFQ includes what matters for clearance.",
  },
  {
    title: "Traceability and lot control",
    description:
      "Clear lot identification and batch continuity cues for repeat programs, especially where parameters and documentation must stay consistent.",
  },
  {
    title: "Documentation discipline",
    description:
      "We structure RFQs to capture incoterms, destination port, labeling needs, and document expectations to reduce back-and-forth.",
  },
  {
    title: "Packaging hygiene",
    description:
      "Packaging format guidance and handling notes by category (fresh vs shelf-stable) to reduce transit damage and quality drift.",
  },
  {
    title: "Certifications (as required)",
    description:
      "Where buyers require certifications, we align early and avoid assumptions — especially for regulated destinations.",
  },
] as const;

export default function FoodsQualityPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Quality</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Quality and compliance framework</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            We treat quality as an execution system: grade alignment, safety mindset, traceability cues, and documentation discipline.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item) => (
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
