import type { Metadata } from "next";

export const siteConfig = {
  appName: "Harobal Foods",
  legalName: "Harobal Ventures Global Trading LLP",
  defaultTitle: "Harobal Foods | Export-ready Foods & Agriculture",
  titleTemplate: "%s | Harobal Foods",
  description:
    "Harobal Foods connects global buyers with export-ready Indian food and agricultural suppliers through traceable, compliant execution.",
  locale: "en_IN",
  primarySiteUrl: process.env.NEXT_PUBLIC_PRIMARY_SITE_URL ?? "https://harobalventures.com",
  stonesSiteUrl: process.env.NEXT_PUBLIC_STONES_SITE_URL ?? "https://stones.harobalventures.com",
  foodsSiteUrl: process.env.NEXT_PUBLIC_FOODS_SITE_URL ?? "https://foods.harobalventures.com",
  themeColor: "#2E6B55",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.foodsSiteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.appName,
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon_io/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon_io/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.foodsSiteUrl,
    siteName: siteConfig.appName,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
};

