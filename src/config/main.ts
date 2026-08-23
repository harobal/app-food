import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Foods vertical site definition — Harobal Foods subdomain.
 */
export const foodsSite = {
  id: "foods" as const,
  displayName: "Harobal Foods",
  hostname: "foods.harobal.com",
  url: siteConfig.foodsSiteUrl,
} as const;

export const foodsMetadata: Metadata = {
  title: {
    default: "Harobal Foods | Indian Agro & Food Commodity Exports",
    template: "%s | Harobal Foods",
  },
  description:
    "Export-ready Indian foods, spices, grains, pulses, and agricultural commodities with strict compliance discipline, quality certifications, and global container logistics.",
};
