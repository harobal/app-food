export type FoodsCatalogRecord = {
  id: string;
  slug: string;
  category: string;
  sub_category: string;
  product_name: string;
  variant: string;
  form: string;
  grade: string;
  hs_code_hint: string;
  origin_country: string;
  origin_state: string;
  seasonality: string;
  processing: string;
  packaging: string;
  shelf_life_months: number;
  storage_conditions: string;
  incoterms_supported: string;
  key_quality_parameters: string;
  key_safety_tests: string;
  certifications_available: string;
  typical_moq: string;
  typical_lead_time_days: number;
  use_cases: string;
  notes: string;
};

export type FoodsSpecRow = {
  label: string;
  value: string;
};

export type FoodsCatalogProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  heroImage: string;
  gallery: string[];

  category: string;
  subCategory: string;
  form: string;
  grade: string;
  variant?: string;

  originCountry: string;
  originState: string;
  seasonality: string;
  processing: string;
  packaging: string;
  shelfLifeMonths: number;
  storageConditions: string;
  incotermsSupported: string[];

  qualityParameters: string;
  safetyTests: string;
  certificationsAvailable: string[];

  moq: string;
  leadTimeDays: number;
  useCases: string[];

  hsCodeHint?: string;
  specs: FoodsSpecRow[];
};

export type FoodsCatalogListItem = Pick<
  FoodsCatalogProduct,
  | "id"
  | "slug"
  | "title"
  | "subtitle"
  | "summary"
  | "heroImage"
  | "category"
  | "subCategory"
  | "form"
  | "grade"
  | "originState"
  | "seasonality"
  | "certificationsAvailable"
>;

export type FoodsCatalogFamily = {
  key: string;
  title: string;
  category: string;
  subCategory: string;
  summary: string;
  heroImage: string;
  variants: FoodsCatalogVariant[];
  forms: string[];
  grades: string[];
  origins: string[];
  certificationsAvailable: string[];
};

export type FoodsCatalogVariant = Pick<
  FoodsCatalogListItem,
  | "id"
  | "slug"
  | "subtitle"
  | "form"
  | "grade"
  | "originState"
  | "seasonality"
  | "certificationsAvailable"
>;

export type FoodsCatalogSort = "featured" | "title-asc";

export type FoodsCatalogFilters = {
  query: string;
  categories: string[];
  forms: string[];
  origins: string[];
  certifications: string[];
  sort: FoodsCatalogSort;
  page: number;
};

export type CatalogueValidationIssue = {
  index: number;
  field: keyof FoodsCatalogRecord | "record";
  message: string;
};

export type CatalogueValidationResult = {
  records: FoodsCatalogRecord[];
  issues: CatalogueValidationIssue[];
};
