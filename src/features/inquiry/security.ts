import { createHmac } from "node:crypto";

const APP_SECRET = process.env.INQUIRY_SIGNING_SECRET || "harobal-foods-secure-intake-key-v1";

/**
 * Generates an anti-tamper client challenge token with timestamp
 */
export function generateClientToken(timestamp = Date.now()): string {
  const payload = `${timestamp}:${APP_SECRET}`;
  const signature = createHmac("sha256", APP_SECRET).update(payload).digest("hex").slice(0, 32);
  return `${timestamp}.${signature}`;
}

/**
 * Validates the anti-tamper token signature and timing window
 */
export function validateClientToken(token: string | null | undefined, now = Date.now()): {
  valid: boolean;
  reason?: "missing" | "malformed" | "invalid_signature" | "too_fast" | "expired";
} {
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "missing" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "malformed" };
  }

  const [tsStr, signature] = parts;
  const timestamp = Number(tsStr);

  if (Number.isNaN(timestamp) || !signature) {
    return { valid: false, reason: "malformed" };
  }

  const expectedSignature = createHmac("sha256", APP_SECRET)
    .update(`${timestamp}:${APP_SECRET}`)
    .digest("hex")
    .slice(0, 32);

  if (signature !== expectedSignature) {
    return { valid: false, reason: "invalid_signature" };
  }

  const elapsed = now - timestamp;
  // If submitted unnaturally fast (< 1.5 seconds)
  if (elapsed < 1500) {
    return { valid: false, reason: "too_fast" };
  }

  // If token is older than 4 hours
  if (elapsed > 4 * 60 * 60 * 1000) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true };
}

/**
 * Verifies that the incoming request originates from the application itself
 */
export function validateRequestOrigin(request: Request): {
  allowed: boolean;
  reason?: "cross_site" | "invalid_origin" | "invalid_referer";
} {
  // Check Sec-Fetch-Site header (modern browsers send this on fetch requests)
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return { allowed: false, reason: "cross_site" };
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  // In standard browser environment, origin or referer should match host
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host && !originHost.includes("localhost") && !originHost.includes("127.0.0.1")) {
        return { allowed: false, reason: "invalid_origin" };
      }
    } catch {
      return { allowed: false, reason: "invalid_origin" };
    }
  }

  if (!origin && referer && host) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost !== host && !refererHost.includes("localhost") && !refererHost.includes("127.0.0.1")) {
        return { allowed: false, reason: "invalid_referer" };
      }
    } catch {
      return { allowed: false, reason: "invalid_referer" };
    }
  }

  return { allowed: true };
}
