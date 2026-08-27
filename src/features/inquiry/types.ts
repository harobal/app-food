import { categoryOptions, incotermOptions, inquirySourceOptions } from "../../content/site/forms.ts";

export const inquiryCategories = categoryOptions;
export const incoterms = incotermOptions;
export const inquirySources = inquirySourceOptions;

export type InquiryCategory = (typeof inquiryCategories)[number];
export type Incoterm = (typeof incoterms)[number];
export type InquirySource = (typeof inquirySources)[number];

export type InquiryFormValues = {
  submissionType?: "inquiry" | "rfq" | "supplier";
  // Step 1: Buyer Profile
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;

  // Step 2: Commodity & Trade Specifications
  category: string;
  otherCategory?: string;
  product?: string;
  quantity?: string;
  destinationPort?: string;
  incoterm?: string;
  otherIncoterm?: string;
  packaging?: string;
  timeline?: string;
  source?: string;
  otherSource?: string;
  message: string;
  consent?: boolean;

  // Anti-abuse tokens
  website?: string;
  startedAt: number;
};

export type InquirySubmission = {
  submissionType: "inquiry" | "rfq" | "supplier";
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  otherCategory?: string;
  product?: string;
  quantity?: string;
  destinationPort?: string;
  incoterm?: string;
  otherIncoterm?: string;
  packaging?: string;
  timeline?: string;
  source?: string;
  otherSource?: string;
  message: string;
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
