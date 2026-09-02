import { createPageMetadata } from "@/config/site";
import { TradeCapabilityPage } from "@/components/pages/support/trade-capability-page";

export const metadata = createPageMetadata({
  title: "Agro Processing & Export Supply Chain Services",
  description:
    "Compliance-led sourcing, quality control alignment, customized export packaging, and container logistics for foods and agri programs.", path: "/services" });

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
  return <TradeCapabilityPage eyebrow="Services" title="Compliance-led export support" introduction="We operate RFQ-first and execution-focused — aligning specs, packaging, documentation, and shipment planning to the destination market." image="/media/harvest-meridian/foods-export-hero.webp" imageLabel="Food-export sourcing and execution context" items={services} />;
}
