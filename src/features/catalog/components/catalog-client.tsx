"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import type { FoodsCatalogFamily, FoodsCatalogFilters } from "../domain/types";
import { filterCatalogFamilies, getCatalogOptions, parseCatalogFilters, serializeCatalogFilters } from "../selectors/catalog-selectors";
import { CatalogFamilyCard } from "./catalog-family-card";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 24;

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((candidate) => candidate !== value) : [...values, value];
}

function FilterGroup({ name, label, options, selected, onToggle }: { name: string; label: string; options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="text-sm font-bold text-foreground">{label}</legend>
      <div className={options.length > 10 ? "max-h-52 space-y-2 overflow-y-auto pr-1" : "space-y-2"}>
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-start gap-2.5 rounded-md px-1 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground">
            <input name={name} type="checkbox" className="mt-0.5 size-4 rounded border-input accent-(--brand-primary)" checked={selected.includes(option)} onChange={() => onToggle(option)} />
            <span className="leading-snug">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function MobileFilterSheet({ open, onClose, count, children, onClear, hasFilters }: { open: boolean; onClose: () => void; count: number; children: ReactNode; onClear: () => void; hasFilters: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),select:not([disabled]),[href],[tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("button")?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button type="button" className="absolute inset-0 bg-brand-ink/45 backdrop-blur-sm" aria-label="Close catalogue filters" onClick={onClose} />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Catalogue filters" className="absolute inset-y-0 right-0 flex w-[88%] max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Refine</p><h2 className="mt-1 text-xl font-semibold">Catalogue filters</h2></div>
          <button type="button" onClick={onClose} className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-muted" aria-label="Close catalogue filters"><X className="size-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-border bg-background p-4">
          <Button type="button" variant="ghost" onClick={onClear} disabled={!hasFilters}>Clear</Button>
          <Button type="button" onClick={onClose}>Show {count} {count === 1 ? "family" : "families"}</Button>
        </div>
      </div>
    </div>
  );
}

export function FoodsCatalogClient({ families: allFamilies }: { families: FoodsCatalogFamily[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const closeFilters = useCallback(() => setFilterOpen(false), []);
  const filters = useMemo(() => parseCatalogFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const options = useMemo(() => getCatalogOptions(allFamilies), [allFamilies]);
  const families = useMemo(() => filterCatalogFamilies(allFamilies, filters), [allFamilies, filters]);
  const matchingVariants = useMemo(() => families.reduce((count, family) => count + family.variants.length, 0), [families]);
  const visibleFamilies = families.slice(0, filters.page * PAGE_SIZE);

  const navigate = (next: FoodsCatalogFilters) => {
    const query = serializeCatalogFilters(next).toString();
    startTransition(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
  };
  const update = <K extends keyof FoodsCatalogFilters>(key: K, value: FoodsCatalogFilters[K]) => navigate({ ...filters, [key]: value, page: key === "page" ? Number(value) : 1 });
  const clear = () => navigate({ query: "", categories: [], forms: [], origins: [], certifications: [], sort: "featured", page: 1 });

  const chips = [
    ...filters.categories.map((value) => ({ group: "categories" as const, value })),
    ...filters.forms.map((value) => ({ group: "forms" as const, value })),
    ...filters.origins.map((value) => ({ group: "origins" as const, value })),
    ...filters.certifications.map((value) => ({ group: "certifications" as const, value })),
  ];
  const hasFilters = Boolean(filters.query || chips.length || filters.sort !== "featured");
  const renderFilterControls = () => (
    <div className="space-y-7">
      <FilterGroup name="category" label="Category" options={options.categories} selected={filters.categories} onToggle={(value) => update("categories", toggle(filters.categories, value))} />
      <FilterGroup name="form" label="Form" options={options.forms} selected={filters.forms} onToggle={(value) => update("forms", toggle(filters.forms, value))} />
      <FilterGroup name="origin" label="Origin (India)" options={options.origins} selected={filters.origins} onToggle={(value) => update("origins", toggle(filters.origins, value))} />
      <FilterGroup name="certification" label="Certifications" options={options.certifications} selected={filters.certifications} onToggle={(value) => update("certifications", toggle(filters.certifications, value))} />
    </div>
  );

  return (
    <>
      <div className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
        <label className="flex h-12 items-center gap-3 rounded-xl border border-input bg-background px-4 focus-within:ring-2 focus-within:ring-ring/40">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="sr-only">Search catalogue</span>
          <input type="search" value={filters.query} onChange={(event) => update("query", event.target.value)} placeholder="Search product, form, grade, or origin…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </label>
        <label className="flex h-12 items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 text-xs font-bold text-muted-foreground">
          Sort
          <select value={filters.sort} onChange={(event) => update("sort", event.target.value as FoodsCatalogFilters["sort"])} className="bg-transparent text-sm font-semibold text-foreground outline-none">
            <option value="featured">Featured</option><option value="title-asc">Title (A–Z)</option>
          </select>
        </label>
        <Button type="button" variant="outline" className="h-12 lg:hidden" onClick={() => setFilterOpen(true)}><SlidersHorizontal className="size-4" /> Filters {chips.length ? `(${chips.length})` : ""}</Button>
      </div>

      <div className="grid gap-7 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <span className="flex items-center gap-2"><Filter className="size-4 text-primary" /><span className="text-sm font-bold">Filter products</span></span>
              {hasFilters ? <button type="button" onClick={clear} className="text-xs font-bold text-primary hover:text-brand-gold">Clear</button> : null}
            </div>
            {renderFilterControls()}
          </div>
        </aside>

        <section className="min-w-0 space-y-5" aria-busy={isPending}>
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
            <div><p className="text-lg font-bold" role="status" aria-live="polite">{families.length} product {families.length === 1 ? "family" : "families"}</p><p className="mt-1 text-xs text-muted-foreground">{matchingVariants} matching variants across buyer-selectable grades, forms, and origins.</p></div>
            {hasFilters ? <Button type="button" variant="ghost" size="sm" onClick={clear}>Reset all</Button> : null}
          </div>

          {chips.length ? <div className="flex flex-wrap gap-2" aria-label="Applied filters">{chips.map((chip) => <button key={`${chip.group}:${chip.value}`} type="button" onClick={() => update(chip.group, toggle(filters[chip.group], chip.value))} className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/6 px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-primary/45" aria-label={`Remove filter: ${chip.value}`}>{chip.value}<X className="size-3.5" /></button>)}</div> : null}

          {visibleFamilies.length ? (
            <><div className={`grid gap-5 md:grid-cols-2 2xl:grid-cols-3 ${isPending ? "opacity-60" : "opacity-100"}`}>{visibleFamilies.map((family) => <CatalogFamilyCard key={family.key} family={family} />)}</div>{visibleFamilies.length < families.length ? <div className="flex justify-center pt-4"><Button type="button" variant="outline" size="lg" onClick={() => update("page", filters.page + 1)}>Show 24 more <span className="text-muted-foreground">({families.length - visibleFamilies.length} remaining)</span></Button></div> : null}</>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center"><div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-gold))]" /><p className="text-2xl font-semibold">No matching product families</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">Try a broader product term or remove one of the applied filters. Your catalogue URL can still be copied and revised.</p><Button type="button" variant="outline" className="mt-6" onClick={clear}>Reset catalogue</Button></div>
          )}
        </section>
      </div>

      <MobileFilterSheet open={filterOpen} onClose={closeFilters} count={families.length} onClear={clear} hasFilters={hasFilters}>{renderFilterControls()}</MobileFilterSheet>
    </>
  );
}
