"use client";

import { useMemo, useState } from "react";
import { Copy, Mail, MessageCircle, Trash2 } from "lucide-react";
import type { FoodsQuoteItem } from "@/types/types";
import { brand } from "@/content/site";
import { useFoodsQuoteRequest } from "@/providers/quote-request-provider";
import { FoodsLink } from "@/components/pages/foods-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildRfqMessage(items: FoodsQuoteItem[]) {
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

  lines.push("Quote details:");
  lines.push("- Destination country/port:");
  lines.push("- Incoterms (EXW/FOB/CIF/etc):");
  lines.push("- Target delivery window:");
  lines.push("- Packaging preference (bulk / retail / private label):");
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
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => buildRfqMessage(items), [items]);
  const subject = "RFQ | Harobal Foods";

  const mailtoHref = useMemo(() => {
    const to = brand.salesEmail || brand.email;
    const qs = new URLSearchParams({ subject, body: message });
    return `mailto:${to}?${qs.toString()}`;
  }, [message]);

  const whatsappHref = useMemo(() => {
    const number = (brand.whatsapp || "").replace("+", "");
    const qs = new URLSearchParams({ text: message });
    return `https://wa.me/${number}?${qs.toString()}`;
  }, [message]);

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

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{items.length} items in your RFQ</p>
            <p className="text-xs text-muted-foreground">Add quantities and notes, then send the generated RFQ.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={clear}>
            <Trash2 className="mr-2 size-4" /> Clear list
          </Button>
        </div>

        <div className="space-y-4">
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

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <Card className="elevated-card">
          <CardHeader>
            <CardTitle>Generated RFQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              readOnly
              value={message}
              rows={18}
              className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none"
            />

            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const ok = await copyToClipboard(message);
                  setCopied(ok);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
              >
                <Copy className="mr-2 size-4" /> {copied ? "Copied" : "Copy"}
              </Button>

              <Button asChild variant="outline">
                <a href={mailtoHref}>
                  <Mail className="mr-2 size-4" /> Email
                </a>
              </Button>

              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 sm:col-span-2">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 size-4" /> WhatsApp
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Tip: For foods, include destination port, packaging format, and required compliance certificates for accurate pricing.
            </p>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
