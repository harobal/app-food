import type { NavigationItem } from "@/types/site";

export type FoodsNavItem =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "dropdown";
      label: string;
      items: NavigationItem[];
    };

function buildCategoryHref(category: string) {
  const qs = new URLSearchParams({ category });
  return `/catalog?${qs.toString()}`;
}

export const foodsCategoriesNav: Array<{ label: string; category: string }> = [
  { label: "Spices & Herbs", category: "Spices & Herbs" },
  { label: "Dehydrated & Processed", category: "Dehydrated & Processed" },
  { label: "Cereals & Grains", category: "Cereals & Grains" },
  { label: "Pulses & Lentils", category: "Pulses & Lentils" },
  { label: "Oilseeds & Oils", category: "Oilseeds & Oils" },
  { label: "Nuts & Dry Fruits", category: "Nuts & Dry Fruits" },
  { label: "Fresh Fruits", category: "Fresh Fruits" },
  { label: "Fresh Vegetables", category: "Fresh Vegetables" },
  { label: "Sweeteners", category: "Sweeteners" },
  { label: "Tea", category: "Tea" },
  { label: "Coffee", category: "Coffee" },
];

export const foodsNav: FoodsNavItem[] = [
  {
    type: "dropdown",
    label: "Catalogue",
    items: [
      { label: "All products", href: "/catalog" },
      ...foodsCategoriesNav.map((item) => ({
        label: item.label,
        href: buildCategoryHref(item.category),
      })),
    ],
  },
  { type: "link", label: "Knowledge", href: "/knowledge" },
  { type: "link", label: "Quality", href: "/quality" },
  { type: "link", label: "Logistics", href: "/logistics" },
  { type: "link", label: "Services", href: "/services" },
  { type: "link", label: "Downloads", href: "/downloads" },
  { type: "link", label: "Suppliers", href: "/suppliers" },
  { type: "link", label: "Contact", href: "/contact" },
];
