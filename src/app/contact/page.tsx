import { createPageMetadata } from "@/config/site";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { InquiryForm } from "@/features/inquiry";
import { CheckCircle2, Mail } from "lucide-react";
import { brand } from "@/content/site";

export const metadata = createPageMetadata({
  title: "Contact Food Commodity Export Desk",
  description:
    "Contact Harobal Foods trade specialists for product specifications, batch availability, incoterms, and commercial quotations.", path: "/contact" });

export default function FoodsContactPage() {
  return (
    <><section className="relative isolate overflow-hidden bg-brand-ink text-white"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.97),rgba(7,25,20,.8),rgba(7,25,20,.25)),url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-center" aria-hidden /><div className="container-shell relative py-12 sm:py-16"><div className="max-w-3xl [&_a]:!text-white/65 [&_span]:!text-white/75 [&_svg]:!text-white/45">
          <PageBreadcrumbs />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Talk to Harobal Foods</h1>
          <p className="mt-4 text-base leading-7 text-white/78 sm:text-lg">
            Share your requirement and we’ll guide you on grades, packaging, compliance expectations, MOQ, and lead time. For accurate quotes, include destination port and incoterms.
          </p>
        </div></div></section>
      <section className="bg-hero-wash py-10 sm:py-14"><div className="container-shell grid gap-7 lg:grid-cols-[18rem_minmax(0,1fr)]"><aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Useful quote details</p><ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">{["Exact product, form, and preferred grade.","Required quantity and packaging format.","Destination country or discharge port.","Incoterm, delivery window, and certifications."].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-gold" />{item}</li>)}</ul><a href={`mailto:${brand.salesEmail || brand.email}`} className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-bold text-primary"><Mail className="size-4" />{brand.salesEmail || brand.email}</a></aside><InquiryForm /></div></section>
    </>
  );
}
