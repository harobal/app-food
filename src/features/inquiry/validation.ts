import { allCountries } from "../../content/site/countries.ts";
import { incoterms, inquiryCategories, inquirySources, type InquiryFieldErrors, type InquiryFormValues, type InquiryValidationResult } from "./types.ts";

const validCountries = new Set<string>(allCountries);
const validCategories = new Set<string>(inquiryCategories);
const validIncoterms = new Set<string>(incoterms);
const validSources = new Set<string>(inquirySources);

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

const limits = {
  fullName: 100,
  companyName: 140,
  email: 180,
  phone: 40,
  country: 90,
  product: 180,
  quantity: 100,
  destinationPort: 140,
  timeline: 140,
  otherCategory: 140,
  otherIncoterm: 140,
  otherSource: 140,
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

  if (fullName.length < 2) errors.fullName = "Enter your full name (at least 2 characters).";
  else if (tooLong(fullName, "fullName")) errors.fullName = "Keep the name under 100 characters.";

  if (companyName.length < 2) errors.companyName = "Enter your company name.";
  else if (tooLong(companyName, "companyName")) errors.companyName = "Keep the company name under 140 characters.";

  if (!email) errors.email = "Enter your business email.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid corporate email address.";
  else if (tooLong(email, "email")) errors.email = "Keep the email under 180 characters.";

  if (!phone) errors.phone = "Enter a phone or WhatsApp number with country code.";
  else if (!PHONE_REGEX.test(phone)) errors.phone = "Enter a valid phone number.";

  if (!country) errors.country = "Select or enter your operating country.";
  else if (!validCountries.has(country)) errors.country = "Select a valid country from the list.";

  return errors;
}

export function validateInquiry(input: unknown, now = Date.now()): InquiryValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { fullName: "Invalid payload." }, spam: false };
  }

  const values = input as Partial<InquiryFormValues>;
  const errors = validateInquiryStepOne(values);

  const category = text(values.category);
  const otherCategory = text(values.otherCategory);
  const product = text(values.product);
  const quantity = text(values.quantity);
  const destinationPort = text(values.destinationPort);
  const incoterm = text(values.incoterm);
  const otherIncoterm = text(values.otherIncoterm);
  const packaging = text(values.packaging);
  const timeline = text(values.timeline);
  const source = text(values.source);
  const otherSource = text(values.otherSource);
  const message = multiline(values.message);
  const website = text(values.website);
  const startedAt = typeof values.startedAt === "number" ? values.startedAt : 0;
  const submissionType = values.submissionType === "rfq" || values.submissionType === "supplier" ? values.submissionType : "inquiry";

  if (values.consent !== true) {
    errors.consent = "Confirm that Harobal may use these details to respond to your requirement.";
  }

  if (!category || !validCategories.has(category)) {
    errors.category = "Select a valid product category.";
  } else if (category === "Other" && (!otherCategory || otherCategory.length < 2)) {
    errors.otherCategory = "Specify your custom commodity category.";
  }

  if (tooLong(product, "product")) errors.product = "Keep the product under 180 characters.";
  if (tooLong(quantity, "quantity")) errors.quantity = "Keep the quantity under 100 characters.";
  if (tooLong(destinationPort, "destinationPort")) errors.destinationPort = "Keep destination port under 140 characters.";

  if (incoterm && !validIncoterms.has(incoterm)) {
    errors.incoterm = "Select a valid Incoterm.";
  } else if (incoterm === "Other" && (!otherIncoterm || otherIncoterm.length < 2)) {
    errors.otherIncoterm = "Specify your preferred delivery terms.";
  }

  if (source && !validSources.has(source)) {
    errors.source = "Select a valid discovery source.";
  } else if (source === "Other" && (!otherSource || otherSource.length < 2)) {
    errors.otherSource = "Specify how you discovered Harobal Foods.";
  }

  if (message.length < 15) {
    errors.message = "Add at least 15 characters describing your requirement, grade, or packaging.";
  } else if (tooLong(message, "message")) {
    errors.message = "Keep the requirement description under 3,000 characters.";
  }

  const elapsed = now - startedAt;
  const spam = Boolean(website) || (startedAt > 0 && elapsed < 1500);

  if (Object.keys(errors).length > 0 || spam) {
    return { ok: false, errors, spam };
  }

  return {
    ok: true,
    spam: false,
    errors: {},
    data: {
      submissionType,
      fullName: text(values.fullName),
      companyName: text(values.companyName),
      email: text(values.email).toLowerCase(),
      phone: text(values.phone),
      country: text(values.country),
      category,
      otherCategory: category === "Other" ? otherCategory : undefined,
      product: product || undefined,
      quantity: quantity || undefined,
      destinationPort: destinationPort || undefined,
      incoterm: incoterm || undefined,
      otherIncoterm: incoterm === "Other" ? otherIncoterm : undefined,
      packaging: packaging || undefined,
      timeline: timeline || undefined,
      source: source || undefined,
      otherSource: source === "Other" ? otherSource : undefined,
      message,
    },
  };
}
