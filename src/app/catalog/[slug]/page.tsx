import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Box, CalendarClock, CheckCircle2, FileCheck2, MapPin, PackageCheck, ShieldCheck } from "lucide-react";
import { getFoodsCatalogListItems, getFoodsProductBySlug } from "@/features/catalog/data/catalog";
import { getFamilyMedia } from "@/features/catalog/data/media";
import { groupCatalogFamilies } from "@/features/catalog/selectors/catalog-selectors";
import { CatalogFamilyCard } from "@/features/catalog/components/catalog-family-card";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { FoodsLink } from "@/components/pages/foods-link";
import { FoodsProductActions } from "@/components/pages/product/product-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getRiceKnowledgeForSlug } from "@/features/catalog/data/rice-knowledge";
import { getPulseKnowledgeForSlug } from "@/features/catalog/data/pulse-knowledge";
import { getSpiceKnowledgeForSlug } from "@/features/catalog/data/spice-knowledge";
import { getNutKnowledgeForSlug } from "@/features/catalog/data/nuts-knowledge";
import { getOilKnowledgeForSlug } from "@/features/catalog/data/oil-knowledge";
import { getDehydratedKnowledgeForSlug } from "@/features/catalog/data/dehydrated-knowledge";
import { getFruitKnowledgeForSlug } from "@/features/catalog/data/fruit-knowledge";
import { getVegetableKnowledgeForSlug } from "@/features/catalog/data/vegetable-knowledge";
import { getSweetenerKnowledgeForSlug } from "@/features/catalog/data/sweetener-knowledge";
import { getGrainKnowledgeForSlug } from "@/features/catalog/data/grain-knowledge";
import { getTeaKnowledgeForSlug } from "@/features/catalog/data/tea-knowledge";
import { getCoffeeKnowledgeForSlug } from "@/features/catalog/data/coffee-knowledge";
import { getProcessedPlantKnowledgeForSlug } from "@/features/catalog/data/processed-plant-knowledge";

type PageParams = { params: Promise<{ slug: string }> };

function splitSemi(value: string) {
  return value.split(";").map((item) => item.trim()).filter(Boolean);
}

export async function generateStaticParams() {
  return getFoodsCatalogListItems().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = getFoodsProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  const categoryImage = getFamilyMedia(product.category, product.heroImage);
  const title = `${product.title} — ${product.form}, ${product.grade} from ${product.originState}`;
  const canonical = absoluteUrl(`/catalog/${product.slug}`);
  return {
    title,
    description: product.summary,
    alternates: { canonical },
    openGraph: { type: "website", url: canonical, siteName: siteConfig.appName, title: `${title} | Harobal Foods`, description: product.summary, images: [{ url: absoluteUrl(categoryImage), alt: `${product.category} sourcing context for ${product.title}` }] },
    twitter: { card: "summary_large_image", title, description: product.summary, images: [absoluteUrl(categoryImage)] },
  };
}

export default async function FoodsCatalogDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const product = getFoodsProductBySlug(slug);
  if (!product) notFound();

  const categoryImage = getFamilyMedia(product.category, product.heroImage);
  const relatedFamilies = groupCatalogFamilies(getFoodsCatalogListItems())
    .filter((family) => family.category === product.category && !family.variants.some((variant) => variant.slug === product.slug))
    .slice(0, 3);
  const quoteHint = "For accurate quoting, share destination port, incoterms, packaging format, and required certifications.";
  const canonical = absoluteUrl(`/catalog/${product.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Catalogue", item: absoluteUrl("/catalog") },
        { "@type": "ListItem", position: 3, name: product.title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonical}#product`,
      name: product.title,
      description: product.summary,
      sku: product.id,
      category: `${product.category} > ${product.subCategory}`,
      url: canonical,
      image: [absoluteUrl(categoryImage)],
      brand: { "@type": "Brand", name: siteConfig.appName },
      countryOfOrigin: { "@type": "Country", name: "India" },
      additionalProperty: [
        ["Form", product.form], ["Grade", product.grade], ["Origin state", product.originState], ["Typical MOQ", product.moq || "On request"], ["Typical lead time", `${product.leadTimeDays} days`],
      ].map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    },
  ];
  const riceKnowledge = getRiceKnowledgeForSlug(product.slug);
  const pulseKnowledge = getPulseKnowledgeForSlug(product.slug);
  const spiceKnowledge = getSpiceKnowledgeForSlug(product.slug);
  const nutKnowledge = getNutKnowledgeForSlug(product.slug);
  const oilKnowledge = getOilKnowledgeForSlug(product.slug);
  const dehydratedKnowledge = getDehydratedKnowledgeForSlug(product.slug);
  const fruitKnowledge = getFruitKnowledgeForSlug(product.slug);
  const vegetableKnowledge = getVegetableKnowledgeForSlug(product.slug);
  const sweetenerKnowledge = getSweetenerKnowledgeForSlug(product.slug);
  const grainKnowledge = getGrainKnowledgeForSlug(product.slug);
  const teaKnowledge = getTeaKnowledgeForSlug(product.slug);
  const coffeeKnowledge = getCoffeeKnowledgeForSlug(product.slug);
  const processedPlantKnowledge = getProcessedPlantKnowledgeForSlug(product.slug);

  return (
    <>
      <JsonLd data={structuredData} />
      <section className="border-b border-border bg-background">
        <div className="container-shell py-6"><PageBreadcrumbs /></div>
      </section>

      <section className="bg-hero-wash pb-16 pt-8 sm:pb-20 lg:pb-24">
        <div className="container-shell">
          <FoodsLink href="/catalog" className="inline-flex text-sm font-bold text-muted-foreground hover:text-primary">← Back to catalogue</FoodsLink>

          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_23rem]">
            <div className="min-w-0">
              <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-brand-ink shadow-[0_24px_70px_rgba(19,47,42,.18)] sm:min-h-[560px]">
                <Image src={categoryImage} alt={`${product.category} category visual for ${product.title}`} fill priority sizes="(min-width: 1280px) 850px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,19,.06)_20%,rgba(6,24,19,.9)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9 lg:p-12">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-gold">{product.category} · {product.subCategory}</p>
                  <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{product.title}</h1>
                  <p className="mt-4 text-base font-medium text-white/78 sm:text-lg">{product.subtitle}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">Category visual for sourcing context. Product appearance, crop, and packaging vary by selected specification and batch.</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[product.category, product.subCategory, product.form, product.grade, product.originState].filter(Boolean).map((item) => <Badge key={item} variant="outline" className="bg-card">{item}</Badge>)}
                {product.certificationsAvailable.slice(0, 3).map((item) => <Badge key={item} variant="outline" className="border-primary/25 bg-primary/5 text-primary">{item}</Badge>)}
              </div>

              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                {[
                  [Box, "MOQ", product.moq || "On request"],
                  [CalendarClock, "Typical lead time", `${product.leadTimeDays} days`],
                  [PackageCheck, "Typical shelf-life", `${product.shelfLifeMonths} months`],
                ].map(([Icon, label, value]) => (
                  <div key={label as string} className="bg-card p-5"><Icon className="size-5 text-primary" /><p className="mt-4 text-xs font-bold uppercase tracking-[.15em] text-muted-foreground">{label as string}</p><p className="mt-1 font-semibold">{value as string}</p></div>
                ))}
              </div>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <FoodsProductActions product={{ slug: product.slug, title: product.title, category: product.category, subCategory: product.subCategory, form: product.form, grade: product.grade, originState: product.originState }} quoteHint={quoteHint} />
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Request checklist</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  {["Destination country and port", "Incoterms and target quantity", "Bulk, retail, or private-label packaging", "Required certificates and test thresholds"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-gold" />{item}</li>)}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container-shell grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="section-kicker">Product brief</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Specification before quotation.</h2>
            <p className="mt-5 leading-7 text-muted-foreground">{product.summary}</p>
            <p className="mt-4 leading-7 text-muted-foreground">{product.description}</p>
          </div>
          <dl className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
            {product.specs.map((row) => <div key={row.label} className="border-b border-border p-5 last:border-b-0 sm:border-r sm:[&:nth-child(even)]:border-r-0"><dt className="text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">{row.label}</dt><dd className="mt-2 text-sm font-medium leading-6">{row.value}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="section-space bg-brand-surface">
        <div className="container-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl bg-brand-ink p-7 text-white lg:row-span-2"><ShieldCheck className="size-7 text-brand-gold" /><p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-brand-gold">Quality parameters</p><ul className="mt-5 space-y-3 text-sm leading-6 text-white/78">{splitSemi(product.qualityParameters || "").map((item) => <li key={item} className="border-t border-white/12 pt-3">{item}</li>)}</ul></article>
            <article className="rounded-2xl border border-border bg-card p-7 lg:col-span-2"><FileCheck2 className="size-6 text-primary" /><h2 className="mt-5 text-2xl font-semibold">Safety-test scope</h2><ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">{splitSemi(product.safetyTests || "").map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article>
            <article className="rounded-2xl border border-border bg-card p-7"><h2 className="text-xl font-semibold">Certifications available</h2><div className="mt-4 flex flex-wrap gap-2">{product.certificationsAvailable.length ? product.certificationsAvailable.map((item) => <Badge key={item} variant="outline">{item}</Badge>) : <p className="text-sm text-muted-foreground">Share destination and required certificates for alignment.</p>}</div></article>
            <article className="rounded-2xl border border-border bg-card p-7"><h2 className="text-xl font-semibold">Use cases</h2><div className="mt-4 flex flex-wrap gap-2">{product.useCases.length ? product.useCases.map((item) => <Badge key={item} variant="outline">{item}</Badge>) : <p className="text-sm text-muted-foreground">Use-case alignment is confirmed during specification review.</p>}</div></article>
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-5 text-sm text-muted-foreground"><MapPin className="size-5 shrink-0 text-primary" />Origin, certification, testing, and packing availability are confirmed against the selected batch and destination requirements.</div>
        </div>
      </section>

      {riceKnowledge ? (
        <section className="section-space bg-background">
          <div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="section-kicker">Rice knowledge</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">{riceKnowledge.variety ? `Understand ${riceKnowledge.variety.name}` : "Verify this rice identity"} before quotation.</h2>
              <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{riceKnowledge.process?.regulatoryContext ?? "This legacy rice identity requires variety, processing, origin and grade review before it becomes a canonical specification."}</p>
            </div>
            <FoodsLink href="/knowledge/rice" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare rice programs →</FoodsLink>
          </div>
        </section>
      ) : null}

      {pulseKnowledge ? (
        <section className="section-space bg-background">
          <div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div><p className="section-kicker">Pulse knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Understand {pulseKnowledge.family.name} before quotation.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{pulseKnowledge.form?.meaning ?? pulseKnowledge.family.distinction}</p></div>
            <FoodsLink href="/knowledge/pulses" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare pulse programs →</FoodsLink>
          </div>
        </section>
      ) : null}

      {spiceKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Spice knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">{spiceKnowledge.kind === "identity" ? `Verify ${spiceKnowledge.identity.name}` : spiceKnowledge.kind === "blend" ? "Approve the complete blend formula" : "Verify spice identity and form"} before quotation.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{spiceKnowledge.kind === "identity" ? spiceKnowledge.identity.discriminator : spiceKnowledge.kind === "blend" ? "Blend names do not establish ingredients, allergens or vegan status. A controlled formula and destination label review are required." : "The botanical identity, plant part, processing form and lot-specific quality limits must be explicit."}</p></div><FoodsLink href="/knowledge/spices" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare spice programs →</FoodsLink></div></section> : null}

      {nutKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Nuts & dried fruits knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Specify {nutKnowledge.identity.name} by style and measurable limits.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{nutKnowledge.identity.distinction}</p></div><FoodsLink href="/knowledge/nuts-dried-fruits" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare nut programs →</FoodsLink></div></section> : null}

      {oilKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Oilseed & oil knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Verify {oilKnowledge.family.name} identity and {oilKnowledge.isOil ? "processing" : "use class"}.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{oilKnowledge.family.distinction}</p></div><FoodsLink href="/knowledge/oilseeds-oils" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare oil programs →</FoodsLink></div></section> : null}

      {dehydratedKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Dehydrated product knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Specify {dehydratedKnowledge.product.name} by process and performance.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{dehydratedKnowledge.group?.rule}</p></div><FoodsLink href="/knowledge/dehydrated-processed" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare dehydrated programs →</FoodsLink></div></section> : null}

      {fruitKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Fresh fruit knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Contract {fruitKnowledge.product.name} by maturity and arrival condition.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{fruitKnowledge.product.identity}</p></div><FoodsLink href="/knowledge/fresh-fruits" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare fruit programs →</FoodsLink></div></section> : null}

      {vegetableKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Fresh vegetable knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Contract {vegetableKnowledge.product.name} by use, grade and arrival condition.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{vegetableKnowledge.product.identity}</p></div><FoodsLink href="/knowledge/fresh-vegetables" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare vegetable programs →</FoodsLink></div></section> : null}

      {sweetenerKnowledge ? <section className="section-space bg-background"><div className={`container-shell grid gap-8 rounded-[2rem] border p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10 ${sweetenerKnowledge.isHoney ? "border-amber-400/40 bg-amber-50" : "border-primary/15 bg-primary/5"}`}><div><p className="section-kicker">Sweetener knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Verify {sweetenerKnowledge.product.name} identity, composition and claims.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{sweetenerKnowledge.product.identity}</p>{sweetenerKnowledge.isHoney?<p className="mt-3 font-bold text-amber-950">Honey is the catalogue’s sole animal-derived exception. It is not vegan.</p>:null}</div><FoodsLink href="/knowledge/sweeteners" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare sweetener programs →</FoodsLink></div></section> : null}

      {grainKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Grain & millet knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Specify {grainKnowledge.product.name} as {grainKnowledge.form.name.toLowerCase()}.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{grainKnowledge.product.distinction}</p><p className="mt-3 text-sm font-semibold">Gluten status: {grainKnowledge.product.glutenClass.replaceAll("-"," ")}.</p></div><FoodsLink href="/knowledge/grains" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare grain programs →</FoodsLink></div></section> : null}

      {teaKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Tea knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Verify {teaKnowledge.program.name} from garden to cup.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{teaKnowledge.program.identity}</p><p className="mt-3 text-sm font-semibold">{teaKnowledge.program.claim}.</p></div><FoodsLink href="/knowledge/tea" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare tea programs →</FoodsLink></div></section> : null}

      {coffeeKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Green-coffee knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Verify {coffeeKnowledge.program.name} by type, lot and cup.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{coffeeKnowledge.program.identity}</p></div><FoodsLink href="/knowledge/coffee" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare coffee programs →</FoodsLink></div></section> : null}

      {processedPlantKnowledge ? <section className="section-space bg-background"><div className="container-shell grid gap-8 rounded-[2rem] border border-primary/15 bg-primary/5 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10"><div><p className="section-kicker">Processed plant-food knowledge</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Verify {processedPlantKnowledge.program.name} by identity, formula and lot.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{processedPlantKnowledge.program.identity}</p><p className="mt-3 text-sm font-semibold">Complete vegan and allergen review is mandatory.</p></div><FoodsLink href="/knowledge/processed-plant-foods" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground">Compare processed programs →</FoodsLink></div></section> : null}

      {relatedFamilies.length ? <section className="section-space bg-background"><div className="container-shell"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">Related sourcing</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">More from {product.category}</h2></div><FoodsLink href={`/catalog?category=${encodeURIComponent(product.category)}`} className="text-sm font-bold text-primary">View category →</FoodsLink></div><div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{relatedFamilies.map((family) => <CatalogFamilyCard key={family.key} family={family} />)}</div></div></section> : null}
    </>
  );
}
