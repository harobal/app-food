import { Suspense } from "react";
import type { Metadata } from "next";
import { getFoodsCatalogListItems } from "@/services/catalog";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsCatalogClient } from "@/components/pages/catalog/catalog-client";

export const metadata: Metadata = {
  title: "Agro & Food Commodities Catalog",
  description:
    "Browse export-ready Indian spices, grains, oilseeds, nuts, and processed food products with specification filter and consolidated RFQ builder.",
};

export default function FoodsCatalogPage() {
  const products = getFoodsCatalogListItems();

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Catalogue</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Foods &amp; agriculture catalogue</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Shortlist items by category, form, origin, and compliance needs. Add products to your RFQ list and send one consolidated request.
          </p>
        </div>

        <div className="mt-10">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
                Loading catalogue…
              </div>
            }
          >
            <FoodsCatalogClient products={products} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
