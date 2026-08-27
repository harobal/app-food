import { createPageMetadata } from "@/config/site";
import { TradeCapabilityPage } from "@/components/pages/support/trade-capability-page";

export const metadata = createPageMetadata({
  title: "Food Quality Assurance & Lab Compliance Standards",
  description:
    "Rigorous quality parameters, pesticide residue testing, phytosanitary clearance, and international food safety compliance.", path: "/quality", image: "/media/harvest-meridian/quality-control-lab.webp" });

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
  return <TradeCapabilityPage eyebrow="Quality" title="Quality and compliance framework" introduction="We treat quality as an execution system: grade alignment, safety mindset, traceability cues, and documentation discipline." image="/media/harvest-meridian/quality-control-lab.webp" imageLabel="Laboratory and batch-control context" items={pillars} />;
}
