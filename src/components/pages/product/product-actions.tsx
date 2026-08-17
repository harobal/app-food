"use client";

import { Check, Plus } from "lucide-react";
import type { FoodsQuoteProductRef } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/providers/quote-request-provider";

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
    <Card className="elevated-card">
      <CardContent className="space-y-3 p-5">
        <Button
          type="button"
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
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

        <Button asChild variant="outline" className="w-full">
          <FoodsLink href="/rfq">View RFQ List</FoodsLink>
        </Button>

        {quoteHint ? <p className="text-xs text-muted-foreground">{quoteHint}</p> : null}
      </CardContent>
    </Card>
  );
}
