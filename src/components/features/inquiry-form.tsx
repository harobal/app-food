"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  categoryOptions,
  countryOptions,
  incotermOptions,
  inquirySourceOptions,
} from "@/content/site";
import { validateInquiry } from "./validation";
import type { InquiryFieldErrors, InquiryFormValues } from "./types";

const initialState: InquiryFormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  category: "",
  product: "",
  quantity: "",
  incoterm: "",
  message: "",
  source: "",
};

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<InquiryFormValues>(initialState);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const containerClass = useMemo(
    () =>
      compact
        ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2",
    [compact],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateInquiry(form);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    // This uses client-side validation only until API integration is added.
    setSent(true);
    setForm(initialState);
    setErrors({});
    setStep(1);
  };

  const fieldClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const canGoNext =
    form.fullName.trim().length > 0 &&
    form.companyName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.phone.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {!compact ? (
        <div className="space-y-3">
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: step === 1 ? "50%" : "100%" }}
              aria-hidden
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step {step} of 2 {step === 1 ? "- Contact Details" : "- Requirement Brief"}
          </p>
        </div>
      ) : null}

      {compact ? (
        <>
          <div className={containerClass}>
            <label className="space-y-1">
              <span className="text-sm font-medium">Full Name *</span>
              <input
                className={fieldClass}
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Your full name"
              />
              {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Company Name *</span>
              <input
                className={fieldClass}
                value={form.companyName}
                onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                placeholder="Your company"
              />
              {errors.companyName ? <p className="text-xs text-destructive">{errors.companyName}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Email *</span>
              <input
                type="email"
                className={fieldClass}
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="name@company.com"
              />
              {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Phone / WhatsApp *</span>
              <input
                className={fieldClass}
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+91..."
              />
              {errors.phone ? <p className="text-xs text-destructive">{errors.phone}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Country *</span>
              <select
                className={fieldClass}
                value={form.country}
                onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
              >
                <option value="">Select country</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country ? <p className="text-xs text-destructive">{errors.country}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium">Product Category *</span>
              <select
                className={fieldClass}
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value as InquiryFormValues["category"] }))
                }
              >
                <option value="">Select category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category ? <p className="text-xs text-destructive">{errors.category}</p> : null}
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-sm font-medium">Requirement Summary *</span>
            <textarea
              className={`${fieldClass} min-h-28`}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Share product, quantity, destination market, and timeline"
            />
            {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
          </label>
        </>
      ) : (
        <>
          {step === 1 ? (
            <div className={containerClass}>
              <label className="space-y-1">
                <span className="text-sm font-medium">Full Name *</span>
                <input
                  className={fieldClass}
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Your full name"
                />
                {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Company Name *</span>
                <input
                  className={fieldClass}
                  value={form.companyName}
                  onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Your company"
                />
                {errors.companyName ? <p className="text-xs text-destructive">{errors.companyName}</p> : null}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Email *</span>
                <input
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                />
                {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium">Phone / WhatsApp *</span>
                <input
                  className={fieldClass}
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91..."
                />
                {errors.phone ? <p className="text-xs text-destructive">{errors.phone}</p> : null}
              </label>

              <label className="space-y-1 sm:col-span-2">
                <span className="text-sm font-medium">Country *</span>
                <select
                  className={fieldClass}
                  value={form.country}
                  onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                >
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country ? <p className="text-xs text-destructive">{errors.country}</p> : null}
              </label>
            </div>
          ) : (
            <>
              <div className={containerClass}>
                <label className="space-y-1">
                  <span className="text-sm font-medium">Product Category *</span>
                  <select
                    className={fieldClass}
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, category: e.target.value as InquiryFormValues["category"] }))
                    }
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category ? <p className="text-xs text-destructive">{errors.category}</p> : null}
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium">Specific Product</span>
                  <input
                    className={fieldClass}
                    value={form.product}
                    onChange={(e) => setForm((prev) => ({ ...prev, product: e.target.value }))}
                    placeholder="Example: Black galaxy granite"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium">Approximate Quantity</span>
                  <input
                    className={fieldClass}
                    value={form.quantity}
                    onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="Example: 1 container"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-sm font-medium">Preferred Incoterm</span>
                  <select
                    className={fieldClass}
                    value={form.incoterm}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, incoterm: e.target.value as InquiryFormValues["incoterm"] }))
                    }
                  >
                    <option value="">Select incoterm</option>
                    {incotermOptions.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 sm:col-span-2">
                  <span className="text-sm font-medium">How did you find us?</span>
                  <select
                    className={fieldClass}
                    value={form.source}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, source: e.target.value as InquiryFormValues["source"] }))
                    }
                  >
                    <option value="">Select source</option>
                    {inquirySourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-1 block">
                <span className="text-sm font-medium">Detailed Requirements *</span>
                <textarea
                  className={`${fieldClass} min-h-32`}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Share product specifications, standards, destination port, and target timeline"
                />
                {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
              </label>
            </>
          )}
        </>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Your inquiry is validated and captured in the current prototype flow.</p>
        {!compact ? (
          <div className="flex items-center gap-2">
            {step === 2 ? (
              <Button type="button" variant="outline" className="h-10 px-4 text-sm" onClick={() => setStep(1)}>
                Back
              </Button>
            ) : null}
            {step === 1 ? (
              <Button type="button" className="h-10 px-6 text-sm font-semibold" disabled={!canGoNext} onClick={() => setStep(2)}>
                Continue
              </Button>
            ) : (
              <Button type="submit" className="h-10 px-6 text-sm font-semibold">
                Send Inquiry
              </Button>
            )}
          </div>
        ) : (
          <Button type="submit" className="h-10 px-6 text-sm font-semibold">
            Send Inquiry
          </Button>
        )}
      </div>

      {sent ? (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
          Thanks. Your inquiry has been captured and our team will respond within 24 hours.
        </p>
      ) : null}
    </form>
  );
}
