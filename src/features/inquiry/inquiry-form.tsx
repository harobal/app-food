"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  LoaderCircle,
  Scale,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  allCountries,
  categoryOptions,
  incotermOptions,
  inquirySourceOptions,
  packagingOptions,
  popularTradeCountries,
  timelineOptions,
  INCOTERMS_2020,
} from "@/content/site";
import { TradeResourceModal } from "@/components/trade/trade-resource-modal";
import { generateClientToken } from "./security";
import { validateInquiry, validateInquiryStepOne } from "./validation";
import type { InquiryApiResponse, InquiryFieldErrors, InquiryFormValues } from "./types";

const initialState = (): InquiryFormValues => ({
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  category: "",
  otherCategory: "",
  product: "",
  quantity: "",
  destinationPort: "",
  incoterm: "",
  otherIncoterm: "",
  packaging: "",
  timeline: "",
  source: "",
  otherSource: "",
  message: "",
  consent: false,
  website: "",
  startedAt: Date.now(),
});

function FormField({
  id,
  label,
  error,
  required,
  children,
  hint,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-semibold text-foreground">
          {label}
          {required ? (
            <span className="ml-1 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </label>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-xs text-destructive">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ compact = false, purpose = "buyer" }: { compact?: boolean; purpose?: "buyer" | "supplier" }) {
  const [form, setForm] = useState<InquiryFormValues>(initialState);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formTopRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof InquiryFormValues, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNextStep = () => {
    const stepOneErrors = validateInquiryStepOne(form);
    if (Object.keys(stepOneErrors).length > 0) {
      setErrors(stepOneErrors);
      setStatus("error");
      setStatusMessage("Please complete all required contact details.");
      return;
    }
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
    setStep(2);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrevStep = () => {
    setStep(1);
    setStatus("idle");
    setStatusMessage("");
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "pending") return;

    const validation = validateInquiry(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      const stepOneErrors = validateInquiryStepOne(form);
      if (Object.keys(stepOneErrors).length > 0) setStep(1);
      setStatus("error");
      setStatusMessage("Please review the highlighted fields before sending.");
      return;
    }

    setStatus("pending");
    setStatusMessage("Submitting your requirement securely to the Harobal Foods trade desk…");
    setErrors({});

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-inquiry-token": generateClientToken(form.startedAt),
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      const payload = (await response.json()) as InquiryApiResponse;
      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? {});
        if (
          payload.errors &&
          ["fullName", "companyName", "email", "phone", "country"].some((key) => key in payload.errors!)
        ) {
          setStep(1);
        }
        setStatus("error");
        setStatusMessage(payload.message || "Could not submit inquiry. Please try again.");
        return;
      }

      setStatus("success");
      setReferenceId(payload.referenceId || "HRB-FOD-CONFIRMED");
      setStatusMessage(payload.message);
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
      setStatusMessage("Connection timed out. Please try again or reach our export desk directly.");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const copyRefId = () => {
    if (!referenceId) return;
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const activeIncotermDefinition = INCOTERMS_2020.find(
    (t) => t.code === (form.incoterm === "Other" ? form.otherIncoterm : form.incoterm),
  );

  return (
    <div ref={formTopRef} className="relative rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
      {/* Top Progress Bar */}
      {!compact && (
        <div className="mb-6 border-b border-border pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {step}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {step === 1 ? `Step 1: ${purpose === "supplier" ? "Supplier" : "Buyer"} Profile` : `Step 2: ${purpose === "supplier" ? "Supply Capacity & Product Details" : "Commodity Specs & Incoterms"}`}
              </span>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {step === 1 ? "Next: Specifications & Delivery Terms" : "Final Step"}
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
            <div
              className="h-full bg-gradient-to-r from-primary via-emerald-500 to-green-600 transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>
      )}

      {status === "success" ? (
        <div className="space-y-6 py-4 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Inquiry Registered
            </span>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Thank you, {form.fullName}
            </h3>
            <p className="mx-auto max-w-lg text-sm text-muted-foreground leading-relaxed">
              Your {purpose === "supplier" ? "supplier capability profile" : "commodity requirement brief"} for <strong>{form.companyName || "your entity"}</strong> has been registered with our trade desk. An acknowledgement receipt has been dispatched to <strong>{form.email}</strong>.
            </p>
          </div>

          {/* Reference Card */}
          <div className="mx-auto max-w-md rounded-xl border border-primary/20 bg-primary/5 p-4 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Your Tracking Reference ID
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-lg font-extrabold text-foreground">{referenceId}</span>
              <button
                type="button"
                onClick={copyRefId}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-accent"
              >
                <Copy className="size-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Our export specialists will verify batch availability, test certificates, and follow up within <strong>24 to 48 business hours</strong>.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setForm(initialState());
                setStep(1);
                setStatus("idle");
              }}
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="food-website-field">Leave blank</label>
            <input
              type="text"
              id="food-website-field"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website || ""}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>

          {/* STEP 1: BUYER PROFILE */}
          {(compact || step === 1) && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="fullName" label="Full Name" required error={errors.fullName}>
                  <input
                    type="text"
                    id="fullName"
                    autoComplete="name"
                    placeholder="e.g. Marcus Vance"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </FormField>

                <FormField id="companyName" label="Company / Entity" required error={errors.companyName}>
                  <input
                    type="text"
                    id="companyName"
                    autoComplete="organization"
                    placeholder="e.g. Vance Food Imports LLC"
                    value={form.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="email" label="Business Email" required error={errors.email}>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </FormField>

                <FormField id="phone" label="Direct Phone / WhatsApp" required error={errors.phone} hint="Include country code">
                  <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    placeholder="+971 50 000 0000"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </FormField>
              </div>

              <FormField id="country" label="Operating Country" required error={errors.country}>
                <select
                  id="country"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="">Select destination country…</option>
                  <optgroup label="Popular Trade Markets">
                    {popularTradeCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Countries (ISO 3166)">
                    {allCountries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </FormField>

              {!compact && (
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 rounded-xl px-6 font-semibold"
                  >
                    Continue to Commodity Specs
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: COMMODITY SPECS & INCOTERMS */}
          {(compact || step === 2) && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="category" label="Product Category" required error={errors.category}>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="">Select commodity category…</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="product" label="Specific Variety / Product" error={errors.product} hint="e.g. Turmeric Powder (3% Curcumin)">
                  <input
                    type="text"
                    id="product"
                    placeholder="e.g. Salem Turmeric, 1121 Basmati Rice"
                    value={form.product}
                    onChange={(e) => updateField("product", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </FormField>
              </div>

              {/* Dynamic Other Category */}
              {form.category === "Other" && (
                <FormField id="otherCategory" label="Specify Custom Category" required error={errors.otherCategory}>
                  <input
                    type="text"
                    id="otherCategory"
                    placeholder="Describe your specific commodity type"
                    value={form.otherCategory}
                    onChange={(e) => updateField("otherCategory", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </FormField>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="quantity" label="Approximate Quantity" error={errors.quantity} hint="e.g. 2x 20ft FCL or 50 MT">
                  <input
                    type="text"
                    id="quantity"
                    placeholder="e.g. 2x 20ft FCL / 50 MT"
                    value={form.quantity}
                    onChange={(e) => updateField("quantity", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </FormField>

                <FormField id="destinationPort" label="Destination Port / Terminal" error={errors.destinationPort} hint="Port of Discharge">
                  <input
                    type="text"
                    id="destinationPort"
                    placeholder="e.g. Jebel Ali, Rotterdam, Singapore Port"
                    value={form.destinationPort}
                    onChange={(e) => updateField("destinationPort", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Incoterms Selector with Modal Trigger */}
                <FormField
                  id="incoterm"
                  label="Preferred Incoterm® 2020"
                  error={errors.incoterm}
                  hint="Trade delivery terms"
                >
                  <div className="space-y-1.5">
                    <select
                      id="incoterm"
                      value={form.incoterm}
                      onChange={(e) => updateField("incoterm", e.target.value)}
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <option value="">Select Incoterm (Optional)…</option>
                      {incotermOptions.map((term) => (
                        <option key={term} value={term}>
                          {term}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => setTradeModalOpen(true)}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        <Scale className="size-3" />
                        Incoterms® 2020 Guide
                      </button>
                      {activeIncotermDefinition && (
                        <span className="truncate max-w-[200px] text-[11px] text-primary font-mono font-bold">
                          {activeIncotermDefinition.code}: {activeIncotermDefinition.category}
                        </span>
                      )}
                    </div>
                  </div>
                </FormField>

                <FormField id="packaging" label="Packaging Preference" error={errors.packaging}>
                  <select
                    id="packaging"
                    value={form.packaging}
                    onChange={(e) => updateField("packaging", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="">Select packaging preference…</option>
                    {packagingOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              {form.incoterm === "Other" && (
                <FormField id="otherIncoterm" label="Specify Delivery Terms" required error={errors.otherIncoterm}>
                  <input
                    type="text"
                    id="otherIncoterm"
                    placeholder="e.g. Delivered to Customs Bonded Warehouse"
                    value={form.otherIncoterm}
                    onChange={(e) => updateField("otherIncoterm", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  />
                </FormField>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="timeline" label="Procurement Timeline" error={errors.timeline}>
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="">Select target timeline…</option>
                    {timelineOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="source" label="Discovery Channel" error={errors.source} hint="How did you find us?">
                  <select
                    id="source"
                    value={form.source}
                    onChange={(e) => updateField("source", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="">Select discovery channel…</option>
                    {inquirySourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              {form.source === "Other" && (
                <FormField id="otherSource" label="Specify Discovery Channel" required error={errors.otherSource}>
                  <input
                    type="text"
                    id="otherSource"
                    placeholder="How did you hear about Harobal Foods?"
                    value={form.otherSource}
                    onChange={(e) => updateField("otherSource", e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  />
                </FormField>
              )}

              <FormField id="message" label="Quality Parameters, Testing &amp; Packaging Notes" required error={errors.message}>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Detail your specifications: crop year, moisture limit, purity, ASTA color value, aflatoxin thresholds, private labelling, or mandatory certificates (FSSAI/APEDA/Halal/Kosher/BRC)…"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </FormField>

              {/* Status & Action Buttons */}
              {status === "error" && statusMessage && (
                <div role="alert" className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                {!compact ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={status === "pending"}
                    className="inline-flex items-center gap-2 rounded-xl"
                  >
                    <ArrowLeft className="size-4" />
                    Back to Profile
                  </Button>
                ) : <div />}

                <Button
                  type="submit"
                  disabled={status === "pending"}
                  className="inline-flex items-center gap-2 rounded-xl px-7 font-bold shadow-lg shadow-primary/20"
                >
                  {status === "pending" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Submitting to Trade Desk…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      {purpose === "supplier" ? "Submit Supplier Profile" : "Submit Commodity Inquiry"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Trade & Incoterms Resource Modal */}
      <TradeResourceModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        onSelectIncoterm={(code) => updateField("incoterm", code)}
      />
    </div>
  );
}
