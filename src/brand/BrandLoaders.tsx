"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "./brand";
import { HMark } from "./Logo";

export type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface CommonLoaderProps {
  size?: LoaderSize;
  dark?: boolean;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

function resolveLoaderPx(size: LoaderSize, defaultSize: number): number {
  if (typeof size === "number") return size;
  switch (size) {
    case "xs": return 18;
    case "sm": return 32;
    case "md": return 56;
    case "lg": return 84;
    case "xl": return 120;
    default: return defaultSize;
  }
}

// ─────────────────────────────────────────────────────────
// HAROBAL MINIMAL LOADER — Sleek, Elegant, Modern
// ─────────────────────────────────────────────────────────
export const HarobalMinimalLoader: React.FC<CommonLoaderProps> = ({ size = "lg", dark = false, className, label, showLabel = false }) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 84);
  const strokeWidth = Math.max(2, Math.round(px * 0.05));
  const ringColor = dark ? COLORS.whiteA10 : COLORS.primaryA10;
  const spinnerColor = dark ? COLORS.tertiary : COLORS.accent;

  return (
    <div className={cn("inline-flex flex-col items-center justify-center gap-4", className)}>
      <style>{`
        @keyframes minimal-spin-${uniqueId} { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes minimal-pulse-${uniqueId} { 0%, 100% { opacity: 0.8; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.02); } }
      `}</style>
      <div className="relative flex items-center justify-center select-none" style={{ width: px, height: px }}>
        <div className="absolute inset-0 rounded-full" style={{ border: `${strokeWidth}px solid ${ringColor}` }} />
        <div className="absolute inset-0 rounded-full border-transparent"
          style={{ borderWidth: strokeWidth, borderStyle: "solid", borderTopColor: spinnerColor, animation: `minimal-spin-${uniqueId} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite` }} />
        <div className="relative z-10 flex items-center justify-center" style={{ animation: `minimal-pulse-${uniqueId} 2s ease-in-out infinite` }}>
           <HMark size={px * 0.45} color={dark ? COLORS.lightBg : COLORS.primary} />
        </div>
      </div>
      {showLabel && <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: dark ? COLORS.tertiary : COLORS.secondary }}>{label ?? "Loading"}</span>}
    </div>
  );
};

// Aliases to avoid breaking existing imports during refactoring
export const TheDealLoader = HarobalMinimalLoader;
export const TradeLoopSpinner = HarobalMinimalLoader;
export const GoldenStrokeDrawLoader = HarobalMinimalLoader;
export const RadarPulseLoader = HarobalMinimalLoader;
export const HarobalSpinner = HarobalMinimalLoader;

// ─────────────────────────────────────────────────────────
// BRAND LOADING SCREEN 
// ─────────────────────────────────────────────────────────

export interface BrandLoadingScreenProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

export const BrandLoadingScreen: React.FC<BrandLoadingScreenProps> = ({
  title = "Harobal Foods",
  subtitle = "Agriculture & Organic Commodities",
  dark = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center transition-all duration-500",
        dark ? "bg-brand-ink/95 text-white" : "bg-brand-canvas/95 text-brand-ink",
        "backdrop-blur-xl",
        className
      )}
      role="alert"
      aria-busy="true"
    >
      <div className="relative z-10 flex flex-col items-center max-w-md w-full gap-8">
        <div className="p-4">
            <HarobalMinimalLoader size="xl" dark={dark} />
        </div>

        <div className="space-y-3">
          <h2
            className="text-2xl font-semibold tracking-tight font-serif sm:text-3xl animate-pulse"
          >
            {title}
          </h2>
          <p
            className="text-sm uppercase tracking-[0.3em] opacity-70 font-sans"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
