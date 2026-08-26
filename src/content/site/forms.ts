export type FormSelectOption = {
  value: string;
  label: string;
  description?: string;
};

export const categoryOptions = [
  "Cereals & Grains",
  "Dehydrated & Processed",
  "Fresh Fruits",
  "Fresh Vegetables",
  "Nuts & Dry Fruits",
  "Oilseeds & Oils",
  "Pulses & Lentils",
  "Spices & Herbs",
  "Sweeteners",
  "Mixed / Other",
  "Other",
] as const;

export const incotermOptions = [
  "EXW",
  "FCA",
  "CPT",
  "CIP",
  "DAP",
  "DPU",
  "DDP",
  "FAS",
  "FOB",
  "CFR",
  "CIF",
  "Other",
] as const;

export const timelineOptions: FormSelectOption[] = [
  { value: "Immediate (Within 30 Days)", label: "Immediate (Within 30 Days)" },
  { value: "1 to 3 Months", label: "1 to 3 Months" },
  { value: "3 to 6 Months", label: "3 to 6 Months" },
  { value: "Annual Contract / Scheduled Shipments", label: "Annual Contract / Scheduled Shipments" },
  { value: "Spot Market / Trial Consignment", label: "Spot Market / Trial Consignment" },
];

export const packagingOptions: FormSelectOption[] = [
  { value: "Standard Export Packaging", label: "Standard Export Packaging" },
  { value: "Bulk Jute / PP Bags (25kg / 50kg)", label: "Bulk Jute / PP Bags (25kg / 50kg)" },
  { value: "Corrugated Master Cartons", label: "Corrugated Master Cartons" },
  { value: "Vacuum Packed / Nitrogen Flushed", label: "Vacuum Packed / Nitrogen Flushed" },
  { value: "Private Label / Retail Packaging", label: "Private Label / Retail Packaging" },
  { value: "Drums / Flexitanks (Liquids & Oils)", label: "Drums / Flexitanks (Liquids & Oils)" },
  { value: "Other", label: "Other / Custom Packaging" },
];

export const inquirySourceOptions = [
  "Direct / Web Search",
  "Trade Show / Food Expo",
  "Partner / Trade Desk Referral",
  "Industry Association / APEDA",
  "LinkedIn / Business Network",
  "Other",
] as const;
