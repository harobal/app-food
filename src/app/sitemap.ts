import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getFoodsCatalogListItems } from "@/features/catalog/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.foodsSiteUrl;
  const lastModified = new Date();

  const routes = [
    "",
    "/catalog",
    "/quality",
    "/logistics",
    "/services",
    "/downloads",
    "/suppliers",
    "/contact",
    "/rfq",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/catalog" || route === "/rfq" ? 0.9 : 0.8,
  }));

  const products = getFoodsCatalogListItems().map((product) => ({
    url: `${baseUrl}/catalog/${product.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...products];
}
