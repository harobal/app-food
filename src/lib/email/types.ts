export interface ZohoSmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  foodsEmail: string;
}

export interface FoodInquiryData {
  submissionType?: "inquiry" | "rfq" | "supplier";
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  otherCategory?: string;
  product?: string;
  quantity?: string;
  destinationPort?: string;
  incoterm?: string;
  otherIncoterm?: string;
  packaging?: string;
  timeline?: string;
  source?: string;
  otherSource?: string;
  message: string;
}

export interface FoodInquiryContext {
  ip: string;
  userAgent: string;
  submittedAt: string;
}

export interface FoodInquiryEmailPayload {
  inquiry: FoodInquiryData;
  context: FoodInquiryContext;
  referenceId: string;
}

export interface SendEmailOptions {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  code?: string;
}

export interface FoodDualEmailResult {
  deskEmail: SendEmailResult;
  clientEmail: SendEmailResult;
}
