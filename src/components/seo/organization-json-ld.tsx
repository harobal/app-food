import { siteConfig } from "@/config/site";
import { brand } from "@/content/site";

export function OrganizationJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.foodsSiteUrl}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.appName,
        url: siteConfig.foodsSiteUrl,
        logo: `${siteConfig.foodsSiteUrl}/brand/Logo.svg`,
        email: siteConfig.contactEmail,
        ...(brand.phone ? { telephone: brand.phone } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 23.0225,
          longitude: 72.5714,
        },
        areaServed: ["Worldwide", "IN", "US", "AE", "EU", "GB", "SA"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.contactEmail,
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.foodsSiteUrl}/#website`,
        url: siteConfig.foodsSiteUrl,
        name: siteConfig.appName,
        publisher: { "@id": `${siteConfig.foodsSiteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.foodsSiteUrl}/catalog#service`,
        name: "Export-Ready Food and Agro Commodities Sourcing",
        serviceType: "Agri Commodity Export & Quality Control",
        description: siteConfig.description,
        url: `${siteConfig.foodsSiteUrl}/catalog`,
        provider: { "@id": `${siteConfig.foodsSiteUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
