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
            <!-- H-Mark Vector SVG (Exact Navbar Symbol) -->
            <td valign="middle" style="padding-right: 12px;">
              <svg viewBox="0 0 852 833" width="34" height="33" aria-hidden="true" focusable="false" style="display: block; vertical-align: middle;">
                <path fill-rule="evenodd" fill="${markColor}" d="${H_MARK_PATH}" />
              </svg>
            </td>
            <!-- Vertical Divider -->
            <td valign="middle" style="padding-right: 12px;">
              <div style="width: 1px; height: 24px; background-color: ${dividerColor};"></div>
            </td>
            <!-- Wordmark + Descriptor (Exact Navbar Typography) -->
            <td valign="middle">
              <div style="font-family: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: 650; color: ${nameColor}; letter-spacing: 0.18em; line-height: 1; text-transform: uppercase;">
                HAROBAL
              </div>
              ${
                showDescriptor
                  ? `<div style="font-family: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8.5px; font-weight: 600; color: ${descriptorColor}; letter-spacing: 0.20em; text-transform: uppercase; margin-top: 3px; line-height: 1;">
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
