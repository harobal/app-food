export const inquiryCategories = [
  "Cereals & Grains",
  "Dehydrated & Processed",
  "Fresh Fruits",
  "Fresh Vegetables",
  "Nuts & Dry Fruits",
  "Oilseeds & Oils",
  "Pulses & Lentils",
  "Spices & Herbs",
  "Sweeteners",
  "Mixed / Other",
] as const;
export const incoterms = ["FOB", "CIF", "CFR", "EXW"] as const;
export const inquirySources = ["Google Search", "LinkedIn", "Referral", "Trade Platform", "Social Media", "Other"] as const;

export type InquiryCategory = (typeof inquiryCategories)[number];
export type Incoterm = (typeof incoterms)[number];
export type InquirySource = (typeof inquirySources)[number];

export type InquiryFormValues = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  category: InquiryCategory | "";
  product: string;
  quantity: string;
  incoterm: Incoterm | "";
  message: string;
  source: InquirySource | "";
  website: string;
  startedAt: number;
};

export type InquirySubmission = Omit<InquiryFormValues, "website" | "startedAt" | "category" | "incoterm" | "source"> & {
  category: InquiryCategory;
  incoterm?: Incoterm;
  source?: InquirySource;
};

export type InquiryFieldErrors = Partial<Record<keyof InquiryFormValues, string>>;

export type InquiryValidationResult =
  | { ok: true; data: InquirySubmission; errors: Record<never, never>; spam: false }
  | { ok: false; errors: InquiryFieldErrors; spam: boolean };

export type InquiryApiResponse = {
  ok: boolean;
  message: string;
  referenceId?: string;
  errors?: InquiryFieldErrors;
  retryable?: boolean;
};
