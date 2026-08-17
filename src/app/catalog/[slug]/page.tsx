import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFoodsCatalogListItems, getFoodsProductBySlug } from "@/services/catalog";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodsLink } from "@/components/pages/foods-link";
import { FoodsProductActions } from "@/components/pages/product/product-actions";

type PageParams = {
  params: Promise<{ slug: string }>;
};

function splitSemi(value: string) {
  return value
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function generateStaticParams() {
  return getFoodsCatalogListItems().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = getFoodsProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} — Food Commodity Export Supply`,
    description: product.summary,
    openGraph: {
      title: `${product.title} | Harobal Foods`,
      description: product.summary,
      images: product.heroImage ? [{ url: product.heroImage }] : undefined,
    },
  };
}

export default async function FoodsCatalogDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const product = getFoodsProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const quoteHint = "For accurate quoting, share destination port, incoterms, packaging format, and required certifications.";

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="max-w-5xl">
          <PageBreadcrumbs />

          <div className="mb-5">
            <FoodsLink href="/catalog" className="text-sm font-semibold text-muted-foreground hover:text-primary">
              ← Back to catalogue
            </FoodsLink>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div
                className="relative h-72 w-full overflow-hidden rounded-2xl border border-border bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.72) 100%), url(${product.heroImage})`,
                }}
                aria-hidden
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Export-ready</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{product.title}</h1>
                <p className="mt-3 text-base font-medium text-muted-foreground sm:text-lg">{product.subtitle}</p>
                <p className="mt-4 text-base text-muted-foreground">{product.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="outline">{product.category}</Badge>
                  {product.subCategory ? <Badge variant="outline">{product.subCategory}</Badge> : null}
                  {product.form ? <Badge variant="outline">{product.form}</Badge> : null}
                  {product.grade ? <Badge variant="outline">{product.grade}</Badge> : null}
                  {product.originState ? <Badge variant="outline">{product.originState}</Badge> : null}
                  {product.certificationsAvailable.slice(0, 2).map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  <p className="rounded-xl border border-border bg-muted/30 px-4 py-3">MOQ: {product.moq || "(on request)"}</p>
                  <p className="rounded-xl border border-border bg-muted/30 px-4 py-3">Lead time: {product.leadTimeDays} days (typical)</p>
                  <p className="rounded-xl border border-border bg-muted/30 px-4 py-3">Shelf-life: {product.shelfLifeMonths} months (typical)</p>
                </div>
              </div>

              <Card className="elevated-card">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{product.description}</CardContent>
              </Card>

              <Card className="elevated-card">
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {product.specs.map((row) => (
                      <div key={row.label} className="rounded-xl border border-border bg-muted/30 p-4">
                        <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{row.label}</dt>
                        <dd className="mt-2 text-sm text-foreground">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>

              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="elevated-card">
                  <CardHeader>
                    <CardTitle>Quality parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {splitSemi(product.qualityParameters || "").map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 rounded-full bg-secondary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="elevated-card">
                  <CardHeader>
                    <CardTitle>Safety tests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {splitSemi(product.safetyTests || "").map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 rounded-full bg-primary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="elevated-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Certifications (available)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.certificationsAvailable.length > 0 ? (
                        product.certificationsAvailable.map((c) => (
                          <Badge key={c} variant="outline">
                            {c}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Share destination market and required certificates for alignment.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {product.useCases.length > 0 ? (
                <Card className="elevated-card">
                  <CardHeader>
                    <CardTitle>Use cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.useCases.map((useCase) => (
                        <Badge key={useCase} variant="outline">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {product.gallery.length > 0 ? (
                <Card className="elevated-card">
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {product.gallery.map((image) => (
                        <div
                          key={image}
                          className="h-44 overflow-hidden rounded-xl border border-border bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.35) 100%), url(${image})`,
                          }}
                          aria-hidden
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <FoodsProductActions
                product={{
                  slug: product.slug,
                  title: product.title,
                  category: product.category,
                  subCategory: product.subCategory,
                  form: product.form,
                  grade: product.grade,
                  originState: product.originState,
                }}
                quoteHint={quoteHint}
              />

              <Card className="elevated-card">
                <CardHeader>
                  <CardTitle>Request tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Include destination country/port and incoterms.</p>
                  <p>Share packaging format (bulk/retail/private label) and required certificates.</p>
                  <p>We will confirm grade alignment, MOQ, lead time, and documentation requirements.</p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
