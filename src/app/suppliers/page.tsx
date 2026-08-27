import { createPageMetadata } from "@/config/site";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { InquiryForm } from "@/features/inquiry";
import { CheckCircle2 } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Farm & Producer Network Onboarding",
  description:
    "Join the Harobal Foods export network. Connect verified Indian agricultural producers with global wholesale buyers.", path: "/suppliers", image: "/media/harvest-meridian/origin-sourcing-panorama.webp" });

export default function FoodsSuppliersPage() {
  return (
    <><section className="relative isolate overflow-hidden bg-brand-ink text-white"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.97),rgba(7,25,20,.8),rgba(7,25,20,.24)),url('/media/harvest-meridian/origin-sourcing-panorama.webp')] bg-cover bg-center" aria-hidden /><div className="container-shell relative py-12 sm:py-16"><div className="max-w-3xl [&_a]:!text-white/65 [&_span]:!text-white/75 [&_svg]:!text-white/45">
          <PageBreadcrumbs />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Suppliers</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Partner with Harobal Foods</h1>
          <p className="mt-4 text-base leading-7 text-white/78 sm:text-lg">
            We work with farmers, packhouses, processors, and exporters. If you can supply consistent quality and export-ready packing, share your profile and we’ll review for partnership.
          </p>
        </div></div></section>
      <section className="bg-hero-wash py-10 sm:py-14"><div className="container-shell grid gap-7 lg:grid-cols-[20rem_minmax(0,1fr)]"><aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">What to include</p><ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">{["Company details and farm, packhouse, or processing locations.","Categories, grades, and forms you can supply.","Monthly capacity, lead times, and packaging formats.","Certifications, test reports, and QC process notes.","Product, label, facility, or packing references."].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-gold" />{item}</li>)}</ul></aside><InquiryForm purpose="supplier" /></div></section>
    </>
  );
}
