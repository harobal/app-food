export type IncotermDefinition = {
  code: string;
  name: string;
  category: "Any Mode of Transport" | "Sea and Inland Waterway";
  summary: string;
  sellerObligation: string;
  buyerObligation: string;
  riskTransferPoint: string;
  suitableFor: string;
};

export const INCOTERMS_2020: IncotermDefinition[] = [
  {
    code: "EXW",
    name: "Ex Works",
    category: "Any Mode of Transport",
    summary: "Seller makes agricultural products available at processing facility or warehouse. Buyer arranges export clearance, freight, and insurance.",
    sellerObligation: "Pack products in export-worthy bags/cartons at factory/warehouse.",
    buyerObligation: "Export phytosanitary/customs clearance, loading, freight, insurance, and import clearance.",
    riskTransferPoint: "When goods are made available at seller's facility.",
    suitableFor: "Domestic pickups or buyer-appointed consolidation agents.",
  },
  {
    code: "FCA",
    name: "Free Carrier",
    category: "Any Mode of Transport",
    summary: "Seller delivers export-cleared food commodities to the carrier nominated by the buyer at a designated ICD or terminal.",
    sellerObligation: "Export clearance, phytosanitary certificates, transport to agreed carrier.",
    buyerObligation: "Main freight, marine insurance, destination import duties.",
    riskTransferPoint: "When handed over to buyer's carrier at designated origin terminal/ICD.",
    suitableFor: "Containerized spices, grains, air-cargo perishable produce.",
  },
  {
    code: "CPT",
    name: "Carriage Paid To",
    category: "Any Mode of Transport",
    summary: "Seller pays carriage to named destination terminal. Risk transfers when handed to first carrier.",
    sellerObligation: "Export clearance, APEDA documentation, freight to named destination.",
    buyerObligation: "Import clearance, duties, and transit insurance from origin handover.",
    riskTransferPoint: "When goods are delivered to the first carrier.",
    suitableFor: "Multimodal food logistics, refrigerated cargo, dry grocery consolidations.",
  },
  {
    code: "CIP",
    name: "Carriage and Insurance Paid To",
    category: "Any Mode of Transport",
    summary: "Seller pays freight and Institute Cargo Clauses (A) all-risk insurance to named destination.",
    sellerObligation: "Export clearance, all-risk transit insurance, freight to destination.",
    buyerObligation: "Import customs clearance, port handling at destination, inland transport.",
    riskTransferPoint: "When handed to first carrier (insurance covers cargo to named point).",
    suitableFor: "High-value spices (saffron, cardamom), organic extracts, packaged retail foods.",
  },
  {
    code: "DAP",
    name: "Delivered at Place",
    category: "Any Mode of Transport",
    summary: "Seller delivers when goods are placed at disposal of buyer on arriving vehicle, ready for unloading.",
    sellerObligation: "All transport and transit risks up to buyer's warehouse/cold-storage.",
    buyerObligation: "Import customs clearance, food safety import approval, unloading.",
    riskTransferPoint: "When arriving vehicle is ready for unloading at buyer's facility.",
    suitableFor: "Direct supply to regional food distribution hubs and supermarkets.",
  },
  {
    code: "DPU",
    name: "Delivered at Place Unloaded",
    category: "Any Mode of Transport",
    summary: "Seller delivers and unloads cargo at the named destination terminal or distribution center.",
    sellerObligation: "Transport, transit risk, and unloading at destination facility.",
    buyerObligation: "Import clearance, food safety testing duties, and local distribution.",
    riskTransferPoint: "Once safely unloaded at the agreed destination place.",
    suitableFor: "Cross-border pallet deliveries and bonded terminal drop-offs.",
  },
  {
    code: "DDP",
    name: "Delivered Duty Paid",
    category: "Any Mode of Transport",
    summary: "Seller assumes full end-to-end responsibility including origin export, shipping, and destination customs duties/clearance.",
    sellerObligation: "Complete logistics, export/import clearance, and local tariffs.",
    buyerObligation: "Receive unloaded goods at final destination warehouse.",
    riskTransferPoint: "When goods are placed at disposal of buyer cleared for import.",
    suitableFor: "Seamless retail food supply where seller has local import registrations.",
  },
  {
    code: "FAS",
    name: "Free Alongside Ship",
    category: "Sea and Inland Waterway",
    summary: "Seller delivers when food goods are placed alongside the vessel at the named departure port.",
    sellerObligation: "Export clearance, transport alongside vessel at port.",
    buyerObligation: "Vessel loading, ocean freight, marine insurance, destination clearance.",
    riskTransferPoint: "Alongside vessel at named port of shipment.",
    suitableFor: "Bulk raw commodities (sugar, wheat, raw cashew nuts).",
  },
  {
    code: "FOB",
    name: "Free On Board",
    category: "Sea and Inland Waterway",
    summary: "Seller delivers goods loaded on board the vessel nominated by buyer at named departure port (e.g. JNPT / Mundra / Chennai).",
    sellerObligation: "Export customs clearance, port handling, loading on board vessel.",
    buyerObligation: "Ocean freight, marine cargo insurance, destination port clearance.",
    riskTransferPoint: "When goods pass on board vessel at departure port.",
    suitableFor: "Standard FCL container shipments of grains, pulses, and spices.",
  },
  {
    code: "CFR",
    name: "Cost and Freight",
    category: "Sea and Inland Waterway",
    summary: "Seller pays ocean freight to named destination port (e.g. Jebel Ali, Rotterdam, Singapore); risk transfers on loading.",
    sellerObligation: "Export clearance, loading, ocean freight to destination port.",
    buyerObligation: "Marine cargo insurance, destination port charges, import tariffs.",
    riskTransferPoint: "When loaded on board vessel at origin departure port.",
    suitableFor: "Maritime food trade where buyer maintains corporate marine insurance policy.",
  },
  {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    category: "Sea and Inland Waterway",
    summary: "Seller pays ocean freight and marine cargo insurance to named destination port.",
    sellerObligation: "Export clearance, ocean freight, and baseline marine insurance.",
    buyerObligation: "Destination port charges, customs import clearance, inland delivery.",
    riskTransferPoint: "On board vessel at departure port (insurance covers ocean leg).",
    suitableFor: "Most common international container trade for food & agro commodities.",
  },
];

export type TradePortalItem = {
  title: string;
  category: "Regulatory & Food Safety" | "Export Promotion" | "Standards & Compliance" | "Trade Rules";
  description: string;
  url: string;
  badge: string;
};

export const TRADE_PORTALS: TradePortalItem[] = [
  {
    title: "APEDA — Agricultural & Processed Food Products Export Development Authority",
    category: "Export Promotion",
    description: "Apex government body facilitating export promotion and quality standards for agri commodities, organic produce, and processed foods.",
    url: "https://apeda.gov.in",
    badge: "Government Apex Body",
  },
  {
    title: "FSSAI — Food Safety and Standards Authority of India",
    category: "Regulatory & Food Safety",
    description: "Statutory authority establishing science-based standards for articles of food and regulating manufacturing, storage, and export compliance.",
    url: "https://www.fssai.gov.in",
    badge: "Food Safety Authority",
  },
  {
    title: "Spices Board India",
    category: "Export Promotion",
    description: "Ministry of Commerce organization for the development and worldwide export promotion of 52 scheduled Indian spices and quality testing.",
    url: "https://www.indianspices.com",
    badge: "Spices Promotion",
  },
  {
    title: "Codex Alimentarius — FAO / WHO Food Standards",
    category: "Standards & Compliance",
    description: "International food standards, guidelines, and codes of practice contributing to the safety, quality, and fairness of world food trade.",
    url: "https://www.fao.org/fao-who-codexalimentarius/",
    badge: "Global Food Code",
  },
  {
    title: "ISO 22000 — Food Safety Management Systems",
    category: "Standards & Compliance",
    description: "International standard specifying requirements for a food safety management system covering the entire food chain from farm to fork.",
    url: "https://www.iso.org/iso-22000-food-safety-management.html",
    badge: "ISO Standard",
  },
  {
    title: "ICC Incoterms® 2020 Official Portal",
    category: "Trade Rules",
    description: "International Chamber of Commerce official definitions, rules, and guidelines for global commercial trade terms.",
    url: "https://iccwbo.org/business-solutions/incoterms-rules/",
    badge: "Trade Rules",
  },
  {
    title: "DGFT — Directorate General of Foreign Trade",
    category: "Regulatory & Food Safety",
    description: "Government of India authority governing foreign trade policies, export incentives, ITC (HS) classifications, and licensing.",
    url: "https://www.dgft.gov.in",
    badge: "Export / Import",
  },
  {
    title: "US FDA — Food & Drug Administration Import Program",
    category: "Regulatory & Food Safety",
    description: "US regulatory guidelines on Prior Notice, FSMA Foreign Supplier Verification Program, and food safety standards.",
    url: "https://www.fda.gov/food/food-imports-exports",
    badge: "Import Regulatory",
  },
];
