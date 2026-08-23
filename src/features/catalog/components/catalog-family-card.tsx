"use client";

import { Check, Layers3, Plus } from "lucide-react";
import type { FoodsCatalogFamily } from "../domain/types";
import type { FoodsQuoteProductRef } from "@/features/quote-request";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { FoodsLink } from "@/components/pages/foods-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryAccent } from "../data/media";

function toQuoteRef(family: FoodsCatalogFamily): FoodsQuoteProductRef {
  const variant = family.variants[0];
  return {
    slug: variant.slug,
    title: family.title,
    category: family.category,
    subCategory: family.subCategory,
    form: variant.form,
    grade: variant.grade,
    originState: variant.originState,
  };
}

export function CatalogFamilyCard({ family }: { family: FoodsCatalogFamily }) {
  const { items, addItem } = useFoodsQuoteRequest();
  const variant = family.variants[0];
  const inRequest = items.some((item) => item.slug === variant.slug);
  const accent = getCategoryAccent(family.category);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/75 bg-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(19,47,42,.13)]" style={{ borderTopColor: accent, borderTopWidth: 3 }}>
      <div
        className="relative min-h-48 overflow-hidden bg-center bg-[length:100%] transition-[background-size] duration-500 group-hover:bg-[length:108%]"
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(11,31,25,.02),rgba(11,31,25,.82)),url(${family.heroImage})`,
        }}
        aria-hidden
      >
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#fff7e8" }}>{family.category}</p>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
            <Layers3 className="size-3.5" />
            {family.variants.length} {family.variants.length === 1 ? "variant" : "variants"}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
          {family.subCategory}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug">{family.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{family.summary}</p>

        <dl className="mt-4 space-y-2 text-xs">
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 font-semibold text-foreground">Forms</dt>
            <dd className="line-clamp-1 text-muted-foreground">{family.forms.join(", ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 font-semibold text-foreground">Grades</dt>
            <dd className="line-clamp-1 text-muted-foreground">{family.grades.join(", ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 font-semibold text-foreground">Origins</dt>
            <dd className="line-clamp-1 text-muted-foreground">{family.origins.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {family.certificationsAvailable.slice(0, 2).map((certification) => (
            <Badge key={certification} variant="outline" className="max-w-full truncate">
              {certification}
            </Badge>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button asChild variant="outline">
            <FoodsLink href={`/catalog/${variant.slug}`}>View options</FoodsLink>
          </Button>
          <Button
            type="button"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => addItem(toQuoteRef(family))}
            aria-pressed={inRequest}
          >
            {inRequest ? <Check className="size-4" /> : <Plus className="size-4" />}
            {inRequest ? "Added" : "Add to RFQ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
