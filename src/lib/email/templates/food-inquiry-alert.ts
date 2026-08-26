import type { FoodInquiryEmailPayload } from "../types.ts";
import { renderEmailLayout } from "./layout.ts";

const EMAIL_ICON_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:5px;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const WHATSAPP_ICON_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:5px;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.52 1.09 2.52.73 2.98.68.45-.04 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.06-.1-.23-.17-.48-.29z"/></svg>`;
const CALL_ICON_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:5px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

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
      <!-- Status Pill + Title -->
      <div style="margin-bottom: 16px;">
        <div style="display: inline-block; background-color: #2E6B55; color: #FFFFFF !important; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
          🌾 New Food Commodity Requirement
        </div>
        <h1 style="margin: 0 0 4px 0; font-size: 19px; font-weight: 800; color: #132F2A; line-height: 1.35; font-family: 'Outfit', sans-serif;">
          Inquiry from ${inquiry.companyName}
        </h1>
        <p style="margin: 0; font-size: 12px; color: #64748B; font-weight: 500;">
          Received &amp; logged on ${new Date(context.submittedAt).toUTCString()}
        </p>
      </div>

      <!-- Full-Line Receipt & Reference Banner -->
      <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-left: 4px solid #2E6B55; border-radius: 0 8px 8px 0; padding: 12px 16px; margin-bottom: 22px;">
        <div style="font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: #64748B; margin-bottom: 3px;">
          Tracking Reference ID
        </div>
        <div style="font-family: 'SF Mono', Consolas, monospace; font-size: 15px; font-weight: 800; color: #2E6B55; letter-spacing: 0.04em;">
          ${referenceId}
        </div>
      </div>

      <!-- Sleek Quick-Action Icon Buttons -->
      <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 10px; padding: 12px 14px; margin-bottom: 22px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="33.3%" style="padding: 0 3px;">
              <a href="mailto:${inquiry.email}?subject=RE:%20Harobal%20Foods%20Commodity%20Quotation%20[Ref:%20${referenceId}]" style="display: block; box-sizing: border-box; text-align: center; padding: 9px 8px; background-color: #2E6B55; color: #FFFFFF !important; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 7px; white-space: nowrap;">
                ${EMAIL_ICON_SVG}<span style="color:#FFFFFF !important;font-weight:700;">Reply</span>
              </a>
            </td>
            <td width="33.3%" style="padding: 0 3px;">
              <a href="${whatsappUrl}" target="_blank" style="display: block; box-sizing: border-box; text-align: center; padding: 9px 8px; background-color: #059669; color: #FFFFFF !important; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 7px; white-space: nowrap;">
                ${WHATSAPP_ICON_SVG}<span style="color:#FFFFFF !important;font-weight:700;">WhatsApp</span>
              </a>
            </td>
            <td width="33.3%" style="padding: 0 3px;">
              <a href="tel:${inquiry.phone}" style="display: block; box-sizing: border-box; text-align: center; padding: 9px 8px; background-color: #FFFFFF; color: #132F2A !important; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 7px; border: 1px solid #CBD5E1; white-space: nowrap;">
                ${CALL_ICON_SVG}<span style="color:#132F2A !important;font-weight:700;">Call</span>
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Section 1: Buyer Profile -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; margin-bottom: 8px;">
          Buyer &amp; Organization Profile
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E5ECE4; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="padding: 10px 14px; width: 36%; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Full Name</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Company / Entity</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Business Email</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #2E6B55; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;"><a href="mailto:${inquiry.email}" style="color: #2E6B55; text-decoration: none;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Phone / WhatsApp</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #2E6B55; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;"><a href="tel:${inquiry.phone}" style="color: #2E6B55; text-decoration: none;">${inquiry.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8;">Destination Country</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF;">${inquiry.country}</td>
          </tr>
        </table>
      </div>

      <!-- Section 2: Commodity Specifications & Commercial Terms -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; margin-bottom: 8px;">
          Commodity Specifications &amp; Commercial Terms
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E5ECE4; border-radius: 8px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="padding: 10px 14px; width: 36%; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Product Category</td>
            <td style="padding: 10px 14px; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">
              <span style="display: inline-block; background-color: #ECFDF5; color: #047857; font-weight: 700; padding: 3px 8px; border-radius: 4px; font-size: 11.5px; border: 1px solid #A7F3D0;">
                ${categoryDisplay}
              </span>
            </td>
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
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Destination Port / Hub</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.destinationPort}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Preferred Incoterm®</td>
            <td style="padding: 10px 14px; font-size: 12px; font-weight: 700; color: #2E6B55; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${incotermDisplay}</td>
          </tr>
          ${inquiry.packaging ? `
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Packaging Preference</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.packaging}</td>
          </tr>` : ""}
          ${inquiry.timeline ? `
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8; border-bottom: 1px solid #E5ECE4;">Target Timeline</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF; border-bottom: 1px solid #E5ECE4;">${inquiry.timeline}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: #64748B; background-color: #F8FAF8;">Discovery Channel</td>
            <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #132F2A; background-color: #FFFFFF;">${sourceDisplay}</td>
          </tr>
        </table>
      </div>

      <!-- Section 3: Notes -->
      <div style="margin-bottom: 22px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; margin-bottom: 8px;">
          Quality, Compliance &amp; Packaging Notes
        </div>

        <div style="background-color: #F8FAF8; border-left: 3px solid #2E6B55; border-top: 1px solid #E5ECE4; border-right: 1px solid #E5ECE4; border-bottom: 1px solid #E5ECE4; border-radius: 0 8px 8px 0; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: #334155;">
          ${inquiry.message}
        </div>
      </div>

      <!-- Audit Metadata -->
      <div style="background-color: #F8FAF8; border: 1px solid #E5ECE4; border-radius: 8px; padding: 10px 14px; font-size: 11px; color: #64748B; font-family: 'SF Mono', Consolas, monospace;">
        <span style="font-weight: 700; color: #334155;">🔒 Audit:</span> IP ${context.ip} · ${context.userAgent} · Verified &amp; Signed
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
