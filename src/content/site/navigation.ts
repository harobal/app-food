import { getMainNavRouteItems } from "@/config/navigation";
import type { NavigationItem } from "@/types/site";

export const navItems: NavigationItem[] = getMainNavRouteItems().map((item) => ({
  label: item.label,
  href: item.href,
}));
