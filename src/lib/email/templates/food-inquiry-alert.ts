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
    preheader: `New food commodity inquiry from ${inquiry.fullName} (${inquiry.companyName}, ${inquiry.country}) for ${productDisplay}. Ref: ${referenceId}`,
    content: `
      <!-- Top Status Banner -->
      <div style="margin-bottom: 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle">
              <span class="badge badge-food">🌾 New Food Commodity Requirement</span>
            </td>
            <td align="right" valign="middle">
              <span style="font-family: 'SF Mono', SFMono-Regular, Consolas, monospace; font-size: 13px; color: #132F2A; font-weight: 800; background: linear-gradient(135deg, #f8faf8 0%, #e8eee8 100%); padding: 6px 12px; border-radius: 8px; border: 1px solid #cbd5e1; letter-spacing: 0.04em;">
                ${referenceId}
              </span>
            </td>
          </tr>
        </table>

        <h1 style="margin: 18px 0 0 0; font-size: 22px; font-weight: 800; color: #132F2A; line-height: 1.3; font-family: 'Outfit', sans-serif;">
          Inquiry from ${inquiry.companyName}
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b;">
          Received &amp; logged on ${new Date(context.submittedAt).toUTCString()}
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="action-box" style="margin: 0 0 28px 0;">
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #94a3b8; margin-bottom: 12px;">
          One-Click Trade Desk Actions
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="padding-right: 10px;" width="50%">
              <a href="mailto:${inquiry.email}?subject=RE:%20Harobal%20Foods%20Commodity%20Quotation%20[Ref:%20${referenceId}]" class="btn-primary">
                ✉️ Reply to Buyer
              </a>
            </td>
            <td width="50%">
              <a href="${whatsappUrl}" target="_blank" class="btn-whatsapp">
                💬 WhatsApp Contact
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Section 1: Buyer Profile -->
      <div style="margin-bottom: 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 8px; margin-bottom: 14px;">
          <tr>
            <td>
              <span class="section-title">👤 &nbsp;1. Buyer &amp; Organization Profile</span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Full Name</td>
            <td class="meta-value"><strong>${inquiry.fullName}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Company / Entity</td>
            <td class="meta-value"><strong style="color: #132F2A; font-size: 14px;">${inquiry.companyName}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Business Email</td>
            <td class="meta-value"><a href="mailto:${inquiry.email}" style="color: #2E6B55; font-weight: 600; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td class="meta-label">Phone / WhatsApp</td>
            <td class="meta-value"><a href="tel:${inquiry.phone}" style="color: #2E6B55; font-weight: 600; text-decoration: none;">${inquiry.phone}</a></td>
          </tr>
          <tr>
            <td class="meta-label">Destination Country</td>
            <td class="meta-value"><strong style="color: #132F2A;">${inquiry.country}</strong></td>
          </tr>
        </table>
      </div>

      <!-- Section 2: Commodity & Trade Terms -->
      <div style="margin-bottom: 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 8px; margin-bottom: 14px;">
          <tr>
            <td>
              <span class="section-title">🌾 &nbsp;2. Commodity Specifications &amp; Commercial Terms</span>
            </td>
          </tr>
        </table>

        <table class="meta-table" role="presentation">
          <tr>
            <td class="meta-label">Product Category</td>
            <td class="meta-value">
              <span style="display: inline-block; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); color: #047857; font-weight: 700; padding: 4px 12px; border-radius: 8px; font-size: 12px;">
                ${categoryDisplay}
              </span>
            </td>
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
            <td class="meta-label">Destination Port / Hub</td>
            <td class="meta-value"><strong>${inquiry.destinationPort}</strong></td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Preferred Incoterm®</td>
            <td class="meta-value">
              <span style="display: inline-block; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; font-weight: 800; font-family: 'SF Mono', monospace; padding: 4px 12px; border-radius: 8px; font-size: 12px;">
                ${incotermDisplay}
              </span>
            </td>
          </tr>
          ${inquiry.packaging ? `
          <tr>
            <td class="meta-label">Packaging Preference</td>
            <td class="meta-value">${inquiry.packaging}</td>
          </tr>` : ""}
          ${inquiry.timeline ? `
          <tr>
            <td class="meta-label">Target Timeline</td>
            <td class="meta-value">${inquiry.timeline}</td>
          </tr>` : ""}
          <tr>
            <td class="meta-label">Discovery Channel</td>
            <td class="meta-value">${sourceDisplay}</td>
          </tr>
        </table>
      </div>

      <!-- Section 3: Notes -->
      <div style="margin-bottom: 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #2E6B55; padding-bottom: 8px; margin-bottom: 14px;">
          <tr>
            <td>
              <span class="section-title">📝 &nbsp;3. Quality, Compliance &amp; Packaging Notes</span>
            </td>
          </tr>
        </table>

        <div class="message-box">
          ${inquiry.message}
        </div>
      </div>

      <!-- Audit Metadata -->
      <div class="audit-box">
        <div style="margin-bottom: 4px; font-weight: 700; color: #475569;">🔒 Audit Record</div>
        <div>IP: ${context.ip}</div>
        <div>UA: ${context.userAgent}</div>
        <div>Time: ${context.submittedAt}</div>
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
