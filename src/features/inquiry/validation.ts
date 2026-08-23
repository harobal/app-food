import { incoterms, inquiryCategories, inquirySources, type InquiryFieldErrors, type InquiryFormValues, type InquiryValidationResult } from "./types.ts";

const limits = {
  fullName: 100,
  companyName: 140,
  email: 180,
  phone: 40,
  country: 90,
  product: 180,
  quantity: 100,
  message: 3000,
} as const;

function text(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function multiline(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\r\n/g, "\n") : "";
}

function tooLong(value: string, key: keyof typeof limits) {
  return value.length > limits[key];
}

export function validateInquiryStepOne(values: Partial<InquiryFormValues>): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};
  const fullName = text(values.fullName);
  const companyName = text(values.companyName);
  const email = text(values.email).toLowerCase();
  const phone = text(values.phone);
  const country = text(values.country);

  if (fullName.length < 2) errors.fullName = "Enter your full name.";
  else if (tooLong(fullName, "fullName")) errors.fullName = "Keep the name under 100 characters.";
  if (companyName.length < 2) errors.companyName = "Enter your company name.";
  else if (tooLong(companyName, "companyName")) errors.companyName = "Keep the company name under 140 characters.";
  if (!email) errors.email = "Enter your business email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Enter a valid email address.";
  else if (tooLong(email, "email")) errors.email = "Keep the email under 180 characters.";
  if (!phone) errors.phone = "Enter a phone or WhatsApp number.";
  else if (!/^[+()\d\s.-]{7,40}$/.test(phone)) errors.phone = "Use 7–40 digits and common phone symbols.";
  if (!country) errors.country = "Select or enter your country.";
  else if (tooLong(country, "country")) errors.country = "Keep the country under 90 characters.";
  return errors;
}

export function validateInquiry(input: unknown, now = Date.now()): InquiryValidationResult {
  if (!input || typeof input !== "object") return { ok: false, errors: {}, spam: false };
  const values = input as Partial<InquiryFormValues>;
  const errors = validateInquiryStepOne(values);
  const category = text(values.category);
  const product = text(values.product);
  const quantity = text(values.quantity);
  const message = multiline(values.message);
  const incoterm = text(values.incoterm);
  const source = text(values.source);
  const website = text(values.website);
  const startedAt = typeof values.startedAt === "number" ? values.startedAt : 0;

  if (!inquiryCategories.includes(category as (typeof inquiryCategories)[number])) errors.category = "Select a valid product category.";
  if (tooLong(product, "product")) errors.product = "Keep the product under 180 characters.";
  if (tooLong(quantity, "quantity")) errors.quantity = "Keep the quantity under 100 characters.";
  if (message.length < 20) errors.message = "Add at least 20 characters describing your requirement.";
  else if (tooLong(message, "message")) errors.message = "Keep the requirement under 3,000 characters.";
  if (incoterm && !incoterms.includes(incoterm as (typeof incoterms)[number])) errors.incoterm = "Select a valid Incoterm.";
  if (source && !inquirySources.includes(source as (typeof inquirySources)[number])) errors.source = "Select a valid source.";

  const elapsed = now - startedAt;
  const spam = Boolean(website) || !startedAt || elapsed < 2500 || elapsed > 7_200_000;
  if (Object.keys(errors).length || spam) return { ok: false, errors, spam };

  return {
    ok: true,
    spam: false,
    errors: {},
    data: {
      fullName: text(values.fullName),
      companyName: text(values.companyName),
      email: text(values.email).toLowerCase(),
      phone: text(values.phone),
      country: text(values.country),
      category: category as (typeof inquiryCategories)[number],
      product,
      quantity,
      ...(incoterm ? { incoterm: incoterm as (typeof incoterms)[number] } : {}),
      message,
      ...(source ? { source: source as (typeof inquirySources)[number] } : {}),
    },
  };
}
