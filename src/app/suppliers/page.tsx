import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { InquiryForm } from "@/components/features/inquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Farm & Producer Network Onboarding",
  description:
    "Join the Harobal Foods export network. Connect verified Indian agricultural producers with global wholesale buyers.",
};

export default function FoodsSuppliersPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-3xl">
          <PageBreadcrumbs />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Suppliers</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Partner with Harobal Foods</h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            We work with farmers, packhouses, processors, and exporters. If you can supply consistent quality and export-ready packing, share your profile and we’ll review for partnership.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card className="elevated-card">
            <CardHeader>
              <CardTitle>What to include</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>Company details + locations (farm/packhouse/processing).</li>
                <li>Categories, grades, and forms you supply.</li>
                <li>Monthly capacity, typical lead times, and packaging formats.</li>
                <li>Any certifications, test reports, or QC process notes (if applicable).</li>
                <li>Product photos, labels, and facility/packing references (links are fine).</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="elevated-card">
            <CardHeader>
              <CardTitle>Send supplier details</CardTitle>
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
