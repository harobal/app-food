import { NextResponse } from "next/server";
import { checkInquiryGuard, releaseInquiryFingerprint } from "@/features/inquiry/guard";
import { deliverInquiry, inquiryFingerprint } from "@/features/inquiry/transport";
import { validateInquiry } from "@/features/inquiry/validation";
import type { InquiryApiResponse } from "@/features/inquiry/types";

const json = (body: InquiryApiResponse, status: number) => NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ ok: false, message: "Send the inquiry as JSON.", retryable: false }, 415);
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return json({ ok: false, message: "The inquiry is too large.", retryable: false }, 413);

  let payload: unknown;
  try { payload = await request.json(); } catch { return json({ ok: false, message: "The inquiry could not be read.", retryable: false }, 400); }
  const validation = validateInquiry(payload);
  if (!validation.ok) {
    if (validation.spam) return json({ ok: false, message: "Please wait a moment and try again.", retryable: true }, 429);
    return json({ ok: false, message: "Review the highlighted fields.", errors: validation.errors, retryable: false }, 422);
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const fingerprint = inquiryFingerprint(validation.data);
  const guard = checkInquiryGuard(ip, fingerprint);
  if (!guard.ok) return json({ ok: false, message: guard.reason === "duplicate" ? "This inquiry was already submitted recently." : "Too many attempts. Please try again later.", retryable: false }, 429);

  const result = await deliverInquiry(validation.data, { ip, userAgent: request.headers.get("user-agent") ?? "unknown", submittedAt: new Date().toISOString() });
  if (!result.accepted) {
    releaseInquiryFingerprint(fingerprint);
    const timeout = result.reason === "timeout";
    return json({ ok: false, message: timeout ? "The trade desk connection timed out. Please retry or use the email option below." : "Online delivery is not available right now. Please use the email option below.", retryable: true }, timeout ? 504 : 503);
  }

  return json({ ok: true, message: "Your inquiry was accepted by the trade desk.", referenceId: result.referenceId, retryable: false }, 202);
}
