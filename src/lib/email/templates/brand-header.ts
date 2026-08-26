import { H_MARK_PATH } from "../../../brand/brand.ts";

export function renderEmailLogoHeader({
  theme = "dark",
  showDescriptor = true,
  descriptor = "FOODS",
}: {
  theme?: "dark" | "light";
  showDescriptor?: boolean;
  descriptor?: string;
} = {}): string {
  const isDark = theme === "dark";
  const markColor = isDark ? "#FFFFFF" : "#2E6B55";
  const nameColor = isDark ? "#FFFFFF" : "#132F2A";
  const descriptorColor = isDark ? "#6E9C62" : "#2E6B55";
  const dividerColor = isDark ? "rgba(255, 255, 255, 0.28)" : "#DBE4D9";

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
    <tr>
      <td valign="middle" style="padding: 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle" style="padding-right: 14px;">
              <svg viewBox="0 0 852 833" width="38" height="37" aria-hidden="true" focusable="false" style="display: block; vertical-align: middle;">
                <path fill-rule="evenodd" fill="${markColor}" d="${H_MARK_PATH}" />
              </svg>
            </td>
            <td valign="middle" style="padding-right: 14px;">
              <div style="width: 1.5px; height: 32px; background-color: ${dividerColor};"></div>
            </td>
            <td valign="middle">
              <div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 700; color: ${nameColor}; letter-spacing: 0.18em; line-height: 1; text-transform: uppercase;">
                HAROBAL
              </div>
              ${
                showDescriptor
                  ? `<div style="font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; font-weight: 600; color: ${descriptorColor}; letter-spacing: 0.28em; text-transform: uppercase; margin-top: 5px; line-height: 1;">
                      ${descriptor}
                    </div>`
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}
