import { NextResponse } from "next/server";
import { getFoodsCatalogListItems } from "@/features/catalog/data/catalog";
import { groupCatalogFamilies } from "@/features/catalog/selectors/catalog-selectors";

export async function GET() {
  try {
    const families = groupCatalogFamilies(getFoodsCatalogListItems());
    return NextResponse.json({ families });
  } catch (error) {
    console.error("[API /api/catalog] Failed to load catalogue families:", error);
    return NextResponse.json({ error: "Failed to load catalogue" }, { status: 500 });
  }
}
