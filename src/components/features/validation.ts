import type {
  InquiryFieldErrors,
  InquiryFormValues,
  InquirySubmissionDto,
  InquiryValidationResult,
} from "./types";

function toTrimmed(value: string) {
  return value.trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateInquiry(values: InquiryFormValues): InquiryValidationResult {
  const errors: InquiryFieldErrors = {};

  const fullName = toTrimmed(values.fullName);
  const companyName = toTrimmed(values.companyName);
  const email = toTrimmed(values.email);
  const phone = toTrimmed(values.phone);
  const country = toTrimmed(values.country);
  const category = values.category;
  const message = toTrimmed(values.message);

  if (!fullName) errors.fullName = "Full name is required";
  if (!companyName) errors.companyName = "Company name is required";
  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmail(email)) {
    errors.email = "Enter a valid email address";
  }
  if (!phone) errors.phone = "Phone or WhatsApp is required";
  if (!country) errors.country = "Country is required";
  if (!category) errors.category = "Category is required";
  if (!message) errors.message = "Please add your requirement";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  if (!category) {
    return {
      ok: false,
      errors: {
        ...errors,
        category: errors.category ?? "Category is required",
      },
    };
  }

  const data: InquirySubmissionDto = {
    fullName,
    companyName,
    email,
    phone,
    country,
    category,
    message,
  };

  const product = toTrimmed(values.product);
  const quantity = toTrimmed(values.quantity);

  if (product) data.product = product;
  if (quantity) data.quantity = quantity;
  if (values.incoterm) data.incoterm = values.incoterm;
  if (values.source) data.source = values.source;

  return {
    ok: true,
    data,
    errors: {},
  };
}
