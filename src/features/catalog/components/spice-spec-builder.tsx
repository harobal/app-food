"use client";

import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { spiceForms, spiceIdentities, spiceQuoteOptions } from "../data/spice-knowledge";

export function SpiceSpecBuilder() {
  const [identityKey, setIdentityKey] = useState("pepper-black");
  const [formKey, setFormKey] = useState("whole");
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const builderIdentities = spiceIdentities.filter((item) => item.key !== "saffron");
  const option = useMemo(() => spiceQuoteOptions.find((item) => item.identityKey === identityKey && item.formKey === formKey)!, [identityKey, formKey]);
  const inRequest = items.some((item) => item.slug === option.slug);
  const quoteProduct = { slug: option.slug, title: option.title, category: "Spices & Herbs", subCategory: "Single-ingredient spice", form: spiceForms.find((item) => item.key === formKey)!.label, grade: "Specification to confirm", originState: "Exact lot origin to confirm" };

  return <div className="rounded-[2rem] border border-primary/20 bg-card p-6 shadow-[0_20px_60px_rgba(19,47,42,.1)] sm:p-8">
    <p className="section-kicker">Build a spice request</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose identity before strength or grade.</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">This builder covers source-mapped single spices available in all three forms. Saffron and blends require a separate authenticity or controlled-formula review.</p>
    <div className="mt-7 grid gap-5 md:grid-cols-2">
      <label className="text-sm font-bold">Spice identity<select value={identityKey} onChange={(e) => setIdentityKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{builderIdentities.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}</select></label>
      <label className="text-sm font-bold">Form<select value={formKey} onChange={(e) => setFormKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{spiceForms.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
    </div>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={() => inRequest ? removeItem(option.slug) : addItem(quoteProduct)}>{inRequest ? <><Check className="mr-2 size-4" />In RFQ list (remove)</> : <><Plus className="mr-2 size-4" />Add exact spice program</>}</Button><Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button></div>
  </div>;
}
