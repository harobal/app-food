import { createPageMetadata } from "@/config/site";
import { TradeCapabilityPage } from "@/components/pages/support/trade-capability-page";

export const metadata = createPageMetadata({
  title: "Cold Chain, Container Logistics & Incoterms",
  description:
    "Global container shipping, cold-chain preservation, export customs documentation, and multi-modal freight coordination.", path: "/logistics", image: "/media/harvest-meridian/cold-chain-logistics.webp" });

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
  return <TradeCapabilityPage eyebrow="Logistics" title="Shipment and delivery considerations" introduction="Accurate quotes depend on route and requirements. Share destination port, incoterms, packaging format, and timing." image="/media/harvest-meridian/cold-chain-logistics.webp" imageLabel="Cold-chain and port execution context" items={topics} />;
}
