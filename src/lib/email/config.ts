import { brand } from "../../content/site/brand.ts";
import type { ZohoSmtpConfig } from "./types.ts";

export function getZohoSmtpConfig(): ZohoSmtpConfig | null {
  const user = process.env.ZOHO_MAIL_USER?.trim() || "";
  const pass = process.env.ZOHO_MAIL_PASSWORD?.trim() || "";

  if (!user || !pass) {
    return null;
  }

  // Auto-detect Zoho SMTP host if not explicitly provided
  let defaultHost = "smtppro.zoho.in";
  if (user.endsWith(".com") || !user.includes(".in")) {
    defaultHost = "smtppro.zoho.com";
  }

  const host = process.env.ZOHO_SMTP_HOST?.trim() || defaultHost;
  const port = Number(process.env.ZOHO_SMTP_PORT) || 465;
  const secure = process.env.ZOHO_SMTP_SECURE !== undefined
    ? process.env.ZOHO_SMTP_SECURE === "true" || process.env.ZOHO_SMTP_SECURE === "1"
    : port === 465;

  const from = process.env.ZOHO_MAIL_FROM?.trim() || `"Harobal Foods Trade Desk" <${user}>`;
  const foodsEmail = process.env.FOODS_NOTIFICATION_EMAIL?.trim() || brand.salesEmail || user;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    foodsEmail,
  };
}

export function isEmailServiceConfigured(): boolean {
  return Boolean(process.env.ZOHO_MAIL_USER && process.env.ZOHO_MAIL_PASSWORD);
}
