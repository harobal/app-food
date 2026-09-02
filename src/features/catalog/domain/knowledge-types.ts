export type EvidenceLevel =
  | "official-regulation"
  | "official-standard"
  | "accredited-test"
  | "supplier-document"
  | "trade-reference"
  | "internal-research"
  | "unverified";

export type ClaimStatus =
  | "reference"
  | "typical"
  | "contract-target"
  | "supplier-declared"
  | "batch-verified";

export type ReviewStatus = "draft" | "reviewed" | "approved" | "expired";

export type AvailabilityStatus =
  | "not-assessed"
  | "available-on-request"
  | "partner-dependent"
  | "verified-current-program"
  | "not-available";

export type ParameterValueType =
  | "number"
  | "range"
  | "text"
  | "boolean"
  | "enum";

export type MeasurementQualifier =
  | "exact"
  | "minimum"
  | "maximum"
  | "target"
  | "approximate"
  | "typical-range";

export type KnowledgeSource = {
  id: string;
  title: string;
  authority: string;
  url?: string;
  documentReference?: string;
  publishedOn?: string;
  effectiveOn?: string;
  accessedOn: string;
  evidenceLevel: EvidenceLevel;
  notes?: string;
};

export type ClaimGovernance = {
  claimStatus: ClaimStatus;
  reviewStatus: ReviewStatus;
  sourceIds: string[];
  reviewedOn?: string;
  reviewDueOn?: string;
  reviewedBy?: string;
  marketCodes?: string[];
  caveat?: string;
};

export type ProductMeasurement = ClaimGovernance & {
  parameterKey: string;
  valueType: ParameterValueType;
  value?: string | number | boolean;
  minimum?: number;
  maximum?: number;
  unit?: string;
  qualifier: MeasurementQualifier;
  testMethod?: string;
};

export type ProductTaxonomy = {
  categoryKey: string;
  subcategoryKey: string;
  familyKey: string;
  varietyKey?: string;
};

export type CertificationClaim = ClaimGovernance & {
  certificationKey: string;
  availability: AvailabilityStatus;
  certificateNumber?: string;
  validUntil?: string;
  scope?: string;
};

export type MarketRequirement = ClaimGovernance & {
  marketCode: string;
  requirementKey: string;
  mandatory: boolean;
  appliesWhen?: string;
  summary: string;
};

export type CanonicalCatalogueProduct = {
  schemaVersion: 2;
  id: string;
  slug: string;
  displayName: string;
  scientificName?: string;
  taxonomy: ProductTaxonomy;
  form: string;
  processingMethod?: string;
  commercialGrade?: string;
  originCountry: string;
  originRegions: string[];
  dietarySuitability: {
    vegan: boolean;
    animalDerivedIngredients: boolean;
    policyException?: "honey";
  };
  seasonality?: string;
  measurements: ProductMeasurement[];
  certifications: CertificationClaim[];
  marketRequirements: MarketRequirement[];
  sourceIds: string[];
  reviewStatus: ReviewStatus;
  reviewedOn?: string;
  reviewDueOn?: string;
  legacyIds: string[];
  publishable: boolean;
};

export type ParameterDefinition = {
  key: string;
  label: string;
  description: string;
  valueType: ParameterValueType;
  allowedUnits: string[];
  appliesTo: string[];
  comparisonPriority: number;
  buyerFacing: boolean;
  requiresSource: boolean;
};
