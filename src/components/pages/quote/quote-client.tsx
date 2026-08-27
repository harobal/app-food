"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, FileCheck2, LoaderCircle, Mail, MessageCircle, PackageCheck, Scale, Trash2 } from "lucide-react";
import type { FoodsQuoteItem } from "@/features/quote-request";
import { allCountries, brand, incotermOptions, packagingOptions, timelineOptions, INCOTERMS_2020 } from "@/content/site";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { generateClientToken } from "@/features/inquiry/security";
import { validateInquiry } from "@/features/inquiry/validation";
import type { InquiryApiResponse, InquiryFormValues } from "@/features/inquiry/types";
import { FoodsLink } from "@/components/pages/foods-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeResourceModal } from "@/components/trade/trade-resource-modal";

const fieldClass = "mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none transition placeholder:text-muted-foreground/65 focus:border-primary/50 focus:ring-2 focus:ring-primary/15";

function RfqField({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return <label className="block text-xs font-bold"><span className="flex items-center justify-between gap-2"><span>{label}{required ? <span className="text-accent"> *</span> : null}</span>{hint ? <span className="text-[10px] font-normal text-muted-foreground">{hint}</span> : null}</span>{children}</label>;
}

type RfqBuyer = { fullName: string; companyName: string; email: string; phone: string; country: string; destinationPort: string; incoterm: string; otherIncoterm: string; packaging: string; timeline: string; consent: boolean };

function buildRfqMessage(items: FoodsQuoteItem[], buyer: RfqBuyer) {
  const lines: string[] = [];
  lines.push("Hello Harobal Foods Team,", "");
  lines.push("I would like a quotation for the following items:", "");

  items.forEach((item, idx) => {
    lines.push(`${idx + 1}. ${item.title || item.slug}`);
    if (item.category) lines.push(`   - Category: ${item.category}`);
    if (item.subCategory) lines.push(`   - Sub-category: ${item.subCategory}`);
    if (item.form) lines.push(`   - Form: ${item.form}`);
    if (item.grade) lines.push(`   - Grade: ${item.grade}`);
    if (item.originState) lines.push(`   - Origin (India): ${item.originState}`);

    lines.push(`   - Quantity: ${item.quantity || "(please specify)"}`);
    if (item.notes?.trim()) lines.push(`   - Notes: ${item.notes.trim()}`);

    lines.push("");
  });

  lines.push("Commercial brief:");
  lines.push(`- Destination: ${[buyer.destinationPort, buyer.country].filter(Boolean).join(", ") || "To be aligned"}`);
  lines.push(`- Incoterm® 2020: ${buyer.incoterm === "Other" ? buyer.otherIncoterm || "Custom terms to be aligned" : buyer.incoterm || "To be aligned"}`);
  lines.push(`- Target delivery window: ${buyer.timeline || "To be aligned"}`);
  lines.push(`- Packaging preference: ${buyer.packaging || "To be aligned"}`);
  lines.push("- Required certifications (if any):");
  lines.push("- Sampling & inspection expectations:");
  lines.push("");
  lines.push("Please confirm MOQ, lead time, and documentation requirements for the destination market.");

  return lines.join("\n");
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function FoodsQuoteClient() {
  const { items, hydrated, setQuantity, setNotes, removeItem, clear } = useFoodsQuoteRequest();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [clearArmed, setClearArmed] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [buyer, setBuyer] = useState<RfqBuyer>({ fullName: "", companyName: "", email: "", phone: "", country: "", destinationPort: "", incoterm: "", otherIncoterm: "", packaging: "", timeline: "", consent: false });

  const message = useMemo(() => buildRfqMessage(items, buyer), [items, buyer]);
  const activeIncoterm = INCOTERMS_2020.find((term) => term.code === buyer.incoterm);
  const subject = "RFQ | Harobal Foods";

  const mailtoHref = useMemo(() => {
    const to = brand.salesEmail || brand.email;
    const qs = new URLSearchParams({ subject, body: message });
    return `mailto:${to}?${qs.toString()}`;
  }, [message]);

  const whatsappHref = useMemo(() => {
    const number = (brand.whatsapp || "").replace(/\D/g, "");
    if (!number) return null;
    const qs = new URLSearchParams({ text: message });
    return `https://wa.me/${number}?${qs.toString()}`;
  }, [message]);

  const updateBuyer = (field: keyof typeof buyer, value: string | boolean) => {
    setBuyer((current) => ({ ...current, [field]: value }));
    if (submitStatus === "error") { setSubmitStatus("idle"); setSubmitMessage(""); }
  };

  const submitRfq = async () => {
    if (submitStatus === "pending") return;
    const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)));
    const payload: InquiryFormValues = {
      ...buyer,
      submissionType: "rfq",
      category: categories.length === 1 ? categories[0]! : "Mixed / Other",
      product: items.map((item) => item.title).join(", ").slice(0, 180),
      quantity: `${items.length} consolidated RFQ line ${items.length === 1 ? "item" : "items"}`,
      source: "Direct / Web Search",
      message: message.slice(0, 3000),
      website: "",
      startedAt,
    };
    const validation = validateInquiry(payload);
    if (!validation.ok) {
      setSubmitStatus("error");
      setSubmitMessage(Object.values(validation.errors)[0] ?? "Review the required buyer details before submitting.");
      return;
    }
    setSubmitStatus("pending");
    setSubmitMessage("Sending your consolidated brief to the food trade desk…");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json", "x-inquiry-token": generateClientToken(startedAt) }, body: JSON.stringify(payload) });
      const result = (await response.json()) as InquiryApiResponse;
      if (!response.ok || !result.ok) {
        setSubmitStatus("error");
        setSubmitMessage(result.message || "Online submission is unavailable. Use the email fallback below.");
        return;
      }
      setReferenceId(result.referenceId ?? "HRB-FOD-CONFIRMED");
      setSubmitStatus("success");
      setSubmitMessage(result.message);
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("The trade desk connection could not be reached. Your RFQ remains available for email or copy.");
    }
  };

  if (!hydrated) {
    return (
      <Card className="elevated-card">
        <CardContent className="p-6 text-sm text-muted-foreground">Loading your RFQ list…</CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="elevated-card">
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-lg font-semibold">Your RFQ list is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Browse the catalogue and add items to request a consolidated quote.</p>
          </div>
          <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <FoodsLink href="/catalog">Browse catalogue</FoodsLink>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (submitStatus === "success") {
    return (
      <section className="overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-[0_24px_70px_rgba(19,47,42,.12)]">
        <div className="grid lg:grid-cols-[.82fr_1.18fr]">
          <div className="bg-primary p-7 text-primary-foreground sm:p-9">
            <div className="flex size-12 items-center justify-center rounded-full bg-white/12"><CheckCircle2 className="size-7" /></div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-white/65">Submission complete</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Your RFQ is registered.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/72">The food trade desk has received your buyer profile, shipment terms and {items.length} requested {items.length === 1 ? "product" : "products"}.</p>
            <div className="mt-7 rounded-2xl border border-white/15 bg-white/8 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/55">RFQ reference</p>
              <p className="mt-2 font-mono text-xl font-bold tracking-wide">{referenceId}</p>
              <p className="mt-2 text-xs leading-5 text-white/60">A detailed receipt has been sent to {buyer.email}. Use this reference in follow-up messages.</p>
            </div>
          </div>

          <div className="p-7 sm:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-primary">What happens next</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Desk review", "We check specifications, availability and export requirements."],
                ["02", "Clarification", "A coordinator contacts you if commercial details are incomplete."],
                ["03", "Quotation", "You receive applicable pricing, MOQ, lead time and documentation."],
              ].map(([step, title, copy]) => <div key={step} className="rounded-2xl border border-border bg-muted/25 p-4"><span className="font-mono text-xs font-bold text-accent">{step}</span><p className="mt-3 text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p></div>)}
            </div>

            <div className="mt-6 rounded-2xl border border-border p-5">
              <div className="flex items-start gap-3"><FileCheck2 className="mt-0.5 size-5 text-primary" /><div><p className="text-sm font-bold">Submitted brief</p><p className="mt-1 text-xs text-muted-foreground">{items.length} {items.length === 1 ? "line item" : "line items"} · {buyer.incoterm || "Incoterm to be aligned"} · {buyer.destinationPort || buyer.country}</p></div></div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={async () => { const ok = await copyToClipboard(referenceId); setCopyStatus(ok ? "copied" : "error"); }}><Copy className="size-4" />{copyStatus === "copied" ? "Reference copied" : "Copy reference"}</Button>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-[#d9a748]"><a href={`mailto:${brand.salesEmail}?subject=${encodeURIComponent(`RFQ follow-up · ${referenceId}`)}`}><Mail className="size-4" />Add information</a></Button>
              <Button asChild variant="ghost"><FoodsLink href="/catalog">Continue browsing <ArrowRight className="size-4" /></FoodsLink></Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4 lg:sticky lg:top-24 lg:flex lg:h-[min(760px,calc(100svh-7rem))] lg:min-h-[560px] lg:flex-col lg:overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 lg:shrink-0">
          <div>
            <p className="text-sm font-semibold">{items.length} {items.length === 1 ? "item" : "items"} in your RFQ</p>
            <p className="text-xs text-muted-foreground">Add quantities and notes, then send the generated RFQ.</p>
          </div>
          <Button type="button" variant={clearArmed ? "destructive" : "outline"} size="sm" onClick={() => { if (!clearArmed) { setClearArmed(true); window.setTimeout(() => setClearArmed(false), 4000); return; } clear(); setClearArmed(false); }}>
            <Trash2 className="mr-2 size-4" /> {clearArmed ? "Confirm clear" : "Clear list"}
          </Button>
        </div>

        <div className="space-y-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-3 lg:[scrollbar-gutter:stable]">
          {items.map((item) => (
            <Card key={item.slug} className="elevated-card">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold leading-snug">{item.title || item.slug}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.category ? <Badge variant="outline">{item.category}</Badge> : null}
                      {item.form ? <Badge variant="outline">{item.form}</Badge> : null}
                      {item.grade ? <Badge variant="outline">{item.grade}</Badge> : null}
                      {item.originState ? <Badge variant="outline">{item.originState}</Badge> : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <FoodsLink href={`/catalog/${item.slug}`}>View</FoodsLink>
                    </Button>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeItem(item.slug)}>
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Quantity</span>
                    <input
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.slug, e.target.value)}
                      placeholder="e.g., 2,000 kg / 1 x 20' container / 10 pallets"
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Notes</span>
                    <textarea
                      value={item.notes}
                      onChange={(e) => setNotes(item.slug, e.target.value)}
                      placeholder="Destination market, incoterms, packaging preference, required certs, target specs."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <Card className="overflow-hidden border-primary/15 shadow-[0_18px_50px_rgba(19,47,42,.1)]">
          <CardHeader>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">Buyer &amp; shipment brief</p>
            <CardTitle>Submit this RFQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <>
              <div className="rounded-2xl border border-border bg-muted/18 p-4">
                <div className="mb-4 flex items-center gap-2"><span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span><p className="text-xs font-bold uppercase tracking-[.14em]">Buyer details</p></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RfqField label="Full name" required><input autoComplete="name" value={buyer.fullName} onChange={(event) => updateBuyer("fullName", event.target.value)} className={fieldClass} /></RfqField>
                  <RfqField label="Company" required><input autoComplete="organization" value={buyer.companyName} onChange={(event) => updateBuyer("companyName", event.target.value)} className={fieldClass} /></RfqField>
                  <RfqField label="Business email" required><input type="email" autoComplete="email" value={buyer.email} onChange={(event) => updateBuyer("email", event.target.value)} className={fieldClass} /></RfqField>
                  <RfqField label="Phone / WhatsApp" required><input type="tel" autoComplete="tel" placeholder="Include country code" value={buyer.phone} onChange={(event) => updateBuyer("phone", event.target.value)} className={fieldClass} /></RfqField>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/18 p-4">
                <div className="mb-4 flex items-center gap-2"><span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span><p className="text-xs font-bold uppercase tracking-[.14em]">Destination &amp; delivery</p></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RfqField label="Operating country" required><select value={buyer.country} onChange={(event) => updateBuyer("country", event.target.value)} className={fieldClass}><option value="">Select country</option>{allCountries.map((country) => <option key={country} value={country}>{country}</option>)}</select></RfqField>
                  <RfqField label="Destination port" hint="Optional"><input placeholder="e.g. Jebel Ali" value={buyer.destinationPort} onChange={(event) => updateBuyer("destinationPort", event.target.value)} className={fieldClass} /></RfqField>
                </div>
                <div className="mt-4">
                  <div className="flex items-end justify-between gap-3"><p className="text-xs font-bold">Preferred Incoterm® 2020</p><span className="text-[10px] text-muted-foreground">Trade delivery terms · Optional</span></div>
                  <select value={buyer.incoterm} onChange={(event) => updateBuyer("incoterm", event.target.value)} className={fieldClass}>
                    <option value="">Select Incoterm (Optional)…</option>
                    {incotermOptions.map((term) => <option key={term} value={term}>{term}</option>)}
                  </select>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => setTradeModalOpen(true)} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary underline-offset-4 hover:underline"><Scale className="size-3.5" />Incoterms® 2020 guide</button>
                    {activeIncoterm ? <span className="max-w-[230px] truncate font-mono text-[10px] font-bold text-primary">{activeIncoterm.code}: {activeIncoterm.category}</span> : null}
                  </div>
                  {buyer.incoterm === "Other" ? <RfqField label="Specify delivery terms" required><input value={buyer.otherIncoterm} onChange={(event) => updateBuyer("otherIncoterm", event.target.value)} placeholder="e.g. Delivered to bonded warehouse" className={fieldClass} /></RfqField> : null}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <RfqField label="Packaging"><select value={buyer.packaging} onChange={(event) => updateBuyer("packaging", event.target.value)} className={fieldClass}><option value="">To be aligned</option>{packagingOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></RfqField>
                  <RfqField label="Procurement timeline"><select value={buyer.timeline} onChange={(event) => updateBuyer("timeline", event.target.value)} className={fieldClass}><option value="">To be aligned</option>{timelineOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></RfqField>
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-xl bg-muted/45 p-3 text-xs leading-5 text-muted-foreground"><input type="checkbox" checked={buyer.consent} onChange={(event) => updateBuyer("consent", event.target.checked)} className="mt-1 size-4 accent-primary" />I agree that Harobal may use these details to respond to this RFQ.</label>
              {submitMessage ? <p role={submitStatus === "error" ? "alert" : "status"} className={submitStatus === "error" ? "flex gap-2 rounded-lg bg-destructive/8 p-3 text-xs text-destructive" : "text-xs text-muted-foreground"}>{submitStatus === "error" ? <AlertCircle className="size-4 shrink-0" /> : null}{submitMessage}</p> : null}
              <Button type="button" className="w-full bg-accent text-accent-foreground hover:bg-[#d9a748]" onClick={submitRfq} disabled={submitStatus === "pending"}>{submitStatus === "pending" ? <LoaderCircle className="size-4 animate-spin" /> : <PackageCheck className="size-4" />}{submitStatus === "pending" ? "Submitting RFQ…" : "Submit consolidated RFQ"}</Button>
            </>

            <details className="group rounded-xl border border-border bg-background"><summary className="cursor-pointer list-none px-4 py-3 text-sm font-bold">Preview generated message</summary><textarea readOnly value={message} rows={12} className="w-full resize-none border-t border-border bg-transparent px-4 py-3 text-xs leading-5 text-foreground outline-none" /></details>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const ok = await copyToClipboard(message);
                  setCopyStatus(ok ? "copied" : "error");
                  window.setTimeout(() => setCopyStatus("idle"), 2200);
                }}
              >
                <Copy className="mr-2 size-4" /> {copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Copy failed" : "Copy"}
              </Button>

              <Button asChild variant="outline">
                <a href={mailtoHref}>
                  <Mail className="mr-2 size-4" /> Email
                </a>
              </Button>

              {whatsappHref ? (
                <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 sm:col-span-2">
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 size-4" /> WhatsApp
                  </a>
                </Button>
              ) : null}
            </div>

            <p className="sr-only" aria-live="polite">{copyStatus === "copied" ? "RFQ copied to clipboard." : copyStatus === "error" ? "RFQ could not be copied." : ""}</p>

            <p className="text-xs text-muted-foreground">
              Tip: For foods, include destination port, packaging format, and required compliance certificates for accurate pricing.
            </p>
          </CardContent>
        </Card>
      </aside>
      <TradeResourceModal isOpen={tradeModalOpen} onClose={() => setTradeModalOpen(false)} onSelectIncoterm={(code) => updateBuyer("incoterm", code)} />
    </div>
  );
}
