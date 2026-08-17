"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { COLORS, H_MARK_PATH } from "./brand";

export type LoaderTheme = "corporate" | "stones" | "foods" | "gold" | "monochrome";
export type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface CommonLoaderProps {
  size?: LoaderSize;
  theme?: LoaderTheme;
  dark?: boolean;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

function resolveLoaderPx(size: LoaderSize, defaultSize: number): number {
  if (typeof size === "number") return size;
  switch (size) {
    case "xs":
      return 18;
    case "sm":
      return 32;
    case "md":
      return 56;
    case "lg":
      return 84;
    case "xl":
      return 120;
    default:
      return defaultSize;
  }
}

function getThemeColors(theme: LoaderTheme = "corporate", dark = false) {
  switch (theme) {
    case "stones":
      return {
        primary: dark ? "#E2E8F0" : "#2D3748",
        accent: "#D4A03C",
        secondary: "#8C9BAE",
        glow: "rgba(212, 160, 60, 0.35)",
        surface: dark ? "rgba(45, 55, 72, 0.5)" : "rgba(240, 244, 248, 0.8)",
      };
    case "foods":
      return {
        primary: dark ? "#FDE68A" : "#1B2A4A",
        accent: "#D97706",
        secondary: "#10B981",
        glow: "rgba(217, 119, 6, 0.4)",
        surface: dark ? "rgba(27, 42, 74, 0.5)" : "rgba(254, 243, 199, 0.6)",
      };
    case "gold":
      return {
        primary: "#D4A03C",
        accent: "#F3BA4C",
        secondary: "#B8860B",
        glow: "rgba(212, 160, 60, 0.5)",
        surface: dark ? "rgba(212, 160, 60, 0.15)" : "rgba(212, 160, 60, 0.08)",
      };
    case "monochrome":
      return {
        primary: dark ? "#FFFFFF" : "#0F172A",
        accent: dark ? "#94A3B8" : "#475569",
        secondary: dark ? "#64748B" : "#94A3B8",
        glow: dark ? "rgba(255, 255, 255, 0.2)" : "rgba(15, 23, 42, 0.15)",
        surface: dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
      };
    case "corporate":
    default:
      return {
        primary: dark ? "#F5F0E8" : COLORS.navy,
        accent: COLORS.gold,
        secondary: COLORS.blueMid,
        glow: "rgba(212, 160, 60, 0.45)",
        surface: dark ? "rgba(15, 26, 46, 0.6)" : "rgba(27, 42, 74, 0.05)",
      };
  }
}

// ─────────────────────────────────────────────────────────
// 1. THE DEAL LOADER — Convergence & Handshake Pulse
// Inspired by master concept: Two trading wings converge,
// connect at the center handshake, pulse with golden light,
// and loop seamlessly.
// ─────────────────────────────────────────────────────────

export interface TheDealLoaderProps extends CommonLoaderProps {
  speed?: number; // duration in seconds (default 1.8s)
}

export const TheDealLoader: React.FC<TheDealLoaderProps> = ({
  size = "lg",
  theme = "corporate",
  dark = false,
  className,
  label,
  showLabel = false,
  speed = 1.8,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 88);
  const colors = getThemeColors(theme, dark);

  return (
    <div
      className={cn("inline-flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Loading..."}
    >
      <style>{`
        @keyframes deal-left-wing-${uniqueId} {
          0%, 100% {
            transform: translateX(-16px) scale(0.96);
            opacity: 0.7;
          }
          40%, 65% {
            transform: translateX(0px) scale(1);
            opacity: 1;
          }
        }
        @keyframes deal-right-wing-${uniqueId} {
          0%, 100% {
            transform: translateX(16px) scale(0.96);
            opacity: 0.7;
          }
          40%, 65% {
            transform: translateX(0px) scale(1);
            opacity: 1;
          }
        }
        @keyframes deal-pulse-core-${uniqueId} {
          0%, 35% {
            transform: scale(0.65);
            opacity: 0;
          }
          48% {
            transform: scale(1.35);
            opacity: 0.9;
          }
          62% {
            transform: scale(1.65);
            opacity: 0;
          }
          100% {
            transform: scale(0.65);
            opacity: 0;
          }
        }
        @keyframes deal-gold-sheen-${uniqueId} {
          0%, 38% {
            opacity: 0;
            transform: translateX(-120%) rotate(25deg);
          }
          48% {
            opacity: 0.85;
          }
          60% {
            opacity: 0;
            transform: translateX(120%) rotate(25deg);
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes deal-aura-${uniqueId} {
          0%, 100% {
            box-shadow: 0 0 0 0 ${colors.glow};
            opacity: 0.4;
          }
          50% {
            box-shadow: 0 0 28px 4px ${colors.glow};
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: px, height: px }}
      >
        {/* Subtle Background Glow Aura */}
        <div
          className="absolute inset-2 rounded-full pointer-events-none"
          style={{
            animation: `deal-aura-${uniqueId} ${speed}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
          }}
        />

        {/* Central Pulse Ring at contact */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: px * 0.55,
            height: px * 0.55,
            border: `2px solid ${colors.accent}`,
            animation: `deal-pulse-core-${uniqueId} ${speed}s cubic-bezier(0.16, 1, 0.3, 1) infinite`,
          }}
        />

        {/* Converging Left Wing of H-Mark */}
        <svg
          viewBox="0 0 852 833"
          width={px}
          height={Math.round(px * (833 / 852))}
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0% 0%, 52% 0%, 52% 100%, 0% 100%)",
            animation: `deal-left-wing-${uniqueId} ${speed}s cubic-bezier(0.25, 1, 0.5, 1) infinite`,
            transformOrigin: "center right",
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`gradLeft-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.accent} />
            </linearGradient>
          </defs>
          <path fill={`url(#gradLeft-${uniqueId})`} fillRule="evenodd" d={H_MARK_PATH} />
        </svg>

        {/* Converging Right Wing of H-Mark */}
        <svg
          viewBox="0 0 852 833"
          width={px}
          height={Math.round(px * (833 / 852))}
          className="absolute inset-0"
          style={{
            clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
            animation: `deal-right-wing-${uniqueId} ${speed}s cubic-bezier(0.25, 1, 0.5, 1) infinite`,
            transformOrigin: "center left",
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`gradRight-${uniqueId}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
          </defs>
          <path fill={`url(#gradRight-${uniqueId})`} fillRule="evenodd" d={H_MARK_PATH} />
        </svg>

        {/* Shimmer Light Flash Over the Handshake */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg"
          style={{ mixBlendMode: "screen" }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 50%, #FFF 60%, transparent 100%)`,
              animation: `deal-gold-sheen-${uniqueId} ${speed}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            }}
          />
        </div>
      </div>

      {showLabel && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] animate-pulse"
          style={{ color: colors.accent }}
        >
          {label ?? "Connecting Trade"}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 2. THE INFINITE TRADE LOOP SPINNER
// Features 3D-angled dual orbital tracks carrying glowing
// trade nodes circulating around the central Harobal emblem.
// ─────────────────────────────────────────────────────────

export interface TradeLoopSpinnerProps extends CommonLoaderProps {
  speed?: number; // rotation speed in seconds (default 2.4s)
}

export const TradeLoopSpinner: React.FC<TradeLoopSpinnerProps> = ({
  size = "lg",
  theme = "corporate",
  dark = false,
  className,
  label,
  showLabel = false,
  speed = 2.4,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 88);
  const colors = getThemeColors(theme, dark);
  const logoPx = Math.round(px * 0.54);

  return (
    <div
      className={cn("inline-flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Loading..."}
    >
      <style>{`
        @keyframes orbit-cw-${uniqueId} {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw-${uniqueId} {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes emblem-breathe-${uniqueId} {
          0%, 100% {
            transform: scale(0.94);
            filter: drop-shadow(0 0 4px ${colors.glow});
          }
          50% {
            transform: scale(1.04);
            filter: drop-shadow(0 0 14px ${colors.glow});
          }
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: px, height: px }}
      >
        {/* Outer Orbit Ring 1 (Gold Clockwise) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `1.5px dashed ${colors.accent}40`,
            animation: `orbit-cw-${uniqueId} ${speed}s linear infinite`,
          }}
        >
          {/* Orbit Node 1 */}
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full shadow-lg"
            style={{
              width: 8,
              height: 8,
              backgroundColor: colors.accent,
              boxShadow: `0 0 10px 2px ${colors.accent}`,
            }}
          />
          {/* Orbit Node 2 (Counterweight) */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: colors.secondary,
              boxShadow: `0 0 6px 1px ${colors.secondary}`,
            }}
          />
        </div>

        {/* Inner Orbit Ring 2 (Navy/Cyan Counter-Clockwise) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: 7,
            border: `1.5px solid transparent`,
            borderTopColor: colors.primary,
            borderBottomColor: colors.accent,
            animation: `orbit-ccw-${uniqueId} ${speed * 0.75}s linear infinite`,
            opacity: 0.85,
          }}
        />

        {/* Central Breathing Harobal H-Mark */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            animation: `emblem-breathe-${uniqueId} ${speed}s ease-in-out infinite`,
          }}
        >
          <svg
            viewBox="0 0 852 833"
            width={logoPx}
            height={Math.round(logoPx * (833 / 852))}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`tradeLoopGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.accent} />
                <stop offset="100%" stopColor={colors.primary} />
              </linearGradient>
            </defs>
            <path fill={`url(#tradeLoopGrad-${uniqueId})`} fillRule="evenodd" d={H_MARK_PATH} />
          </svg>
        </div>
      </div>

      {showLabel && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: colors.primary }}
        >
          {label ?? "Processing..."}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 3. ARCHITECTURAL BLUEPRINT / STROKE DRAW LOADER
// Uses SVG path stroke dasharray animation to draw the
// Harobal emblem in liquid gold wireframe, then illuminates.
// ─────────────────────────────────────────────────────────

export interface GoldenStrokeDrawLoaderProps extends CommonLoaderProps {
  speed?: number; // duration in seconds (default 2.6s)
}

export const GoldenStrokeDrawLoader: React.FC<GoldenStrokeDrawLoaderProps> = ({
  size = "lg",
  theme = "corporate",
  dark = false,
  className,
  label,
  showLabel = false,
  speed = 2.6,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 88);
  const colors = getThemeColors(theme, dark);

  return (
    <div
      className={cn("inline-flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Drawing..."}
    >
      <style>{`
        @keyframes stroke-draw-${uniqueId} {
          0% {
            stroke-dashoffset: 4600;
            fill-opacity: 0;
          }
          45% {
            stroke-dashoffset: 0;
            fill-opacity: 0.15;
          }
          70% {
            stroke-dashoffset: 0;
            fill-opacity: 0.95;
          }
          95%, 100% {
            stroke-dashoffset: 0;
            fill-opacity: 0;
          }
        }
        @keyframes draw-beacon-${uniqueId} {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{
          width: px,
          height: px,
          animation: `draw-beacon-${uniqueId} ${speed}s ease-in-out infinite`,
        }}
      >
        <svg
          viewBox="0 0 852 833"
          width={px}
          height={Math.round(px * (833 / 852))}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`strokeGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D061" />
              <stop offset="50%" stopColor={colors.accent} />
              <stop offset="100%" stopColor="#B38022" />
            </linearGradient>
            <filter id={`strokeGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d={H_MARK_PATH}
            fill={colors.accent}
            fillRule="evenodd"
            stroke={`url(#strokeGrad-${uniqueId})`}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4600"
            filter={`url(#strokeGlow-${uniqueId})`}
            style={{
              animation: `stroke-draw-${uniqueId} ${speed}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            }}
          />
        </svg>
      </div>

      {showLabel && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: colors.accent }}
        >
          {label ?? "Structuring Deal"}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 4. RADAR PULSE / GLOBAL TRADE CORRIDOR LOADER
// Centered badge with multi-stage concentric sonar waves
// expanding from the handshake clasp.
// ─────────────────────────────────────────────────────────

export interface RadarPulseLoaderProps extends CommonLoaderProps {
  speed?: number; // duration in seconds (default 2.0s)
}

export const RadarPulseLoader: React.FC<RadarPulseLoaderProps> = ({
  size = "lg",
  theme = "corporate",
  dark = false,
  className,
  label,
  showLabel = false,
  speed = 2.0,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 88);
  const colors = getThemeColors(theme, dark);
  const logoPx = Math.round(px * 0.44);

  return (
    <div
      className={cn("inline-flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Scanning..."}
    >
      <style>{`
        @keyframes radar-wave-${uniqueId} {
          0% {
            transform: scale(0.35);
            opacity: 0.9;
            border-color: ${colors.accent};
          }
          70% {
            opacity: 0.4;
          }
          100% {
            transform: scale(1.65);
            opacity: 0;
            border-color: ${colors.secondary};
          }
        }
        @keyframes radar-hub-${uniqueId} {
          0%, 100% {
            transform: scale(0.96);
          }
          50% {
            transform: scale(1.04);
          }
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: px, height: px }}
      >
        {/* Expanding Wave Ring 1 */}
        <div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{
            animation: `radar-wave-${uniqueId} ${speed}s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
          }}
        />

        {/* Expanding Wave Ring 2 (Delayed) */}
        <div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{
            animation: `radar-wave-${uniqueId} ${speed}s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
            animationDelay: `${speed * 0.35}s`,
          }}
        />

        {/* Expanding Wave Ring 3 (Further Delayed) */}
        <div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{
            animation: `radar-wave-${uniqueId} ${speed}s cubic-bezier(0.1, 0.8, 0.3, 1) infinite`,
            animationDelay: `${speed * 0.7}s`,
          }}
        />

        {/* Central Emblem Hub */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full p-2.5 shadow-md border"
          style={{
            backgroundColor: dark ? "#0F1A2E" : "#FFFFFF",
            borderColor: colors.accent,
            animation: `radar-hub-${uniqueId} ${speed}s ease-in-out infinite`,
          }}
        >
          <svg
            viewBox="0 0 852 833"
            width={logoPx}
            height={Math.round(logoPx * (833 / 852))}
            aria-hidden="true"
          >
            <path fill={colors.accent} fillRule="evenodd" d={H_MARK_PATH} />
          </svg>
        </div>
      </div>

      {showLabel && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: colors.primary }}
        >
          {label ?? "Syncing Corridor Data"}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 5. HAROBAL SPINNER — Lightweight Inline / Button Spinner
// High-performance, low-overhead dual-arc conic spinner with
// centered micro handshake emblem.
// ─────────────────────────────────────────────────────────

export interface HarobalSpinnerProps extends CommonLoaderProps {
  trackWidth?: number;
}

export const HarobalSpinner: React.FC<HarobalSpinnerProps> = ({
  size = "md",
  theme = "corporate",
  dark = false,
  className,
  label,
  showLabel = false,
  trackWidth,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const px = resolveLoaderPx(size, 36);
  const colors = getThemeColors(theme, dark);
  const computedTrack = trackWidth ?? Math.max(2, Math.round(px * 0.08));
  const innerLogoSize = Math.round(px * 0.44);

  return (
    <div
      className={cn("inline-flex items-center justify-center gap-2.5", className)}
      role="status"
      aria-label={label ?? "Loading..."}
    >
      <style>{`
        @keyframes harobal-spin-${uniqueId} {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: px, height: px }}
      >
        {/* Subtle Background Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${computedTrack}px solid ${colors.surface}`,
          }}
        />

        {/* High-speed Spinning Dual-Arc Gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `${computedTrack}px solid transparent`,
            borderTopColor: colors.accent,
            borderRightColor: colors.primary,
            borderBottomColor: colors.accent,
            animation: `harobal-spin-${uniqueId} 0.85s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite`,
          }}
        />

        {/* Micro Centered H-Mark */}
        {innerLogoSize >= 10 && (
          <div className="relative z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 852 833"
              width={innerLogoSize}
              height={Math.round(innerLogoSize * (833 / 852))}
              aria-hidden="true"
            >
              <path fill={colors.accent} fillRule="evenodd" d={H_MARK_PATH} />
            </svg>
          </div>
        )}
      </div>

      {showLabel && (
        <span
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: colors.primary }}
        >
          {label ?? "Loading"}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 6. BRAND LOADING SCREEN — Full Page / Modal Screen
// Complete luxury loading screen with backdrop blur,
// dynamic vertical switcher, status indicator, & progress.
// ─────────────────────────────────────────────────────────

export interface BrandLoadingScreenProps {
  title?: string;
  subtitle?: string;
  variant?: "deal" | "trade-loop" | "blueprint" | "radar" | "spinner";
  theme?: LoaderTheme;
  dark?: boolean;
  progress?: number; // 0 to 100 optional
  className?: string;
}

export const BrandLoadingScreen: React.FC<BrandLoadingScreenProps> = ({
  title = "Harobal Ventures",
  subtitle = "Connecting Indian Excellence to Global Trade Corridors",
  variant = "deal",
  theme = "corporate",
  dark = false,
  progress,
  className,
}) => {
  const colors = getThemeColors(theme, dark);

  const renderLoader = () => {
    switch (variant) {
      case "trade-loop":
        return <TradeLoopSpinner size="xl" theme={theme} dark={dark} />;
      case "blueprint":
        return <GoldenStrokeDrawLoader size="xl" theme={theme} dark={dark} />;
      case "radar":
        return <RadarPulseLoader size="xl" theme={theme} dark={dark} />;
      case "spinner":
        return <HarobalSpinner size="xl" theme={theme} dark={dark} />;
      case "deal":
      default:
        return <TheDealLoader size="xl" theme={theme} dark={dark} />;
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center transition-all duration-300",
        dark ? "bg-[#09111E]/95 text-white" : "bg-white/95 text-[#1B2A4A]",
        "backdrop-blur-xl",
        className
      )}
      role="alert"
      aria-busy="true"
    >
      {/* Background Ambient Radial Lights */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ backgroundColor: colors.accent }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none blur-2xl opacity-15 translate-x-32 translate-y-32"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full gap-6">
        {/* Animated Loader Component */}
        <div className="p-4">{renderLoader()}</div>

        {/* Brand Lockup & Status Text */}
        <div className="space-y-2">
          <h2
            className="text-2xl font-bold tracking-tight font-serif sm:text-3xl"
            style={{ color: dark ? "#FFFFFF" : colors.primary }}
          >
            {title}
          </h2>
          <p className="text-xs uppercase tracking-[0.24em] font-medium text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Optional Progress Bar */}
        {typeof progress === "number" && (
          <div className="w-full max-w-xs space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Establishing Session</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                  backgroundColor: colors.accent,
                  boxShadow: `0 0 8px ${colors.accent}`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
