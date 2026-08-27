import { brand } from "../../../content/site/brand.ts";
import type { FoodInquiryEmailPayload } from "../types.ts";
import { renderEmailLayout } from "./layout.ts";

const escapeHtml = (value: string | undefined) =>
  (value || "Not specified")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function term(value: string | undefined, fallback = "To be confirmed") {
  return escapeHtml(value || fallback);
}

function summaryRows(payload: FoodInquiryEmailPayload) {
  const { inquiry } = payload;
  const rows = [
    ["Buyer", `${inquiry.fullName} · ${inquiry.companyName}`],
    ["Contact", `${inquiry.email} · ${inquiry.phone}`],
    ["Destination", [inquiry.destinationPort, inquiry.country].filter(Boolean).join(", ")],
    ["Incoterm®", inquiry.incoterm],
    ["Packaging", inquiry.packaging],
    ["Procurement window", inquiry.timeline],
  ];

  return rows.map(([label, value]) => `<tr>
    <td style="width:34%;padding:10px 12px;background:#F4F7F4;border-bottom:1px solid #E5ECE4;color:#64748B;font-size:11px;font-weight:700;">${label}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #E5ECE4;color:#132F2A;font-size:12px;font-weight:650;">${term(value)}</td>
  </tr>`).join("");
}

function rfqDetailBlock(payload: FoodInquiryEmailPayload) {
  return `<div style="margin:20px 0;">
    <div style="margin-bottom:8px;color:#2E6B55;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">Requested products &amp; specifications</div>
    <div style="padding:14px 16px;border:1px solid #DCE6DC;border-left:4px solid #C88A16;border-radius:0 9px 9px 0;background:#FBFAF5;color:#334155;font:12px/1.65 Consolas,monospace;white-space:pre-wrap;">${escapeHtml(payload.inquiry.message)}</div>
  </div>`;
}

export function renderRfqDeskAlert(payload: FoodInquiryEmailPayload) {
  const { inquiry, context, referenceId } = payload;
  const subject = `[Action: RFQ] ${inquiry.companyName} · ${inquiry.product || inquiry.category} · ${referenceId}`;
  const html = renderEmailLayout({
    title: subject,
    preheader: `New structured RFQ from ${inquiry.companyName}. Reference ${referenceId}.`,
    content: `<div style="display:inline-block;padding:5px 10px;border-radius:99px;background:#132F2A;color:#FFF;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">New quotation request</div>
      <h1 style="margin:12px 0 5px;color:#132F2A;font-size:21px;line-height:1.25;">Commercial review required</h1>
      <p style="margin:0 0 18px;color:#64748B;font-size:12px;">Received ${new Date(context.submittedAt).toUTCString()}</p>
      <div style="padding:14px 16px;border-radius:10px;background:#EDF5EF;border:1px solid #D4E5D8;">
        <div style="color:#64748B;font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">RFQ reference</div>
        <div style="margin-top:4px;color:#2E6B55;font:800 17px Consolas,monospace;">${escapeHtml(referenceId)}</div>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border:1px solid #E5ECE4;border-radius:9px;overflow:hidden;border-collapse:separate;border-spacing:0;">${summaryRows(payload)}</table>
      ${rfqDetailBlock(payload)}
      <a href="mailto:${escapeHtml(inquiry.email)}?subject=RE%3A%20Harobal%20Foods%20RFQ%20${escapeHtml(referenceId)}" style="display:inline-block;padding:10px 16px;border-radius:7px;background:#2E6B55;color:#FFF;text-decoration:none;font-size:12px;font-weight:800;">Reply to buyer</a>`,
  });
  const text = `HAROBAL FOODS — NEW RFQ\nReference: ${referenceId}\nReceived: ${context.submittedAt}\n\nBUYER\n${inquiry.fullName} · ${inquiry.companyName}\n${inquiry.email} · ${inquiry.phone}\n\nTRADE TERMS\nDestination: ${inquiry.destinationPort || "TBC"}, ${inquiry.country}\nIncoterm: ${inquiry.incoterm || "TBC"}\nPackaging: ${inquiry.packaging || "TBC"}\nTimeline: ${inquiry.timeline || "TBC"}\n\nRFQ LINES\n${inquiry.message}`;
  return { subject, html, text };
}

export function renderRfqClientReceipt(payload: FoodInquiryEmailPayload) {
  const { inquiry, referenceId } = payload;
  const subject = `RFQ received · ${referenceId} · Harobal Foods`;
  const html = renderEmailLayout({
    title: subject,
    preheader: `Your Harobal Foods RFQ is registered under ${referenceId}.`,
    content: `<div style="display:inline-block;padding:5px 10px;border-radius:99px;background:#E8F4EC;color:#216347;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">RFQ successfully registered</div>
      <h1 style="margin:12px 0 6px;color:#132F2A;font-size:21px;line-height:1.25;">We have your quotation brief, ${escapeHtml(inquiry.fullName)}.</h1>
      <p style="margin:0 0 18px;color:#475569;font-size:13px;line-height:1.6;">A food trade coordinator will review product availability, specifications and commercial terms. Keep the reference below for follow-up.</p>
      <div style="padding:15px 17px;border-radius:10px;background:#132F2A;">
        <div style="color:#B9D6C7;font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">Your RFQ reference</div>
        <div style="margin-top:5px;color:#FFF;font:800 18px Consolas,monospace;">${escapeHtml(referenceId)}</div>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border:1px solid #E5ECE4;border-radius:9px;overflow:hidden;border-collapse:separate;border-spacing:0;">${summaryRows(payload)}</table>
      ${rfqDetailBlock(payload)}
      <div style="margin-top:20px;padding:15px;border-radius:9px;background:#F8FAF8;border:1px solid #E5ECE4;">
        <div style="color:#132F2A;font-size:12px;font-weight:800;">What happens next</div>
        <p style="margin:7px 0 0;color:#64748B;font-size:12px;line-height:1.6;">1. Requirement and availability review<br/>2. Clarification if specifications are incomplete<br/>3. Commercial quotation with applicable MOQ, lead time and documentation</p>
      </div>
      <p style="margin:18px 0 0;color:#64748B;font-size:12px;line-height:1.55;">Need to correct or add details? Reply to this email or write to <a href="mailto:${brand.salesEmail}" style="color:#2E6B55;font-weight:700;">${brand.salesEmail}</a> and include <strong>${escapeHtml(referenceId)}</strong>.</p>`,
  });
  const text = `HAROBAL FOODS — RFQ RECEIPT\n\nHello ${inquiry.fullName},\nYour RFQ has been registered.\nReference: ${referenceId}\n\nDestination: ${inquiry.destinationPort || "TBC"}, ${inquiry.country}\nIncoterm: ${inquiry.incoterm || "TBC"}\nPackaging: ${inquiry.packaging || "TBC"}\nTimeline: ${inquiry.timeline || "TBC"}\n\nREQUESTED PRODUCTS\n${inquiry.message}\n\nNEXT STEPS\n1. Requirement and availability review\n2. Clarification if needed\n3. Commercial quotation with MOQ, lead time and documentation\n\nFood Trade Desk: ${brand.salesEmail}`;
  return { subject, html, text };
}
