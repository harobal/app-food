import { createHash, randomUUID } from "node:crypto";
import type { InquirySubmission } from "./types";

export type InquiryContext = { ip: string; userAgent: string; submittedAt: string };
export type DeliveryResult = { accepted: true; referenceId: string } | { accepted: false; reason: "unconfigured" | "timeout" | "rejected" };

export function inquiryFingerprint(data: InquirySubmission) {
  return createHash("sha256").update(`${data.email}|${data.companyName}|${data.category}|${data.message}`).digest("hex");
}

type TransportOptions = { fetchImpl?: typeof fetch; timeoutMs?: number };

export async function deliverInquiry(data: InquirySubmission, context: InquiryContext, options: TransportOptions = {}): Promise<DeliveryResult> {
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint) return { accepted: false, reason: "unconfigured" };
  const fetchImpl = options.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ inquiry: data, context }),
      cache: "no-store",
      signal: AbortSignal.timeout(options.timeoutMs ?? 8_000),
    });

    if (!response.ok) return { accepted: false, reason: "rejected" };
    return { accepted: true, referenceId: response.headers.get("x-inquiry-reference") ?? randomUUID() };
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") return { accepted: false, reason: "timeout" };
    return { accepted: false, reason: "rejected" };
  }
}
