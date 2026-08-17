import "server-only";

import type {
  FoodsCatalogListItem,
  FoodsCatalogProduct,
  FoodsCatalogRecord,
  FoodsSpecRow,
} from "@/types/types";

import rawCatalogue from "@/content/catalogue.v1.json";

const CATEGORY_IMAGES: Record<string, string[]> = {
  "Cereals & Grains": [
    "https://images.unsplash.com/photo-1501430654243-cd2b19b07a01?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?auto=format&fit=crop&w=2000&q=80",
  ],
  "Pulses & Lentils": [
    "https://images.unsplash.com/photo-1615486363971-4f8a8f2ad0d1?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1604335399105-0f9a719e176b?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1609008211169-7cf6fa8b784a?auto=format&fit=crop&w=2000&q=80",
  ],
  "Spices & Herbs": [
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1546707012-0eb1a2b4e586?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1615485737651-1f4f2f4b70ef?auto=format&fit=crop&w=2000&q=80",
  ],
  "Oilseeds & Oils": [
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=2000&q=80",
  ],
  "Nuts & Dry Fruits": [
    "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1528826194825-35a1a3a739ae?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=2000&q=80",
  ],
  "Fresh Fruits": [
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=80",
  ],
  "Fresh Vegetables": [
    "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1603048297172-c92544798d1a?auto=format&fit=crop&w=2000&q=80",
  ],
  "Dehydrated & Processed": [
    "https://images.unsplash.com/photo-1585238342029-4f7a44d35f7f?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1583228858294-6745cb25969a?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1621939514649-280e2a3ce267?auto=format&fit=crop&w=2000&q=80",
  ],
  Sweeteners: [
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1605979399890-5d9dd8b10b3b?auto=format&fit=crop&w=2000&q=80",
  ],
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=2000&q=80",
];

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickImages(category: string, slug: string) {
  const list = CATEGORY_IMAGES[category] ?? FALLBACK_IMAGES;
  const idx = hashString(slug) % list.length;
  return {
    heroImage: list[idx],
    gallery: [list[(idx + 1) % list.length], list[(idx + 2) % list.length]],
  };
}

function splitSemi(value: string) {
  return value
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function recordToProduct(record: FoodsCatalogRecord): FoodsCatalogProduct {
  const titleBase = record.variant ? `${record.product_name} — ${record.variant}` : record.product_name;

  const images = pickImages(record.category, record.slug);

  const certifications = splitSemi(record.certifications_available);
  const incoterms = record.incoterms_supported
    ? record.incoterms_supported
        .split(";")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const subtitleParts = [record.form, record.grade, record.origin_state ? `${record.origin_state}, ${record.origin_country}` : record.origin_country].filter(Boolean);

  const summary =
    record.category === "Fresh Fruits" || record.category === "Fresh Vegetables"
      ? "Time-sensitive export programs with program-ready grading, packing discipline, and destination-aligned documentation support."
      : "Export-ready programs built around buyer-aligned grades, batch-level QC options, and documentation discipline.";

  const description = safeString(record.notes) ||
    "Share destination market, incoterms, packaging preference, and required thresholds so we can align grade, testing, and documentation for an executable quote.";

  const specs: FoodsSpecRow[] = [
    { label: "Category", value: record.category },
    { label: "Sub-category", value: record.sub_category },
    { label: "Form", value: record.form },
    { label: "Grade", value: record.grade },
    ...(record.hs_code_hint ? [{ label: "HS code (hint)", value: record.hs_code_hint } satisfies FoodsSpecRow] : []),
    { label: "Origin", value: `${record.origin_state}, ${record.origin_country}` },
    { label: "Seasonality", value: record.seasonality },
    { label: "Processing", value: record.processing },
    { label: "Packaging", value: record.packaging },
    { label: "Shelf-life", value: `${record.shelf_life_months} months (typical)` },
    { label: "Storage", value: record.storage_conditions },
    { label: "Incoterms", value: incoterms.join(", ") || record.incoterms_supported },
    { label: "MOQ", value: record.typical_moq },
    { label: "Lead time", value: `${record.typical_lead_time_days} days (typical)` },
  ];

  return {
    id: record.id,
    slug: record.slug,
    title: titleBase,
    subtitle: subtitleParts.join(" • "),
    summary,
    description,
    heroImage: images.heroImage,
    gallery: images.gallery,
    category: record.category,
    subCategory: record.sub_category,
    form: record.form,
    grade: record.grade,
    variant: record.variant || undefined,
    originCountry: record.origin_country,
    originState: record.origin_state,
    seasonality: record.seasonality,
    processing: record.processing,
    packaging: record.packaging,
    shelfLifeMonths: record.shelf_life_months,
    storageConditions: record.storage_conditions,
    incotermsSupported: incoterms,
    qualityParameters: record.key_quality_parameters,
    safetyTests: record.key_safety_tests,
    certificationsAvailable: certifications,
    moq: record.typical_moq,
    leadTimeDays: record.typical_lead_time_days,
    useCases: splitSemi(record.use_cases),
    hsCodeHint: record.hs_code_hint || undefined,
    specs,
  };
}

function normalizeRecord(raw: unknown): FoodsCatalogRecord {
  const obj = (raw ?? {}) as Record<string, unknown>;
  return {
    id: safeString(obj.id),
    slug: safeString(obj.slug),
    category: safeString(obj.category),
    sub_category: safeString(obj.sub_category),
    product_name: safeString(obj.product_name),
    variant: safeString(obj.variant),
    form: safeString(obj.form),
    grade: safeString(obj.grade),
    hs_code_hint: safeString(obj.hs_code_hint),
    origin_country: safeString(obj.origin_country),
    origin_state: safeString(obj.origin_state),
    seasonality: safeString(obj.seasonality),
    processing: safeString(obj.processing),
    packaging: safeString(obj.packaging),
    shelf_life_months: safeNumber(obj.shelf_life_months),
    storage_conditions: safeString(obj.storage_conditions),
    incoterms_supported: safeString(obj.incoterms_supported),
    key_quality_parameters: safeString(obj.key_quality_parameters),
    key_safety_tests: safeString(obj.key_safety_tests),
    certifications_available: safeString(obj.certifications_available),
    typical_moq: safeString(obj.typical_moq),
    typical_lead_time_days: safeNumber(obj.typical_lead_time_days),
    use_cases: safeString(obj.use_cases),
    notes: safeString(obj.notes),
  };
}

let cachedFull: FoodsCatalogProduct[] | null = null;
let cachedList: FoodsCatalogListItem[] | null = null;
let cachedBySlug: Map<string, FoodsCatalogProduct> | null = null;

export function getFoodsCatalog(): FoodsCatalogProduct[] {
  if (cachedFull) return cachedFull;

  const records = (rawCatalogue as unknown[]).map(normalizeRecord);
  const full = records
    .filter((r) => r.slug && r.id)
    .map(recordToProduct);

  cachedFull = full;
  cachedBySlug = new Map(full.map((p) => [p.slug, p] as const));
  return full;
}

export function getFoodsCatalogListItems(): FoodsCatalogListItem[] {
  if (cachedList) return cachedList;

  const list: FoodsCatalogListItem[] = getFoodsCatalog().map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.summary,
    heroImage: p.heroImage,
    category: p.category,
    subCategory: p.subCategory,
    form: p.form,
    grade: p.grade,
    originState: p.originState,
    seasonality: p.seasonality,
    certificationsAvailable: p.certificationsAvailable,
  }));

  cachedList = list;
  return list;
}

export function getFoodsProductBySlug(slug: string): FoodsCatalogProduct | undefined {
  if (!slug) return undefined;
  if (!cachedBySlug) {
    getFoodsCatalog();
  }
  return cachedBySlug?.get(slug);
}

export function getFoodsCatalogCategories() {
  const categories = new Set<string>();
  const subCategoriesByCategory = new Map<string, Set<string>>();

  for (const p of getFoodsCatalog()) {
    categories.add(p.category);
    const set = subCategoriesByCategory.get(p.category) ?? new Set<string>();
    set.add(p.subCategory);
    subCategoriesByCategory.set(p.category, set);
  }

  return {
    categories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
    subCategoriesByCategory: new Map(
      Array.from(subCategoriesByCategory.entries()).map(([k, v]) => [k, Array.from(v).sort((a, b) => a.localeCompare(b))] as const),
    ),
  };
}
