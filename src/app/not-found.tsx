import React from "react";
import { FoodsLink } from "@/components/pages/foods-link";
import { ArrowRight, ChevronLeft, Flame, PackageCheck, ShieldAlert, Sparkles, Wheat, Truck, FileText } from "lucide-react";
import { TradeLoopSpinner } from "@/brand/BrandLoaders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Agro Commodity Lot Not Found (404) | Harobal Foods",
  description: "The requested food commodity, spice grade, grain variety, or agricultural specification is not listed.",
};

export default function FoodsNotFound() {
  return (
    <div className="section-space min-h-[75vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Harvest Amber Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/50 dark:from-amber-950/20 via-background to-background pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-shell relative z-10 max-w-2xl text-center space-y-8">
        {/* Animated Trade Loop Spinner */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-md">
            <TradeLoopSpinner size={68} theme="foods" speed={2.2} />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/25 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
            <ShieldAlert className="size-3.5" /> 404 • Uncharted Harvest Lot
          </div>
        </div>

        {/* Narrative & Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif text-foreground">
            This Agricultural Commodity Lot <br />
            <span className="text-[#D97706] dark:text-amber-400">Is Currently Unavailable</span>
          </h1>
          <p className="max-w-lg mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            The spice grade, grain variety, pulse lot, or processed agro specification you requested is unlisted or seasonal harvest batches are being renewed.
          </p>
        </div>

        {/* Quick Sourcing Category Grid */}
        <div className="grid gap-3 sm:grid-cols-2 text-left pt-1">
          <FoodsLink href="/catalog" className="group block">
            <Card className="h-full border-border/80 bg-card/60 hover:bg-card hover:border-[#D97706]/40 transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#D97706]/10 text-[#D97706]">
                    <Wheat className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Commodities Catalogue</p>
                    <p className="text-xs text-muted-foreground">Spices, grains, pulses &amp; oilseeds</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-[#D97706] group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </FoodsLink>

          <FoodsLink href="/rfq" className="group block">
            <Card className="h-full border-border/80 bg-card/60 hover:bg-card hover:border-[#D97706]/40 transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#D97706]/10 text-[#D97706]">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Custom Commodity RFQ</p>
                    <p className="text-xs text-muted-foreground">Send target specifications &amp; quantities</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-[#D97706] group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </FoodsLink>

          <FoodsLink href="/quality" className="group block">
            <Card className="h-full border-border/80 bg-card/60 hover:bg-card hover:border-[#D97706]/40 transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#D97706]/10 text-[#D97706]">
                    <PackageCheck className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Quality &amp; Lab Standards</p>
                    <p className="text-xs text-muted-foreground">Phytosanitary &amp; safety compliance</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-[#D97706] group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </FoodsLink>

          <FoodsLink href="/logistics" className="group block">
            <Card className="h-full border-border/80 bg-card/60 hover:bg-card hover:border-[#D97706]/40 transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#D97706]/10 text-[#D97706]">
                    <Truck className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Logistics &amp; Cold Chain</p>
                    <p className="text-xs text-muted-foreground">Container shipping &amp; Incoterms</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-[#D97706] group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </FoodsLink>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            <FoodsLink href="/catalog">
              Explore Full Food Catalogue <ArrowRight className="size-4 ml-1.5" />
            </FoodsLink>
          </Button>
          <Button asChild variant="outline" size="lg">
            <FoodsLink href="/rfq">
              Submit Custom RFQ
            </FoodsLink>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
            <FoodsLink href="/">
              <ChevronLeft className="size-4 mr-1" /> Foods Home
            </FoodsLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
