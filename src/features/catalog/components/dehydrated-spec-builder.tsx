"use client";
import { useMemo,useState } from "react";
import{Check,Plus}from"lucide-react";
import{Button}from"@/components/ui/button";
import{FoodsLink}from"@/components/pages/foods-link";
import{useFoodsQuoteRequest}from"@/features/quote-request";
import{dehydratedProducts,dehydratedQuoteOptions}from"../data/dehydrated-knowledge";

export function DehydratedSpecBuilder(){
 const options=dehydratedProducts.filter((item)=>dehydratedQuoteOptions.some((option)=>option.productKey===item.key));
 const[key,setKey]=useState<string>(options[0].key);
 const{items,addItem,removeItem}=useFoodsQuoteRequest();
 const option=useMemo(()=>dehydratedQuoteOptions.find((item)=>item.productKey===key)!,[key]);
 const productInfo=options.find((item)=>item.key===key)!;
 const active=items.some((item)=>item.slug===option.slug);
 const product={slug:option.slug,title:option.title,category:"Dehydrated & Processed",subCategory:productInfo.group,form:productInfo.form,grade:"Specification to confirm",originState:"Exact lot origin to confirm"};
 return <div className="rounded-[2rem] border border-primary/20 bg-card p-6 sm:p-8"><p className="section-kicker">Build a dehydrated-product request</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Choose identity before mesh or assay.</h2><label className="mt-7 block max-w-xl text-sm font-bold">Product identity<select value={key} onChange={(e)=>setKey(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4">{options.map((item)=><option key={item.key} value={item.key}>{item.name}</option>)}</select></label><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button type="button" className="h-12 bg-accent font-bold text-accent-foreground" onClick={()=>active?removeItem(option.slug):addItem(product)}>{active?<><Check className="mr-2 size-4"/>In RFQ list (remove)</>:<><Plus className="mr-2 size-4"/>Add exact program</>}</Button><Button asChild variant="outline" className="h-12"><FoodsLink href={`/catalog/${option.slug}`}>Review legacy specification</FoodsLink></Button></div></div>;
}
