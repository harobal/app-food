import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { FoodsLink } from "@/components/pages/foods-link";
import { Button } from "@/components/ui/button";

type CapabilityItem = { title: string; description: string };

export function TradeCapabilityPage({ eyebrow, title, introduction, image, imageLabel, items }: { eyebrow: string; title: string; introduction: string; image: string; imageLabel: string; items: readonly CapabilityItem[] }) {
  return <>
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-brand-ink text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(90deg,rgba(7,25,20,.96),rgba(7,25,20,.76) 52%,rgba(7,25,20,.18)),url(${image})` }} aria-hidden />
      <div className="container-shell relative py-12 sm:py-16">
        <div className="max-w-3xl [&_a]:!text-white/82 [&_span]:!text-white [&_svg]:!text-white/72"><PageBreadcrumbs /></div>
        <div className="mt-7 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-gold">{eyebrow}</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 text-base leading-7 text-white/78 sm:text-lg">{introduction}</p></div>
        <p className="mt-8 inline-flex rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-white/70 backdrop-blur">{imageLabel}</p>
      </div>
    </section>
    <section className="bg-hero-wash py-12 sm:py-16">
      <div className="container-shell">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => <article key={item.title} className="group bg-card p-6 transition-colors hover:bg-primary/[.035] sm:p-8"><div className="flex items-center justify-between"><span className="text-xs font-bold text-primary">0{index + 1}</span><CheckCircle2 className="size-5 text-brand-gold" /></div><h2 className="mt-8 text-xl font-bold tracking-tight">{item.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p></article>)}
        </div>
        <div className="mt-10 flex flex-col justify-between gap-5 rounded-3xl bg-brand-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:px-9"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-gold">Build the requirement brief</p><p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">Share product specifications, destination, packaging, compliance needs, and shipment timing for a commercially useful response.</p></div><Button asChild className="shrink-0 bg-accent text-accent-foreground hover:bg-[#d9a748]"><FoodsLink href="/rfq">Start an RFQ <ArrowRight className="size-4" /></FoodsLink></Button></div>
      </div>
    </section>
  </>;
}
