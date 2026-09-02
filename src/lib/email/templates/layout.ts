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
  const logoHeader = renderEmailLogoHeader();

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
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
    body { margin: 0; padding: 0; width: 100% !important; background-color: #F4F7F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 0 auto; width: 100%; }
    .card { background-color: #FFFFFF; border-radius: 14px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 24px rgba(19, 47, 42, 0.06); }
    .header-bar { background: linear-gradient(90deg, #2E6B55 0%, #6E9C62 100%); height: 4px; width: 100%; }
    .header { background-color: #F8FAF8; padding: 20px 24px; border-bottom: 1px solid #E5ECE4; }
    .body-content { padding: 24px; }
    .footer { background-color: #F8FAF8; padding: 20px 24px; text-align: center; border-top: 1px solid #E5ECE4; font-size: 11px; color: #64748B; }
    .footer-brand { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 800; color: #132F2A; letter-spacing: 0.16em; text-transform: uppercase; }
    .footer-tagline { margin: 3px 0 0 0; font-size: 9.5px; color: #2E6B55; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
    .footer-contact { margin: 8px 0 0 0; font-size: 11px; color: #94A3B8; }
    
    @media (prefers-color-scheme: dark) {
      body { background-color: #0A1815 !important; }
      .card { background-color: #0D1C19 !important; border-color: #1F3830 !important; }
      .header { background-color: #081412 !important; border-bottom-color: #162E27 !important; }
      .footer { background-color: #081412 !important; border-top-color: #162E27 !important; color: #94A3B8 !important; }
      .footer-brand { color: #FFFFFF !important; }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${preheader}</div>` : ""}
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F7F4; padding: 24px 12px;">
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
                  <p class="footer-tagline">Global Agri-Commodities &amp; Fresh Produce Trading</p>
                  <p class="footer-contact">
                    Food Trade Desk · <a href="mailto:${brand.salesEmail}" style="color: #2E6B55; text-decoration: none; font-weight: 600;">${brand.salesEmail}</a> · Confidential Trade Dispatch
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
