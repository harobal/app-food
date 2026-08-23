"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, countryOptions, incotermOptions, inquirySourceOptions } from "@/content/site";
import { buildWhatsAppHref } from "@/lib/contact-links";
import { validateInquiry, validateInquiryStepOne } from "./validation";
import { inquiryCategories as categoryOptions, type InquiryApiResponse, type InquiryFieldErrors, type InquiryFormValues } from "./types";

const initialState = (): InquiryFormValues => ({
  fullName: "", companyName: "", email: "", phone: "", country: "", category: "", product: "", quantity: "", incoterm: "", message: "", source: "", website: "", startedAt: 0,
});

const controlClass = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15";

function Field({ id, label, error, required, children, className = "" }: { id: keyof InquiryFormValues; label: string; error?: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">{label}{required ? <span className="ml-1 text-destructive" aria-hidden>*</span> : null}</label>
      {children}
      {error ? <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-xs leading-5 text-destructive"><AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />{error}</p> : null}
    </div>
  );
}

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<InquiryFormValues>(initialState);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const whatsappHref = buildWhatsAppHref(brand.whatsapp);

  const update = <K extends keyof InquiryFormValues>(key: K, value: InquiryFormValues[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      startedAt: current.startedAt || Date.now(),
    }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const focusFirstError = (nextErrors: InquiryFieldErrors) => {
    requestAnimationFrame(() => {
      const key = Object.keys(nextErrors)[0];
      if (key) formRef.current?.querySelector<HTMLElement>(`#${key}`)?.focus();
    });
  };

  const continueToBrief = () => {
    const nextErrors = validateInquiryStepOne(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }
    setErrors({});
    setStep(2);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("#category")?.focus());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "pending") return;
    const validation = validateInquiry(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      const stepOneErrors = validateInquiryStepOne(form);
      if (Object.keys(stepOneErrors).length) setStep(1);
      setStatus("error");
      setStatusMessage("Review the highlighted fields before sending.");
      focusFirstError(validation.errors);
      return;
    }

    setStatus("pending");
    setStatusMessage("Sending your requirement securely…");
    setErrors({});
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form), signal: controller.signal });
      const payload = (await response.json()) as InquiryApiResponse;
      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? {});
        if (payload.errors && ["fullName", "companyName", "email", "phone", "country"].some((key) => key in payload.errors!)) setStep(1);
        setStatus("error");
        setStatusMessage(payload.message || "The inquiry could not be delivered.");
        focusFirstError(payload.errors ?? {});
        return;
      }
      setStatus("success");
      setStatusMessage(payload.message);
      setReferenceId(payload.referenceId ?? "");
      setForm(initialState());
      setStep(1);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof DOMException && error.name === "AbortError" ? "The request timed out. Please retry or use a direct contact option." : "The inquiry could not be delivered. Please retry or use a direct contact option.");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const textInput = (id: keyof InquiryFormValues, type = "text", placeholder = "") => (
    <input id={id} name={id} type={type} value={String(form[id])} onChange={(event) => update(id, event.target.value as never)} placeholder={placeholder} className={controlClass} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-error` : undefined} disabled={status === "pending"} />
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
      <input type="text" name="website" id="website" value={form.website} onChange={(event) => update("website", event.target.value)} tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] size-px opacity-0" aria-hidden />

      {!compact ? (
        <div className="space-y-3" aria-label={`Inquiry step ${step} of 2`}>
          <div className="grid grid-cols-2 gap-2" aria-hidden>{[1, 2].map((number) => <span key={number} className={`h-1.5 rounded-full transition-colors ${number <= step ? "bg-brand-signal" : "bg-muted"}`} />)}</div>
          <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.14em]"><span className="text-brand-primary dark:text-brand-signal">{step === 1 ? "Contact essentials" : "Requirement brief"}</span><span className="text-muted-foreground">{step} / 2</span></div>
        </div>
      ) : null}

      {(compact || step === 1) ? (
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">Contact essentials</legend>
          <Field id="fullName" label="Full name" error={errors.fullName} required>{textInput("fullName", "text", "Your full name")}</Field>
          <Field id="companyName" label="Company name" error={errors.companyName} required>{textInput("companyName", "text", "Your company")}</Field>
          <Field id="email" label="Business email" error={errors.email} required>{textInput("email", "email", "name@company.com")}</Field>
          <Field id="phone" label="Phone / WhatsApp" error={errors.phone} required>{textInput("phone", "tel", "+91 …")}</Field>
          <Field id="country" label="Country" error={errors.country} required className="sm:col-span-2">
            <select id="country" name="country" value={form.country} onChange={(event) => update("country", event.target.value)} className={controlClass} aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? "country-error" : undefined} disabled={status === "pending"}><option value="">Select country</option>{countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}</select>
          </Field>
        </fieldset>
      ) : null}

      {(compact || step === 2) ? (
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">Requirement brief</legend>
          <Field id="category" label="Product category" error={errors.category} required>
            <select id="category" name="category" value={form.category} onChange={(event) => update("category", event.target.value as InquiryFormValues["category"])} className={controlClass} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined} disabled={status === "pending"}><option value="">Select category</option>{categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}</select>
          </Field>
          <Field id="product" label="Specific product" error={errors.product}>{textInput("product", "text", "Example: turmeric powder, export grade")}</Field>
          <Field id="quantity" label="Approximate quantity" error={errors.quantity}>{textInput("quantity", "text", "Example: one container")}</Field>
          <Field id="incoterm" label="Preferred Incoterm" error={errors.incoterm}>
            <select id="incoterm" name="incoterm" value={form.incoterm} onChange={(event) => update("incoterm", event.target.value as InquiryFormValues["incoterm"])} className={controlClass} disabled={status === "pending"}><option value="">Not decided</option>{incotermOptions.map((term) => <option key={term} value={term}>{term}</option>)}</select>
          </Field>
          <Field id="source" label="How did you find us?" error={errors.source} className="sm:col-span-2">
            <select id="source" name="source" value={form.source} onChange={(event) => update("source", event.target.value as InquiryFormValues["source"])} className={controlClass} disabled={status === "pending"}><option value="">Select source</option>{inquirySourceOptions.map((source) => <option key={source} value={source}>{source}</option>)}</select>
          </Field>
          <Field id="message" label="Requirement details" error={errors.message} required className="sm:col-span-2">
            <textarea id="message" name="message" value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Share specifications, quantity, destination, timeline, packaging, and compliance needs." className={`${controlClass} min-h-36 resize-y`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} disabled={status === "pending"} />
            {!errors.message ? <p id="message-hint" className="text-xs text-muted-foreground">Minimum 20 characters. Do not include confidential payment information.</p> : null}
          </Field>
        </fieldset>
      ) : null}

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-muted-foreground">Submission is server-validated. Delivery is confirmed only after the configured trade-desk transport accepts it.</p>
        <div className="flex items-center justify-end gap-2">
          {!compact && step === 2 ? <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} disabled={status === "pending"}><ArrowLeft className="size-4" aria-hidden />Back</Button> : null}
          {!compact && step === 1 ? <Button type="button" size="lg" onClick={continueToBrief}>Continue<ArrowRight className="size-4" aria-hidden /></Button> : <Button type="submit" size="lg" disabled={status === "pending"}>{status === "pending" ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}{status === "pending" ? "Sending…" : "Send inquiry"}</Button>}
        </div>
      </div>

      {status !== "idle" ? (
        <div role={status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl border p-4 ${status === "success" ? "border-brand-signal/35 bg-brand-signal/10" : status === "error" ? "border-destructive/30 bg-destructive/8" : "border-border bg-muted/35"}`}>
          <div className="flex items-start gap-3">{status === "success" ? <CheckCircle2 className="mt-0.5 size-5 text-brand-signal" aria-hidden /> : status === "error" ? <AlertCircle className="mt-0.5 size-5 text-destructive" aria-hidden /> : <LoaderCircle className="mt-0.5 size-5 animate-spin text-brand-primary" aria-hidden />}<div><p className="text-sm font-semibold text-foreground">{statusMessage}</p>{referenceId ? <p className="mt-1 font-mono text-xs text-muted-foreground">Reference: {referenceId}</p> : null}</div></div>
          {status === "error" ? <div className="mt-4 flex flex-wrap gap-3"><a href={`mailto:${brand.salesEmail}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-signal"><Mail className="size-4" aria-hidden />Email trade desk</a>{whatsappHref ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-signal"><MessageCircle className="size-4" aria-hidden />WhatsApp</a> : null}</div> : null}
        </div>
      ) : null}
    </form>
  );
}
