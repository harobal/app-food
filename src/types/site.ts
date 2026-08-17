export type DivisionStatus = "active" | "coming-soon" | "custom";

export type Division = {
  id: string;
  name: string;
  subtitle: string;
  blurb: string;
  image: string;
  gallery: string[];
  highlights: string[];
  colorVar: string;
  status: DivisionStatus;
  href: string;
  ctaLabel: string;
  detailSlug?: "stones" | "foods";
};

export type ProcessStep = {
  title: string;
  detail: string;
  icon: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type Usp = {
  title: string;
  detail: string;
};

export type Certification = {
  name: string;
  code: string;
  verificationUrl?: string;
};

export type Market = {
  country: string;
  region: string;
  summary: string;
};

export type Testimonial = {
  name: string;
  company: string;
  country: string;
  quote: string;
};

export type BlogPostPreview = {
  title: string;
  summary: string;
  date: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};
