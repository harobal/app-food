export const nutSources = [
  { id: "FSSAI-2.3", authority: "FSSAI", title: "Chapter 2.3 — Fruit and vegetable products", url: "https://www.fssai.gov.in/upload/uploadfiles/files/Chapter%202_3_Fruit_Vegetable_products.pdf", accessedOn: "2026-08-31" },
  { id: "FSSAI-COMPENDIUM", authority: "FSSAI", title: "Current food-product standards compendium", url: "https://www.fssai.gov.in/cms/compendium-fss-fps-fa.php", accessedOn: "2026-08-31" },
  { id: "APEDA-NUTS", authority: "APEDA", title: "Processed fruits, juices and nuts", url: "https://apeda.gov.in/ProcessedFruitsJuicesAndNuts", accessedOn: "2026-08-31" },
  { id: "APEDA-TRADE", authority: "APEDA AgriExchange", title: "Product and destination trade information", url: "https://agriexchange.apeda.gov.in/IndiaExport/Home/Index", accessedOn: "2026-08-31" },
] as const;

export const nutIdentities = [
  { key: "almond", name: "Almond", scientificName: "Prunus dulcis", prefix: "almonds", styles: ["whole", "calibrated-size", "pieces"], distinction: "Declare shelled/in-shell status, cultivar or market type, kernel size/count method and processing treatment.", parameters: "Count/size, doubles, chipped/scratched kernels, shrivelled/damaged kernels, foreign matter, moisture, rancidity, aflatoxins and residues." },
  { key: "cashew", name: "Cashew kernel", scientificName: "Anacardium occidentale", prefix: "cashew-kernels", styles: ["whole", "calibrated-size", "pieces"], distinction: "Whole, splits and pieces are kernel styles—not different botanical products. A commercial cashew grade combines style, colour and count/size.", parameters: "Kernel style, count per pound where applicable, colour class, scorched/dessert defects, moisture, foreign matter, infestation and microbiology." },
  { key: "pistachio", name: "Pistachio", scientificName: "Pistacia vera", prefix: "pistachios", styles: ["whole", "calibrated-size", "pieces"], distinction: "Specify in-shell or kernel, naturally/mechanically opened status, size/count and whether roasted or salted.", parameters: "Open/closed shell, blanks, shell staining, kernel damage, moisture, aflatoxins, residues and Salmonella program." },
  { key: "walnut", name: "Walnut", scientificName: "Juglans regia", prefix: "walnuts", styles: ["whole", "calibrated-size", "pieces"], distinction: "In-shell walnuts and shelled kernels need different style terminology; kernel halves, quarters and pieces should be contracted explicitly.", parameters: "Kernel style, colour, shrivelled/rancid/damaged kernels, shell fragments, moisture, aflatoxins and residues." },
  { key: "raisin-black", name: "Black seedless raisin", scientificName: "Vitis vinifera", prefix: "raisins-black-seedless", styles: ["whole", "calibrated-size", "pieces"], distinction: "Dark colour does not by itself establish grape variety or drying method. Declare variety, seed status, treatment and colour range.", parameters: "Berry size/count, moisture, damaged/mouldy berries, stems, foreign matter, fermentation, oil treatment, sulphur dioxide and ochratoxin/residues as required." },
  { key: "raisin-golden", name: "Golden raisin", scientificName: "Vitis vinifera", prefix: "raisins-golden", styles: ["whole", "calibrated-size", "pieces"], distinction: "Golden appearance may be process-related. Sulphur-dioxide use and residual limit must be declared rather than inferred from colour.", parameters: "Berry size/count, colour, moisture, stems, damaged/mouldy berries, SO₂ treatment/residue, oil treatment and destination contaminant limits." },
  { key: "date", name: "Date", scientificName: "Phoenix dactylifera", prefix: "dates", styles: ["whole", "calibrated-size"], distinction: "Variety, pitted/unpitted status, moisture class and count/size materially change application and shelf behaviour.", parameters: "Variety, count/size, pits/pit fragments, moisture, defects, infestation, fermentation, added syrup/coating and microbiology." },
  { key: "apricot", name: "Dried apricot", scientificName: "Prunus armeniaca", prefix: "dried-apricots", styles: ["whole", "calibrated-size"], distinction: "Declare pitted status, halves/whole style, sulphured or unsulphured treatment and colour expectations.", parameters: "Size/count, moisture, damaged/dark fruit, pits/fragments, foreign matter, SO₂ declaration/residue, residues and microbiology." },
  { key: "fig", name: "Dried fig", scientificName: "Ficus carica", prefix: "dried-figs", styles: ["whole", "calibrated-size"], distinction: "Variety, presentation style and size/count must accompany aflatoxin and infestation controls.", parameters: "Count/size, moisture, split/damaged/sour fruit, infestation, foreign matter, aflatoxins and residues." },
] as const;

export const nutStyles = [
  { key: "whole", label: "Whole", meaning: "Contract whether this means in-shell fruit, a whole shelled kernel, or whole dried fruit; the legacy word alone is ambiguous." },
  { key: "calibrated-size", label: "Calibrated size", meaning: "State the count or screen method and tolerance. ‘Calibrated’ without a numeric method is not a grade." },
  { key: "pieces", label: "Pieces", meaning: "Declare the style distribution, minimum piece size, fines and foreign/shell-fragment tolerances." },
] as const;

export const nutRiskControls = [
  { risk: "Mycotoxins", control: "Use destination- and commodity-specific aflatoxin/ochratoxin limits with representative lot sampling; a programme label is not a result." },
  { risk: "Allergens", control: "Tree-nut identities must be declared individually. Review shared-line cross-contact and destination labelling requirements." },
  { risk: "Oxidation and rancidity", control: "Confirm crop/pack date, moisture, sensory condition, packaging barrier, storage temperature and shelf-life evidence." },
  { risk: "Treatments and additives", control: "Declare sulphur dioxide, oils, glazing, salt, sugar/syrup and preservatives; verify both legality and label declaration." },
  { risk: "Physical defects", control: "Use style-specific limits for shell/pit fragments, foreign matter, infestation, mould, damage, shrivelling and broken pieces." },
] as const;

export const nutQuoteOptions = nutIdentities.flatMap((identity) => identity.styles.map((style) => ({ identityKey: identity.key, styleKey: style, slug: `${identity.prefix}-${style}-dry-export-standard`, title: `${identity.name} — ${nutStyles.find((item) => item.key === style)?.label}` })));

export function getNutKnowledgeForSlug(slug: string) {
  const identity = nutIdentities.find((item) => slug.startsWith(`${item.prefix}-`) || (item.key === "cashew" && slug.startsWith("cashew-splits-")));
  if (!identity) return undefined;
  const style = nutStyles.find((item) => slug.includes(`-${item.key}-dry-`));
  return { identity, style };
}
