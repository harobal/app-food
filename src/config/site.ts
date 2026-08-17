import type { Metadata } from "next";

export const siteConfig = {
  appName: "Harobal Ventures",
  legalName: "Harobal Ventures Global Trading LLP",
  defaultTitle: "Harobal Ventures | Global Trading House from India",
  titleTemplate: "%s | Harobal Ventures",
  description:
    "Harobal Ventures is a multi-vertical export trading house connecting international buyers to verified Indian suppliers across active stone and food commodity domains.",
  locale: "en_IN",
  primarySiteUrl: process.env.NEXT_PUBLIC_PRIMARY_SITE_URL ?? "https://harobalventures.com",
  stonesSiteUrl: process.env.NEXT_PUBLIC_STONES_SITE_URL ?? "https://stones.harobalventures.com",
  foodsSiteUrl: process.env.NEXT_PUBLIC_FOODS_SITE_URL ?? "https://foods.harobalventures.com",
  themeColor: "#1B2A4A",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.primarySiteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.appName,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.primarySiteUrl,
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

