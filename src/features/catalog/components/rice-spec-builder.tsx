"use client";

import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { riceProcesses, riceQuoteOptions, riceVarieties } from "../data/rice-knowledge";

export function RiceSpecBuilder() {
  const [varietyKey, setVarietyKey] = useState("1121");
  const [processKey, setProcessKey] = useState("steam");
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const option = useMemo(() => riceQuoteOptions.find((item) => item.varietyKey === varietyKey && item.processKey === processKey)!, [processKey, varietyKey]);
  const inRequest = items.some((item) => item.slug === option.slug);

  const quoteProduct = {
    slug: option.slug,
    title: option.title,
    category: "Cereals & Grains",
    subCategory: "Rice",
    form: "Grain",
    grade: "Specification to confirm",
    originState: "Basmati GI area — exact origin to confirm",
  };

  return (
    <div className="rounded-[2rem] border border-primary/20 bg-card p-6 shadow-[0_20px_60px_rgba(19,47,42,.1)] sm:p-8">
      <p className="section-kicker">Build a rice request</p>
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose identity before grade.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">This adds the exact variety and processing program to the RFQ. Moisture, broken percentage, packing, destination limits and batch testing remain explicit quotation fields.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold">Variety<select value={varietyKey} onChange={(event) => setVarietyKey(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{riceVarieties.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}</select></label>
        <label className="text-sm font-bold">Processing program<select value={processKey} onChange={(event) => setProcessKey(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{riceProcesses.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={() => inRequest ? removeItem(option.slug) : addItem(quoteProduct)} aria-pressed={inRequest}>{inRequest ? <><Check className="mr-2 size-4" />In RFQ list (remove)</> : <><Plus className="mr-2 size-4" />Add exact rice program</>}</Button>
        <Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button>
      </div>
    </div>
  );
}

