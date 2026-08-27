import { Suspense } from "react";
import { getFoodsCatalogListItems } from "@/features/catalog/data/catalog";
import { groupCatalogFamilies } from "@/features/catalog/selectors/catalog-selectors";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsCatalogClient } from "@/features/catalog/components/catalog-client";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, createPageMetadata } from "@/config/site";

export const metadata = createPageMetadata({ title: "Agro & Food Commodities Catalog", description: "Browse export-ready Indian spices, grains, oilseeds, nuts, and processed food products with specification filter and consolidated RFQ builder.", path: "/catalog" });

export default function FoodsCatalogPage() {
  const families = groupCatalogFamilies(getFoodsCatalogListItems());
  const specificationCount = families.reduce((count, family) => count + family.variants.length, 0);
  const categoryCount = new Set(families.map((family) => family.category)).size;
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", "@id": `${absoluteUrl("/catalog")}#catalog`, name: "Harobal Foods commodity catalogue", numberOfItems: families.length, itemListElement: families.map((family, index) => ({ "@type": "ListItem", position: index + 1, name: family.title, url: absoluteUrl(`/catalog/${family.variants[0]?.slug}`) })) };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-brand-ink text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.96)_0%,rgba(7,25,20,.82)_45%,rgba(7,25,20,.28)_100%),url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-center" aria-hidden />
        <div className="container-shell relative py-8 sm:py-12">
          <div className="max-w-3xl">
          <div className="[&_a]:!text-white/82 [&_span]:!text-white [&_svg]:!text-white/72">
            <PageBreadcrumbs />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Catalogue</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Build an export-ready product brief</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82 sm:mt-4 sm:text-lg">
            Shortlist items by category, form, origin, and compliance needs. Add products to your RFQ list and send one consolidated request.
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-7 sm:max-w-xl sm:gap-8 sm:pt-5">
            <div><dt className="text-[8px] font-bold uppercase tracking-[.12em] text-white/55 sm:text-[10px] sm:tracking-[.16em]">Product families</dt><dd className="mt-1 text-lg font-bold sm:text-xl">{families.length}</dd></div>
            <div><dt className="text-[8px] font-bold uppercase tracking-[.12em] text-white/55 sm:text-[10px] sm:tracking-[.16em]">Exact specifications</dt><dd className="mt-1 text-lg font-bold sm:text-xl">{specificationCount}</dd></div>
            <div><dt className="text-[8px] font-bold uppercase tracking-[.12em] text-white/55 sm:text-[10px] sm:tracking-[.16em]">Trade categories</dt><dd className="mt-1 text-lg font-bold sm:text-xl">{categoryCount}</dd></div>
          </dl>
        </div>
        </div>
      </section>

      <section className="bg-hero-wash py-8 sm:py-10 lg:py-12">
        <div className="container-shell">
          <Suspense
            fallback={
              <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]" role="status" aria-label="Loading catalogue">
                <div className="h-60 animate-pulse rounded-2xl border border-border bg-card/75" />
                <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="h-96 animate-pulse rounded-2xl border border-border bg-card/75" />
                  ))}
                </div>
              </div>
            }
          >
            <FoodsCatalogClient families={families.slice(0, 12)} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
