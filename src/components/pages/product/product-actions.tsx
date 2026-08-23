"use client";

import { Check, Plus } from "lucide-react";
import type { FoodsQuoteProductRef } from "@/features/quote-request";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";

export function FoodsProductActions({
  product,
  quoteHint,
}: {
  product: FoodsQuoteProductRef;
  quoteHint?: string;
}) {
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const inRequest = items.some((item) => item.slug === product.slug);

  return (
    <Card className="overflow-hidden border-primary/20 shadow-[0_18px_55px_rgba(19,47,42,.12)]">
      <div className="bg-brand-ink px-5 py-4 text-white">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-gold">Consolidated request</p>
        <p className="mt-1 text-lg font-semibold">Add this specification to your RFQ</p>
      </div>
      <CardContent className="space-y-3 p-5">
        <Button
          type="button"
          className="h-12 w-full bg-accent font-bold text-accent-foreground hover:bg-[#d9a748]"
          onClick={() => (inRequest ? removeItem(product.slug) : addItem(product))}
          aria-pressed={inRequest}
        >
          {inRequest ? (
            <>
              <Check className="mr-2 size-4" /> In RFQ list (remove)
            </>
          ) : (
            <>
              <Plus className="mr-2 size-4" /> Add to RFQ
            </>
          )}
        </Button>

        <Button asChild variant="outline" className="h-11 w-full">
          <FoodsLink href="/rfq">View RFQ List</FoodsLink>
        </Button>

        {quoteHint ? <p className="text-xs text-muted-foreground">{quoteHint}</p> : null}
      </CardContent>
    </Card>
  );
}
