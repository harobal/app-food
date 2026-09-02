export type FoodsBasePath = "" | "/foods";

function normalizeHost(host: string) {
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export function getFoodsBasePathFromHost(host?: string): FoodsBasePath {
  if (!host) return "/foods";
  const hostname = normalizeHost(host);
  const subdomain = hostname.split(".")[0] ?? "";
  return subdomain === "foods" ? "" : "/foods";
}

export function getFoodsBasePathFromPathname(pathname?: string): FoodsBasePath {
  if (!pathname) return "/foods";
  return pathname === "/foods" || pathname.startsWith("/foods/") ? "/foods" : "";
}

export function buildFoodsHref(base: FoodsBasePath, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return base || "/";
  return `${base}${normalized}`;
}

export const FOODS_ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  QUOTE: "/rfq",
  SERVICES: "/services",
  QUALITY: "/quality",
  LOGISTICS: "/logistics",
  DOWNLOADS: "/downloads",
  SUPPLIERS: "/suppliers",
  CONTACT: "/contact",
} as const;

export type FoodsRouteKey = keyof typeof FOODS_ROUTES;
