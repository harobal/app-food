import type {
  CatalogueValidationIssue,
  CatalogueValidationResult,
  FoodsCatalogRecord,
} from "../domain/types.ts";

const stringFields = [
  "id",
  "slug",
  "category",
  "sub_category",
  "product_name",
  "variant",
  "form",
  "grade",
  "hs_code_hint",
  "origin_country",
  "origin_state",
  "seasonality",
  "processing",
  "packaging",
  "storage_conditions",
  "incoterms_supported",
  "key_quality_parameters",
  "key_safety_tests",
  "certifications_available",
  "typical_moq",
  "use_cases",
  "notes",
] as const satisfies readonly (keyof FoodsCatalogRecord)[];

const requiredStrings = stringFields.filter(
  (field) => field !== "variant" && field !== "hs_code_hint",
);

function normalizedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function finiteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function validateCatalogue(input: unknown): CatalogueValidationResult {
  if (!Array.isArray(input)) {
    return {
      records: [],
      issues: [{ index: -1, field: "record", message: "Catalogue root must be an array." }],
    };
  }

  const records: FoodsCatalogRecord[] = [];
  const issues: CatalogueValidationIssue[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  input.forEach((value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      issues.push({ index, field: "record", message: "Record must be an object." });
      return;
    }

    const raw = value as Record<string, unknown>;
    const record = Object.fromEntries(
      stringFields.map((field) => [field, normalizedString(raw[field])]),
    ) as unknown as FoodsCatalogRecord;

    record.shelf_life_months = finiteNumber(raw.shelf_life_months);
    record.typical_lead_time_days = finiteNumber(raw.typical_lead_time_days);

    for (const field of requiredStrings) {
      if (!record[field]) issues.push({ index, field, message: "Required value is missing." });
    }

    if (!record.shelf_life_months) {
      issues.push({ index, field: "shelf_life_months", message: "Must be a positive number." });
    }
    if (!record.typical_lead_time_days) {
      issues.push({ index, field: "typical_lead_time_days", message: "Must be a positive number." });
    }
    if (record.slug && !/^(?:[a-z0-9]+-?)+$/.test(record.slug)) {
      issues.push({ index, field: "slug", message: "Slug is not route-safe." });
    }
    if (record.id && ids.has(record.id)) {
      issues.push({ index, field: "id", message: "Duplicate ID." });
    }
    if (record.slug && slugs.has(record.slug)) {
      issues.push({ index, field: "slug", message: "Duplicate slug." });
    }

    ids.add(record.id);
    slugs.add(record.slug);
    records.push(record);
  });

  return { records, issues };
}

export function assertValidCatalogue(input: unknown) {
  const result = validateCatalogue(input);
  if (result.issues.length) {
    const summary = result.issues
      .slice(0, 8)
      .map((issue) => `record ${issue.index}, ${issue.field}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid foods catalogue (${result.issues.length} issues): ${summary}`);
  }
  return result.records;
}
