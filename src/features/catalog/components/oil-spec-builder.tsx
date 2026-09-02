"use client";
import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { oilFamilies, oilProcesses, oilQuoteOptions } from "../data/oil-knowledge";

export function OilSpecBuilder() {
  const oilFamiliesOnly = oilFamilies.filter((item) => "oilPrefix" in item);
  const [familyKey,setFamilyKey]=useState("groundnut"); const [processKey,setProcessKey]=useState("cold-pressed");
  const {items,addItem,removeItem}=useFoodsQuoteRequest();
  const option=useMemo(()=>oilQuoteOptions.find((item)=>item.familyKey===familyKey&&item.processKey===processKey)!,[familyKey,processKey]);
  const inRequest=items.some((item)=>item.slug===option.slug);
  const product={slug:option.slug,title:option.title,category:"Oilseeds & Oils",subCategory:"Edible vegetable oil",form:"Oil",grade:"Specification to confirm",originState:"Exact lot origin to confirm"};
  return <div className="rounded-[2rem] border border-primary/20 bg-card p-6 sm:p-8"><p className="section-kicker">Build an edible-oil request</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose oil identity and verified process.</h2><div className="mt-7 grid gap-5 md:grid-cols-2"><label className="text-sm font-bold">Oil identity<select value={familyKey} onChange={(e)=>setFamilyKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4">{oilFamiliesOnly.map((item)=><option key={item.key} value={item.key}>{item.name}</option>)}</select></label><label className="text-sm font-bold">Process program<select value={processKey} onChange={(e)=>setProcessKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4">{oilProcesses.map((item)=><option key={item.key} value={item.key}>{item.label}</option>)}</select></label></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={()=>inRequest?removeItem(option.slug):addItem(product)}>{inRequest?<><Check className="mr-2 size-4"/>In RFQ list (remove)</>:<><Plus className="mr-2 size-4"/>Add oil program</>}</Button><Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button></div></div>;
}
