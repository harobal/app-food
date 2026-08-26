import type { FoodInquiryEmailPayload } from "../types.ts";
import { renderEmailLayout } from "./layout.ts";

export function renderFoodInquiryAlert({ inquiry, context, referenceId }: FoodInquiryEmailPayload): {
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

  const sourceDisplay =
    inquiry.source === "Other" && inquiry.otherSource
      ? `Other (${inquiry.otherSource})`
      : inquiry.source || "Direct / Web Portal";

  const productDisplay = inquiry.product || categoryDisplay;

  const cleanPhone = inquiry.phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = cleanPhone.startsWith("+")
    ? `https://wa.me/${cleanPhone.replace("+", "")}`
    : `https://wa.me/${cleanPhone}`;

  const subject = `[Food Trade Desk Brief] ${inquiry.companyName} · ${productDisplay} (${inquiry.country}) [Ref: ${referenceId}]`;

  const html = renderEmailLayout({
    title: subject,
    preheader: `New food commodity inquiry from ${inquiry.fullName} (${inquiry.companyName}, ${inquiry.country}) for ${productDisplay}. Reference: ${referenceId}`,
    content: `
      <!-- Top Status Banner -->
      <div style="margin-bottom: 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle">
              <span class="badge badge-food">🌾 New Food Commodity Requirement</span>
            </td>
            <td align="right" valign="middle">
              <span style="font-family: monospace; font-size: 13px; color: #132F2A; font-weight: 800; background: #f6f8f6; padding: 4px 10px; border-radius: 6px; border: 1px solid #cbd5e1;">
                ${referenceId}
              </span>
            </td>
          </tr>
        </table>

        <h1 style="margin: 16px 0 0 0; font-size: 22px; font-weight: 800; color: #132F2A; line-height: 1.25; font-family: 'Outfit', sans-serif;">
          Inquiry from ${inquiry.companyName}
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">
          Received &amp; logged on ${new Date(context.submittedAt).toUTCString()}
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div style="margin: 20px 0 26px 0; padding: 16px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; margin-bottom: 10px;">
          One-Click Trade Desk Actions
        </span>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right: 10px;">
              <a href="mailto:${inquiry.email}?subject=RE:%20Harobal%20Foods%20Commodity%20Quotation%20[Ref:%20${referenceId}]" class="btn-primary">
                ✉️ Reply to Buyer
              </a>
            </td>
            <td>
              <a href="${whatsappUrl}" target="_blank" class="btn-whatsapp">
                💬 WhatsApp Contact
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Section 1: Buyer Profile -->
      <div style="margin-bottom: 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 6px; margin-bottom: 10px;">
          <tr>
            <td>
              <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55;">
                1. Buyer &amp; Organization Profile
              </span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Full Name:</td>
            <td class="meta-value"><strong>${inquiry.fullName}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Company / Entity:</td>
            <td class="meta-value"><strong style="color: #132F2A; font-size: 14px;">${inquiry.companyName}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Business Email:</td>
            <td class="meta-value"><a href="mailto:${inquiry.email}" style="color: #2E6B55; font-weight: 600; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td class="meta-label">Direct Phone / WhatsApp:</td>
            <td class="meta-value"><a href="tel:${inquiry.phone}" style="color: #2E6B55; font-weight: 600; text-decoration: none;">${inquiry.phone}</a></td>
          </tr>
          <tr>
            <td class="meta-label">Destination Country:</td>
            <td class="meta-value"><strong style="color: #132F2A;">${inquiry.country}</strong></td>
          </tr>
        </table>
      </div>

      <!-- Section 2: Commodity & Trade Terms -->
      <div style="margin-bottom: 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 6px; margin-bottom: 10px;">
          <tr>
            <td>
              <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55;">
                2. Commodity Specifications &amp; Commercial Terms
              </span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Product Category:</td>
            <td class="meta-value">
              <span style="display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 3px 10px; border-radius: 6px; font-size: 12px;">
                ${categoryDisplay}
              </span>
            </td>
          </tr>
          ${inquiry.product ? `
          <tr>
            <td class="meta-label">Specific Product / Grade:</td>
            <td class="meta-value"><strong style="color: #132F2A;">${inquiry.product}</strong></td>
          </tr>` : ""}
          ${inquiry.quantity ? `
          <tr>
            <td class="meta-label">Required Quantity:</td>
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
              <span style="display: inline-block; background: #fef3c7; color: #92400e; font-weight: 800; font-family: monospace; padding: 3px 10px; border-radius: 6px; font-size: 12px; border: 1px solid #fde68a;">
                ${incotermDisplay}
              </span>
            </td>
          </tr>
          ${inquiry.packaging ? `
          <tr>
            <td class="meta-label">Packaging Preference:</td>
            <td class="meta-value">${inquiry.packaging}</td>
          </tr>` : ""}
          ${inquiry.timeline ? `
          <tr>
            <td class="meta-label">Target Timeline:</td>
            <td class="meta-value">${inquiry.timeline}</td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Discovery Channel:</td>
            <td class="meta-value">${sourceDisplay}</td>
          </tr>
        </table>
      </div>

      <!-- Section 3: Technical Specifications & Message -->
      <div style="margin-bottom: 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 6px; margin-bottom: 10px;">
          <tr>
            <td>
              <span style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55;">
                3. Quality, Compliance &amp; Packaging Notes
              </span>
            </td>
          </tr>
        </table>

        <div class="message-box">
          ${inquiry.message}
        </div>
      </div>

      <!-- Audit Metadata -->
      <div style="padding: 14px 16px; background-color: #f8fafc; border-radius: 10px; font-size: 11px; color: #64748b; font-family: monospace; border: 1px solid #e2e8f0;">
        <div style="margin-bottom: 2px;">🔒 <strong>Audit Record</strong></div>
        <div>Client IP: ${context.ip}</div>
        <div>User Agent: ${context.userAgent}</div>
        <div>Timestamp: ${context.submittedAt}</div>
      </div>
    `,
  });

  const text = `
HAROBAL FOODS - NEW COMMODITY INQUIRY BRIEF
=============================================
Reference ID: ${referenceId}
Submitted: ${context.submittedAt}

1. BUYER PROFILE
---------------------------------------------
Full Name: ${inquiry.fullName}
Company: ${inquiry.companyName}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Country: ${inquiry.country}

2. COMMODITY & TRADE TERMS
---------------------------------------------
Category: ${categoryDisplay}
Product / Grade: ${inquiry.product || "N/A"}
Quantity: ${inquiry.quantity || "N/A"}
Destination Port: ${inquiry.destinationPort || "N/A"}
Incoterm: ${incotermDisplay}
Packaging: ${inquiry.packaging || "Standard"}
Timeline: ${inquiry.timeline || "N/A"}
Discovery: ${sourceDisplay}

3. REQUIREMENT DETAILS
---------------------------------------------
${inquiry.message}

---------------------------------------------
Audit Info: IP ${context.ip} | UA: ${context.userAgent}
`;

  return { subject, html, text };
}
