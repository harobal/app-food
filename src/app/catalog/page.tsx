import { Suspense } from "react";
import type { Metadata } from "next";
import { getFoodsCatalogListItems } from "@/features/catalog/data/catalog";
import { groupCatalogFamilies } from "@/features/catalog/selectors/catalog-selectors";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsCatalogClient } from "@/features/catalog/components/catalog-client";

export const metadata: Metadata = {
  title: "Agro & Food Commodities Catalog",
  description:
    "Browse export-ready Indian spices, grains, oilseeds, nuts, and processed food products with specification filter and consolidated RFQ builder.",
};

export default function FoodsCatalogPage() {
  const families = groupCatalogFamilies(getFoodsCatalogListItems());

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-brand-ink text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.96)_0%,rgba(7,25,20,.82)_45%,rgba(7,25,20,.28)_100%),url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-center" aria-hidden />
        <div className="container-shell relative py-16 sm:py-20">
          <div className="max-w-3xl">
          <div className="[&_a]:!text-white/65 [&_span]:!text-white/75 [&_svg]:!text-white/45">
            <PageBreadcrumbs />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Catalogue</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Foods &amp; agriculture catalogue</h1>
          <p className="mt-4 text-base text-white/82 sm:text-lg">
            Shortlist items by category, form, origin, and compliance needs. Add products to your RFQ list and send one consolidated request.
          </p>
        </div>
        </div>
      </section>

      <section className="section-space bg-hero-wash">
        <div className="container-shell">
          <Suspense
            fallback={
              <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]" role="status" aria-label="Loading catalogue">
                <div className="h-60 animate-pulse rounded-2xl border border-border bg-card/75" />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="h-96 animate-pulse rounded-2xl border border-border bg-card/75" />
                  ))}
                </div>
              </div>
            }
          >
            <FoodsCatalogClient families={families} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
