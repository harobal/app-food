import type { FoodsQuoteItem } from "./types.ts";

export const QUOTE_STORAGE_KEY = "harobal-foods-quote-request";
export const QUOTE_STORAGE_VERSION = 2;

type StoredQuote = {
  version: number;
  items: FoodsQuoteItem[];
};

const text = (value: unknown) => (typeof value === "string" ? value : "");
const timestamp = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : Date.now();

function normalizeItem(value: unknown): FoodsQuoteItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const slug = text(item.slug);
  if (!slug) return null;
  return {
    slug,
    title: text(item.title) || slug,
    category: text(item.category),
    subCategory: text(item.subCategory),
    form: text(item.form),
    grade: text(item.grade),
    originState: text(item.originState),
    quantity: text(item.quantity),
    notes: text(item.notes),
    createdAt: timestamp(item.createdAt),
  };
}

export function dedupeQuoteItems(items: FoodsQuoteItem[]) {
  const unique = new Map<string, FoodsQuoteItem>();
  for (const item of items) if (!unique.has(item.slug)) unique.set(item.slug, item);
  return Array.from(unique.values()).sort((a, b) => a.createdAt - b.createdAt);
}

export function parseStoredQuote(raw: string | null): FoodsQuoteItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    const candidates = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && Array.isArray((parsed as StoredQuote).items)
        ? (parsed as StoredQuote).items
        : [];
    return dedupeQuoteItems(
      candidates.map(normalizeItem).filter((item): item is FoodsQuoteItem => Boolean(item)),
    );
  } catch {
    return [];
  }
}

export function serializeStoredQuote(items: FoodsQuoteItem[]) {
  return JSON.stringify({
    version: QUOTE_STORAGE_VERSION,
    items: dedupeQuoteItems(items),
  } satisfies StoredQuote);
}
