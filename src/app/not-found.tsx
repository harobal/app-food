import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Wheat } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HMark } from "@/brand";
import { COLORS } from "@/brand/brand";

export const metadata = {
  title: "404 — Harvest Route Unavailable | Harobal Foods",
  description: "The requested agriculture corridor could not be located.",
};

export default function GlobalNotFound() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col lg:flex-row bg-background overflow-hidden selection:bg-accent/20">
      
      {/* LEFT PANEL - Dark Theme (Primary) */}
      <div className="relative flex flex-col justify-between w-full lg:w-5/12 p-10 sm:p-16 border-b lg:border-b-0 lg:border-r border-accent/20 bg-primary text-primary-foreground">
        
        <div className="relative z-10">
          <HMark size={48} color={COLORS.accent} />
        </div>
        
        <div className="relative z-10 space-y-6 mt-16 lg:mt-0">
          <p className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-accent">
            System Error Protocol
          </p>
          <h1 className="text-8xl sm:text-[160px] leading-[0.8] font-serif text-primary-foreground tracking-tighter -ml-2">
            404
          </h1>
          <div className="h-[2px] w-16 bg-accent" />
          <p className="font-serif text-2xl sm:text-3xl text-primary-foreground/80 leading-snug max-w-sm">
            The requested harvest route is uncharted.
          </p>
        </div>

        <div className="relative z-10 hidden lg:block">
          <p className="text-[10px] text-primary-foreground/50 font-sans uppercase tracking-[0.3em]">
            {siteConfig.appName ?? "Harobal Foods"} • Agriculture & Organic Commodities
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Light Theme (Background) */}
      <div className="relative flex flex-col justify-center w-full lg:w-7/12 p-8 sm:p-16 lg:p-24 bg-background">
        
        <div className="max-w-xl space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
              Coordinates Lost
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed">
              We cannot locate the specification, organic commodity, or supply chain corridor you are looking for. It may have been relocated, archived, or is currently inaccessible.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Return Hub Card */}
            <Link href="/" className="group block h-full">
              <div className="h-full p-8 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <Leaf className="size-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-card-foreground mb-2">Return to Hub</h3>
                <p className="text-sm text-muted-foreground font-sans mb-6">Navigate back to the main organic dashboard.</p>
                <div className="text-sm font-semibold text-primary inline-flex items-center group-hover:text-accent transition-colors">
                  Go to Homepage <ArrowRight className="ml-2 size-4" />
                </div>
              </div>
            </Link>

            {/* Contact Desk Card */}
            <Link href="/contact" className="group block h-full">
              <div className="h-full p-8 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <Wheat className="size-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-card-foreground mb-2">Contact Desk</h3>
                <p className="text-sm text-muted-foreground font-sans mb-6">Require manual sourcing or harvest assistance?</p>
                <div className="text-sm font-semibold text-primary inline-flex items-center group-hover:text-accent transition-colors">
                  Reach out to us <ArrowRight className="ml-2 size-4" />
                </div>
              </div>
            </Link>

          </div>
          
        </div>
      </div>
    </div>
  );
}
