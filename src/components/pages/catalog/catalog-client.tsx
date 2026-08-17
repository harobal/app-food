"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import type { FoodsCatalogListItem } from "@/types/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FoodsProductCard } from "@/components/pages/foods-product-card";
import { cn } from "@/lib/utils";

type SortMode = "featured" | "title-asc";

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function intersects(values: string[], selected: Set<string>) {
  if (selected.size === 0) return true;
  return values.some((value) => selected.has(value));
}

function toggleInSet(previous: Set<string>, value: string) {
  const next = new Set(previous);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function setFromQuery(param: string | null) {
  if (!param) return new Set<string>();
  return new Set(
    param
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{title}</p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              checked={selected.has(opt)}
              onChange={() => onToggle(opt)}
            />
            <span className="leading-snug">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FoodsCatalogClient({ products }: { products: FoodsCatalogListItem[] }) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const [categories, setCategories] = useState<Set<string>>(() => new Set());
  const [forms, setForms] = useState<Set<string>>(() => new Set());
  const [origins, setOrigins] = useState<Set<string>>(() => new Set());
  const [certSet, setCertSet] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    // Optional pre-filtering via query params (comma-separated):
    // category=..., form=..., origin=..., cert=...
    setCategories(setFromQuery(searchParams.get("category")));
    setForms(setFromQuery(searchParams.get("form")));
    setOrigins(setFromQuery(searchParams.get("origin")));
    setCertSet(setFromQuery(searchParams.get("cert")));

    const q = searchParams.get("q");
    if (q) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions = useMemo(() => uniqueSorted(products.map((p) => p.category)), [products]);
  const formOptions = useMemo(() => uniqueSorted(products.map((p) => p.form)), [products]);
  const originOptions = useMemo(() => uniqueSorted(products.map((p) => p.originState)), [products]);
  const certificationOptions = useMemo(
    () => uniqueSorted(products.flatMap((p) => p.certificationsAvailable)),
    [products],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = products.filter((product) => {
      if (categories.size > 0 && !categories.has(product.category)) return false;
      if (forms.size > 0 && !forms.has(product.form)) return false;
      if (origins.size > 0 && !origins.has(product.originState)) return false;
      if (!intersects(product.certificationsAvailable, certSet)) return false;

      if (!q) return true;

      const haystack = [
        product.title,
        product.subtitle,
        product.summary,
        product.category,
        product.subCategory,
        product.form,
        product.grade,
        product.originState,
        product.seasonality,
        ...product.certificationsAvailable,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (sortMode === "title-asc") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [categories, certSet, forms, origins, products, query, sortMode]);

  const hasFilters =
    query.trim().length > 0 || categories.size > 0 || forms.size > 0 || origins.size > 0 || certSet.size > 0;

  const clearAll = () => {
    setQuery("");
    setSortMode("featured");
    setCategories(new Set());
    setForms(new Set());
    setOrigins(new Set());
    setCertSet(new Set());
  };

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];

    for (const value of categories) {
      chips.push({
        key: `category:${value}`,
        label: value,
        onRemove: () => setCategories((prev) => toggleInSet(prev, value)),
      });
    }

    for (const value of forms) {
      chips.push({
        key: `form:${value}`,
        label: value,
        onRemove: () => setForms((prev) => toggleInSet(prev, value)),
      });
    }

    for (const value of origins) {
      chips.push({
        key: `origin:${value}`,
        label: value,
        onRemove: () => setOrigins((prev) => toggleInSet(prev, value)),
      });
    }

    for (const value of certSet) {
      chips.push({
        key: `cert:${value}`,
        label: value,
        onRemove: () => setCertSet((prev) => toggleInSet(prev, value)),
      });
    }

    return chips;
  }, [categories, certSet, forms, origins]);

  const filterSidebar = (
    <div className="space-y-6">
      <FilterGroup
        title="Category"
        options={categoryOptions}
        selected={categories}
        onToggle={(value) => setCategories((prev) => toggleInSet(prev, value))}
      />

      <FilterGroup
        title="Form"
        options={formOptions}
        selected={forms}
        onToggle={(value) => setForms((prev) => toggleInSet(prev, value))}
      />

      <FilterGroup
        title="Origin (India)"
        options={originOptions}
        selected={origins}
        onToggle={(value) => setOrigins((prev) => toggleInSet(prev, value))}
      />

      {certificationOptions.length > 0 ? (
        <FilterGroup
          title="Certifications"
          options={certificationOptions}
          selected={certSet}
          onToggle={(value) => setCertSet((prev) => toggleInSet(prev, value))}
        />
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product, form, grade, origin…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              Sort
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground"
              >
                <option value="featured">Featured</option>
                <option value="title-asc">Title (A–Z)</option>
              </select>
            </label>

            <Button type="button" variant="outline" size="sm" onClick={clearAll} disabled={!hasFilters}>
              Clear
            </Button>
          </div>
        </div>

        <div className="lg:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="filters">
              <AccordionTrigger>
                <span className="inline-flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" /> Filters
                </span>
              </AccordionTrigger>
              <AccordionContent>{filterSidebar}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="hidden rounded-2xl border border-border bg-card p-4 lg:block lg:sticky lg:top-24">
          {filterSidebar}
        </div>
      </aside>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{filtered.length} results</p>
            <p className="text-xs text-muted-foreground">
              Quote-led pricing. Share destination, incoterms, packaging, and required certifications for accurate quoting.
            </p>
          </div>

          {hasFilters ? (
            <Button type="button" variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
              Reset all
            </Button>
          ) : null}
        </div>

        {activeChips.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.onRemove}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-primary",
                )}
              >
                {chip.label}
                <X className="size-3.5" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <FoodsProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
