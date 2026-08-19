/**
 * Harobal Foods — Vertical Brand Theme
 *
 * Foods-specific visual identity tokens.
 * The CSS variable `--food` is defined in globals.css.
 * This file provides the TypeScript-accessible brand metadata.
 */

export const foodsTheme = {
  id: "foods" as const,
  displayName: "Harobal Foods",

  /** Primary accent color for the Foods vertical */
  accentColor: "#2E6B55",
  signalColor: "#6E9C62",
  premiumColor: "#C99132",
  cssVariable: "--food",

  /** Motion personality */
  motionProfile: "fluid" as const,

  /** Typography personality — uses shared fonts but warmer feel */
  typographyProfile: "warm" as const,
} as const;
