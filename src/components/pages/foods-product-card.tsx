"use client";

import { Check, Plus, Sparkles } from "lucide-react";
import type { FoodsCatalogListItem } from "@/features/catalog/domain/types";
import type { FoodsQuoteProductRef } from "@/features/quote-request";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";

function toQuoteRef(item: FoodsCatalogListItem): FoodsQuoteProductRef {
  return {
    slug: item.slug,
    title: item.title,
    category: item.category,
    subCategory: item.subCategory,
    form: item.form,
    grade: item.grade,
    originState: item.originState,
  };
}

export function FoodsProductCard({ product }: { product: FoodsCatalogListItem }) {
  const { items, addItem } = useFoodsQuoteRequest();
  const inRequest = items.some((item) => item.slug === product.slug);

  const certifications = product.certificationsAvailable.slice(0, 1);

  return (
    <Card className="elevated-card group flex h-full flex-col overflow-hidden">
      <div
        className="relative h-44 w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%), url(${product.heroImage})`,
        }}
        aria-hidden
      />

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Export-ready</p>
          <Badge variant="outline">Quote-led</Badge>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug">{product.title}</h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{product.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">{product.category}</Badge>
          {product.form ? <Badge variant="outline">{product.form}</Badge> : null}
          {product.originState ? <Badge variant="outline">{product.originState}</Badge> : null}
          {certifications.map((c) => (
            <Badge key={c} variant="outline">
              {c}
            </Badge>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{product.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline" className="flex-1">
            <FoodsLink href={`/catalog/${product.slug}`}>View Details</FoodsLink>
          </Button>
          <Button
            type="button"
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => addItem(toQuoteRef(product))}
            aria-pressed={inRequest}
          >
            {inRequest ? (
              <>
                <Check className="mr-1 size-4" /> Added
              </>
            ) : (
              <>
                <Plus className="mr-1 size-4" /> Add to RFQ
              </>
            )}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {[product.subCategory, product.grade].filter(Boolean).slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1">
              <Sparkles className="size-3.5 text-secondary" /> {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
