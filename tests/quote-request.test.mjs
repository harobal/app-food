import assert from "node:assert/strict";
import test from "node:test";
import {
  parseStoredQuote,
  QUOTE_STORAGE_VERSION,
  serializeStoredQuote,
} from "../src/features/quote-request/persistence.ts";
import {
  initialQuoteRequestState,
  quoteRequestReducer,
} from "../src/features/quote-request/reducer.ts";

const product = {
  slug: "turmeric-powder-export-standard",
  title: "Turmeric",
  category: "Spices & Herbs",
  subCategory: "Spices",
  form: "Powder",
  grade: "Export Standard",
  originState: "Telangana",
};

test("quote reducer adds, updates, removes, and clears deterministically", () => {
  const added = quoteRequestReducer(initialQuoteRequestState, {
    type: "add",
    product,
    createdAt: 100,
  });
  assert.equal(added.items.length, 1);
  const duplicate = quoteRequestReducer(added, { type: "add", product, createdAt: 200 });
  assert.equal(duplicate.items.length, 1);
  const updated = quoteRequestReducer(duplicate, {
    type: "setQuantity",
    slug: product.slug,
    quantity: "2 MT",
  });
  assert.equal(updated.items[0].quantity, "2 MT");
  assert.equal(quoteRequestReducer(updated, { type: "clear" }).items.length, 0);
});

test("versioned persistence reads legacy arrays and recovers invalid input", () => {
  const legacy = JSON.stringify([{ ...product, quantity: "", notes: "", createdAt: 1 }]);
  assert.equal(parseStoredQuote(legacy).length, 1);
  assert.deepEqual(parseStoredQuote("{broken"), []);
  const serialized = serializeStoredQuote(parseStoredQuote(legacy));
  assert.equal(JSON.parse(serialized).version, QUOTE_STORAGE_VERSION);
});
