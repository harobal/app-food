"use client";

import { cn } from "@/lib/utils";
/**
 * Usage:
 *   <HarobalLogo variant="primary" size="lg" />
 *   <HarobalLogo variant="horizontal" size="md" className="my-4" />
 *   <HarobalLogo variant="icon-circle" size={64} />
 */

import {
  COLORS,
  LogoVariant,
  LogoSizeKey,
  H_MARK_PATH,
  RATIO,
  LETTER_SPACING,
  FONTS,
  resolveSize, 
  getTheme
} from "./brand";

// ─────────────────────────────────────────────────────────
// INTERNAL — HandshakeMark SVG
// ─────────────────────────────────────────────────────────

interface HandshakeMarkProps {
  color: string;
  size: number;
}

export const HMark: React.FC<HandshakeMarkProps> = ({ color, size }) => (
  // We can also apply fixed size constraints here if needed, but for now we let the parent control it via props.
  <svg
    viewBox="0 0 852 833"
    width={size}
    height={Math.round(size * (833 / 852))}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path fillRule="evenodd" fill={color} d={H_MARK_PATH} />
  </svg>
);

// ─────────────────────────────────────────────────────────
// INTERNAL — Wordmark text block
// ─────────────────────────────────────────────────────────

interface WordmarkProps {
  nameColor: string;
  goldColor: string;
  venturesColor: string;
  descriptorColor: string;
  nameSize: number;
  showDescriptor?: boolean;
  align?: "left" | "center";
  compact?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  nameColor,
  goldColor,
  venturesColor,
  descriptorColor,
  nameSize,
  showDescriptor = true,
  align = "center",
  compact = false,
}) => {
  const venturesSize = Math.round(nameSize * RATIO.ventures);
  const descriptorSize = Math.round(nameSize * RATIO.descriptor);
  const ruleW = Math.round(nameSize * (compact ? 0.55 : RATIO.ruleWidth));
  const ruleH = Math.max(1, Math.round(nameSize * 0.024));
  const gapVentures = Math.round(nameSize * 0.16); // gap inside ventures row
  const gapAfterName = Math.round(nameSize * 0.07); // gap after HAROBAL
  const gapAfterVentures = Math.round(nameSize * 0.11); // gap after VENTURES
  const alignItems = align === "center" ? "center" : "flex-start";

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems, gap: 0 }}
      role="img"
      aria-label="Harobal Ventures — The Global Trading House"
    >
      {/* ── HAROBAL ── */}
      <div
        style={{
          fontSize: nameSize,
          fontWeight: 600,
          letterSpacing: LETTER_SPACING.wordmark,
          color: nameColor,
          lineHeight: 1,
          fontFamily: FONTS.serif,
          display: "flex",
          alignItems: "baseline",
          whiteSpace: "nowrap",
        }}
        aria-label="HAROBAL"
      >
        <span>HAR</span>
        <span style={{ color: goldColor }}>O</span>
        <span>BAL</span>
      </div>

      {/* ── ——VENTURES—— ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: gapVentures,
          marginTop: gapAfterName,
        }}
      >
        <span
          style={{
            display: "block",
            width: ruleW,
            height: ruleH,
            backgroundColor: venturesColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: venturesSize,
            fontWeight: 500,
            letterSpacing: LETTER_SPACING.ventures,
            color: venturesColor,
            lineHeight: 1,
            fontFamily: FONTS.sans,
            whiteSpace: "nowrap",
          }}
        >
          VENTURES
        </span>
        <span
          style={{
            display: "block",
            width: ruleW,
            height: ruleH,
            backgroundColor: venturesColor,
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── THE GLOBAL TRADING HOUSE ── */}
      {showDescriptor && (
        <div
          style={{
            fontSize: descriptorSize,
            fontWeight: 400,
            letterSpacing: LETTER_SPACING.descriptor,
            color: descriptorColor,
            lineHeight: 1,
            fontFamily: FONTS.sans,
            marginTop: gapAfterVentures,
            whiteSpace: "nowrap",
          }}
        >
          THE GLOBAL TRADING HOUSE
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// INTERNAL — Icon container (square / circle)
// ─────────────────────────────────────────────────────────

interface IconContainerProps {
  children: React.ReactNode;
  shape: "square" | "circle" | "none";
  bgColor: string;
  ringColor?: string;
  ringWidth?: number;
  size: number;
}

/** Square or circular icon container */
export const IconWrap: React.FC<IconContainerProps> = ({
  children,
  shape,
  bgColor,
  ringColor,
  ringWidth = 3,
  size,
}) => {
  const radius =shape === "circle" ? "50%" : shape === "square"
        ? `${Math.round(size * 0.2)}px`
        : "0";
  const padding = Math.round(size * 0.14);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: shape !== "none" ? bgColor : "transparent",
        padding: shape !== "none" ? padding : 0,
        boxSizing: "border-box",
        flexShrink: 0,
        ...(ringColor
          ? { boxShadow: `0 0 0 ${ringWidth}px ${ringColor}` }
          : {}),
      }}
    >
      {children}
    </div>
  );
};


// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────

export interface HarobalLogoProps {
  /** Which of the 14 brand variations to render */
  variant?: LogoVariant;
  /**
   * Optional palette override for rendering on dark/light surfaces.
   * This adjusts text/symbol colors without forcing a background panel.
   */
  theme?: "light" | "dark";
  /**
   * Size preset or explicit pixel number for the symbol width.
   * "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number
   */
  size?: LogoSizeKey | number;
  /** Additional Tailwind / CSS classes on the root element */
  className?: string;
  /** Inline style overrides on the root element */
  style?: React.CSSProperties;
  /** Accessible label. Defaults to "Harobal Ventures" */
  label?: string;
  /**
   * Overrides whether the descriptor line ("THE GLOBAL TRADING HOUSE") is shown.
   * Useful for tight UI like navbars.
   */
  showDescriptor?: boolean;
}

const HarobalLogo: React.FC<HarobalLogoProps> = ({
  variant = "primary",
  theme = "light",
  size = "lg",
  className,
  style: styleOverride,
  label = "Harobal Ventures",
  showDescriptor,
}) => {
  const { symbolWidth: SW, nameSize: NS } = resolveSize(size);
  const basePalette = getTheme(variant);
  const palette =
    theme === "dark"
      ? {
          ...basePalette,
          symbolColor: COLORS.cream,
          nameColor: COLORS.cream,
          goldAccent: COLORS.gold,
          venturesColor: COLORS.gold,
          descriptorColor: COLORS.blueLight,
          bgColor: "transparent",
          hasBg: false,
        }
      : theme === "light"
        ? {
            ...basePalette,
            symbolColor: COLORS.navy,
            nameColor: COLORS.navy,
            goldAccent: COLORS.gold,
            venturesColor: COLORS.gold,
            descriptorColor: COLORS.blueMid,
            bgColor: "transparent",
            hasBg: false,
          }
        : basePalette;
 
  const compact = variant === "alternate-stacked";


    // ── FAVICON / APP Icon / ICON — symbol only ────────────────────
  const iconVar= variant.split("-")[0]
  const isFavicon = iconVar=== "favicon";
  const isAppIcon = iconVar === "app";
  const isIcon= iconVar === "icon";

// ── FAVICON (13a / 13b) ─────────────────────────────
  if (isFavicon){
    const isDark = variant === "favicon";
    const cSize  = SW;
    const innerW = Math.round(cSize * 0.78);
    return (
        <div
        className={cn("inline-flex", className)}
        style={styleOverride}
        aria-label={label}
        role="img"
        >
            <IconWrap 
                shape={"square"}
                bgColor={isDark ? COLORS.navy : COLORS.white}
                size={cSize}
                ringColor={undefined}
                ringWidth={undefined}
            >
                <HMark color={isDark ? COLORS.cream : COLORS.navy} size={innerW}/>
            </IconWrap>

        </div>
    )
    
  }

  // ── App Icon & Icon-Only (12a - 12d / 4 - 6) ─────────────────────────────
    if (isAppIcon || isIcon) {
        const isCircle = variant === "app-circle" || variant === "icon-circle";
        const isPlain = variant === "app-plain" || variant === "icon-plain";
        const shape = isCircle ? "circle" : "square";
        const isDark = isCircle || variant === "app-square" || variant === "icon-square";
        const cSize = Math.round(SW * 1.28);
        const innerW = Math.round(cSize * 0.78);
        if (isPlain) {
            return(
                <div
          className={cn("inline-flex", className)}
          style={styleOverride}
          aria-label={label}
          role="img"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: cSize,
              height: cSize,
              backgroundColor: COLORS.white,
              borderRadius: `${Math.round(cSize * 0.2)}px`,
              boxShadow: "0 2px 20px rgba(27,42,74,0.10)",
              padding: Math.round(cSize * 0.13),
              boxSizing: "border-box",
            }}
          >
            <HMark color={COLORS.navy} size={innerW} />
          </div>
        </div>
            )
        }

        const bgColor = isDark ? COLORS.navy : COLORS.white;
        const symColor = isDark ? COLORS.cream : COLORS.navy;
        const ringW = Math.max(3, Math.round(cSize * 0.045));
        const ringColor = isCircle ? COLORS.gold : undefined;

        return (
            <div
        className={cn("inline-flex", className)}
        style={styleOverride}
        aria-label={label}
        role="img"
      >
        <IconWrap
          shape={shape}
          bgColor={bgColor}
          ringColor={ringColor}
          ringWidth={ringW}
          size={cSize}
        >
          <HMark color={symColor} size={innerW} />
        </IconWrap>
      </div>
        )
    }

  // ── WORDMARK-ONLY (14a / 14b) ────────────────────────
  if (variant === "wordmark" || variant === "wordmark-dark") {
    const resolvedShowDescriptor = showDescriptor ?? true;
    const wordmarkSize = Math.round(NS * 1.08);
    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        style={{
          backgroundColor: palette.hasBg ? palette.bgColor : "transparent",
          padding: palette.hasBg ? Math.round(wordmarkSize * 0.5) : 0,
          borderRadius: palette.hasBg ? Math.round(wordmarkSize * 0.2) : 0,
          ...styleOverride,
        }}
        aria-label={label}
        role="img"
      >
        <Wordmark
          nameColor={palette.nameColor}
          goldColor={palette.goldAccent}
          venturesColor={palette.venturesColor}
          descriptorColor={palette.descriptorColor}
          nameSize={wordmarkSize}
          showDescriptor={resolvedShowDescriptor}
          align="center"
        />
      </div>
    );
  }

  // ── HORIZONTAL (2) ───────────────────────────────────
  if (variant === "horizontal" || variant === "dark-horizontal") {
    const wordmarkSize = Math.round(NS * 1.08);
    const divH = Math.round(wordmarkSize * 2.41);
    const resolvedShowDescriptor = showDescriptor ?? true;
    return (
      <div
        className={cn("inline-flex", className)}
        style={{
          backgroundColor: palette.hasBg ? palette.bgColor : "transparent",
          padding: palette.hasBg ?  `${Math.round(wordmarkSize * 0.5)}px ${Math.round(wordmarkSize * 0.8)}px` : 0,
          ...styleOverride,
        }}
        aria-label={label}
        role="img"
      >
        <div style={{ display: "flex", alignItems: "center", gap: Math.round(wordmarkSize * 0.54) }}>
          <HMark color={palette.symbolColor} size={SW} />
          {/* vertical rule divider */}
          <div
            style={{
              width: 1,
              height: divH,
              backgroundColor: palette.symbolColor,
              opacity: 0.3,
              flexShrink: 0,
            }}
          />
          <Wordmark
            nameColor={palette.nameColor}
            goldColor={palette.goldAccent}
            venturesColor={palette.venturesColor}
            descriptorColor={palette.descriptorColor}
            nameSize={wordmarkSize}
            showDescriptor={resolvedShowDescriptor}
            align="center"
          />
        </div>
      </div>
    );
  }

  // ── STACKED — primary / compact / mono / dark (1,3,7–11) ─
  const symW = compact ? Math.round(SW * 0.86) : SW;
  const fns   = compact ? Math.round(NS * 0.88) : NS;
  const gap  = compact ? Math.round(fns * 0.28) : Math.round(fns*0.46);
  const bgPad = palette.hasBg ? `${Math.round(fns * 0.8)}px ${Math.round(fns * 1.1)}px` : 0;
  const bgR   = palette.hasBg ? Math.round(fns * 0.2) : 0;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{
        backgroundColor: palette.hasBg ? palette.bgColor : "transparent",
        padding: bgPad,
        borderRadius: bgR,
        ...styleOverride,
      }}
      aria-label={label}
      role="img"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap }}>
        <HMark color={palette.symbolColor} size={symW} />
        <Wordmark
          nameColor={palette.nameColor}
          goldColor={palette.goldAccent}
          venturesColor={palette.venturesColor}
          descriptorColor={palette.descriptorColor}
          nameSize={fns}
          showDescriptor={false}
          align="center"
          compact={compact}
        />
      </div>
    </div>
  );
};

export default HarobalLogo;
