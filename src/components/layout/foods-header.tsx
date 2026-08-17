"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { foodsNav } from "@/content";
import { brand } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import { useFoodsQuoteRequest } from "@/providers/quote-request-provider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function DesktopNavDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground/88 transition-colors hover:text-primary"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open ? "rotate-180" : "")} />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-background p-1"
        >
          {items.map((item) => (
            <FoodsLink
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/88 transition-colors hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </FoodsLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FoodsHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useFoodsQuoteRequest();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl supports-backdrop-filter:bg-background/78">
      <div
        className="h-0.5 w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--food), color-mix(in srgb, var(--secondary) 75%, transparent), var(--accent))",
        }}
        aria-hidden
      />

      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <FoodsLink href="/" className="flex min-w-fit items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-mark.png" alt={brand.name} width={38} height={38} priority className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-heading text-base font-bold tracking-wide text-primary sm:text-lg">{brand.name}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Foods &amp; Agriculture</p>
          </div>
        </FoodsLink>

        <nav className="hidden items-center gap-6 lg:flex">
          {foodsNav.map((item) =>
            item.type === "dropdown" ? (
              <DesktopNavDropdown key={item.label} label={item.label} items={item.items} />
            ) : (
              <FoodsLink
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/88 transition-colors hover:text-primary"
              >
                {item.label}
              </FoodsLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={siteConfig.primarySiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2.5 py-2 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            Main site <ExternalLink className="size-3.5" />
          </a>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <FoodsLink href="/rfq">
              Send RFQ
              {count > 0 ? (
                <span
                  className={cn(
                    "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black/15 px-1.5 text-xs font-bold",
                  )}
                  aria-label={`${count} items in RFQ list`}
                >
                  {count}
                </span>
              ) : null}
            </FoodsLink>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-md border border-border p-2 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/96 lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {foodsNav.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label} className="rounded-xl border border-border bg-card p-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="mt-1">
                    {item.items.map((child) => (
                      <FoodsLink
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </FoodsLink>
                    ))}
                  </div>
                </div>
              ) : (
                <FoodsLink
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </FoodsLink>
              ),
            )}

            <div className="mt-2 grid gap-2 px-3 sm:grid-cols-2">
              <a
                href={siteConfig.primarySiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-primary"
              >
                Main site <ExternalLink className="size-4" />
              </a>
            </div>

            <div className="mt-2 px-3">
              <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <FoodsLink href="/rfq" onClick={() => setOpen(false)}>
                  Send RFQ {count > 0 ? `(${count})` : ""}
                </FoodsLink>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
