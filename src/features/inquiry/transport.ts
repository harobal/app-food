import { createHash, randomUUID } from "node:crypto";
import type { InquirySubmission } from "./types.ts";
import { isEmailServiceConfigured, sendFoodInquiryEmails } from "../../lib/email/index.ts";

export type InquiryContext = { ip: string; userAgent: string; submittedAt: string };
export type DeliveryResult =
  | { accepted: true; referenceId: string }
  | { accepted: false; reason: "unconfigured" | "timeout" | "rejected" };

export function inquiryFingerprint(data: InquirySubmission) {
  return createHash("sha256")
    .update(`${data.email}|${data.companyName}|${data.category}|${data.message}`)
    .digest("hex");
}

function generateFoodReferenceId(): string {
  const year = new Date().getFullYear();
  const hex = randomUUID().replace(/-/g, "").substring(0, 4).toUpperCase();
  return `HRB-FOD-${year}-${hex}`;
}

type TransportOptions = { fetchImpl?: typeof fetch; timeoutMs?: number };

export async function deliverInquiry(
  data: InquirySubmission,
  context: InquiryContext,
  options: TransportOptions = {},
): Promise<DeliveryResult> {
  const referenceId = generateFoodReferenceId();
  const hasZoho = isEmailServiceConfigured();
  const endpoint = process.env.INQUIRY_WEBHOOK_URL?.trim();

  // If neither Zoho nor Webhook is configured, fail gracefully
  if (!hasZoho && !endpoint) {
    console.warn("[Food Transport] No delivery backend is configured (missing Zoho SMTP or Webhook).");
    return { accepted: false, reason: "unconfigured" };
  }

  let emailDelivered = false;
  let webhookDelivered = false;

  // 1. Deliver via Zoho Email Service (Primary)
  if (hasZoho) {
    try {
      const emailResult = await sendFoodInquiryEmails({
        inquiry: data,
        context,
        referenceId,
      });

      if (emailResult.deskEmail.success || emailResult.clientEmail.success) {
        emailDelivered = true;
      }
    } catch (err) {
      console.error("[Food Transport] Zoho email dispatch error:", err);
    }
  }

  // 2. Deliver via Webhook (Secondary / Fallback if configured)
  if (endpoint) {
    const fetchImpl = options.fetchImpl ?? fetch;
    try {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.INQUIRY_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          source: "harobal-foods-website",
          referenceId,
          submittedAt: context.submittedAt,
          ...data,
          audit: {
            ip: context.ip,
            userAgent: context.userAgent,
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(options.timeoutMs ?? 8_000),
      });

      if (response.ok) {
        webhookDelivered = true;
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "TimeoutError") {
        return { accepted: false, reason: "timeout" };
      }
      console.error("[Food Transport] Webhook dispatch error:", err);
    }
  }

  if (emailDelivered || webhookDelivered) {
    return { accepted: true, referenceId };
  }

  return { accepted: false, reason: "rejected" };
}
