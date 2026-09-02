export const oilSources = [
  { id: "FSSAI-2.2", authority: "FSSAI", title: "Chapter 2.2 — Fats, oils and fat emulsions", url: "https://www.fssai.gov.in/cms/compendium-fss-fps-fa.php", accessedOn: "2026-08-31" },
  { id: "FSSAI-FOSCOS", authority: "FSSAI FoSCoS", title: "Standardized food-product mapping for edible oils", url: "https://fcstraining.fssai.gov.in/standard-product", accessedOn: "2026-08-31" },
  { id: "FSSAI-METHODS", authority: "FSSAI", title: "Manual of methods of analysis for oils and fats", url: "https://fssai.gov.in/upload/uploadfiles/files/Manual_Revised_Oil_Fats_22_06_2021.pdf", accessedOn: "2026-08-31" },
] as const;

export const oilFamilies = [
  { key: "groundnut", name: "Groundnut / peanut", scientificName: "Arachis hypogaea", seedPrefixes: ["groundnut-peanut", "groundnut-blanched"], oilPrefix: "groundnut-oil", distinction: "Blanched is a processing state, not a separate species. Edible kernels and extracted oil require different specifications.", markers: "Seed: size/count, damage, moisture, aflatoxins and allergen controls. Oil: identity profile, acid/peroxide value, moisture/impurities, residues and aflatoxin-control evidence for raw material." },
  { key: "mustard", name: "Mustard", scientificName: "Brassica spp.", seedPrefixes: ["mustard-seed-brown", "mustard-seed-yellow"], oilPrefix: "mustard-oil", distinction: "Brown/yellow seed market classes and conventional/low-erucic oil programs must be identified explicitly.", markers: "Seed purity and colour class; oil fatty-acid profile, erucic-acid program, allyl isothiocyanate where applicable, acid/peroxide value and adulteration controls." },
  { key: "sesame", name: "Sesame", scientificName: "Sesamum indicum", seedPrefixes: ["sesame-seed-black", "sesame-seed-hulled", "sesame-seed-natural-white"], oilPrefix: "sesame-oil", distinction: "Black, natural white and hulled describe seed classes/processes; hulled seed must not be presented as a colour variety.", markers: "Seed colour/hulling, purity, moisture and Salmonella; oil identity profile, acid/peroxide value, unsaponifiable matter and adulteration controls." },
  { key: "sunflower", name: "Sunflower", scientificName: "Helianthus annuus", seedPrefixes: ["sunflower-seed"], oilPrefix: "sunflower-oil", distinction: "Conventional and high-oleic oils are composition programs, not interchangeable marketing grades.", markers: "Seed use class and purity; oil fatty-acid profile, high-oleic status where claimed, acid/peroxide value, waxes and authenticity." },
  { key: "flax", name: "Flaxseed / linseed", scientificName: "Linum usitatissimum", seedPrefixes: ["flaxseed-brown", "flaxseed-golden"], distinction: "Brown and golden are seed colour classes. Colour alone does not establish omega-3 content or cultivar.", markers: "Colour class, purity, moisture, damaged seeds, cyanogenic-glycoside risk assessment for intended use, residues and microbiology." },
  { key: "soy", name: "Soybean", scientificName: "Glycine max", seedPrefixes: ["soybean"], distinction: "Food, crushing and seed-grade soybeans require different contracts; GMO status must be supported by the agreed evidence.", markers: "Use class, protein/oil where contracted, moisture, damage, foreign matter, GMO program, residues and allergen controls." },
  { key: "coconut", name: "Coconut oil", scientificName: "Cocos nucifera", seedPrefixes: [], oilPrefix: "coconut-oil", distinction: "Virgin/cold-process and refined coconut oils differ in raw material and processing; ‘cold-pressed’ needs a defined process.", markers: "Process category, fatty-acid profile, acid/peroxide value, moisture/volatile matter, insoluble impurities, odour and contaminants." },
  { key: "rice-bran", name: "Rice bran oil", scientificName: "Oryza sativa bran", seedPrefixes: [], oilPrefix: "rice-bran-oil", distinction: "Rice bran is enzyme-active and stabilization/extraction history matters. Treat a legacy ‘cold-pressed’ label as unverified until the actual process is documented.", markers: "Extraction/refining history, fatty-acid profile, oryzanol where contracted, acid/peroxide value, waxes, residual solvent where relevant and contaminants." },
] as const;

export const oilProcesses = [
  { key: "cold-pressed", label: "Cold-pressed / expelled", meaning: "Define preparation, pressing temperature/control and filtration. The term does not itself prove virgin status, purity or nutritional superiority." },
  { key: "refined", label: "Refined", meaning: "Declare extraction route and refining steps; verify identity, oxidation, contaminants, additives/fortification and residual solvent where applicable." },
] as const;

export const oilControls = [
  { area: "Identity and adulteration", evidence: "Commodity-specific physical constants, fatty-acid/sterol profile and targeted authenticity tests." },
  { area: "Oxidation and handling", evidence: "Acid/free-fatty-acid value, peroxide value, sensory condition, manufacture/pack date, oxygen/light barrier and storage." },
  { area: "Process truth", evidence: "Pressing/extraction/refining records, filtration, deodorization, additives, fortification and residual-solvent evidence where relevant." },
  { area: "Seed safety", evidence: "Moisture, foreign matter, infestation, mycotoxins, residues, microbiology and allergen controls according to identity/use." },
] as const;

export const oilQuoteOptions = oilFamilies.filter((item) => "oilPrefix" in item).flatMap((item) => oilProcesses.map((process) => ({ familyKey: item.key, processKey: process.key, slug: `${item.oilPrefix}-${process.key}-oil-food-grade`, title: `${item.name} — ${process.label}` })));

export function getOilKnowledgeForSlug(slug: string) {
  const family = oilFamilies.find((item) => ("oilPrefix" in item && slug.startsWith(`${item.oilPrefix}-`)) || item.seedPrefixes.some((prefix) => slug.startsWith(`${prefix}-`)));
  if (!family) return undefined;
  const process = oilProcesses.find((item) => slug.includes(`-${item.key}-`));
  return { family, process, isOil: "oilPrefix" in family && slug.startsWith(`${family.oilPrefix}-`) };
}
