export type AppRouteKey =
  | "HOME"
  | "ABOUT"
  | "DIVISIONS"
  | "SOURCING"
  | "PROCESS"
  | "MARKETS"
  | "INSIGHTS"
  | "CONTACT"
  | "PRIVACY_POLICY"
  | "TERMS"
  | "SITEMAP";

export type AppRouteItem = {
  key: AppRouteKey;
  href: string;
  label: string;
  includeInMainNav?: boolean;
  includeInFooter?: boolean;
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};
