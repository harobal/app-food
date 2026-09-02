import type { FoodsCatalogRecord } from "./types.ts";

export type ReconciliationDisposition = "retain" | "merge" | "review" | "retire";

export type ReconciliationFlag =
  | "broad-hs-code"
  | "generic-commercial-grade"
  | "generic-product-copy"
  | "certification-availability-ambiguous"
  | "fresh-shelf-life-review"
  | "honey-policy-exception"
  | "identity-review";

export type LegacyRecordDecision = {
  legacyId: string;
  legacySlug: string;
  disposition: ReconciliationDisposition;
  canonicalFamilyKey: string;
  proposedVariantKey: string;
  routeAction: "preserve";
  flags: ReconciliationFlag[];
};

export type CanonicalVariantProposal = {
  key: string;
  form: string;
  grade: string;
  originState: string;
  processing: string;
  legacyIds: string[];
  legacySlugs: string[];
  reviewRequired: boolean;
  flags: ReconciliationFlag[];
};

export type CanonicalFamilyProposal = {
  key: string;
  category: string;
  subCategory: string;
  productName: string;
  varietyOrTradeVariant?: string;
  dietaryPolicy: "plant-based" | "honey-exception";
  legacyIds: string[];
  legacySlugs: string[];
  variants: CanonicalVariantProposal[];
  reviewRequired: boolean;
};

export type CatalogueReconciliation = {
  schemaVersion: 2;
  generatedFrom: "catalogue.v1.json";
  policy: "plant-based-with-honey-exception";
  sourceRecordCount: number;
  familyCount: number;
  proposedVariantCount: number;
  families: CanonicalFamilyProposal[];
  decisions: LegacyRecordDecision[];
  summary: Record<ReconciliationDisposition, number>;
};

export type LegacyCatalogueInput = Pick<
  FoodsCatalogRecord,
  | "id"
  | "slug"
  | "category"
  | "sub_category"
  | "product_name"
  | "variant"
  | "form"
  | "grade"
  | "hs_code_hint"
  | "origin_state"
  | "processing"
  | "shelf_life_months"
  | "certifications_available"
  | "notes"
>;

