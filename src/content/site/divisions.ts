import { APP_ROUTES, EXTERNAL_ROUTES } from "@/config/navigation";
import type { Division } from "@/types/site";

export const divisions: Division[] = [
  {
    id: "stones",
    name: "Natural Stone Products",
    subtitle: "Granite · Marble · Sandstone · Slate",
    blurb:
      "Architectural and project-grade natural stone sourced from verified Indian clusters for importers, contractors, and distributors.",
    image:
      "https://images.unsplash.com/photo-1603816245457-fe9c80b74088?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: ["Project-grade supply", "Cut-to-size programs", "Container optimization"],
    colorVar: "var(--stone)",
    status: "active",
    href: EXTERNAL_ROUTES.STONES_DIVISION,
    ctaLabel: "Explore Stone Division",
    detailSlug: "stones",
  },
  {
    id: "foods",
    name: "Foods & Agriculture",
    subtitle: "Fruits · Vegetables · Spices · Grains",
    blurb:
      "Export-ready agri and food supply with traceability, cold-chain coordination, and compliance-first shipment handling.",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615485737651-1f4f2f4b70ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: ["Fresh and processed", "Traceability-focused sourcing", "Export-ready packaging"],
    colorVar: "var(--food)",
    status: "active",
    href: EXTERNAL_ROUTES.FOODS_DIVISION,
    ctaLabel: "Explore Food Division",
    detailSlug: "foods",
  },
  {
    id: "custom",
    name: "Custom Sourcing",
    subtitle: "Any Product Category from India",
    blurb:
      "If your category is not listed, our sourcing desk can identify vetted suppliers and structure a compliant export route.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: ["Any category", "Rapid supplier discovery", "Structured quote support"],
    colorVar: "var(--accent)",
    status: "custom",
    href: APP_ROUTES.CONTACT,
    ctaLabel: "Submit Requirement",
  },
];
