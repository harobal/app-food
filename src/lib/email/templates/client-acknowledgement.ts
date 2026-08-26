import { brand } from "../../../content/site/brand.ts";
import type { FoodInquiryEmailPayload } from "../types.ts";
import { renderEmailLayout } from "./layout.ts";

const EMAIL_ICON_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:5px;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

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
      <div style="margin-bottom: 18px;">
        <div style="display: inline-block; background-color: #059669; color: #FFFFFF !important; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
          ✅ Requirement Registered
        </div>
        <h1 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 800; color: #132F2A; line-height: 1.35; font-family: 'Outfit', sans-serif;">
          Thank you for reaching out, ${inquiry.fullName}.
        </h1>
        <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.6;">
          We have received and registered the commodity procurement brief submitted on behalf of <strong class="body-strong" style="color: #132F2A;">${inquiry.companyName}</strong>.
        </p>
      </div>

      <!-- High-Contrast Full-Width Reference Card -->
      <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-left: 4px solid #059669; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-bottom: 22px;">
        <div style="font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: #64748B; margin-bottom: 4px;">
          Food Desk Tracking Reference ID
        </div>
        <div style="font-family: 'SF Mono', Consolas, monospace; font-size: 17px; font-weight: 800; color: #059669; letter-spacing: 0.04em;">
          ${referenceId}
        </div>
        <p style="margin: 4px 0 0 0; font-size: 11.5px; color: #64748B;">
          Please quote this reference in all future correspondence with our agricultural sourcing desk.
        </p>
      </div>

      <!-- Section 1: Registered Commodity Matrix -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; margin-bottom: 8px;">
          Registered Commodity Overview
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="data-grid" style="border: 1px solid #E5ECE4; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="padding: 10px 14px; width: 36%; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Commodity Category</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${categoryDisplay}</td>
          </tr>
          ${inquiry.product ? `
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Product / Grade</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.product}</td>
          </tr>` : ""}
          ${inquiry.quantity ? `
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Required Quantity</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.quantity}</td>
          </tr>` : ""}
          ${inquiry.destinationPort ? `
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Destination Port</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.destinationPort}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Delivery Terms</td>
            <td style="padding: 10px 14px; font-size: 12px; font-weight: 700; color: #2E6B55; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${incotermDisplay}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8;">Destination Country</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF;">${inquiry.country}</td>
          </tr>
        </table>
      </div>

      <!-- Section 2: Delivery Roadmap & Timeline -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; margin-bottom: 10px;">
          Food Commodity Sourcing &amp; QA Roadmap
        </div>

        <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 8px; padding: 12px 14px; margin-bottom: 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="28" valign="top" style="padding-right: 10px;">
                <div style="width: 22px; height: 22px; background-color: #2E6B55; color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 50%; text-align: center; line-height: 22px;">1</div>
              </td>
              <td valign="top">
                <div style="font-size: 13px; font-weight: 700; color: #132F2A;">Phase 1: Grade &amp; Quality Specification Review</div>
                <div style="font-size: 12px; color: #64748B; margin-top: 2px; line-height: 1.45;">Our agronomy &amp; trade team reviews harvest availability, moisture levels, purity parameters, and export certifications (APEDA / FSSAI / USDA / Non-GMO).</div>
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 8px; padding: 12px 14px; margin-bottom: 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="28" valign="top" style="padding-right: 10px;">
                <div style="width: 22px; height: 22px; background-color: #2E6B55; color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 50%; text-align: center; line-height: 22px;">2</div>
              </td>
              <td valign="top">
                <div style="font-size: 13px; font-weight: 700; color: #132F2A;">Phase 2: Batch Sourcing &amp; Commercial Quotation</div>
                <div style="font-size: 12px; color: #64748B; margin-top: 2px; line-height: 1.45;">We prepare an initial quotation, sampling roadmap, packaging specifications, and Incoterms pricing within <strong style="color:#2E6B55;">24–48 business hours</strong>.</div>
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 8px; padding: 12px 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="28" valign="top" style="padding-right: 10px;">
                <div style="width: 22px; height: 22px; background-color: #2E6B55; color: #FFFFFF; font-size: 11px; font-weight: 800; border-radius: 50%; text-align: center; line-height: 22px;">3</div>
              </td>
              <td valign="top">
                <div style="font-size: 13px; font-weight: 700; color: #132F2A;">Phase 3: Phytosanitary Inspection &amp; Container Dispatch</div>
                <div style="font-size: 12px; color: #64748B; margin-top: 2px; line-height: 1.45;">Upon commercial confirmation, third-party inspection (SGS / Intertek), fumigation, and port customs clearance are structured.</div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Section 3: Send Additional Specs / Lab Parameters Action Card -->
      <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 8px; padding: 14px 16px;">
        <div style="font-size: 12.5px; font-weight: 700; color: #132F2A; margin-bottom: 4px;">
          Need to specify lab parameters, custom bag branding, or urgent container bookings?
        </div>
        <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748B; line-height: 1.5;">
          Reply directly to this email or contact our food coordinators at <a href="mailto:${brand.salesEmail}" style="color: #2E6B55; font-weight: 700; text-decoration: none;">${brand.salesEmail}</a>.
        </p>
        <a href="mailto:${brand.salesEmail}?subject=Supplemental%20Food%20Specs%20[Ref:%20${referenceId}]" style="display: inline-block; padding: 7px 14px; background-color: #2E6B55; color: #FFFFFF !important; text-decoration: none; font-size: 11.5px; font-weight: 700; border-radius: 6px;">
          ${EMAIL_ICON_SVG}<span style="color:#FFFFFF !important;font-weight:700;">Send Additional Specs</span>
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
