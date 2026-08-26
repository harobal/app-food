import { BRAND_LOGO_URL } from "./brand-assets.ts";

export function renderEmailLogoHeader({
  showDescriptor = true,
  descriptor = "FOODS",
}: {
  theme?: "dark" | "light";
  showDescriptor?: boolean;
  descriptor?: string;
} = {}): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="vertical-align: middle;">
    <tr>
      <td valign="middle" style="padding-right: 12px;">
        <div style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;">
          <img src="${BRAND_LOGO_URL}" width="34" height="33" alt="Harobal Foods" style="display: block; border: 0; outline: none; text-decoration: none; vertical-align: middle; width: 34px; height: 33px;" />
        </div>
      </td>
      <td valign="middle" style="padding-right: 12px;">
        <div style="width: 1.5px; height: 26px; background-color: #DBE4D9;"></div>
      </td>
      <td valign="middle">
        <div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 19px; font-weight: 800; color: #132F2A; letter-spacing: 0.18em; line-height: 1; text-transform: uppercase;">
          HAROBAL
        </div>
        ${
          showDescriptor
            ? `<div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8.5px; font-weight: 700; color: #2E6B55; letter-spacing: 0.26em; text-transform: uppercase; margin-top: 3px; line-height: 1;">
                ${descriptor}
              </div>`
            : ""
        }
      </td>
    </tr>
  </table>
  `;
}
