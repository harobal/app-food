import { brand } from "../../../content/site/brand.ts";
import type { FoodInquiryEmailPayload } from "../types.ts";
import { renderEmailLayout } from "./layout.ts";

export function renderClientAcknowledgement({ inquiry, referenceId }: FoodInquiryEmailPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const categoryDisplay =
    inquiry.category === "Other" && inquiry.otherCategory
      ? `Other (${inquiry.otherCategory})`
      : inquiry.category;

  const incotermDisplay =
    inquiry.incoterm === "Other" && inquiry.otherIncoterm
      ? `Other (${inquiry.otherIncoterm})`
      : inquiry.incoterm || "FOB / CIF Basis";

  const productDisplay = inquiry.product || categoryDisplay;
  const subject = `Official Commodity Requirement Receipt · ${inquiry.companyName} [Ref: ${referenceId}] - Harobal Foods Trade Desk`;

  const html = renderEmailLayout({
    title: subject,
    preheader: `Thank you for contacting Harobal Foods. Your commodity requirement brief (Ref: ${referenceId}) has been registered with our agricultural trade desk.`,
    content: `
      <!-- Status Badge & Greeting -->
      <div style="margin-bottom: 24px;">
        <span class="badge badge-success">🛡️ Requirement Registered</span>
        <h1 style="margin: 14px 0 0 0; font-size: 22px; font-weight: 800; color: #132F2A; line-height: 1.25; font-family: 'Outfit', sans-serif;">
          Thank you for reaching out, ${inquiry.fullName}.
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">
          We have successfully registered the food &amp; agricultural requirement submitted on behalf of <strong>${inquiry.companyName}</strong>.
        </p>
      </div>

      <!-- Luxury Reference Card -->
      <div class="ref-box">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #6E9C62; letter-spacing: 0.15em; display: block; margin-bottom: 4px;">
                Trade Desk Tracking Reference ID
              </span>
              <span style="font-family: monospace; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em; display: inline-block;">
                ${referenceId}
              </span>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; line-height: 1.4;">
                Please quote this reference code in all subsequent commercial discussions, lab testing, or documentation submissions.
              </p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Summary Matrix -->
      <div style="margin: 28px 0 24px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 6px; margin-bottom: 10px;">
          <tr>
            <td>
              <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55;">
                Submitted Requirement Summary
              </span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Product Category:</td>
            <td class="meta-value"><strong style="color: #132F2A;">${categoryDisplay}</strong></td>
          </tr>
          ${inquiry.product ? `
          <tr>
            <td class="meta-label">Specific Product / Grade:</td>
            <td class="meta-value"><strong>${inquiry.product}</strong></td>
          </tr>` : ""}
          ${inquiry.quantity ? `
          <tr>
            <td class="meta-label">Approximate Quantity:</td>
            <td class="meta-value"><strong>${inquiry.quantity}</strong></td>
          </tr>` : ""}
          ${inquiry.destinationPort ? `
          <tr>
            <td class="meta-label">Destination Port / Hub:</td>
            <td class="meta-value"><strong>${inquiry.destinationPort}</strong></td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Preferred Incoterm®:</td>
            <td class="meta-value">
              <span style="font-family: monospace; font-weight: 700; color: #2E6B55;">${incotermDisplay}</span>
            </td>
          </tr>
          <tr>
            <td class="meta-label">Destination Country:</td>
            <td class="meta-value">${inquiry.country}</td>
          </tr>
        </table>
      </div>

      <!-- Execution Roadmap -->
      <div style="margin: 28px 0 24px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 6px; margin-bottom: 12px;">
          <tr>
            <td>
              <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55;">
                Food Commodity Sourcing &amp; QA Roadmap
              </span>
            </td>
          </tr>
        </table>

        <div class="roadmap-step">
          <strong style="color: #132F2A;">Phase 1: Grade &amp; Quality Specification Review</strong>
          <p style="margin: 3px 0 0 0; font-size: 12px; color: #64748b;">
            Our specialists verify physical purity, moisture thresholds, FSSAI / APEDA compliance, and required certifications.
          </p>
        </div>

        <div class="roadmap-step">
          <strong style="color: #132F2A;">Phase 2: Batch Sourcing &amp; Commercial Quotation</strong>
          <p style="margin: 3px 0 0 0; font-size: 12px; color: #64748b;">
            We prepare an export quotation, packaging options, sampling plan, and shipping schedule within <strong>24 to 48 business hours</strong>.
          </p>
        </div>

        <div class="roadmap-step">
          <strong style="color: #132F2A;">Phase 3: Phytosanitary Inspection &amp; Container Dispatch</strong>
          <p style="margin: 3px 0 0 0; font-size: 12px; color: #64748b;">
            Upon commercial confirmation, third-party lab inspection (SGS/Intertek), phytosanitary certification, and export loading are coordinated.
          </p>
        </div>
      </div>

      <!-- Immediate Contact Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-top: 26px;">
        <div style="font-weight: 700; color: #132F2A; font-size: 13px; margin-bottom: 4px;">
          Need to provide technical lab parameters, packaging artwork, or custom specifications?
        </div>
        <p style="margin: 0 0 12px 0; font-size: 13px; color: #475569; line-height: 1.5;">
          You can reply directly to this email or reach our export specialists at <a href="mailto:${brand.salesEmail}" style="color: #2E6B55; font-weight: 700; text-decoration: none;">${brand.salesEmail}</a> quoting reference <strong>${referenceId}</strong>.
        </p>
        <a href="mailto:${brand.salesEmail}?subject=Supplemental%20Specs%20for%20Ref:%20${referenceId}" class="btn-secondary">
          ✉️ Send Technical Documentation
        </a>
      </div>
    `,
  });

  const text = `
HAROBAL FOODS - OFFICIAL COMMODITY REQUIREMENT RECEIPT
======================================================
Dear ${inquiry.fullName},

Thank you for contacting Harobal Foods. We have received and registered your agricultural export requirement for ${inquiry.companyName}.

YOUR TRACKING REFERENCE ID: ${referenceId}
(Please quote this reference in all correspondence)

BRIEF SUMMARY:
- Category: ${categoryDisplay}
- Product: ${productDisplay}
- Quantity: ${inquiry.quantity || "N/A"}
- Destination Port: ${inquiry.destinationPort || "N/A"}
- Incoterms: ${incotermDisplay}
- Destination Country: ${inquiry.country}

WHAT HAPPENS NEXT:
1. Quality Review: Verifying purity, moisture, and export certifications.
2. Commercial Quotation: A trade specialist will provide pricing and lead-time within 24 to 48 business hours.
3. Execution: Coordinating inspection, phytosanitary clearance, and container shipping.

Direct Trade Desk: ${brand.salesEmail}

Best regards,
Harobal Foods Trade Desk
`;

  return { subject, html, text };
}
