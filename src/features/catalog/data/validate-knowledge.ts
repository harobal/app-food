import type {
  CanonicalCatalogueProduct,
  KnowledgeSource,
  ProductMeasurement,
} from "../domain/knowledge-types.ts";
import { parameterByKey } from "./parameter-dictionary.ts";

export type KnowledgeValidationIssue = { path: string; message: string };

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function validateMeasurement(measurement: ProductMeasurement, index: number, sourceIds: Set<string>) {
  const issues: KnowledgeValidationIssue[] = [];
  const path = `measurements[${index}]`;
  const definition = parameterByKey.get(measurement.parameterKey);
  if (!definition) issues.push({ path: `${path}.parameterKey`, message: "Unknown parameter key." });
  if (definition && measurement.unit && !definition.allowedUnits.includes(measurement.unit)) {
    issues.push({ path: `${path}.unit`, message: "Unit is not allowed for this parameter." });
  }
  if (measurement.valueType === "range" && (measurement.minimum === undefined || measurement.maximum === undefined)) {
    issues.push({ path, message: "Range values require minimum and maximum." });
  }
  if (measurement.minimum !== undefined && measurement.maximum !== undefined && measurement.minimum > measurement.maximum) {
    issues.push({ path, message: "Range minimum cannot exceed maximum." });
  }
  if (measurement.valueType !== "range" && measurement.value === undefined) {
    issues.push({ path: `${path}.value`, message: "Non-range values require a value." });
  }
  if (measurement.claimStatus === "batch-verified" && !measurement.testMethod) {
    issues.push({ path: `${path}.testMethod`, message: "Batch-verified measurements require a test method." });
  }
  if (definition?.requiresSource && measurement.sourceIds.length === 0) {
    issues.push({ path: `${path}.sourceIds`, message: "This parameter requires at least one source." });
  }
  for (const sourceId of measurement.sourceIds) {
    if (!sourceIds.has(sourceId)) issues.push({ path: `${path}.sourceIds`, message: `Unknown source: ${sourceId}.` });
  }
  return issues;
}

export function validateKnowledgeProduct(product: CanonicalCatalogueProduct, sources: readonly KnowledgeSource[]) {
  const issues: KnowledgeValidationIssue[] = [];
  const sourceIds = new Set(sources.map((source) => source.id));
  if (product.schemaVersion !== 2) issues.push({ path: "schemaVersion", message: "Unsupported schema version." });
  if (!product.id.trim()) issues.push({ path: "id", message: "ID is required." });
  if (!/^(?:[a-z0-9]+-?)+$/.test(product.slug)) issues.push({ path: "slug", message: "Slug is not route-safe." });
  if (!product.taxonomy.categoryKey || !product.taxonomy.familyKey) issues.push({ path: "taxonomy", message: "Category and family keys are required." });
  const isVegan = product.dietarySuitability.vegan === true && product.dietarySuitability.animalDerivedIngredients === false;
  const isHoneyException = product.dietarySuitability.policyException === "honey" && /\bhoney\b/i.test(product.displayName);
  if (!isVegan && !isHoneyException) {
    issues.push({ path: "dietarySuitability", message: "Only vegan products and the explicit honey exception are allowed." });
  }
  if (product.publishable && product.reviewStatus !== "approved") issues.push({ path: "publishable", message: "Only approved records may be publishable." });
  if (product.reviewedOn && !isoDate.test(product.reviewedOn)) issues.push({ path: "reviewedOn", message: "Use YYYY-MM-DD." });
  if (product.reviewDueOn && !isoDate.test(product.reviewDueOn)) issues.push({ path: "reviewDueOn", message: "Use YYYY-MM-DD." });
  for (const sourceId of product.sourceIds) {
    if (!sourceIds.has(sourceId)) issues.push({ path: "sourceIds", message: `Unknown source: ${sourceId}.` });
  }
  product.measurements.forEach((measurement, index) => issues.push(...validateMeasurement(measurement, index, sourceIds)));
  return issues;
}
