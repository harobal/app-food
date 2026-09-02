export type LegacyFieldDisposition = "direct" | "normalize" | "split" | "derive" | "review" | "retire";

export type LegacyFieldMapping = {
  legacyField: string;
  target: string;
  disposition: LegacyFieldDisposition;
  note: string;
};

export const legacyFieldMappings: readonly LegacyFieldMapping[] = [
  { legacyField: "id", target: "legacyIds[] and canonical id", disposition: "normalize", note: "Retain every legacy ID; canonical identity is assigned during reconciliation." },
  { legacyField: "slug", target: "slug or redirect alias", disposition: "review", note: "No existing route is removed silently." },
  { legacyField: "category", target: "taxonomy.categoryKey", disposition: "normalize", note: "Map display labels to stable category keys." },
  { legacyField: "sub_category", target: "taxonomy.subcategoryKey", disposition: "normalize", note: "Review inconsistent or marketing-led subcategories." },
  { legacyField: "product_name", target: "displayName and taxonomy.familyKey", disposition: "split", note: "Separate family identity from variety, process, and grade embedded in names." },
  { legacyField: "variant", target: "taxonomy.varietyKey or processingMethod", disposition: "review", note: "Legacy variant is ambiguous and cannot be copied mechanically." },
  { legacyField: "form", target: "form", disposition: "normalize", note: "Use a controlled form vocabulary." },
  { legacyField: "grade", target: "commercialGrade", disposition: "review", note: "Validate that the grade is authentic for the product family." },
  { legacyField: "origin_country", target: "originCountry", disposition: "direct", note: "Preserve after normalization." },
  { legacyField: "origin_state", target: "originRegions[]", disposition: "split", note: "Support multiple origins and origin specificity." },
  { legacyField: "seasonality", target: "seasonality", disposition: "review", note: "Retain as draft until crop calendar evidence is attached." },
  { legacyField: "processing", target: "processingMethod", disposition: "normalize", note: "Map to product-specific controlled processing methods." },
  { legacyField: "key_quality_parameters", target: "measurements[]", disposition: "split", note: "Parse only into draft measurements; values require unit and source review." },
  { legacyField: "key_safety_tests", target: "marketRequirements[] and test scope", disposition: "split", note: "Separate offered test scope from destination requirements." },
  { legacyField: "certifications_available", target: "certifications[]", disposition: "review", note: "Availability is not equivalent to a current certificate." },
  { legacyField: "hs_code_hint", target: "trade classification reference", disposition: "review", note: "Keep explicitly non-authoritative until classification is verified." },
  { legacyField: "packaging", target: "packaging programs", disposition: "split", note: "Move to a separate packaging program model in Phase 2." },
  { legacyField: "shelf_life_months", target: "storage program claim", disposition: "review", note: "Fresh-product values are sensitive and require specialist evidence." },
  { legacyField: "typical_moq", target: "commercial program", disposition: "review", note: "Treat as commercial configuration, not product identity." },
  { legacyField: "typical_lead_time_days", target: "commercial program", disposition: "review", note: "Treat as operational and time-sensitive." },
  { legacyField: "incoterms_supported", target: "commercial program", disposition: "normalize", note: "Validate against the currently adopted Incoterms edition." },
  { legacyField: "use_cases", target: "application tags", disposition: "split", note: "Normalize into controlled application tags." },
  { legacyField: "notes", target: "editorial knowledge", disposition: "retire", note: "Repeated template notes are not migrated as product facts." },
] as const;

