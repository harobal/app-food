"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Filter, Grid2X2, List, PackageCheck, Search, SlidersHorizontal, X } from "lucide-react";
import type { FoodsCatalogFamily, FoodsCatalogFilters } from "../domain/types";
import { filterCatalogFamilies, getCatalogOptions, parseCatalogFilters, sanitizeCatalogFilters, serializeCatalogFilters } from "../selectors/catalog-selectors";
import { CatalogFamilyCard } from "./catalog-family-card";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((candidate) => candidate !== value) : [...values, value];
}

function FilterGroup({ name, label, options, selected, counts, initiallyOpen = false, onToggle }: { name: string; label: string; options: string[]; selected: string[]; counts: Record<string, number>; initiallyOpen?: boolean; onToggle: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen || selected.length > 0);
  return (
    <details className="group/filter border-b border-border py-4 last:border-b-0" open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold marker:hidden">
        <span>{label}{selected.length ? <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">{selected.length}</span> : null}</span>
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-open/filter:rotate-180" />
      </summary>
      <div className="mt-3 space-y-1">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className={cn("flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors", checked ? "bg-primary/8 font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <span className={cn("flex size-4 shrink-0 items-center justify-center rounded border", checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background")}><Check className={cn("size-3", !checked && "opacity-0")} /></span>
              <input name={name} type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(option)} />
              <span className="min-w-0 flex-1 leading-snug">{option}</span>
              <span className="text-[11px] tabular-nums text-muted-foreground">{counts[option] ?? 0}</span>
            </label>
          );
        })}
      </div>
    </details>
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
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),select:not([disabled]),summary,[href],[tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("button")?.focus());
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); restoreFocusRef.current?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <button type="button" className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm" aria-label="Close catalogue filters" onClick={onClose} />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Catalogue filters" className="absolute inset-y-0 right-0 flex w-[92%] max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">Refine results</p><h2 className="mt-1 text-xl font-bold">Filters</h2></div><button type="button" onClick={onClose} className="flex size-10 items-center justify-center rounded-full border border-border hover:bg-muted" aria-label="Close catalogue filters"><X className="size-5" /></button></div>
        <div className="flex-1 overflow-y-auto px-5">{children}</div>
        <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-border bg-background p-4"><Button type="button" variant="ghost" onClick={onClear} disabled={!hasFilters}>Clear all</Button><Button type="button" onClick={onClose}>Show {count} {count === 1 ? "family" : "families"}</Button></div>
      </div>
    </div>
  );
}

export function FoodsCatalogClient({ families: allFamilies }: { families: FoodsCatalogFamily[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { count: quoteCount } = useFoodsQuoteRequest();
  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [catalogFamilies, setCatalogFamilies] = useState(allFamilies);
  const resultsRef = useRef<HTMLElement>(null);
  const closeFilters = useCallback(() => setFilterOpen(false), []);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/catalog", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Catalogue unavailable")))
      .then((payload: { families?: FoodsCatalogFamily[] }) => { if (Array.isArray(payload.families) && payload.families.length) setCatalogFamilies(payload.families); })
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("[Catalog] Full filter dataset unavailable; using the initial page."); });
    return () => controller.abort();
  }, []);
  const options = useMemo(() => getCatalogOptions(catalogFamilies), [catalogFamilies]);
  const filters = useMemo(() => sanitizeCatalogFilters(parseCatalogFilters(new URLSearchParams(searchParams.toString())), options), [options, searchParams]);
  const [searchValue, setSearchValue] = useState(filters.query);
  const families = useMemo(() => filterCatalogFamilies(catalogFamilies, filters), [catalogFamilies, filters]);
  const matchingVariants = useMemo(() => families.reduce((count, family) => count + family.variants.length, 0), [families]);
  const pageCount = Math.max(1, Math.ceil(families.length / PAGE_SIZE));
  const currentPage = Math.min(filters.page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleFamilies = families.slice(pageStart, pageStart + PAGE_SIZE);

  const navigate = useCallback((next: FoodsCatalogFilters) => {
    const query = serializeCatalogFilters(next).toString();
    startTransition(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
  }, [pathname, router]);
  const update = useCallback(<K extends keyof FoodsCatalogFilters,>(key: K, value: FoodsCatalogFilters[K]) => navigate({ ...filters, [key]: value, page: key === "page" ? Number(value) : 1 }), [filters, navigate]);
  const clear = useCallback(() => { setSearchValue(""); navigate({ query: "", categories: [], forms: [], origins: [], certifications: [], sort: "featured", page: 1 }); }, [navigate]);
  const goToPage = useCallback((page: number) => {
    update("page", Math.min(Math.max(page, 1), pageCount));
    window.requestAnimationFrame(() => {
      const top = (resultsRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 112;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, [pageCount, update]);

  useEffect(() => {
    if (searchValue === filters.query) return;
    const timeout = window.setTimeout(() => update("query", searchValue), 320);
    return () => window.clearTimeout(timeout);
  }, [filters.query, searchValue, update]);
  useEffect(() => {
    if (filters.page <= pageCount) return;
    navigate({ ...filters, page: pageCount });
  }, [filters, navigate, pageCount]);

  const optionCounts = useMemo(() => {
    const counts = { categories: {} as Record<string, number>, forms: {} as Record<string, number>, origins: {} as Record<string, number>, certifications: {} as Record<string, number> };
    for (const family of catalogFamilies) {
      counts.categories[family.category] = (counts.categories[family.category] ?? 0) + 1;
      for (const value of family.forms) counts.forms[value] = (counts.forms[value] ?? 0) + 1;
      for (const value of family.origins) counts.origins[value] = (counts.origins[value] ?? 0) + 1;
      for (const value of family.certificationsAvailable) counts.certifications[value] = (counts.certifications[value] ?? 0) + 1;
    }
    return counts;
  }, [catalogFamilies]);

  const chips = [...filters.categories.map((value) => ({ group: "categories" as const, value })), ...filters.forms.map((value) => ({ group: "forms" as const, value })), ...filters.origins.map((value) => ({ group: "origins" as const, value })), ...filters.certifications.map((value) => ({ group: "certifications" as const, value }))];
  const hasFilters = Boolean(filters.query || chips.length || filters.sort !== "featured");
  const paginationItems = useMemo(() => {
    const pages = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1]);
    const ordered = [...pages].filter((page) => page >= 1 && page <= pageCount).sort((a, b) => a - b);
    const items: Array<number | "ellipsis"> = [];
    ordered.forEach((page, index) => {
      if (index > 0 && page - ordered[index - 1] > 1) items.push("ellipsis");
      items.push(page);
    });
    return items;
  }, [currentPage, pageCount]);
  const renderFilterControls = () => (
    <div>
      <FilterGroup name="category" label="Product category" options={options.categories} selected={filters.categories} counts={optionCounts.categories} initiallyOpen onToggle={(value) => update("categories", toggle(filters.categories, value))} />
      <FilterGroup name="form" label="Form & processing" options={options.forms} selected={filters.forms} counts={optionCounts.forms} initiallyOpen onToggle={(value) => update("forms", toggle(filters.forms, value))} />
      <FilterGroup name="origin" label="Origin in India" options={options.origins} selected={filters.origins} counts={optionCounts.origins} onToggle={(value) => update("origins", toggle(filters.origins, value))} />
      <FilterGroup name="certification" label="Certification availability" options={options.certifications} selected={filters.certifications} counts={optionCounts.certifications} onToggle={(value) => update("certifications", toggle(filters.certifications, value))} />
    </div>
  );

  return (
    <>
      <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_36px_rgba(19,47,42,.08)]">
        <div className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
          <label className="flex h-12 items-center gap-3 rounded-xl border border-input bg-background px-4 focus-within:border-primary/50 focus-within:ring-3 focus-within:ring-ring/20">
            <Search className="size-4 shrink-0 text-primary" aria-hidden /><span className="sr-only">Search catalogue</span>
            <input type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search turmeric, basmati, powder, Gujarat…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            {searchValue ? <button type="button" onClick={() => setSearchValue("")} className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Clear search"><X className="size-4" /></button> : null}
          </label>
          <Button type="button" variant="outline" className="h-12 lg:hidden" onClick={() => setFilterOpen(true)}><SlidersHorizontal className="size-4" /> Filters {chips.length ? <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">{chips.length}</span> : null}</Button>
          <Button asChild variant="outline" className="h-12 border-primary/20 bg-primary/5 text-primary"><FoodsLink href="/rfq"><PackageCheck className="size-4" /> RFQ list {quoteCount ? `(${quoteCount})` : ""}</FoodsLink></Button>
        </div>
        <div className="border-t border-border bg-muted/25 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Quick category filters">
            <button type="button" onClick={() => update("categories", [])} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors", !filters.categories.length ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40")}>All categories</button>
            {options.categories.map((category) => { const active = filters.categories.length === 1 && filters.categories[0] === category; return <button key={category} type="button" onClick={() => update("categories", active ? [] : [category])} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary")}>{category} <span className="opacity-65">{optionCounts.categories[category]}</span></button>; })}
          </div>
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex max-h-[calc(100dvh-8rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-brand-ink px-5 py-4 text-white"><span className="flex items-center gap-2"><Filter className="size-4 text-brand-gold" /><span className="text-sm font-bold">Refine results</span></span>{hasFilters ? <button type="button" onClick={clear} className="text-xs font-bold text-brand-gold hover:text-white">Clear all</button> : null}</div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 [scrollbar-color:var(--brand-primary)_transparent] [scrollbar-width:thin]">{renderFilterControls()}</div>
            <div className="shrink-0 border-t border-border bg-muted/25 p-4 text-xs leading-5 text-muted-foreground">Filters stay available while this panel scrolls independently.</div>
          </div>
        </aside>

        <section ref={resultsRef} className="min-w-0 scroll-mt-28" aria-busy={isPending}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div><p className="text-xl font-bold" role="status" aria-live="polite">{families.length} {families.length === 1 ? "product family" : "product families"}</p><p className="mt-1 text-xs text-muted-foreground">{matchingVariants} exact specifications available for selection.</p></div>
            <div className="flex items-center gap-2">
              <label className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-bold text-muted-foreground">Sort <select value={filters.sort} onChange={(event) => update("sort", event.target.value as FoodsCatalogFilters["sort"])} className="bg-transparent text-sm font-semibold text-foreground outline-none"><option value="featured">Featured</option><option value="title-asc">A–Z</option></select></label>
              <div className="flex rounded-lg border border-border bg-card p-1" aria-label="Catalogue view">
                <button type="button" onClick={() => setView("grid")} className={cn("flex size-8 items-center justify-center rounded-md", view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")} aria-label="Grid view" aria-pressed={view === "grid"}><Grid2X2 className="size-4" /></button>
                <button type="button" onClick={() => setView("list")} className={cn("flex size-8 items-center justify-center rounded-md", view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")} aria-label="List view" aria-pressed={view === "list"}><List className="size-4" /></button>
              </div>
            </div>
          </div>

          {filters.query || chips.length ? <div className="flex flex-wrap items-center gap-2 border-b border-border py-4" aria-label="Applied filters">{filters.query ? <button type="button" onClick={() => setSearchValue("")} className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/7 px-3 py-1.5 text-xs font-semibold text-primary">Search: “{filters.query}” <X className="size-3.5" /></button> : null}{chips.map((chip) => <button key={`${chip.group}:${chip.value}`} type="button" onClick={() => update(chip.group, toggle(filters[chip.group], chip.value))} className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/7 px-3 py-1.5 text-xs font-semibold text-primary">{chip.value}<X className="size-3.5" /></button>)}<button type="button" onClick={clear} className="ml-1 text-xs font-bold text-muted-foreground hover:text-primary">Reset all</button></div> : null}

          <div className="pt-5">
            {visibleFamilies.length ? (
              <>
                <div className={cn("grid gap-6 transition-opacity", view === "grid" ? "md:grid-cols-2 2xl:grid-cols-3" : "grid-cols-1", isPending && "opacity-55")}>{visibleFamilies.map((family) => <CatalogFamilyCard key={family.key} family={family} view={view} />)}</div>
                {pageCount > 1 ? <nav className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6" aria-label="Catalogue pagination">
                  <p className="text-xs font-medium text-muted-foreground">Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, families.length)} of {families.length} product families</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft className="size-4" /> Previous</Button>
                    {paginationItems.map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`} className="px-1 text-sm text-muted-foreground" aria-hidden>…</span> : <button key={item} type="button" onClick={() => goToPage(item)} aria-current={item === currentPage ? "page" : undefined} aria-label={`Page ${item}`} className={cn("flex size-9 items-center justify-center rounded-lg border text-sm font-bold transition-colors", item === currentPage ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary")}>{item}</button>)}
                    <Button type="button" variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount}>Next <ChevronRight className="size-4" /></Button>
                  </div>
                </nav> : null}
              </>
            ) : (
              <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center"><div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-gold))]" /><Search className="mx-auto size-8 text-primary" /><p className="mt-5 text-2xl font-bold">No products match this brief</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">Remove a filter or broaden the search. If the required item is not listed, the sourcing desk can still review it through a custom RFQ.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Button type="button" variant="outline" onClick={clear}>Reset catalogue</Button><Button asChild><FoodsLink href="/contact">Ask the sourcing desk</FoodsLink></Button></div></div>
            )}
          </div>
        </section>
      </div>

      {quoteCount > 0 ? <div className="sticky bottom-4 z-30 mx-auto mt-10 hidden max-w-xl items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-brand-ink px-5 py-4 text-white shadow-2xl sm:flex"><div><p className="text-sm font-bold">{quoteCount} {quoteCount === 1 ? "specification" : "specifications"} in your RFQ</p><p className="text-xs text-white/65">Review quantities, notes, and shipment details.</p></div><Button asChild size="sm" className="shrink-0 bg-accent text-accent-foreground hover:bg-[#d9a748]"><FoodsLink href="/rfq">Review RFQ</FoodsLink></Button></div> : null}

      <MobileFilterSheet open={filterOpen} onClose={closeFilters} count={families.length} onClear={clear} hasFilters={hasFilters}>{renderFilterControls()}</MobileFilterSheet>
    </>
  );
}
