"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Layers3, MapPin, Plus } from "lucide-react";
import type { FoodsCatalogFamily, FoodsCatalogVariant } from "../domain/types";
import type { FoodsQuoteProductRef } from "@/features/quote-request";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { FoodsLink } from "@/components/pages/foods-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryAccent } from "../data/media";
import { cn } from "@/lib/utils";

function toQuoteRef(family: FoodsCatalogFamily, variant: FoodsCatalogVariant): FoodsQuoteProductRef {
  return { slug: variant.slug, title: family.title, category: family.category, subCategory: family.subCategory, form: variant.form, grade: variant.grade, originState: variant.originState };
}

function variantLabel(variant: FoodsCatalogVariant) {
  return [variant.form, variant.grade].filter(Boolean).join(" · ");
}

export function CatalogFamilyCard({ family, view = "grid" }: { family: FoodsCatalogFamily; view?: "grid" | "list" }) {
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const [selectedSlug, setSelectedSlug] = useState(family.variants[0].slug);
  const variant = family.variants.find((item) => item.slug === selectedSlug) ?? family.variants[0];
  const inRequest = items.some((item) => item.slug === variant.slug);
  const accent = getCategoryAccent(family.category);

  return (
    <Card className={cn("group overflow-hidden border-border/70 bg-card shadow-[0_8px_26px_rgba(19,47,42,.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_20px_48px_rgba(19,47,42,.13)]", view === "grid" ? "flex h-full flex-col" : "md:grid md:grid-cols-[17rem_minmax(0,1fr)]")} style={{ borderTopColor: accent, borderTopWidth: 3 }}>
      <div className={cn("relative min-h-52 overflow-hidden bg-center bg-[length:102%] transition-[background-size] duration-500 group-hover:bg-[length:108%]", view === "list" && "md:min-h-full")} style={{ backgroundImage: `linear-gradient(180deg,rgba(8,28,22,.04),rgba(8,28,22,.74)),url(${family.heroImage})` }} aria-hidden>
        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-brand-ink/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-white backdrop-blur-md">{family.category}</div>
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"><Layers3 className="size-3.5" /> {family.variants.length} {family.variants.length === 1 ? "option" : "options"}</div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <div className={cn(view === "grid" && "md:min-h-[5.5rem]")}>
          <p className="text-[10px] font-bold uppercase tracking-[.18em]" style={{ color: accent }}>{family.subCategory}</p>
          <h3 className="mt-2 text-xl font-bold leading-[1.18] tracking-[-0.025em] text-foreground">
            <FoodsLink href={`/catalog/${variant.slug}`} className="transition-colors hover:text-primary">{family.title}</FoodsLink>
          </h3>
        </div>
        <p className={cn("mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground", view === "grid" && "md:min-h-12")}>{family.summary}</p>
        <div className={cn("mt-4 flex flex-wrap gap-2 text-xs", view === "grid" && "md:min-h-7")}>
          <span className="rounded-full bg-muted px-2.5 py-1 font-semibold text-foreground/75">{variant.form}</span>
          {variant.originState ? <span className="inline-flex items-center gap-1 rounded-full bg-primary/6 px-2.5 py-1 font-semibold text-primary"><MapPin className="size-3" />{variant.originState}</span> : null}
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background/75 p-3.5 transition-colors focus-within:border-primary/45 focus-within:ring-3 focus-within:ring-ring/15">
          <label className="block text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground" htmlFor={`variant-${family.key.replace(/[^a-zA-Z0-9]/g, "-")}`}>Choose specification</label>
          <div className="relative mt-2">
            <select id={`variant-${family.key.replace(/[^a-zA-Z0-9]/g, "-")}`} value={variant.slug} onChange={(event) => setSelectedSlug(event.target.value)} className="w-full appearance-none truncate bg-transparent pr-7 text-sm font-semibold leading-6 text-foreground outline-none">
              {family.variants.map((item) => <option key={item.slug} value={item.slug}>{variantLabel(item)}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          </div>
        </div>

        <div className="mt-4 flex min-h-7 flex-wrap content-start gap-1.5">{variant.certificationsAvailable.slice(0, 2).map((certification) => <Badge key={certification} variant="outline" className="max-w-full truncate bg-card px-2 text-[10px]">{certification}</Badge>)}</div>

        <div className="mt-auto pt-5">
          <Button type="button" className={cn("w-full font-bold", inRequest ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-[#d9a748]")} onClick={() => inRequest ? removeItem(variant.slug) : addItem(toQuoteRef(family, variant))} aria-pressed={inRequest}>
            {inRequest ? <Check className="size-4" /> : <Plus className="size-4" />}{inRequest ? "Added" : "Add to RFQ"}
          </Button>
          <FoodsLink href={`/catalog/${variant.slug}`} className="mt-3 flex min-h-9 items-center justify-center gap-2 rounded-lg text-sm font-bold text-primary transition-colors hover:bg-primary/6">View full specification <ArrowUpRight className="size-4" /></FoodsLink>
        </div>
      </CardContent>
    </Card>
  );
}
