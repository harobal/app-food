import { getZohoSmtpConfig } from "./config.ts";
import { sendEmail } from "./client.ts";
import { renderFoodInquiryAlert } from "./templates/food-inquiry-alert.ts";
import { renderClientAcknowledgement } from "./templates/client-acknowledgement.ts";
import { renderRfqClientReceipt, renderRfqDeskAlert } from "./templates/rfq-emails.ts";
import type { FoodDualEmailResult, FoodInquiryEmailPayload, SendEmailResult } from "./types.ts";

export async function sendFoodInquiryEmails(
  payload: FoodInquiryEmailPayload,
): Promise<FoodDualEmailResult> {
  const config = getZohoSmtpConfig();

  if (!config) {
    const unconfigured: SendEmailResult = {
      success: false,
      error: "Zoho email credentials are not configured.",
      code: "UNCONFIGURED",
    };
    return { deskEmail: unconfigured, clientEmail: unconfigured };
  }

  // Render both food email templates
  const isRfq = payload.inquiry.submissionType === "rfq";
  const deskAlert = isRfq ? renderRfqDeskAlert(payload) : renderFoodInquiryAlert(payload);
  const clientAck = isRfq ? renderRfqClientReceipt(payload) : renderClientAcknowledgement(payload);

  // Dispatch both emails concurrently
  const [deskResult, clientResult] = await Promise.allSettled([
    // 1. Internal trade desk alert (Reply-To points directly to buyer's email)
    sendEmail({
      to: config.foodsEmail,
      replyTo: payload.inquiry.email,
      subject: deskAlert.subject,
      html: deskAlert.html,
      text: deskAlert.text,
    }),

    // 2. Buyer confirmation receipt (Reply-To points to food trade desk)
    sendEmail({
      to: payload.inquiry.email,
      replyTo: config.foodsEmail,
      subject: clientAck.subject,
      html: clientAck.html,
      text: clientAck.text,
    }),
  ]);

  const deskEmailResult: SendEmailResult =
    deskResult.status === "fulfilled"
      ? deskResult.value
      : { success: false, error: String(deskResult.reason) };

  const clientEmailResult: SendEmailResult =
    clientResult.status === "fulfilled"
      ? clientResult.value
      : { success: false, error: String(clientResult.reason) };

  if (deskEmailResult.success) {
    console.info(`[Food Email Service] Desk alert delivered successfully for Ref: ${payload.referenceId}`);
  } else {
    console.warn(`[Food Email Service] Desk alert delivery failed for Ref: ${payload.referenceId}: ${deskEmailResult.error}`);
  }

  if (clientEmailResult.success) {
    console.info(`[Food Email Service] Buyer acknowledgement delivered to ${payload.inquiry.email} for Ref: ${payload.referenceId}`);
  } else {
    console.warn(`[Food Email Service] Buyer acknowledgement delivery failed for Ref: ${payload.referenceId}: ${clientEmailResult.error}`);
  }

  return {
    deskEmail: deskEmailResult,
    clientEmail: clientEmailResult,
  };
}
