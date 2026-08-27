export const brand = {
  name: "Harobal Foods",
  legalName: "Harobal",
  tagline: "Export-ready foods and agriculture",
  shortDescription:
    "Harobal Foods supports global buyers with export-ready food and agricultural sourcing, traceability, compliance, and shipment execution.",
  supportLine: "Agriculture, Food Ingredients & Value-Added Commodities",
  email: "foods@harobal.com",
  salesEmail: "foods@harobal.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP?.trim() ?? "",
};
