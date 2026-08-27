import { NextResponse } from "next/server";
import { getFoodsCatalogListItems } from "@/features/catalog/data/catalog";
import { groupCatalogFamilies } from "@/features/catalog/selectors/catalog-selectors";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    { version: 1, families: groupCatalogFamilies(getFoodsCatalogListItems()) },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800", "x-content-type-options": "nosniff" } },
  );
}
