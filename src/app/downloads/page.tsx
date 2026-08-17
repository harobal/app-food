import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Food Spec Sheets, RFQ Templates & Resources",
  description:
    "Download agricultural commodity specification sheets, export documentation guides, and procurement RFQ templates.",
};

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
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Downloads</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Templates & resources</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Use these templates to speed up quoting and reduce back-and-forth.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {downloads.map((file) => (
            <Card key={file.href} className="elevated-card">
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge variant="outline">{file.meta}</Badge>
                    <h2 className="mt-3 text-lg font-semibold">{file.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{file.description}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <a href={file.href} download>
                      <Download className="mr-2 size-4" /> Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
