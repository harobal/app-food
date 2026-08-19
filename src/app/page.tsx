import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { getFoodsCatalogListItems } from "@/services/catalog";
import { SectionHeading } from "@/components/layout/section-heading";
import { FoodsLink } from "@/components/pages/foods-link";
import { FoodsProductCard } from "@/components/pages/foods-product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Agro Commodities & Food Products Exports from India",
  description:
    "Source certified Indian spices, cereals, pulses, oilseeds, and processed agro foods with batch testing, container consolidation, and export logistics.",
};

const HERO_CATEGORIES = [
  "Spices & Herbs",
  "Nuts & Dry Fruits",
  "Oilseeds & Oils",
  "Cereals & Grains",
  "Pulses & Lentils",
  "Dehydrated & Processed",
] as const;

export default function FoodsHomePage() {
  const all = getFoodsCatalogListItems();

  const featured: typeof all = [];
  const used = new Set<string>();

  for (const cat of HERO_CATEGORIES) {
    const pick = all.find((p) => p.category === cat);
    if (pick && !used.has(pick.slug)) {
      featured.push(pick);
      used.add(pick.slug);
    }
  }

  for (const p of all) {
    if (featured.length >= 6) break;
    if (used.has(p.slug)) continue;
    featured.push(p);
    used.add(p.slug);
  }

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-botanical-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,color-mix(in_srgb,var(--brand-gold)_22%,transparent),transparent_32%),radial-gradient(circle_at_12%_88%,color-mix(in_srgb,var(--brand-signal)_18%,transparent),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="container-shell relative pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="space-y-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                Foods &amp; Agriculture Export Division
              </p>
              <h1 className="text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-[3.1rem] lg:text-[3.85rem]">
                Export-ready Indian foods — <span className="text-brand-gold">built for compliance and delivery</span>
              </h1>
              <p className="max-w-2xl text-base text-white/88 sm:text-lg">
                Shortlist from the catalogue, add items to your RFQ list, and send one consolidated request. We align grades,
                packaging, documentation, and shipment planning for executable quotes.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <FoodsLink href="/catalog">
                    Browse Catalogue <ArrowRight className="ml-1 size-4" />
                  </FoodsLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/55 bg-transparent text-white hover:bg-white/10"
                >
                  <FoodsLink href="/rfq">Send RFQ</FoodsLink>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-white/90">
                {["Traceability mindset", "Residue alignment", "Cold-chain options", "Batch QC", "Documentation ready"].map(
                  (badge) => (
                    <span key={badge} className="rounded-full border border-white/25 bg-white/10 px-3 py-1">
                      {badge}
                    </span>
                  ),
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <article className="elevated-card overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                <div
                  className="h-65 w-full bg-cover bg-center sm:h-80"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(7,18,35,0.08) 0%, rgba(7,18,35,0.76) 100%), url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=2000&q=80)",
                  }}
                  aria-hidden
                />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Catalogue-first, RFQ-led</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Fresh + shelf-stable supply programs</p>
                  <p className="mt-2 text-sm text-white/85">
                    Use the catalogue to shortlist items across spices, grains, nuts, pulses, dehydrated formats, and seasonal fresh.
                  </p>
                </div>
              </article>

              <div className="grid gap-3 sm:grid-cols-2">
                {[{ icon: ShieldCheck, label: "Compliance discipline" }, { icon: Truck, label: "Shipment readiness" }, { icon: Snowflake, label: "Cold-chain handling" }, { icon: ClipboardCheck, label: "Documentation control" }].map(
                  ({ icon: Icon, label }) => (
                    <div key={label} className="rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 text-brand-gold" />
                        <p className="text-sm font-semibold">{label}</p>
                      </div>
                      <p className="mt-2 text-xs text-white/78">Built for buyer clarity and predictable outcomes.</p>
                    </div>
                  ),
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Featured"
            title="Start with high-demand, high-repeat categories"
            subtitle="A curated entry set — expand in the catalogue by category, form, origin, and certifications."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((product) => (
              <FoodsProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-brand-surface">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How It Works"
            title="A sourcing flow designed for export execution"
            subtitle="We align specs, documentation, and shipment planning — so procurement stays controlled."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Shortlist",
                detail: "Browse the catalogue and shortlist items by category, form, and origin.",
              },
              {
                title: "Specify",
                detail: "Share destination market, incoterms, packaging, and compliance requirements.",
              },
              {
                title: "Validate",
                detail: "We align grade, batch QC options, and documentation readiness for the destination.",
              },
              {
                title: "Deliver",
                detail: "Shipment planning aligned to shelf-life and route risk, with clear milestones.",
              },
            ].map((step) => (
              <Card key={step.title} className="elevated-card overflow-hidden">
                <div className="h-1.5 w-full bg-primary/15" aria-hidden />
                <CardContent className="p-5">
                  <p className="text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-4" /> Execution-led
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <FoodsLink href="/catalog">Explore Full Catalogue</FoodsLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <FoodsLink href="/rfq">Build an RFQ</FoodsLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
