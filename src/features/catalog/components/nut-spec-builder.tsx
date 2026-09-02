"use client";
import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { nutIdentities, nutQuoteOptions, nutStyles } from "../data/nuts-knowledge";

export function NutSpecBuilder() {
  const [identityKey, setIdentityKey] = useState("almond"); const [styleKey, setStyleKey] = useState("whole");
  const { items, addItem, removeItem } = useFoodsQuoteRequest();
  const identity = nutIdentities.find((item) => item.key === identityKey)!;
  const availableStyles = nutStyles.filter((style) => (identity.styles as readonly string[]).includes(style.key));
  const option = useMemo(() => nutQuoteOptions.find((item) => item.identityKey === identityKey && item.styleKey === styleKey)!, [identityKey, styleKey]);
  const inRequest = items.some((item) => item.slug === option.slug);
  const product = { slug: option.slug, title: option.title, category: "Nuts & Dry Fruits", subCategory: "Buyer-selected identity", form: "Dry", grade: "Specification to confirm", originState: "Exact lot origin to confirm" };
  return <div className="rounded-[2rem] border border-primary/20 bg-card p-6 shadow-[0_20px_60px_rgba(19,47,42,.1)] sm:p-8"><p className="section-kicker">Build a nut or dried-fruit request</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose identity, then a measurable style.</h2><div className="mt-7 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Product identity<select value={identityKey} onChange={(e) => { const next=e.target.value; setIdentityKey(next); const nextIdentity=nutIdentities.find((item)=>item.key===next)!; if (!(nextIdentity.styles as readonly string[]).includes(styleKey)) setStyleKey("whole"); }} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4">{nutIdentities.map((item)=><option key={item.key} value={item.key}>{item.name}</option>)}</select></label><label className="text-sm font-bold">Kernel/fruit style<select value={styleKey} onChange={(e)=>setStyleKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4">{availableStyles.map((item)=><option key={item.key} value={item.key}>{item.label}</option>)}</select></label></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={()=>inRequest?removeItem(option.slug):addItem(product)}>{inRequest?<><Check className="mr-2 size-4"/>In RFQ list (remove)</>:<><Plus className="mr-2 size-4"/>Add exact program</>}</Button><Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button></div></div>;
}
