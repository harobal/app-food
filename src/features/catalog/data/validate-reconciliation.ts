import type { CatalogueReconciliation } from "../domain/reconciliation-types.ts";

export function validateReconciliation(proposal: CatalogueReconciliation) {
  const issues: string[] = [];
  if (proposal.sourceRecordCount !== proposal.decisions.length) issues.push("Every source record must have one decision.");
  if (proposal.familyCount !== proposal.families.length) issues.push("Family count does not match families.");
  const ids = proposal.decisions.map((decision) => decision.legacyId);
  const slugs = proposal.decisions.map((decision) => decision.legacySlug);
  if (new Set(ids).size !== ids.length) issues.push("Legacy decisions contain duplicate IDs.");
  if (new Set(slugs).size !== slugs.length) issues.push("Legacy decisions contain duplicate slugs.");
  if (proposal.decisions.some((decision) => decision.routeAction !== "preserve")) issues.push("All legacy routes must be preserved during reconciliation.");
  if (proposal.families.some((family) => /marine|seafood|meat|dairy|poultry/i.test(`${family.category} ${family.productName}`))) issues.push("Proposal contains a prohibited animal-derived family.");
  const honeyFamilies = proposal.families.filter((family) => /\bhoney\b/i.test(family.productName));
  if (honeyFamilies.some((family) => family.dietaryPolicy !== "honey-exception")) issues.push("Honey must use its explicit policy exception.");
  if (proposal.families.filter((family) => family.dietaryPolicy === "honey-exception").length !== honeyFamilies.length) issues.push("Honey exception was assigned to a non-honey family.");
  return issues;
}

