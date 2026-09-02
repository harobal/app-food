import type { AppRouteItem, AppRouteKey, BreadcrumbItem } from "@/types/routes";

// ─────────────────────────────────────────────────────────
// CORPORATE ROUTES
// ─────────────────────────────────────────────────────────

export const APP_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  DIVISIONS: "/domains",
  SOURCING: "/sourcing",
  PROCESS: "/process",
  MARKETS: "/markets",
  INSIGHTS: "/insights",
  CONTACT: "/contact",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS: "/terms",
  SITEMAP: "/sitemap",
} as const;

export const EXTERNAL_ROUTES = {
  STONES_DIVISION: "https://stones.harobal.com",
  FOODS_DIVISION: "https://foods.harobal.com",
} as const;

export const APP_ROUTE_ITEMS: AppRouteItem[] = [
  { key: "HOME", href: APP_ROUTES.HOME, label: "Home", includeInMainNav: true, includeInFooter: false },
  { key: "ABOUT", href: APP_ROUTES.ABOUT, label: "About", includeInMainNav: true, includeInFooter: true },
  {
    key: "DIVISIONS",
    href: APP_ROUTES.DIVISIONS,
    label: "Domains",
    includeInMainNav: true,
    includeInFooter: false,
  },
  {
    key: "SOURCING",
    href: APP_ROUTES.SOURCING,
    label: "Sourcing",
    includeInMainNav: true,
    includeInFooter: true,
  },
  { key: "PROCESS", href: APP_ROUTES.PROCESS, label: "Process", includeInMainNav: true, includeInFooter: true },
  { key: "MARKETS", href: APP_ROUTES.MARKETS, label: "Markets", includeInMainNav: true, includeInFooter: true },
  {
    key: "INSIGHTS",
    href: APP_ROUTES.INSIGHTS,
    label: "Insights",
    includeInMainNav: true,
    includeInFooter: false,
  },
  { key: "CONTACT", href: APP_ROUTES.CONTACT, label: "Contact", includeInMainNav: true, includeInFooter: true },
  {
    key: "PRIVACY_POLICY",
    href: APP_ROUTES.PRIVACY_POLICY,
    label: "Privacy Policy",
    includeInMainNav: false,
    includeInFooter: true,
  },
  { key: "TERMS", href: APP_ROUTES.TERMS, label: "Terms", includeInMainNav: false, includeInFooter: false },
  { key: "SITEMAP", href: APP_ROUTES.SITEMAP, label: "Sitemap", includeInMainNav: false, includeInFooter: false },
];

export const MAIN_NAV_ROUTE_KEYS: AppRouteKey[] = [
  "ABOUT",
  "DIVISIONS",
  "SOURCING",
  "MARKETS",
  "CONTACT",
];

export const FOOTER_ROUTE_KEYS: AppRouteKey[] = [
  "ABOUT",
  "SOURCING",
  "PROCESS",
  "MARKETS",
  "CONTACT",
  "PRIVACY_POLICY",
];

const routeLookup = new Map(APP_ROUTE_ITEMS.map((item) => [item.href, item]));

function titleCaseSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function getRouteItemByKey(key: AppRouteKey): AppRouteItem {
  const item = APP_ROUTE_ITEMS.find((route) => route.key === key);
  if (!item) {
    throw new Error(`Unknown route key: ${key}`);
  }
  return item;
}

export function getMainNavRouteItems(): AppRouteItem[] {
  return MAIN_NAV_ROUTE_KEYS.map(getRouteItemByKey);
}

export function getFooterRouteItems(): AppRouteItem[] {
  return FOOTER_ROUTE_KEYS.map(getRouteItemByKey);
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === "/") {
    return [{ label: "Home", href: APP_ROUTES.HOME }];
  }

  const parts = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: APP_ROUTES.HOME }];
  let currentPath = "";

  for (const part of parts) {
    currentPath += `/${part}`;
    const routeItem = routeLookup.get(currentPath);
    breadcrumbs.push({
      label: routeItem?.label ?? titleCaseSegment(part),
      href: currentPath,
    });
  }

  return breadcrumbs;
}
