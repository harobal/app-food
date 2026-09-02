"use client";

import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { pulseFamilies, pulseForms, pulseQuoteOptions } from "../data/pulse-knowledge";

export function PulseSpecBuilder() {
  const [familyKey, setFamilyKey] = useState("chickpea");
  const [formKey, setFormKey] = useState("whole");
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const option = useMemo(() => pulseQuoteOptions.find((item) => item.familyKey === familyKey && item.formKey === formKey)!, [familyKey, formKey]);
  const inRequest = items.some((item) => item.slug === option.slug);
  const quoteProduct = { slug: option.slug, title: option.title, category: "Pulses & Lentils", subCategory: "Buyer-selected pulse family", form: pulseForms.find((item) => item.key === formKey)!.label, grade: "Specification to confirm", originState: "India — exact origin to confirm" };
  return <div className="rounded-[2rem] border border-primary/20 bg-card p-6 shadow-[0_20px_60px_rgba(19,47,42,.1)] sm:p-8"><p className="section-kicker">Build a pulse request</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose species family, then processing form.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Size/count, colour, crop year, origin, polish treatment, defect limits, packing and tests remain explicit quotation fields.</p><div className="mt-7 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Pulse family<select value={familyKey} onChange={(event) => setFamilyKey(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{pulseFamilies.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}</select></label><label className="text-sm font-bold">Processing form<select value={formKey} onChange={(event) => setFormKey(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 font-medium">{pulseForms.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={() => inRequest ? removeItem(option.slug) : addItem(quoteProduct)} aria-pressed={inRequest}>{inRequest ? <><Check className="mr-2 size-4" />In RFQ list (remove)</> : <><Plus className="mr-2 size-4" />Add exact pulse program</>}</Button><Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button></div></div>;
}
