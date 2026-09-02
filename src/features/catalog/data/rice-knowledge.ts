export const riceSources = [
  { id: "APEDA-BASMATI", authority: "APEDA", title: "Basmati Rice", url: "https://apeda.gov.in/BasmatiRice", accessedOn: "2026-08-28" },
  { id: "APEDA-BEDF", authority: "APEDA / BEDF", title: "Basmati Export Development Foundation", url: "https://apeda.gov.in/bedf", accessedOn: "2026-08-28" },
  { id: "APEDA-CROP-2023", authority: "APEDA", title: "Basmati Crop Survey, Season 2023", url: "https://apeda.gov.in/sites/default/files/documents/2025-06/Basmati_Crop_survey_Report_5_Season_2023.pdf", accessedOn: "2026-08-28" },
  { id: "FSSAI-BASMATI", authority: "FSSAI", title: "Food product standards: Basmati Rice", url: "https://www.fssai.gov.in/upload/uploadfiles/files/Chapter%202_4_Cereals_and_Cereal_products.pdf", accessedOn: "2026-08-28" },
  { id: "PPVFRA-RICE", authority: "PPV&FRA", title: "Rice variety characteristics and registrations", url: "https://plantauthority.gov.in/node/3044", accessedOn: "2026-08-28" },
] as const;

export const basmatiStandards = [
  { parameter: "Average kernel length", milled: "≥ 6.61 mm", parboiled: "≥ 6.61 mm", sourceId: "FSSAI-BASMATI" },
  { parameter: "Length-to-breadth ratio", milled: "≥ 3.5", parboiled: "≥ 3.5", sourceId: "FSSAI-BASMATI" },
  { parameter: "Average cooked length", milled: "≥ 12 mm", parboiled: "≥ 12 mm", sourceId: "FSSAI-BASMATI" },
  { parameter: "Volume expansion ratio", milled: "> 3.5", parboiled: "> 3.5", sourceId: "FSSAI-BASMATI" },
  { parameter: "Pre-cooked breadth", milled: "≤ 2.0 mm", parboiled: "≤ 2.0 mm", sourceId: "FSSAI-BASMATI" },
  { parameter: "Elongation after cooking", milled: "≥ 1.7", parboiled: "≥ 1.5", sourceId: "FSSAI-BASMATI" },
  { parameter: "Moisture", milled: "≤ 14%", parboiled: "≤ 14%", sourceId: "FSSAI-BASMATI" },
  { parameter: "Organic extraneous matter", milled: "≤ 1.0%", parboiled: "≤ 1.0%", sourceId: "FSSAI-BASMATI" },
  { parameter: "Inorganic extraneous matter", milled: "≤ 0.1%", parboiled: "≤ 0.1%", sourceId: "FSSAI-BASMATI" },
] as const;

export const riceVarieties = [
  {
    key: "1121",
    name: "Pusa Basmati 1121",
    shortName: "1121",
    identity: "Registered Basmati rice variety; APEDA reports it among the principal varieties cultivated in Haryana.",
    plantTraits: "Medium heading; low amylose classification in the cited PPV&FRA variety-characteristic material.",
    evidence: ["APEDA-CROP-2023", "PPVFRA-RICE"],
  },
  {
    key: "1509",
    name: "Pusa Basmati 1509",
    shortName: "1509",
    identity: "Notified/recognized Basmati variety; APEDA reports it among the principal varieties cultivated in Haryana.",
    plantTraits: "Early heading; medium amylose classification in the cited PPV&FRA variety-characteristic material.",
    evidence: ["APEDA-CROP-2023", "PPVFRA-RICE"],
  },
] as const;

export const riceProcesses = [
  {
    key: "steam",
    label: "Steam trade program",
    regulatoryContext: "‘Steam’ is retained as a buyer-facing trade term. The final specification must state whether the supplied rice is milled, brown, parboiled brown, or milled parboiled under the applicable FSSAI type.",
  },
  {
    key: "sella",
    label: "Sella / parboiled program",
    regulatoryContext: "FSSAI describes parboiled Basmati as rice subjected to soaking and heat treatment so starch is gelatinized, followed by drying; the exact brown or milled type must be declared.",
  },
] as const;

export const riceQuoteOptions = [
  { varietyKey: "1121", processKey: "steam", slug: "rice-basmati-1121-steam-grain-export-standard", title: "Rice — Basmati 1121 Steam" },
  { varietyKey: "1121", processKey: "sella", slug: "rice-basmati-1121-sella-parboiled-grain-export-standard", title: "Rice — Basmati 1121 Sella (Parboiled)" },
  { varietyKey: "1509", processKey: "steam", slug: "rice-basmati-1509-steam-grain-export-standard", title: "Rice — Basmati 1509 Steam" },
  { varietyKey: "1509", processKey: "sella", slug: "rice-basmati-1509-sella-parboiled-grain-export-standard", title: "Rice — Basmati 1509 Sella (Parboiled)" },
] as const;

export function getRiceKnowledgeForSlug(slug: string) {
  if (!slug.startsWith("rice-")) return undefined;
  const variety = riceVarieties.find((item) => slug.includes(`basmati-${item.key}`));
  const process = riceProcesses.find((item) => slug.includes(item.key === "sella" ? "sella-parboiled" : "steam"));
  return { variety, process, isBasmati: slug.includes("basmati") };
}

