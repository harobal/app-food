import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { validateCatalogue } from "../src/features/catalog/data/validate.ts";
import { foundationCategoryMedia } from "../src/features/catalog/data/media.ts";
import {
  filterCatalogVariants,
  groupCatalogFamilies,
  parseCatalogFilters,
  sanitizeCatalogFilters,
  serializeCatalogFilters,
} from "../src/features/catalog/selectors/catalog-selectors.ts";

const raw = JSON.parse(
  await readFile(new URL("../src/content/catalogue.v1.json", import.meta.url), "utf8"),
);
const validation = validateCatalogue(raw);

test("all 750 catalogue records satisfy the runtime contract", () => {
  assert.equal(validation.records.length, 750);
  assert.deepEqual(validation.issues, []);
  assert.equal(new Set(validation.records.map((record) => record.slug)).size, 750);
});

test("query state parses, normalizes, and serializes predictably", () => {
  const filters = parseCatalogFilters(
    new URLSearchParams(
      "q=turmeric&category=Spices+%26+Herbs&form=Powder&sort=title-asc&page=2",
    ),
  );
  assert.deepEqual(filters.categories, ["Spices & Herbs"]);
  assert.deepEqual(filters.forms, ["Powder"]);
  assert.equal(filters.sort, "title-asc");
  assert.equal(filters.page, 2);
  assert.equal(
    serializeCatalogFilters(filters).toString(),
    "q=turmeric&category=Spices+%26+Herbs&form=Powder&sort=title-asc&page=2",
  );
});

test("unsupported catalogue filters are removed before filtering", () => {
  const sanitized = sanitizeCatalogFilters(parseCatalogFilters(new URLSearchParams("category=Stone&form=Powder,Unknown&origin=Mars&q=x")), {
    categories: ["Spices & Herbs"], forms: ["Powder"], origins: ["Gujarat"], certifications: ["Organic"],
  });
  assert.deepEqual(sanitized.categories, []);
  assert.deepEqual(sanitized.forms, ["Powder"]);
  assert.deepEqual(sanitized.origins, []);
});

test("family grouping reduces repeated variant titles without losing variants", () => {
  const items = validation.records.map((record) => ({
    id: record.id,
    slug: record.slug,
    title: record.variant ? `${record.product_name} — ${record.variant}` : record.product_name,
    subtitle: [record.form, record.grade, record.origin_state].join(" • "),
    summary: record.notes,
    heroImage: "",
    category: record.category,
    subCategory: record.sub_category,
    form: record.form,
    grade: record.grade,
    originState: record.origin_state,
    seasonality: record.seasonality,
    certificationsAvailable: record.certifications_available.split(";").map((value) => value.trim()),
  }));
  const families = groupCatalogFamilies(items);
  // Garlic exists legitimately in both Vegetables and Spices, so category-safe
  // grouping yields 184 families from 183 repeated display titles.
  assert.equal(families.length, 184);
  assert.equal(
    families.reduce((count, family) => count + family.variants.length, 0),
    750,
  );

  const filtered = filterCatalogVariants(items, {
    query: "turmeric",
    categories: ["Spices & Herbs"],
    forms: ["Powder"],
    origins: [],
    certifications: [],
    sort: "title-asc",
    page: 1,
  });
  assert.equal(filtered.length, 6);
  assert.ok(filtered.every((item) => item.form === "Powder"));
});

test("validator reports duplicate slugs and missing required values", () => {
  const sample = structuredClone(raw.slice(0, 2));
  sample[1].slug = sample[0].slug;
  sample[1].category = "";
  const result = validateCatalogue(sample);
  assert.ok(result.issues.some((issue) => issue.field === "slug" && issue.message === "Duplicate slug."));
  assert.ok(result.issues.some((issue) => issue.field === "category"));
});

test("validator rejects unsupported taxonomy and trade terms", () => {
  const sample = structuredClone(raw.slice(0, 1));
  sample[0].category = "Unsupported category";
  sample[0].origin_country = "Unknown";
  sample[0].incoterms_supported = "FOB; MADE-UP";
  const result = validateCatalogue(sample);
  assert.ok(result.issues.some((issue) => issue.message === "Unsupported catalogue category."));
  assert.ok(result.issues.some((issue) => issue.field === "origin_country"));
  assert.ok(result.issues.some((issue) => issue.message.includes("MADE-UP")));
});

test("the advertised RFQ template exists", async () => {
  await assert.doesNotReject(
    access(new URL("../public/downloads/harobal-foods-rfq-template.csv", import.meta.url)),
  );
});

test("every catalogue category has an owned local media asset", async () => {
  const categories = [...new Set(validation.records.map((record) => record.category))].sort();
  assert.deepEqual(Object.keys(foundationCategoryMedia).sort(), categories);
  for (const mediaPath of Object.values(foundationCategoryMedia)) {
    assert.match(mediaPath, /^\/media\/harvest-meridian\/.+\.webp$/);
    await assert.doesNotReject(
      access(new URL(`../public${mediaPath}`, import.meta.url)),
    );
  }
});
