import nodemailer, { type Transporter } from "nodemailer";
import { getZohoSmtpConfig } from "./config.ts";
import type { SendEmailOptions, SendEmailResult } from "./types.ts";

let cachedTransporter: Transporter | null = null;

export function getZohoTransporter(): Transporter | null {
  const config = getZohoSmtpConfig();
  if (!config) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cachedTransporter;
}

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const config = getZohoSmtpConfig();
  const transporter = getZohoTransporter();

  if (!config || !transporter) {
    return {
      success: false,
      error: "Zoho email service is not configured (missing ZOHO_MAIL_USER or ZOHO_MAIL_PASSWORD).",
      code: "UNCONFIGURED",
    };
  }

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: options.to,
      replyTo: options.replyTo || config.from,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email via Zoho SMTP.";
    const code = (error as { code?: string })?.code;
    return {
      success: false,
      error: message,
      code,
    };
  }
}
