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
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f6f8f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; }
    .container { max-width: 620px; margin: 0 auto; width: 100%; }
    .card { background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px -4px rgba(19, 47, 42, 0.10); }
    .header-bar { background: linear-gradient(135deg, #2E6B55 0%, #6E9C62 45%, #132F2A 100%); height: 5px; width: 100%; }
    .header { background-color: #0A1815; padding: 32px 40px 28px; text-align: left; }
    .body-content { padding: 40px; }
    .btn-primary { display: inline-block; padding: 13px 28px; background: linear-gradient(135deg, #2E6B55 0%, #132F2A 100%); color: #ffffff !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 10px; letter-spacing: 0.03em; border: none; }
    .btn-secondary { display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #132F2A !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 10px; border: 1.5px solid #cbd5e1; }
    .btn-whatsapp { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); color: #047857 !important; text-decoration: none; font-size: 13px; font-weight: 700; border-radius: 10px; border: 1px solid #a7f3d0; }
    .badge { display: inline-block; padding: 6px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 20px; }
    .badge-food { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); color: #047857; border: 1px solid #6ee7b7; }
    .badge-amber { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; border: 1px solid #fcd34d; }
    .badge-success { background-color: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .meta-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 16px 0 20px; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
    .meta-table td { padding: 12px 16px; font-size: 13px; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
    .meta-table tr:last-child td { border-bottom: none; }
    .meta-table tr:nth-child(even) td { background-color: #f8faf8; }
    .meta-label { color: #64748b; font-weight: 600; width: 38%; white-space: nowrap; }
    .meta-value { color: #0f172a; font-weight: 500; }
    .ref-box { background: linear-gradient(135deg, #0A1815 0%, #132F2A 100%); border-radius: 14px; padding: 22px 26px; color: #ffffff; margin: 24px 0; border-left: 5px solid #6E9C62; }
    .message-box { background-color: #fafbfa; border-left: 4px solid #2E6B55; padding: 20px 22px; border-radius: 0 12px 12px 0; font-size: 14px; line-height: 1.7; color: #334155; margin: 20px 0; white-space: pre-line; border: 1px solid #e2e8f0; border-left: 4px solid #2E6B55; }
    .roadmap-step { padding: 14px 16px 14px 48px; background: #f8faf8; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 8px; font-size: 13px; color: #334155; position: relative; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2E6B55; }
    .action-box { padding: 18px 20px; background: linear-gradient(135deg, #f8faf8 0%, #f1f5f1 100%); border-radius: 14px; border: 1px solid #e2e8f0; }
    .audit-box { padding: 14px 18px; background-color: #f8fafc; border-radius: 12px; font-size: 11px; color: #64748b; font-family: 'SF Mono', SFMono-Regular, Consolas, monospace; border: 1px solid #e2e8f0; }
    .footer { background-color: #0A1815; padding: 30px 40px 34px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer-brand { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 0.18em; text-transform: uppercase; }
    .footer-tagline { margin: 4px 0 0 0; font-size: 10px; color: #6E9C62; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
    .footer-divider { width: 40px; height: 2px; background: linear-gradient(90deg, transparent 0%, #6E9C62 50%, transparent 100%); margin: 16px auto; border-radius: 1px; }
    .footer-contact { margin: 0 0 16px 0; font-size: 12px; color: #94a3b8; }
    .footer-legal { margin: 0; font-size: 10px; color: #475569; line-height: 1.5; max-width: 420px; margin: 0 auto; }
    @media only screen and (max-width: 620px) {
      .body-content { padding: 24px 20px !important; }
      .header { padding: 24px 20px 22px !important; }
      .footer { padding: 24px 20px 28px !important; }
      .ref-box { padding: 18px 18px !important; }
      .meta-table td { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .meta-label { padding-bottom: 2px !important; font-size: 11px !important; color: #94a3b8 !important; }
      .meta-value { padding-top: 0 !important; padding-bottom: 14px !important; font-size: 14px !important; border-bottom: 1px solid #f1f5f9 !important; }
      .meta-table tr:last-child .meta-value { border-bottom: none !important; }
      .btn-primary, .btn-secondary, .btn-whatsapp { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; margin-bottom: 8px !important; }
      .action-box table td { display: block !important; padding: 0 !important; margin-bottom: 8px !important; }
      h1 { font-size: 19px !important; }
      .section-title { font-size: 11px !important; }
      .roadmap-step { padding-left: 42px !important; font-size: 12px !important; }
      .audit-box { font-size: 10px !important; }
      .footer-legal { font-size: 9px !important; }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display: none; font-size: 1px; color: #f6f8f6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${preheader}</div>` : ""}
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f8f6; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <div class="card">
                <div class="header-bar"></div>
                <div class="header">
                  ${logoHeader}
                </div>
                <div class="body-content">
                  ${content}
                </div>
                <div class="footer">
                  <div class="footer-brand">HAROBAL FOODS</div>
                  <p class="footer-tagline">Global Food &amp; Agricultural Commodity Trade</p>
                  <div class="footer-divider"></div>
                  <p class="footer-contact">
                    Global Food Trade Desk · <a href="mailto:${brand.salesEmail}" style="color: #6E9C62; text-decoration: none; font-weight: 600;">${brand.salesEmail}</a>
                  </p>
                  <p class="footer-legal">
                    This communication contains proprietary commercial information intended solely for the named recipient.
                  </p>
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
