import assert from "node:assert/strict";
import test from "node:test";
import { validateInquiry } from "../src/features/inquiry/validation.ts";

const startedAt = 1_000;
const valid = {
  fullName: "Asha Buyer",
  companyName: "Global Foods",
  email: "asha@example.com",
  phone: "+971 50 123 4567",
  country: "United Arab Emirates",
  category: "Spices & Herbs",
  product: "Turmeric powder",
  quantity: "2 MT",
  incoterm: "CIF",
  message: "Please quote export-grade turmeric powder for Jebel Ali.",
  source: "Referral",
  website: "",
  startedAt,
};

test("food inquiry accepts food categories and normalizes input", () => {
  const result = validateInquiry(valid, startedAt + 3_000);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.category, "Spices & Herbs");
});

test("inquiry rejects portfolio categories and bot-like timing", () => {
  const wrongCategory = validateInquiry({ ...valid, category: "Stone" }, startedAt + 3_000);
  assert.equal(wrongCategory.ok, false);
  if (!wrongCategory.ok) assert.ok(wrongCategory.errors.category);
  const tooFast = validateInquiry(valid, startedAt + 500);
  assert.equal(tooFast.ok, false);
  if (!tooFast.ok) assert.equal(tooFast.spam, true);
});
