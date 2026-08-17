import type { Certification, Testimonial } from "@/types/site";

export const certifications: Certification[] = [
  { name: "IEC Registered", code: "IEC-XXXXXXX", verificationUrl: "https://www.dgft.gov.in/" },
  { name: "APEDA Registered", code: "APEDA-XXXX", verificationUrl: "https://apeda.gov.in/" },
  { name: "FSSAI Licensed", code: "FSSAI-XXXX", verificationUrl: "https://foscos.fssai.gov.in/" },
  { name: "CAPEXIL Member", code: "CAPEXIL-XXXX", verificationUrl: "https://www.capexil.org/" },
  { name: "FIEO Member", code: "FIEO-XXXX", verificationUrl: "https://www.fieo.org/" },
  { name: "MSME / Udyam", code: "UDYAM-XXXX", verificationUrl: "https://udyamregistration.gov.in/" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Adam R.",
    company: "BuildCore Imports",
    country: "UAE",
    quote: "Harobal Ventures brought structure to supplier evaluation and gave our team clear execution visibility at each shipment milestone.",
  },
  {
    name: "Mariam K.",
    company: "FreshRoute Distribution",
    country: "United Kingdom",
    quote: "Their coordination quality was excellent, especially around documentation readiness and timeline transparency for our procurement operations.",
  },
  {
    name: "Daniel S.",
    company: "NovaTrade Procurement",
    country: "United States",
    quote: "A dependable commercial bridge between Indian supply capabilities and the quality standards expected in our market.",
  },
];
