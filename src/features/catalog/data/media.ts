export const foundationCategoryMedia: Readonly<Record<string, string>> = {
  "Spices & Herbs": "/media/harvest-meridian/spices-herbs.webp",
  "Cereals & Grains": "/media/harvest-meridian/cereals-grains.webp",
  "Pulses & Lentils": "/media/harvest-meridian/pulses-lentils.webp",
  "Oilseeds & Oils": "/media/harvest-meridian/oilseeds-oils.webp",
  "Nuts & Dry Fruits": "/media/harvest-meridian/nuts-dry-fruits.webp",
  "Fresh Fruits": "/media/harvest-meridian/fresh-fruits.webp",
  "Fresh Vegetables": "/media/harvest-meridian/fresh-vegetables.webp",
  "Dehydrated & Processed": "/media/harvest-meridian/dehydrated-processed.webp",
  Sweeteners: "/media/harvest-meridian/sweeteners.webp",
  Tea: "/media/harvest-meridian/tea.webp",
  Coffee: "/media/harvest-meridian/coffee.webp",
};

export const categoryAccents: Readonly<Record<string, string>> = {
  "Spices & Herbs": "#c99132",
  "Cereals & Grains": "#a8792c",
  "Pulses & Lentils": "#a76545",
  "Oilseeds & Oils": "#8b7434",
  "Nuts & Dry Fruits": "#9a6548",
  "Fresh Fruits": "#bd6d35",
  "Fresh Vegetables": "#4f7d52",
  "Dehydrated & Processed": "#8b6245",
  Sweeteners: "#b77c27",
  Tea: "#55764a",
  Coffee: "#76533b",
};

export function getFamilyMedia(category: string, fallback: string) {
  return foundationCategoryMedia[category] ?? fallback;
}

export function getCategoryAccent(category: string) {
  return categoryAccents[category] ?? "#2e6b55";
}
