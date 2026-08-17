export type InquiryCategory = "Stone" | "Food" | "Electrical" | "Industrial" | "Crafts" | "Other";

export type Incoterm = "FOB" | "CIF" | "CFR" | "EXW";

export type InquirySource =
  | "Google Search"
  | "LinkedIn"
  | "Referral"
  | "Trade Platform"
  | "Social Media"
  | "Other";

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
};

export type InquirySubmissionDto = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  category: InquiryCategory;
  product?: string;
  quantity?: string;
  incoterm?: Incoterm;
  message: string;
  source?: InquirySource;
};

export type InquiryFieldErrors = Partial<Record<keyof InquiryFormValues, string>>;

export type InquiryValidationResult =
  | {
      ok: true;
      data: InquirySubmissionDto;
      errors: Record<never, never>;
    }
  | {
      ok: false;
      errors: InquiryFieldErrors;
    };
