export const pulseSources = [
  { id: "FSSAI-PULSES", authority: "FSSAI", title: "Chapter 2.4 — Cereals and cereal products (Pulses, 2.4.6(22))", url: "https://www.fssai.gov.in/upload/uploadfiles/files/Chapter%202_4_Cereals_and_Cereal_products.pdf", accessedOn: "2026-08-28" },
  { id: "FSSAI-METHODS", authority: "FSSAI", title: "Manual of methods of analysis — cereals and cereal products", url: "https://fssai.gov.in/food-testing/manuals-methods-analysis", accessedOn: "2026-08-28" },
  { id: "ICAR-IIPR", authority: "ICAR–Indian Institute of Pulses Research", title: "Pulse crop research and crop identities", url: "https://iipr.icar.gov.in/", accessedOn: "2026-08-28" },
] as const;

export const pulseFamilies = [
  { key: "chickpea", name: "Chickpea / chana", scientificName: "Cicer arietinum", tradeNames: "Desi chana, Kabuli chana, Bengal gram, chana dal", distinction: "Desi and Kabuli are market classes within chickpea. Declare class, seed size/count, colour and form instead of treating ‘premium’ as a measurable grade.", evidence: ["FSSAI-PULSES", "ICAR-IIPR"] },
  { key: "mung", name: "Green gram / moong", scientificName: "Vigna radiata", tradeNames: "Whole moong, split moong, moong dal", distinction: "Whole retains the seed coat; split/dehusked programs must state whether the coat is retained and the allowed brokens/powder.", evidence: ["FSSAI-PULSES", "ICAR-IIPR"] },
  { key: "urd", name: "Black gram / urad", scientificName: "Vigna mungo", tradeNames: "Whole urad, split urad, urad dal", distinction: "Do not confuse black seed-coat colour with the pale cotyledon of dehusked urad dal. Contract the processing form explicitly.", evidence: ["FSSAI-PULSES", "ICAR-IIPR"] },
  { key: "pigeonpea", name: "Pigeon pea / toor", scientificName: "Cajanus cajan", tradeNames: "Arhar, tur, toor, toor dal", distinction: "Arhar, tur and toor refer to the same pulse family; the sale specification still needs form, colour, polish treatment and defect limits.", evidence: ["FSSAI-PULSES", "ICAR-IIPR"] },
  { key: "lentil", name: "Lentil / masoor", scientificName: "Lens culinaris", tradeNames: "Whole masoor, red lentil, green lentil, masoor dal", distinction: "Commercial colour names can describe seed coat or cotyledon. Pair the colour term with whole/dehusked/split form to remove ambiguity.", evidence: ["FSSAI-PULSES", "ICAR-IIPR"] },
  { key: "pea", name: "Dry pea", scientificName: "Pisum sativum", tradeNames: "Yellow peas, green peas, split peas", distinction: "Specify dry food-grade peas, colour, whole or split form, and intended use; do not infer identity from colour alone.", evidence: ["FSSAI-PULSES"] },
  { key: "rajma", name: "Common bean / rajma", scientificName: "Phaseolus vulgaris", tradeNames: "Rajma, kidney bean, common bean", distinction: "Trade classes vary by seed shape, colour and size. These are buyer-agreed lot attributes, not one universal rajma grade.", evidence: ["FSSAI-PULSES"] },
  { key: "lobia", name: "Cowpea / lobia", scientificName: "Vigna unguiculata", tradeNames: "Black-eyed pea, lobia, cowpea", distinction: "The black-eye is a market appearance descriptor. Contract colour, size/count, crop and defects against the offered lot.", evidence: ["FSSAI-PULSES"] },
] as const;

export const pulseForms = [
  { key: "whole", label: "Whole", meaning: "Seed remains whole; state whether the natural seed coat is present and set tolerances for splits and brokens." },
  { key: "split", label: "Split / dal", meaning: "Cotyledons are split; declare dehusking, polish or oil treatment, broken/powder limits and colour expectations." },
  { key: "flour", label: "Flour", meaning: "Milled product requires a separate particle-size, moisture, microbiological and destination-compliance specification; the whole/split pulse table is not a flour COA." },
] as const;

export const pulseBaseline = [
  { parameter: "Moisture", withSeedCoat: "≤ 14%", withoutSeedCoat: "≤ 12%" },
  { parameter: "Extraneous matter", withSeedCoat: "≤ 1% total", withoutSeedCoat: "≤ 1% total" },
  { parameter: "Mineral matter (within extraneous matter)", withSeedCoat: "≤ 0.25%", withoutSeedCoat: "≤ 0.25%" },
  { parameter: "Impurities of animal origin (within extraneous matter)", withSeedCoat: "≤ 0.10%", withoutSeedCoat: "≤ 0.10%" },
  { parameter: "Other edible grains", withSeedCoat: "≤ 2%", withoutSeedCoat: "≤ 2%" },
  { parameter: "Damaged grains", withSeedCoat: "≤ 5%", withoutSeedCoat: "≤ 5%" },
  { parameter: "Weevilled grains", withSeedCoat: "≤ 2% by count", withoutSeedCoat: "≤ 2% by count" },
  { parameter: "Uric acid", withSeedCoat: "≤ 100 mg/kg", withoutSeedCoat: "≤ 100 mg/kg" },
] as const;

const pulseSlugPrefixes: Record<string, string[]> = {
  chickpea: ["chickpea-desi", "chickpea-kabuli", "chana-dal"], mung: ["green-gram-moong", "moong-dal"], urd: ["black-gram-urad", "urad-dal"],
  pigeonpea: ["pigeon-pea-toor-tur", "toor-dal"], lentil: ["masoor-dal", "red-lentils", "green-lentils"], pea: ["yellow-peas", "green-peas"], rajma: ["kidney-beans-rajma"], lobia: ["black-eyed-peas-lobia"],
};

export const pulseQuoteOptions = pulseFamilies.flatMap((family) => pulseForms.map((form) => {
  const prefix = pulseSlugPrefixes[family.key][0];
  return { familyKey: family.key, formKey: form.key, slug: `${prefix}-${form.key}-export-standard`, title: `${family.name} — ${form.label}` };
}));

export function getPulseKnowledgeForSlug(slug: string) {
  const family = pulseFamilies.find((item) => pulseSlugPrefixes[item.key].some((prefix) => slug.startsWith(`${prefix}-`)));
  if (!family) return undefined;
  const form = pulseForms.find((item) => slug.includes(`-${item.key}-`));
  return { family, form };
}
