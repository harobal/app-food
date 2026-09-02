import { createPageMetadata } from "@/config/site";
import { ArrowRight, Check, ClipboardCheck, FileCheck2, PackageCheck, ShieldCheck, Snowflake, Sprout, Truck } from "lucide-react";
import { foodsCategoriesNav } from "@/content/navigation";
import { FoodsLink } from "@/components/pages/foods-link";
import { Button } from "@/components/ui/button";

export const metadata = createPageMetadata({
  title: "Agro Commodities & Food Products Exports from India",
  description: "Source certified Indian spices, cereals, pulses, oilseeds, and processed agro foods with batch testing, container consolidation, and export logistics.", path: "/" });

const CAPABILITIES = [
  { icon: ShieldCheck, label: "Compliance discipline" },
  { icon: ClipboardCheck, label: "Batch-level QC options" },
  { icon: Snowflake, label: "Cold-chain planning" },
  { icon: FileCheck2, label: "Export documentation" },
] as const;

const PROCESS = [
  ["01", "Shortlist", "Browse by category, form, origin, and available certifications."],
  ["02", "Specify", "Share destination, incoterms, packaging, and required thresholds."],
  ["03", "Validate", "Align grade, testing options, documentation, and commercial feasibility."],
  ["04", "Deliver", "Plan consolidation, shelf-life, route risk, and shipment milestones."],
] as const;

export default function FoodsHomePage() {
  return (
    <>
      <section className="home-hero relative isolate min-h-[700px] overflow-hidden bg-brand-ink text-white lg:min-h-[760px]">
        <div className="absolute inset-0 -z-20 bg-[url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-[center_58%]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,27,22,.96)_0%,rgba(7,27,22,.82)_42%,rgba(7,27,22,.24)_75%,rgba(7,27,22,.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#071b16] to-transparent" />
        <div className="container-shell flex min-h-[700px] flex-col justify-between pb-8 pt-20 lg:min-h-[760px] lg:pb-10 lg:pt-28">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 border-l-2 border-brand-gold pl-3 text-xs font-semibold uppercase tracking-[0.23em] text-white/78">Foods &amp; Agriculture Export Division</p>
            <h1 className="max-w-[13ch] text-[2.75rem] font-extrabold leading-[.99] tracking-[-0.055em] sm:text-[4rem] lg:text-[5.35rem]">Indian foods, prepared for <span className="text-brand-gold">global trade.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">Shortlist from the catalogue and send one consolidated RFQ. We align grades, packaging, documentation, quality-control options, and shipment planning for executable quotes.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 bg-accent px-6 text-accent-foreground hover:bg-[#d9a748]"><FoodsLink href="/catalog">Explore the catalogue <ArrowRight className="ml-1 size-4" /></FoodsLink></Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/45 bg-white/5 px-6 text-white hover:bg-white/12 hover:text-white"><FoodsLink href="/rfq">Build an RFQ</FoodsLink></Button>
            </div>
          </div>
          <div className="mt-14 grid border-y border-white/18 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 border-white/18 px-4 py-4 first:pl-0 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0">
                <Icon className="size-5 shrink-0 text-brand-gold" aria-hidden /><span className="text-sm font-semibold text-white/88">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">Catalogue</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Source across the harvest.</h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">Fresh and shelf-stable programs, organised for faster product discovery and buyer-ready specification.</p>
            <FoodsLink href="/catalog" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-brand-gold">View all products <ArrowRight className="size-4" /></FoodsLink>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {foodsCategoriesNav.map((item, index) => (
              <FoodsLink key={item.category} href={`/catalog?category=${encodeURIComponent(item.category)}`} className="category-row group grid grid-cols-[3rem_1fr_auto] items-center gap-3 py-4 sm:grid-cols-[4rem_1fr_auto] sm:py-5">
                <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">{item.label}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowRight className="size-4" /></span>
              </FoodsLink>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[620px] overflow-hidden text-white">
        <div className="absolute inset-0 -z-20 bg-[url('/media/harvest-meridian/origin-sourcing-panorama.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,34,27,.9)_0%,rgba(10,34,27,.64)_42%,rgba(10,34,27,.08)_76%)]" />
        <div className="container-shell flex min-h-[620px] items-center py-20">
          <div className="max-w-xl border-l border-white/30 pl-6 sm:pl-9">
            <p className="text-xs font-semibold uppercase tracking-[.23em] text-brand-gold">Origins &amp; sourcing</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">From origin intelligence to export-ready supply.</h2>
            <p className="mt-6 text-base leading-7 text-white/82">Programs account for seasonality, origin, grading, processing, packaging, and destination-market expectations—before shipment planning begins.</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/88">
              {["Origin-aligned selection", "Seasonality planning", "Buyer-defined grades"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-brand-gold" />{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-surface">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[2rem] bg-brand-ink text-white shadow-2xl lg:grid lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[390px] lg:min-h-[590px]">
              <div className="absolute inset-0 bg-[url('/media/harvest-meridian/quality-control-lab.webp')] bg-cover bg-[center_60%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-ink/30" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-brand-ink/70 px-4 py-2 text-xs font-semibold backdrop-blur-md">Buyer-aligned quality parameters</div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[.23em] text-brand-gold">Quality discipline</p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Evidence before assurance.</h2>
              <p className="mt-6 leading-7 text-white/76">Quality scope is aligned to product, buyer specification, and destination requirements. Available controls can include batch parameters, safety testing, traceability, and documentation review.</p>
              <div className="mt-8 space-y-4">
                {[[PackageCheck, "Grade and specification alignment"], [ShieldCheck, "Batch-level QC and safety-test options"], [FileCheck2, "Documentation-readiness review"]].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-4 border-t border-white/12 pt-4"><Icon className="size-5 text-brand-gold" /><span className="text-sm font-semibold text-white/88">{label as string}</span></div>
                ))}
              </div>
              <FoodsLink href="/quality" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-white">Review our quality approach <ArrowRight className="size-4" /></FoodsLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container-shell">
          <div className="max-w-2xl"><p className="section-kicker">How it works</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">One controlled path from interest to shipment.</h2></div>
          <ol className="mt-12 grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(([number, title, detail]) => (
              <li key={number} className="relative border-b border-border py-7 md:px-6 md:first:pl-0 lg:border-r lg:last:border-r-0"><span className="font-mono text-xs font-bold text-brand-gold">{number}</span><h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-ink text-white">
        <div className="absolute inset-0 -z-20 bg-[url('/media/harvest-meridian/cold-chain-logistics.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,22,18,.96)_0%,rgba(5,22,18,.86)_44%,rgba(5,22,18,.18)_80%)]" />
        <div className="container-shell flex min-h-[560px] items-center py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-brand-gold"><Truck className="size-5" /><span className="text-xs font-semibold uppercase tracking-[.23em]">Logistics confidence</span></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-5xl">Shipment planning that respects the product.</h2>
            <p className="mt-6 leading-7 text-white/80">Container strategy, consolidation, storage conditions, cold-chain options, documentation, and route risk are aligned to the selected product program.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-[#d9a748]"><FoodsLink href="/logistics">Explore logistics</FoodsLink></Button><Button asChild size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/12 hover:text-white"><FoodsLink href="/services">View services</FoodsLink></Button></div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#d9a747] text-brand-ink">
        <div className="container-shell relative py-14 sm:py-16">
          <Sprout className="absolute -right-4 -top-10 size-56 rotate-12 text-brand-ink/7" aria-hidden />
          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[.22em]">Ready to source?</p><h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Build one RFQ across products, grades, and origins.</h2></div>
            <Button asChild size="lg" className="h-12 shrink-0 bg-brand-ink px-7 text-white hover:bg-[#21483d]"><FoodsLink href="/rfq">Start your RFQ <ArrowRight className="ml-1 size-4" /></FoodsLink></Button>
          </div>
        </div>
      </section>
    </>
  );
}
