import type { ProcessStep, Stat, Usp } from "@/types/site";

export const stats: Stat[] = [
  { label: "Export Product Categories", value: "10+" },
  { label: "Global Buyer Markets", value: "30+" },
  { label: "Verified Supplier Network", value: "250+" },
  { label: "Compliance-Led Execution", value: "100%" },
];

export const processSteps: ProcessStep[] = [
  {
    icon: "01",
    title: "Requirement Discovery",
    detail: "We define your commercial objective, quality baseline, and delivery expectations up front.",
  },
  {
    icon: "02",
    title: "Supplier and Offer Curation",
    detail: "We curate supplier options and build commercially clear offers around price, quality, and lead time.",
  },
  {
    icon: "03",
    title: "Quality and Compliance Alignment",
    detail: "Inspection checkpoints and documentation controls are aligned before shipment release.",
  },
  {
    icon: "04",
    title: "Shipment Orchestration",
    detail: "We coordinate dispatch milestones, shipment planning, and route-level communication.",
  },
  {
    icon: "05",
    title: "Delivery and Continuity",
    detail: "We close the transaction with post-shipment support and prepare continuity plans for repeat cycles.",
  },
];

export const usps: Usp[] = [
  {
    title: "Multi-Domain Trade Coverage",
    detail: "A single commercial interface across stone, food, and custom sourcing pathways.",
  },
  {
    title: "Compliance-Led Commercial Execution",
    detail: "Documentation discipline and control points built to reduce friction in international trade transactions.",
  },
  {
    title: "Buyer-Side Risk Reduction",
    detail: "Inspection and review controls help protect product quality and shipment reliability.",
  },
  {
    title: "Commercially Optimized Sourcing",
    detail: "Structured supplier comparisons for balanced outcomes across cost, quality, and lead time.",
  },
  {
    title: "End-to-End Trade Coordination",
    detail: "From sourcing brief to shipment tracking, one coordinated workflow with accountable ownership.",
  },
  {
    title: "Custom Sourcing Desk",
    detail: "Need another product category? We build a tailored sourcing route through our supplier network.",
  },
];
