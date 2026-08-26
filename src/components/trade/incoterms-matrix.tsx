"use client";

import { useState } from "react";
import { Check, Ship, Truck } from "lucide-react";
import { INCOTERMS_2020, type IncotermDefinition } from "@/content/site";

export function IncotermsMatrix({ onSelectTerm }: { onSelectTerm?: (code: string) => void }) {
  const [selectedTerm, setSelectedTerm] = useState<IncotermDefinition>(INCOTERMS_2020[8]); // Default FOB
  const [activeTab, setActiveTab] = useState<"all" | "Any Mode of Transport" | "Sea and Inland Waterway">("all");

  const filteredTerms =
    activeTab === "all"
      ? INCOTERMS_2020
      : INCOTERMS_2020.filter((term) => term.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Tab Filter */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          All 11 Incoterms®
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("Sea and Inland Waterway")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === "Sea and Inland Waterway"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          <Ship className="size-3.5" aria-hidden="true" />
          Sea &amp; Waterway (4) — FOB / CIF
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("Any Mode of Transport")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === "Any Mode of Transport"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          <Truck className="size-3.5" aria-hidden="true" />
          Multimodal / Any Mode (7)
        </button>
      </div>

      {/* Grid of Incoterm Chips */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {filteredTerms.map((term) => {
          const isSelected = selectedTerm.code === term.code;
          return (
            <button
              key={term.code}
              type="button"
              onClick={() => setSelectedTerm(term)}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/40 hover:bg-accent/40"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-sm font-bold text-foreground">{term.code}</span>
                <span className="text-[10px] text-muted-foreground">
                  {term.category === "Sea and Inland Waterway" ? "🌊 Sea Freight" : "🚛 Multimodal"}
                </span>
              </div>
              <span className="mt-1 line-clamp-1 text-xs font-medium text-muted-foreground">
                {term.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Card for Selected Incoterm */}
      <div className="rounded-2xl border border-border bg-gradient-to-b from-card to-muted/20 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-extrabold text-primary">{selectedTerm.code}</span>
              <span className="text-sm font-semibold text-foreground">— {selectedTerm.name}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{selectedTerm.summary}</p>
          </div>
          {onSelectTerm && (
            <button
              type="button"
              onClick={() => onSelectTerm(selectedTerm.code)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Check className="size-3.5" aria-hidden="true" />
              Select in Requirement
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5">
            <span className="font-semibold text-foreground">Seller (Exporter) Responsibilities:</span>
            <p className="mt-1 text-muted-foreground leading-relaxed">{selectedTerm.sellerObligation}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-3.5">
            <span className="font-semibold text-foreground">Buyer (Importer) Responsibilities:</span>
            <p className="mt-1 text-muted-foreground leading-relaxed">{selectedTerm.buyerObligation}</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border/70 bg-card/60 p-3.5 text-xs">
          <span className="font-semibold text-primary">Risk Transfer Milestone &amp; Food Trade Usage:</span>
          <p className="mt-1 text-muted-foreground leading-relaxed">{selectedTerm.riskTransferPoint} ({selectedTerm.suitableFor})</p>
        </div>
      </div>
    </div>
  );
}
