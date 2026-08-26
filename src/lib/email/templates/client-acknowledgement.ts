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
      : inquiry.incoterm || "Not specified / FOB basis";

  const productDisplay = inquiry.product || categoryDisplay;
  const subject = `Official Requirement Receipt · ${inquiry.companyName} [Ref: ${referenceId}] - Harobal Food Trade Desk`;

  const html = renderEmailLayout({
    title: subject,
    preheader: `Thank you for contacting Harobal Foods. Your commodity requirement brief (Ref: ${referenceId}) has been registered with our agricultural sourcing desk.`,
    content: `
      <!-- Status Badge & Greeting -->
      <div style="margin-bottom: 28px;">
        <span class="badge badge-success">✅ Requirement Registered</span>
        <h1 style="margin: 16px 0 0 0; font-size: 22px; font-weight: 800; color: #132F2A; line-height: 1.3; font-family: 'Outfit', sans-serif;">
          Thank you for reaching out, ${inquiry.fullName}.
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #475569; line-height: 1.65;">
          We have received and registered the commodity procurement brief submitted on behalf of <strong style="color: #132F2A;">${inquiry.companyName}</strong>.
        </p>
      </div>

      <!-- Reference Card -->
      <div class="ref-box">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <div style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: #6E9C62; letter-spacing: 0.16em; margin-bottom: 6px;">
                Food Desk Tracking Reference ID
              </div>
              <div style="font-family: 'SF Mono', SFMono-Regular, Consolas, monospace; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.08em;">
                ${referenceId}
              </div>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                Quote this reference code in all subsequent communications or documentation submissions.
              </p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Summary Matrix -->
      <div style="margin: 30px 0 28px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 8px; margin-bottom: 14px;">
          <tr>
            <td>
              <span class="section-title">📋 &nbsp;Submitted Requirement Summary</span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Commodity Category</td>
            <td class="meta-value"><strong style="color: #132F2A;">${categoryDisplay}</strong></td>
          </tr>
          ${inquiry.product ? `
          <tr>
            <td class="meta-label">Product / Grade</td>
            <td class="meta-value"><strong style="color: #132F2A;">${inquiry.product}</strong></td>
          </tr>` : ""}
          ${inquiry.quantity ? `
          <tr>
            <td class="meta-label">Required Quantity</td>
            <td class="meta-value"><strong>${inquiry.quantity}</strong></td>
          </tr>` : ""}
          ${inquiry.destinationPort ? `
          <tr>
            <td class="meta-label">Destination Port</td>
            <td class="meta-value"><strong>${inquiry.destinationPort}</strong></td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Preferred Incoterm®</td>
            <td class="meta-value">
              <span style="font-family: 'SF Mono', monospace; font-weight: 700; color: #2E6B55;">${incotermDisplay}</span>
            </td>
          </tr>
          ${inquiry.packaging ? `
          <tr>
            <td class="meta-label">Packaging</td>
            <td class="meta-value">${inquiry.packaging}</td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Destination Country</td>
            <td class="meta-value">${inquiry.country}</td>
          </tr>
        </table>
      </div>

      <!-- Execution Roadmap -->
      <div style="margin: 30px 0 28px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 8px; margin-bottom: 14px;">
          <tr>
            <td>
              <span class="section-title">🚀 &nbsp;Food Commodity Sourcing &amp; QA Roadmap</span>
            </td>
          </tr>
        </table>

        <div class="roadmap-step" style="position: relative;">
          <div style="position: absolute; left: 14px; top: 14px; width: 22px; height: 22px; background: linear-gradient(135deg, #2E6B55, #6E9C62); border-radius: 50%; color: #fff; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">1</div>
          <strong style="color: #132F2A;">Phase 1: Grade &amp; Quality Specification Review</strong>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; line-height: 1.5;">
            Our agronomy &amp; trade team reviews harvest availability, moisture levels, purity parameters, and export certifications (APEDA / FSSAI / USDA / Non-GMO).
          </p>
        </div>

        <div class="roadmap-step" style="position: relative;">
          <div style="position: absolute; left: 14px; top: 14px; width: 22px; height: 22px; background: linear-gradient(135deg, #2E6B55, #6E9C62); border-radius: 50%; color: #fff; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">2</div>
          <strong style="color: #132F2A;">Phase 2: Batch Sourcing &amp; Commercial Quotation</strong>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; line-height: 1.5;">
            We prepare an initial quotation, sampling roadmap, packaging specifications, and Incoterms pricing within <strong style="color: #132F2A;">24–48 business hours</strong>.
          </p>
        </div>

        <div class="roadmap-step" style="position: relative;">
          <div style="position: absolute; left: 14px; top: 14px; width: 22px; height: 22px; background: linear-gradient(135deg, #2E6B55, #6E9C62); border-radius: 50%; color: #fff; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">3</div>
          <strong style="color: #132F2A;">Phase 3: Phytosanitary Inspection &amp; Container Dispatch</strong>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b; line-height: 1.5;">
            Upon commercial confirmation, third-party inspection (SGS / Intertek), fumigation, and port customs clearance are structured.
          </p>
        </div>
      </div>

      <!-- Immediate Contact Box -->
      <div class="action-box" style="margin-top: 28px;">
        <div style="font-weight: 700; color: #132F2A; font-size: 13px; margin-bottom: 6px;">
          Need to specify lab parameters, custom bag branding, or urgent container bookings?
        </div>
        <p style="margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.6;">
          Reply directly to this email or reach our food coordinators at <a href="mailto:${brand.salesEmail}" style="color: #2E6B55; font-weight: 700; text-decoration: none;">${brand.salesEmail}</a> quoting reference <strong>${referenceId}</strong>.
        </p>
        <a href="mailto:${brand.salesEmail}?subject=Supplemental%20Food%20Specs%20for%20Ref:%20${referenceId}" class="btn-secondary">
          ✉️ Send Additional Requirements
        </a>
      </div>
    `,
  });

  const text = `
HAROBAL FOODS - OFFICIAL REQUIREMENT RECEIPT
======================================================
Dear ${inquiry.fullName},

Thank you for choosing Harobal Foods. We have received and registered your commodity procurement brief for ${inquiry.companyName}.

YOUR TRACKING REFERENCE ID: ${referenceId}
(Please quote this reference in all correspondence)

BRIEF SUMMARY:
- Category: ${categoryDisplay}
- Product: ${productDisplay}
- Quantity: ${inquiry.quantity || "To be aligned"}
- Destination Port: ${inquiry.destinationPort || "To be aligned"}
- Incoterms: ${incotermDisplay}
- Country: ${inquiry.country}

WHAT HAPPENS NEXT:
1. Quality Parameter Review: Assessing crop availability and export grades.
2. Commercial Offer: A trade coordinator will follow up within 24 to 48 business hours with terms and pricing indications.
3. Execution: Structuring third-party inspection and container shipping milestones.

Direct Desk Contact: ${brand.salesEmail}

Best regards,
Harobal Food Trade Desk
`;

  return { subject, html, text };
}
