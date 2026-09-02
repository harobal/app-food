import { NextResponse } from "next/server";
import { checkInquiryGuard, releaseInquiryFingerprint } from "@/features/inquiry/guard";
import { deliverInquiry, inquiryFingerprint } from "@/features/inquiry/transport";
import { validateInquiry } from "@/features/inquiry/validation";
import { validateRequestOrigin, validateClientToken } from "@/features/inquiry/security";
import type { InquiryApiResponse } from "@/features/inquiry/types";

const json = (body: InquiryApiResponse, status: number) =>
  NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    },
  });

export async function POST(request: Request) {
  // 1. Validate request origin & block cross-site abuse
  const originCheck = validateRequestOrigin(request);
  if (!originCheck.allowed) {
    return json({ ok: false, message: "Unauthorized submission origin.", retryable: false }, 403);
  }

  // 2. Strict content type and payload size checks
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return json({ ok: false, message: "Send the inquiry as JSON.", retryable: false }, 415);
  }

  if (Number(request.headers.get("content-length") ?? 0) > 25_000) {
    return json({ ok: false, message: "The inquiry payload exceeds size limits.", retryable: false }, 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "The inquiry payload could not be parsed.", retryable: false }, 400);
  }

  // 3. Optional client anti-tamper token validation if passed
  const clientToken =
    request.headers.get("x-inquiry-token") ||
    (payload && typeof payload === "object" && "token" in payload ? String(payload.token) : null);

  if (clientToken) {
    const tokenCheck = validateClientToken(clientToken);
    if (!tokenCheck.valid && tokenCheck.reason === "too_fast") {
      return json({ ok: false, message: "Please take a moment to review before submitting.", retryable: true }, 429);
    }
  }

  // 4. Validate form values and anti-spam checks
  const validation = validateInquiry(payload);
  if (!validation.ok) {
    if (validation.spam) {
      return json({ ok: false, message: "Please wait a moment and try again.", retryable: true }, 429);
    }
    return json({ ok: false, message: "Review the highlighted fields.", errors: validation.errors, retryable: false }, 422);
  }

  // 5. Rate limiting & duplicate fingerprint guard
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const fingerprint = inquiryFingerprint(validation.data);
  const guard = checkInquiryGuard(ip, fingerprint);

  if (!guard.ok) {
    return json(
      {
        ok: false,
        message:
          guard.reason === "duplicate"
            ? "This commodity inquiry was already submitted recently."
            : "Too many attempts from this connection. Please try again later.",
        retryable: false,
      },
      429,
    );
  }

  // 6. Deliver to Zoho Mail & backend transport
  const result = await deliverInquiry(validation.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? "unknown",
    submittedAt: new Date().toISOString(),
  });

  if (!result.accepted) {
    releaseInquiryFingerprint(fingerprint);
    const timeout = result.reason === "timeout";
    return json(
      {
        ok: false,
        message: timeout
          ? "The food trade desk connection timed out. Please retry or use a direct contact channel."
          : "Online delivery is temporarily unavailable. Please use email or WhatsApp desk below.",
        retryable: true,
      },
      timeout ? 504 : 503,
    );
  }

  return json(
    {
      ok: true,
      message: "Your commodity inquiry was accepted by the trade desk.",
      referenceId: result.referenceId,
      retryable: false,
    },
    202,
  );
}
