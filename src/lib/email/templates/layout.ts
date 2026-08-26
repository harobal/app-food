import { brand } from "../../../content/site/brand.ts";
import { renderEmailLogoHeader } from "./brand-header.ts";

export function renderEmailLayout({
  title,
  preheader,
  content,
}: {
  title: string;
  preheader?: string;
  content: string;
}): string {
  const logoHeader = renderEmailLogoHeader({ theme: "dark" });

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f6f8f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; width: 100%; }
    .card { background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(19, 47, 42, 0.08); }
    .header-bar { background: linear-gradient(90deg, #2E6B55 0%, #6E9C62 50%, #132F2A 100%); height: 4px; width: 100%; }
    .header { background-color: #0A1815; padding: 28px 36px 24px; text-align: left; }
    .body-content { padding: 36px; }
    .footer { background-color: #0A1815; padding: 28px 36px 32px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.08); }
    .btn-primary { display: inline-block; padding: 12px 24px; background-color: #132F2A; color: #ffffff !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; letter-spacing: 0.02em; border: 1px solid #2E6B55; }
    .btn-secondary { display: inline-block; padding: 11px 22px; background-color: #f8fafc; color: #132F2A !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; border: 1px solid #cbd5e1; }
    .btn-whatsapp { display: inline-block; padding: 11px 22px; background-color: #ecfdf5; color: #047857 !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 8px; border: 1px solid #a7f3d0; }
    .badge { display: inline-block; padding: 5px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 20px; }
    .badge-food { background-color: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .badge-amber { background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .badge-success { background-color: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .meta-table { width: 100%; border-collapse: collapse; margin: 16px 0 20px; }
    .meta-table tr:nth-child(even) td { background-color: #f8fafc; }
    .meta-table td { padding: 10px 14px; font-size: 13px; border: 1px solid #f1f5f9; vertical-align: top; }
    .meta-label { color: #64748b; font-weight: 600; width: 34%; }
    .meta-value { color: #0f172a; font-weight: 500; width: 66%; }
    .ref-box { background: linear-gradient(135deg, #0A1815 0%, #132F2A 100%); border-radius: 12px; padding: 18px 22px; color: #ffffff; margin: 20px 0; border-left: 4px solid #6E9C62; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #2E6B55; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 14px; line-height: 1.65; color: #334155; margin: 20px 0; white-space: pre-line; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
    .roadmap-step { padding: 12px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 8px; font-size: 13px; color: #334155; }
    @media only screen and (max-width: 620px) {
      .body-content { padding: 24px 18px !important; }
      .header { padding: 24px 18px !important; }
      .footer { padding: 22px 18px !important; }
      .meta-table td { padding: 8px 8px !important; font-size: 12px !important; }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display: none; font-size: 1px; color: #f6f8f6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${preheader}</div>` : ""}
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f8f6; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <div class="card">
                <!-- Top Accent Gradient -->
                <div class="header-bar"></div>

                <!-- Brand Header with Official Logo -->
                <div class="header">
                  ${logoHeader}
                </div>

                <!-- Body Content -->
                <div class="body-content">
                  ${content}
                </div>

                <!-- Footer -->
                <div class="footer">
                  <div style="font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 4px;">
                    HAROBAL FOODS
                  </div>
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #cbd5e1; font-weight: 600;">
                    ${brand.supportLine}
                  </p>
                  <p style="margin: 0 0 14px 0; font-size: 12px; color: #94a3b8;">
                    Global Food Trade Desk · <a href="mailto:${brand.salesEmail}" style="color: #6E9C62; text-decoration: none; font-weight: 600;">${brand.salesEmail}</a>
                  </p>
                  <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; margin-top: 12px;">
                    <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                      Confidentiality Note: This electronic communication contains commercial export terms and specifications intended solely for the recipient.
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
