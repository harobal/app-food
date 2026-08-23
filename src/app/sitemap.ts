import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

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

  return routes;
}
