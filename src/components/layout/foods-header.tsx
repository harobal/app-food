"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Menu } from "lucide-react";
import { foodsNav } from "@/content";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import HarobalLogo from "@/brand/Logo";
import { useFoodsQuoteRequest } from "@/providers/quote-request-provider";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";

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
        className="inline-flex h-10 items-center gap-1 rounded-md px-4 text-sm font-medium text-foreground/88 transition-colors hover:bg-muted hover:text-primary"
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
          className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-md border border-border bg-background p-1 shadow-lg"
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/78">
      <div className="h-0.5 w-full bg-brand-gradient" aria-hidden />

      <div className="container-shell flex h-16 items-center justify-between gap-3">
        <FoodsLink href="/" className="flex min-w-fit items-center" onClick={() => setOpen(false)} aria-label="Harobal Foods home">
          <HarobalLogo variant="horizontal" size="sm" showDescriptor />
        </FoodsLink>

        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {foodsNav.map((item) =>
            item.type === "dropdown" ? (
              <DesktopNavDropdown key={item.label} label={item.label} items={item.items} />
            ) : (
              <FoodsLink
                key={item.href}
                href={item.href}
                className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium text-foreground/88 transition-colors hover:bg-muted hover:text-primary"
              >
                {item.label}
              </FoodsLink>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <a
            href={siteConfig.primarySiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-1 rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          >
            Main site <ExternalLink className="size-3.5" />
          </a>
          <Button asChild className="whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90">
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
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Menu className="size-6" />
        </button>
      </div>

      <MobileNavSheet open={open} onOpenChange={setOpen} label="Harobal Foods navigation">
          <div className="mt-6 flex flex-col space-y-6">
            <nav className="flex flex-col space-y-3">
            {foodsNav.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="mt-1 flex flex-col">
                    {item.items.map((child) => (
                      <FoodsLink
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted"
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
                  className="rounded-md px-3 py-2.5 text-lg font-medium transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </FoodsLink>
              ),
            )}
            </nav>

            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <a
                href={siteConfig.primarySiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-1 rounded-md border border-border bg-background px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                Main site <ExternalLink className="size-4" />
              </a>
              <Button asChild className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <FoodsLink href="/rfq" onClick={() => setOpen(false)}>
                  Send RFQ {count > 0 ? `(${count})` : ""}
                </FoodsLink>
              </Button>
            </div>
          </div>
      </MobileNavSheet>
    </header>
  );
}
