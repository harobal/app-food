import { createPageMetadata } from "@/config/site";
import { Download, FileCheck2 } from "lucide-react";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = createPageMetadata({
  title: "Food Spec Sheets, RFQ Templates & Resources",
  description:
    "Download agricultural commodity specification sheets, export documentation guides, and procurement RFQ templates.", path: "/downloads" });

const downloads = [
  {
    title: "RFQ Template (CSV)",
    description: "A simple RFQ spreadsheet template for foods & agri line items.",
    href: "/downloads/harobal-foods-rfq-template.csv",
    meta: "CSV",
  },
] as const;

export default function FoodsDownloadsPage() {
  return (
    <><section className="relative isolate overflow-hidden bg-brand-ink text-white"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.97),rgba(7,25,20,.82),rgba(7,25,20,.28)),url('/media/harvest-meridian/dehydrated-processed.webp')] bg-cover bg-center" aria-hidden /><div className="container-shell relative py-12 sm:py-16"><div className="max-w-3xl [&_a]:!text-white/65 [&_span]:!text-white/75 [&_svg]:!text-white/45">
          <PageBreadcrumbs />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Downloads</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Templates & resources</h1>
          <p className="mt-4 text-base leading-7 text-white/78 sm:text-lg">
            Use these templates to speed up quoting and reduce back-and-forth.
          </p>
        </div></div></section>
      <section className="bg-hero-wash py-10 sm:py-14"><div className="container-shell"><div className="grid gap-5 md:grid-cols-2">
          {downloads.map((file) => (
            <Card key={file.href} className="overflow-hidden border-primary/15 shadow-[0_16px_44px_rgba(19,47,42,.08)]">
              <CardContent className="flex h-full flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap gap-2"><Badge variant="outline">{file.meta}</Badge><Badge className="bg-primary/8 text-primary"><FileCheck2 className="size-3" /> Verified file</Badge></div>
                    <h2 className="mt-3 text-lg font-semibold">{file.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{file.description}</p>
                  </div>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">Includes line-item space for product, specification, quantity, packaging, destination, and commercial notes.</p>
                <div className="mt-auto pt-3">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-[#d9a748]">
                    <a href={file.href} download>
                      <Download className="mr-2 size-4" /> Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div></div></section>
    </>
  );
}
