import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { InquiryForm } from "@/components/features/inquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Food Commodity Export Desk",
  description:
    "Contact Harobal Foods trade specialists for product specifications, batch availability, incoterms, and commercial quotations.",
};

export default function FoodsContactPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Talk to Harobal Foods</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Share your requirement and we’ll guide you on grades, packaging, compliance expectations, MOQ, and lead time. For accurate quotes, include destination port and incoterms.
          </p>
        </div>

        <div className="mt-10 max-w-4xl">
          <Card className="elevated-card">
            <CardHeader>
              <CardTitle>Send an inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <InquiryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
