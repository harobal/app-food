import { readFile, writeFile } from "node:fs/promises";
import { reconcileCatalogue } from "../src/features/catalog/data/reconcile.ts";

const root = new URL("../", import.meta.url);
const catalogue = JSON.parse(await readFile(new URL("src/content/catalogue.v1.json", root), "utf8"));
const reconciliation = reconcileCatalogue(catalogue);
await writeFile(new URL("src/content/catalogue.reconciliation.v2.json", root), `${JSON.stringify(reconciliation, null, 2)}\n`, "utf8");
console.log(`Generated reconciliation for ${reconciliation.sourceRecordCount} records and ${reconciliation.familyCount} families.`);
