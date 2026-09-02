import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FlaskConical, Scale, ShieldCheck } from "lucide-react";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { FoodsLink } from "@/components/pages/foods-link";
import { RiceSpecBuilder } from "@/features/catalog/components/rice-spec-builder";
import { basmatiStandards, riceProcesses, riceSources, riceVarieties } from "@/features/catalog/data/rice-knowledge";
import { absoluteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Basmati Rice Varieties, Processing and Specifications",
  description: "Compare Pusa Basmati 1121 and 1509, understand steam and parboiled trade programs, and build a source-backed rice RFQ.",
  alternates: { canonical: absoluteUrl("/knowledge/rice") },
};

export default function RiceKnowledgePage() {
  return (
    <>
      <section className="border-b border-border bg-background"><div className="container-shell py-6"><PageBreadcrumbs /></div></section>
      <section className="bg-hero-wash py-16 sm:py-20"><div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="section-kicker">Rice knowledge centre</p><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Know the variety. Specify the process. Contract the measurable result.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Basmati identity, regulatory type and commercial grade answer different questions. This guide keeps them separate so a buyer can compare accurately and request evidence that belongs to the selected lot.</p></div><div className="rounded-2xl border border-primary/15 bg-card p-6"><ShieldCheck className="size-7 text-primary" /><p className="mt-5 font-semibold">Evidence boundary</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Values below are regulatory reference thresholds, not a Harobal batch COA. Final origin, grade, limits and tests are confirmed during RFQ.</p></div></div></section>

      <section className="section-space bg-background"><div className="container-shell"><div className="max-w-3xl"><p className="section-kicker">Variety comparison</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">1121 and 1509 are identities—not grades.</h2></div><div className="mt-9 grid gap-5 lg:grid-cols-2">{riceVarieties.map((variety) => <article key={variety.key} className="rounded-2xl border border-border bg-card p-7"><div className="flex items-center justify-between gap-4"><h3 className="text-2xl font-semibold">{variety.name}</h3><Badge variant="outline">Verified identity</Badge></div><p className="mt-5 leading-7 text-muted-foreground">{variety.identity}</p><div className="mt-5 rounded-xl bg-primary/5 p-4 text-sm leading-6"><strong>Official characteristic context:</strong> {variety.plantTraits}</div></article>)}</div></div></section>

      <section className="section-space bg-brand-surface"><div className="container-shell"><div className="grid gap-5 lg:grid-cols-2">{riceProcesses.map((process) => <article key={process.key} className="rounded-2xl bg-card p-7 shadow-sm"><FlaskConical className="size-6 text-primary" /><h2 className="mt-5 text-2xl font-semibold">{process.label}</h2><p className="mt-4 leading-7 text-muted-foreground">{process.regulatoryContext}</p></article>)}</div><div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card"><div className="border-b border-border p-6"><p className="section-kicker">FSSAI reference baseline</p><h2 className="mt-3 text-2xl font-semibold">Milled versus milled-parboiled Basmati</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-primary/5"><tr><th className="p-4">Parameter</th><th className="p-4">Milled</th><th className="p-4">Milled parboiled</th></tr></thead><tbody>{basmatiStandards.map((row) => <tr key={row.parameter} className="border-t border-border"><th className="p-4 font-semibold">{row.parameter}</th><td className="p-4">{row.milled}</td><td className="p-4">{row.parboiled}</td></tr>)}</tbody></table></div></div></div></section>

      <section className="section-space bg-background"><div className="container-shell"><RiceSpecBuilder /><div className="mt-10 grid gap-5 md:grid-cols-3">{[[Scale,"Contract specification","Declare variety, regulatory type, moisture, broken grains, extraneous matter, packing and quantity."],[FlaskConical,"Batch evidence","Request the relevant physical, residue, contaminant and authenticity tests for the destination."],[CheckCircle2,"Origin truth","Basmati origin must align with the protected GI geography; exact mill and crop origin are confirmed per program."]].map(([Icon,title,text]) => <article key={title as string} className="rounded-2xl border border-border p-6"><Icon className="size-6 text-primary" /><h2 className="mt-5 text-xl font-semibold">{title as string}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{text as string}</p></article>)}</div></div></section>

      <section className="section-space bg-brand-ink text-white"><div className="container-shell"><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-gold">Primary sources</p><div className="mt-6 grid gap-3">{riceSources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/15 p-4 text-sm text-white/80 hover:border-brand-gold"><span><strong className="text-white">{source.authority}</strong> — {source.title}</span><ArrowRight className="size-4" /></a>)}</div><FoodsLink href="/catalog?category=Cereals+%26+Grains" className="mt-8 inline-flex font-bold text-brand-gold">Browse rice catalogue →</FoodsLink></div></section>
    </>
  );
}

