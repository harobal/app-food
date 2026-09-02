import type {
  CanonicalFamilyProposal,
  CanonicalVariantProposal,
  CatalogueReconciliation,
  LegacyCatalogueInput,
  LegacyRecordDecision,
  ReconciliationFlag,
} from "../domain/reconciliation-types.ts";

const genericGrades = new Set([
  "Export Standard",
  "Premium",
  "Food Grade",
  "Industrial",
  "Industrial Ingredient",
  "Retail Program",
  "Organic Program (where available)",
  "Steam Sterilized Program",
  "Aflatoxin-Control Program",
  "Microbiology-Control Program",
  "Statutory Class and Specification Required",
  "FSSAI Identity and Specification Required",
  "Cultivar and Export Program — Evidence Required",
  "Cultivar and Table-Use Program — Evidence Required",
  "Cultivar and Processing-Use Program — Evidence Required",
  "Identity, Process and Lot Evidence Required",
  "Formula, Vegan and Lot Evidence Required",
  "Identity, Preservation and Lot Evidence Required",
  "Identity, Allergen and Lot Evidence Required",
  "Food-use Identity and Lot Approval Required",
  "Botanical Food-use and Lot Evidence Required",
]);

function stableKey(...values: string[]) {
  return values
    .filter(Boolean)
    .join("-")
    .normalize("NFKD")
    .toLocaleLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function familyKey(record: LegacyCatalogueInput) {
  return stableKey(record.category, record.sub_category, record.product_name, record.variant);
}

function variantKey(record: LegacyCatalogueInput) {
  return stableKey(record.form, record.grade, record.origin_state, record.processing);
}

function flagsFor(record: LegacyCatalogueInput): ReconciliationFlag[] {
  const flags = new Set<ReconciliationFlag>();
  if (!record.hs_code_hint || record.hs_code_hint.replace(/\D/g, "").length < 4) flags.add("broad-hs-code");
  if (genericGrades.has(record.grade)) flags.add("generic-commercial-grade");
  if (/Programs and parameters are aligned during RFQ|Industrial programs require destination-aligned specs/i.test(record.notes)) flags.add("generic-product-copy");
  if (/available|dependent|where required|where available/i.test(record.certifications_available)) flags.add("certification-availability-ambiguous");
  if ((record.category === "Fresh Fruits" || record.category === "Fresh Vegetables") && record.shelf_life_months >= 1) flags.add("fresh-shelf-life-review");
  if (/\bhoney\b/i.test(record.product_name)) flags.add("honey-policy-exception");
  if (!record.product_name.trim() || record.product_name === record.category) flags.add("identity-review");
  return [...flags].sort();
}

export function reconcileCatalogue(records: readonly LegacyCatalogueInput[]): CatalogueReconciliation {
  const groups = new Map<string, LegacyCatalogueInput[]>();
  for (const record of records) {
    const key = familyKey(record);
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }

  const decisions: LegacyRecordDecision[] = [];
  const families: CanonicalFamilyProposal[] = [];

  for (const [key, familyRecords] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const first = familyRecords[0];
    const variantsByKey = new Map<string, LegacyCatalogueInput[]>();
    for (const record of familyRecords) {
      const keyForVariant = variantKey(record);
      const group = variantsByKey.get(keyForVariant) ?? [];
      group.push(record);
      variantsByKey.set(keyForVariant, group);
    }

    const variants: CanonicalVariantProposal[] = [...variantsByKey.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([keyForVariant, variantRecords]) => {
        const representative = variantRecords[0];
        const flags = [...new Set(variantRecords.flatMap(flagsFor))].sort();
        return {
          key: keyForVariant,
          form: representative.form,
          grade: representative.grade,
          originState: representative.origin_state,
          processing: representative.processing,
          legacyIds: variantRecords.map((record) => record.id).sort(),
          legacySlugs: variantRecords.map((record) => record.slug).sort(),
          reviewRequired: flags.length > 0,
          flags,
        };
      });

    for (const record of familyRecords) {
      const flags = flagsFor(record);
      decisions.push({
        legacyId: record.id,
        legacySlug: record.slug,
        disposition: flags.includes("identity-review") ? "review" : familyRecords.length > 1 ? "merge" : "retain",
        canonicalFamilyKey: key,
        proposedVariantKey: variantKey(record),
        routeAction: "preserve",
        flags,
      });
    }

    families.push({
      key,
      category: first.category,
      subCategory: first.sub_category,
      productName: first.product_name,
      varietyOrTradeVariant: first.variant || undefined,
      dietaryPolicy: /\bhoney\b/i.test(first.product_name) ? "honey-exception" : "plant-based",
      legacyIds: familyRecords.map((record) => record.id).sort(),
      legacySlugs: familyRecords.map((record) => record.slug).sort(),
      variants,
      reviewRequired: variants.some((variant) => variant.reviewRequired),
    });
  }

  decisions.sort((a, b) => a.legacyId.localeCompare(b.legacyId));
  const summary = { retain: 0, merge: 0, review: 0, retire: 0 };
  for (const decision of decisions) summary[decision.disposition] += 1;

  return {
    schemaVersion: 2,
    generatedFrom: "catalogue.v1.json",
    policy: "plant-based-with-honey-exception",
    sourceRecordCount: records.length,
    familyCount: families.length,
    proposedVariantCount: families.reduce((count, family) => count + family.variants.length, 0),
    families,
    decisions,
    summary,
  };
}
