"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import HarobalLogo, { HMark, IconWrap } from "./Logo";
import {
  COLORS as C,
  FONTS,
  LETTER_SPACING as LS,
  type LogoSizeKey,
} from "./brand";

export interface BrandNavLink {
  label: string;
  href: string;
}

export interface BrandNavbarProps {
  links?: BrandNavLink[];
  rightSlot?: React.ReactNode;
  dark?: boolean;
  sticky?: boolean;
  compact?: boolean;
  showDescriptor?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface BrandInlineLockupProps {
  dark?: boolean;
  showDescriptor?: boolean;
  size?: LogoSizeKey | number;
  className?: string;
  href?: string;
}

export interface BrandFooterSignatureProps {
  tagline?: string;
  descriptor?: string;
  supportingText?: string;
  dark?: boolean;
  href?: string;
  className?: string;
  isBottom?: boolean;
}

export type BrandBadgeVariant =
  | "gold"
  | "navy"
  | "cream"
  | "outline-gold"
  | "outline-navy";

export interface BrandBadgeProps {
  children: React.ReactNode;
  variant?: BrandBadgeVariant;
  className?: string;
}

export interface BrandPillProps {
  dark?: boolean;
  className?: string;
}

export interface BrandDividerProps {
  dark?: boolean;
  showMark?: boolean;
  className?: string;
}

export interface BrandWatermarkProps {
  opacity?: number;
  size?: number;
  position?: "center" | "bottom-right" | "bottom-left" | "top-right";
  className?: string;
}

export interface BrandLoadingMarkProps {
  size?: number;
  dark?: boolean;
  className?: string;
  label?: string;
}

export interface BrandSplashHeroProps {
  headline?: string;
  subtext?: string;
  cta?: React.ReactNode;
  dark?: boolean;
  logoSize?: number;
  className?: string;
}

export interface BrandCardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BADGE_STYLES: Record<BrandBadgeVariant, React.CSSProperties> = {
  gold: { backgroundColor: C.gold, color: C.white, border: "none" },
  navy: { backgroundColor: C.navy, color: C.cream, border: "none" },
  cream: { backgroundColor: C.cream, color: C.navy, border: "none" },
  "outline-gold": {
    backgroundColor: "transparent",
    color: C.gold,
    border: `1px solid ${C.gold}`,
  },
  "outline-navy": {
    backgroundColor: "transparent",
    color: C.navy,
    border: `1px solid ${C.navy}`,
  },
};

export function BrandNavbar({
  links = [],
  rightSlot,
  dark = false,
  sticky = true,
  compact = false,
  showDescriptor = false,
  className,
  style,
}: BrandNavbarProps) {
  const background = dark ? C.darkNavy : C.white;
  const foreground = dark ? C.cream : C.navy;
  const borderColor = dark ? C.goldA12 : C.navyA10;

  return (
    <nav
      className={cn("w-full", className)}
      style={{
        backgroundColor: background,
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: dark
          ? "0 8px 26px rgba(0,0,0,0.18)"
          : `0 1px 14px ${C.navyA06}`,
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : undefined,
        zIndex: 50,
        ...style,
      }}
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
          compact ? "h-14" : "h-16 sm:h-18",
        )}
      >
        <Link href="/" aria-label="Harobal Ventures home" className="shrink-0">
          <HarobalLogo
            variant={dark ? "dark-horizontal" : "horizontal"}
            theme={dark ? "dark" : "light"}
            size={compact ? "sm" : "md"}
            showDescriptor={showDescriptor}
          />
        </Link>

        {links.length > 0 ? (
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                style={{ color: foreground, letterSpacing: LS.nav }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}

        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>
    </nav>
  );
}

export function BrandInlineLockup({
  dark = false,
  showDescriptor = false,
  size = "sm",
  className,
  href = "/",
}: BrandInlineLockupProps) {
  const textColor = dark ? C.cream : C.navy;
  const descriptorColor = dark ? C.blueLight : C.blueMid;

  return (
    <Link
      href={href}
      aria-label="Harobal Ventures home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <HarobalLogo
        variant={dark ? "icon-square" : "icon-light"}
        size={size}
        theme={dark ? "dark" : "light"}
      />
      <span className="flex flex-col leading-none">
        <span
          className="text-[11px] font-semibold uppercase sm:text-xs"
          style={{
            color: textColor,
            fontFamily: FONTS.serif,
            letterSpacing: LS.wordmark,
          }}
        >
          Harobal Ventures
        </span>
        {showDescriptor ? (
          <span
            className="mt-1 text-[9px] uppercase sm:text-[10px]"
            style={{
              color: descriptorColor,
              fontFamily: FONTS.sans,
              letterSpacing: LS.descriptor,
            }}
          >
            The Global Trading House
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function BrandFooterSignature({
  tagline = "Harobal Ventures",
  descriptor = "The Global Trading House",
  supportingText,
  dark = true,
  href = "/",
  className,
  isBottom = false,
}: BrandFooterSignatureProps) {
  const textColor = dark ? C.cream : C.navy;
  const mutedColor = dark ? C.blueLight : C.blueMid;

  return (
    <div className={cn("space-y-4", className)}>
      <Link
        href={href}
        aria-label="Harobal Ventures home"
        className="inline-flex w-fit items-center rounded-md border px-3 py-2 transition-colors"
        style={{
          borderColor: dark ? C.whiteA10 : C.navyA10,
          backgroundColor: dark ? C.whiteA06 : C.navyA04,
        }}
      >
        <HarobalLogo
          variant={dark ? "dark-horizontal" : "horizontal"}
          theme={dark ? "dark" : "light"}
          size="sm"
          showDescriptor={false}
        />
      </Link>

      {isBottom ? (
        <div className="space-y-1.5">
          <p
            className="text-sm font-semibold"
            style={{
              color: textColor,
              fontFamily: FONTS.serif,
              letterSpacing: LS.wordmark,
            }}
          >
            {tagline}
          </p>
          <p
            className="text-sm"
            style={{
              color: mutedColor,
              fontFamily: FONTS.sans,
              letterSpacing: LS.descriptor,
            }}
          >
            {descriptor}
          </p>
          {supportingText ? (
            <p
              className="text-sm"
              style={{ color: mutedColor, fontFamily: FONTS.sans }}
            >
              {supportingText}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function BrandBadge({
  children,
  variant = "gold",
  className,
}: BrandBadgeProps) {
  return (
    <Badge
      className={cn("rounded-full", className)}
      style={{
        ...BADGE_STYLES[variant],
        fontSize: 10,
        fontWeight: 600,
        fontFamily: FONTS.sans,
        letterSpacing: LS.descriptor,
        padding: "3px 10px",
      }}
    >
      {children}
    </Badge>
  );
}

export function BrandPill({ dark = false, className }: BrandPillProps) {
  const bg = dark ? C.navy : C.cream;
  const txt = dark ? C.cream : C.navy;
  const borderColor = dark ? C.goldA20 : C.navyA10;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
        className,
      )}
      style={{
        backgroundColor: bg,
        border: `1px solid ${borderColor}`,
      }}
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full"
        style={{ backgroundColor: dark ? C.gold : C.navy }}
      >
        <HMark color={dark ? C.navy : C.cream} size={12} />
      </span>
      <span
        className="text-[10px] font-semibold uppercase"
        style={{
          color: txt,
          fontFamily: FONTS.sans,
          letterSpacing: LS.descriptor,
        }}
      >
        Harobal Ventures
      </span>
    </div>
  );
}

export function BrandDivider({
  dark = false,
  showMark = true,
  className,
}: BrandDividerProps) {
  const lineColor = dark ? C.goldA12 : C.navyA10;

  return (
    <div
      className={cn("flex items-center gap-4", className)}
      aria-hidden="true"
    >
      <Separator className="flex-1" style={{ backgroundColor: lineColor }} />
      {showMark ? (
        <HarobalLogo variant={dark ? "icon-square" : "icon-plain"} size={28} />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: C.gold }}
        />
      )}
      <Separator className="flex-1" style={{ backgroundColor: lineColor }} />
    </div>
  );
}

export function BrandWatermark({
  opacity = 0.04,
  size = 160,
  position = "center",
  className,
}: BrandWatermarkProps) {
  const positions: Record<string, React.CSSProperties> = {
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    "bottom-right": { bottom: 24, right: 24 },
    "bottom-left": { bottom: 24, left: 24 },
    "top-right": { top: 24, right: 24 },
  };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      style={{
        position: "absolute",
        opacity,
        zIndex: 0,
        ...positions[position],
      }}
    >
      <HarobalLogo variant="icon-plain" size={size} />
    </div>
  );
}

export function BrandLoadingMark({
  size = 64,
  dark = false,
  className,
  label = "Loading Harobal Ventures",
}: BrandLoadingMarkProps) {
  const shellSize = Math.round(size * 1.35);
  const markSize = Math.round(size * 0.92);
  const baseColor = dark ? C.darkNavy : C.white;
  const accentLeft = dark ? C.cream : C.navy;
  const accentRight = C.gold;
  const symbolColor = dark ? C.cream : C.navy;

  return (
    <>
      <style>{`
        @keyframes hv-brand-sweep-left {
          0% { transform: translateX(-28%) scaleX(0.7); opacity: 0.12; }
          40% { opacity: 1; }
          70% { transform: translateX(0) scaleX(1); opacity: 0.92; }
          100% { transform: translateX(0) scaleX(1); opacity: 0.92; }
        }
        @keyframes hv-brand-sweep-right {
          0% { transform: translateX(28%) scaleX(0.7); opacity: 0.12; }
          40% { opacity: 1; }
          70% { transform: translateX(0) scaleX(1); opacity: 0.92; }
          100% { transform: translateX(0) scaleX(1); opacity: 0.92; }
        }
        @keyframes hv-brand-assemble {
          0% { transform: scale(0.96); opacity: 0; filter: blur(2px); }
          45% { opacity: 0.3; }
          75% { transform: scale(1); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
      `}</style>

      <div
        className={cn("inline-flex items-center justify-center", className)}
        role="status"
        aria-label={label}
      >
        <div
          className="relative"
          style={{ width: shellSize, height: shellSize }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-[28%]"
            style={{
              backgroundColor: baseColor,
              boxShadow: dark
                ? "0 16px 36px rgba(0,0,0,0.26)"
                : "0 12px 28px rgba(27,42,74,0.12)",
            }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, ${accentLeft} 0%, ${accentRight} 100%)`,
                animation: "hv-brand-sweep-left 1.9s ease-in-out infinite",
              }}
            />
            <span
              className="absolute inset-y-0 right-0 w-1/2"
              style={{
                background: `linear-gradient(270deg, ${accentRight} 0%, ${accentLeft} 100%)`,
                animation: "hv-brand-sweep-right 1.9s ease-in-out infinite",
              }}
            />
            <span
              className="absolute inset-[10%] rounded-[22%]"
              style={{
                backgroundColor: dark ? C.navy : C.cream,
                opacity: 0.25,
              }}
            />
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "hv-brand-assemble 1.9s ease-in-out infinite" }}
          >
            <IconWrap
              shape={dark ? "circle" : "square"}
              bgColor={baseColor}
              ringColor={dark ? C.gold : undefined}
              ringWidth={Math.max(3, Math.round(size * 0.05))}
              size={markSize}
            >
              <HMark color={symbolColor} size={Math.round(markSize * 0.78)} />
            </IconWrap>
          </div>
        </div>
      </div>
    </>
  );
}

export function BrandSplashHero({
  headline,
  subtext,
  cta,
  dark = true,
  logoSize = 72,
  className,
}: BrandSplashHeroProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        backgroundColor: dark ? C.darkNavy : C.white,
        color: dark ? C.cream : C.navy,
        padding: "clamp(5rem, 10vw, 7rem) 1.25rem",
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: dark
            ? `radial-gradient(ellipse 60% 45% at 50% 25%, ${C.goldA06} 0%, transparent 72%)`
            : `radial-gradient(ellipse 60% 45% at 50% 25%, ${C.navyA04} 0%, transparent 72%)`,
        }}
      />

      <BrandWatermark
        opacity={dark ? 0.035 : 0.02}
        size={Math.round(logoSize * 4)}
        position="center"
      />

      <div className="relative z-10 mb-8">
        <BrandLoadingMark size={logoSize} dark={dark} />
      </div>

      {headline ? (
        <h1
          className="relative z-10 text-center text-[clamp(1.4rem,3vw,2.4rem)] font-semibold leading-tight"
          style={{ fontFamily: FONTS.serif, letterSpacing: LS.wordmark }}
        >
          {headline}
        </h1>
      ) : null}

      {subtext ? (
        <p
          className="relative z-10 mt-4 max-w-2xl text-center text-sm sm:text-base"
          style={{
            color: dark ? C.blueLight : C.blueMid,
            fontFamily: FONTS.sans,
            letterSpacing: LS.descriptor,
          }}
        >
          {subtext}
        </p>
      ) : null}

      {cta ? <div className="relative z-10 mt-8">{cta}</div> : null}
    </section>
  );
}

export function BrandCard({
  title,
  description,
  children,
  dark = false,
  className,
  style,
}: BrandCardProps) {
  return (
    <Card
      className={cn("overflow-hidden", className)}
      style={{
        backgroundColor: dark ? C.darkNavy : C.white,
        borderColor: dark ? C.goldA12 : C.navyA10,
        boxShadow: dark
          ? "0 4px 32px rgba(0,0,0,0.3)"
          : `0 2px 18px ${C.navyA06}`,
        ...style,
      }}
    >
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${C.gold} 0%, ${C.navy} 100%)`,
        }}
      />
      {title || description ? (
        <CardHeader className="space-y-3 p-5 pb-4">
          <div className="flex items-center justify-between gap-4">
            <HarobalLogo
              variant={dark ? "icon-square" : "icon-plain"}
              size={36}
            />
            <div className="hidden h-px flex-1 bg-current/10 sm:block" />
          </div>
          {title ? (
            <CardTitle
              style={{
                color: dark ? C.cream : C.navy,
                fontFamily: FONTS.serif,
                letterSpacing: LS.wordmark,
              }}
            >
              {title}
            </CardTitle>
          ) : null}
          {description ? (
            <CardDescription
              style={{
                color: dark ? C.blueLight : C.blueMid,
                fontFamily: FONTS.sans,
                letterSpacing: LS.descriptor,
              }}
            >
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </Card>
  );
}

const BrandShowcase = () => {
  return (
    <div className="section-space">
      <div className="container-shell space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Brand Showcase
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            A showcase of brand components and assets. Intended for local
            development only.
          </p>
        </header>
      </div>
      <BrandNavbar
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
        showDescriptor
        dark
      />
      <BrandInlineLockup size="md" showDescriptor dark className="mx-4 my-8" />
      <BrandFooterSignature className="mx-4 my-8" />
      <BrandBadge variant="gold" className="mx-4">
        Gold Badge
      </BrandBadge>
      <BrandBadge variant="navy" className="mx-4">
        Navy Badge
      </BrandBadge>
      <BrandBadge variant="cream" className="mx-4">
        Cream Badge
      </BrandBadge>
      <BrandBadge variant="outline-gold" className="mx-4">
        Outline Gold
      </BrandBadge>
      <BrandBadge variant="outline-navy" className="mx-4">
        Outline Navy
      </BrandBadge>
      <BrandPill className="mx-4" />
      <BrandDivider className="mx-4 my-8" />
      <BrandWatermark className="mx-4 my-8" />
      <BrandLoadingMark className="mx-4 my-8" />
      <BrandSplashHero
        headline="Welcome to Harobal Ventures"
        subtext="The Global Trading House"
        cta={
          <button className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground">
            Get Started
          </button>
        }
      />
      <BrandCard
        title="Our Mission"
        description="Connecting global markets with unparalleled expertise and integrity."
        dark
        className="mx-4 my-8"
      >
        <p
          style={{
            color: C.cream,
            fontFamily: FONTS.sans,
            letterSpacing: LS.descriptor,
          }}
        >
          At Harobal Ventures, we are dedicated to bridging the gap between
          global markets and innovative solutions. Our mission is to empower
          businesses worldwide by providing unparalleled expertise, integrity,
          and a commitment to excellence in every transaction.
        </p>
      </BrandCard>
    </div>
  );
};

export default BrandShowcase;

