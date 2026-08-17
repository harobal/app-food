export type DomainDetail = {
  slug: "stones" | "foods";
  title: string;
  overview: string;
  marketTrend: string;
  materials: string[];
  qualityFramework: string[];
  buyerProfiles: string[];
  logisticsNotes: string[];
  externalUrl: string;
};

export const domainDetails: DomainDetail[] = [
  {
    slug: "stones",
    title: "Natural Stone Products",
    overview:
      "Our stone domain supports importers, fabricators, and project contractors looking for reliable Indian stone supply with quality consistency, dimensional control, and shipment readiness.",
    marketTrend:
      "Global demand is increasingly shifting toward engineered project planning with natural aesthetics, where buyers prioritize finish consistency, lead-time reliability, and application-specific performance.",
    materials: [
      "Granite slabs, tiles, and cut-to-size packs",
      "Marble in polished, honed, and leather finish options",
      "Sandstone and slate for facade and landscape applications",
      "Quartzite, limestone, and project-specific custom stone formats",
    ],
    qualityFramework: [
      "Block and slab selection control before processing",
      "Dimensional and finish tolerance checks before packing",
      "Shade and lot consistency planning for project batches",
      "Packaging and loading standards aligned to export routes",
    ],
    buyerProfiles: [
      "Stone importers and regional distributors",
      "Architectural and construction procurement teams",
      "Project developers with recurring volume requirements",
    ],
    logisticsNotes: [
      "Container loading plans optimized by thickness and crate type",
      "Port, transit, and insurance discussions aligned at quote stage",
      "Milestone communication from production to dispatch",
    ],
    externalUrl: "https://stones.harobalventures.com",
  },
  {
    slug: "foods",
    title: "Foods and Agriculture",
    overview:
      "Our foods domain supports buyers in India and abroad seeking export-ready and distribution-ready Indian produce and processed food categories with compliance discipline, traceability, and dependable shipment coordination.",
    marketTrend:
      "Global buyers are demanding cleaner sourcing data, consistent residue and documentation standards, and resilient supply programs that can serve both retail and wholesale channels.",
    materials: [
      "Fresh fruits and vegetables based on seasonal calendars",
      "Spices, herbs, and value-added agricultural ingredients",
      "Rice and grain categories for wholesale and institutional channels",
      "Processed food options under buyer-specific requirements",
    ],
    qualityFramework: [
      "Supplier and facility screening before sourcing engagement",
      "Product-grade and packaging checks by category",
      "Documentation readiness aligned to importing country norms",
      "Cold-chain and handling alignment for time-sensitive shipments",
    ],
    buyerProfiles: [
      "Food importers and wholesale distributors",
      "Retail sourcing teams and private label buyers",
      "Institutional and HORECA procurement channels",
    ],
    logisticsNotes: [
      "Seasonality-linked planning to reduce procurement volatility",
      "Shipment windows aligned with product shelf-life and route risk",
      "Communication checkpoints from packhouse to loading",
    ],
    externalUrl: "https://foods.harobalventures.com",
  },
];
