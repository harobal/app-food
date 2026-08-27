import type {
  FoodsCatalogFamily,
  FoodsCatalogFilters,
  FoodsCatalogListItem,
  FoodsCatalogSort,
  FoodsCatalogVariant,
} from "../domain/types.ts";
import { getFamilyMedia } from "../data/media.ts";

const splitParam = (value: string | null) =>
  value
    ? Array.from(new Set(value.split(",").map((part) => part.trim()).filter(Boolean)))
    : [];

export function parseCatalogFilters(params: URLSearchParams): FoodsCatalogFilters {
  const requestedSort = params.get("sort");
  const requestedPage = Number.parseInt(params.get("page") ?? "1", 10);
  return {
    query: (params.get("q") ?? "").trim(),
    categories: splitParam(params.get("category")),
    forms: splitParam(params.get("form")),
    origins: splitParam(params.get("origin")),
    certifications: splitParam(params.get("cert")),
    sort: requestedSort === "title-asc" ? "title-asc" : "featured",
    page: Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  };
}

export function serializeCatalogFilters(filters: FoodsCatalogFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.categories.length) params.set("category", filters.categories.join(","));
  if (filters.forms.length) params.set("form", filters.forms.join(","));
  if (filters.origins.length) params.set("origin", filters.origins.join(","));
  if (filters.certifications.length) params.set("cert", filters.certifications.join(","));
  if (filters.sort !== "featured") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  return params;
}

export function sanitizeCatalogFilters(filters: FoodsCatalogFilters, options: { categories: string[]; forms: string[]; origins: string[]; certifications: string[] }): FoodsCatalogFilters {
  const allowed = (values: string[], supported: string[]) => values.filter((value) => supported.includes(value));
  return {
    ...filters,
    query: filters.query.slice(0, 120),
    categories: allowed(filters.categories, options.categories),
    forms: allowed(filters.forms, options.forms),
    origins: allowed(filters.origins, options.origins),
    certifications: allowed(filters.certifications, options.certifications),
  };
}

function intersects(values: string[], selected: string[]) {
  return !selected.length || values.some((value) => selected.includes(value));
}

export function filterCatalogVariants(
  products: FoodsCatalogListItem[],
  filters: FoodsCatalogFilters,
) {
  const query = filters.query.toLocaleLowerCase();
  const filtered = products.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (filters.forms.length && !filters.forms.includes(product.form)) return false;
    if (filters.origins.length && !filters.origins.includes(product.originState)) return false;
    if (!intersects(product.certificationsAvailable, filters.certifications)) return false;
    if (!query) return true;

    return [
      product.title,
      product.subtitle,
      product.summary,
      product.category,
      product.subCategory,
      product.form,
      product.grade,
      product.originState,
      product.seasonality,
      ...product.certificationsAvailable,
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(query);
  });

  return filters.sort === "title-asc"
    ? [...filtered].sort((a, b) => a.title.localeCompare(b.title) || a.subtitle.localeCompare(b.subtitle))
    : filtered;
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export function groupCatalogFamilies(products: FoodsCatalogListItem[]): FoodsCatalogFamily[] {
  const groups = new Map<string, FoodsCatalogListItem[]>();
  for (const product of products) {
    const key = `${product.category}::${product.subCategory}::${product.title}`;
    const variants = groups.get(key) ?? [];
    variants.push(product);
    groups.set(key, variants);
  }

  return Array.from(groups, ([key, variants]) => {
    const representative = variants[0];
    const compactVariants: FoodsCatalogVariant[] = variants.map((variant) => ({
      id: variant.id,
      slug: variant.slug,
      subtitle: variant.subtitle,
      form: variant.form,
      grade: variant.grade,
      originState: variant.originState,
      seasonality: variant.seasonality,
      certificationsAvailable: variant.certificationsAvailable,
    }));
    return {
      key,
      title: representative.title,
      category: representative.category,
      subCategory: representative.subCategory,
      summary: representative.summary,
      heroImage: getFamilyMedia(representative.category, representative.heroImage),
      variants: compactVariants,
      forms: uniqueSorted(compactVariants.map((variant) => variant.form)),
      grades: uniqueSorted(compactVariants.map((variant) => variant.grade)),
      origins: uniqueSorted(compactVariants.map((variant) => variant.originState)),
      certificationsAvailable: uniqueSorted(
        compactVariants.flatMap((variant) => variant.certificationsAvailable),
      ),
    };
  });
}

export function filterCatalogFamilies(
  families: FoodsCatalogFamily[],
  filters: FoodsCatalogFilters,
) {
  const query = filters.query.toLocaleLowerCase();
  const result: FoodsCatalogFamily[] = [];

  for (const family of families) {
    if (filters.categories.length && !filters.categories.includes(family.category)) continue;
    const familyMatchesQuery =
      !query ||
      [family.title, family.category, family.subCategory, family.summary]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query);

    const variants = family.variants.filter((variant) => {
      if (filters.forms.length && !filters.forms.includes(variant.form)) return false;
      if (filters.origins.length && !filters.origins.includes(variant.originState)) return false;
      if (!intersects(variant.certificationsAvailable, filters.certifications)) return false;
      if (familyMatchesQuery) return true;
      return [
        variant.subtitle,
        variant.form,
        variant.grade,
        variant.originState,
        variant.seasonality,
        ...variant.certificationsAvailable,
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query);
    });
    if (!variants.length) continue;
    result.push({
      ...family,
      variants,
      forms: uniqueSorted(variants.map((variant) => variant.form)),
      grades: uniqueSorted(variants.map((variant) => variant.grade)),
      origins: uniqueSorted(variants.map((variant) => variant.originState)),
      certificationsAvailable: uniqueSorted(
        variants.flatMap((variant) => variant.certificationsAvailable),
      ),
    });
  }

  return filters.sort === "title-asc"
    ? [...result].sort((a, b) => a.title.localeCompare(b.title))
    : result;
}

export function getCatalogOptions(families: FoodsCatalogFamily[]) {
  const variants = families.flatMap((family) => family.variants);
  return {
    categories: uniqueSorted(families.map((family) => family.category)),
    forms: uniqueSorted(variants.map((variant) => variant.form)),
    origins: uniqueSorted(variants.map((variant) => variant.originState)),
    certifications: uniqueSorted(
      variants.flatMap((variant) => variant.certificationsAvailable),
    ),
  };
}

export function isCatalogSort(value: string): value is FoodsCatalogSort {
  return value === "featured" || value === "title-asc";
}
