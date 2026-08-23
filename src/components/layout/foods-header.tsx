"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { foodsNav } from "@/content";
import { Button } from "@/components/ui/button";
import { FoodsLink } from "@/components/pages/foods-link";
import HarobalLogo from "@/brand/Logo";
import { useFoodsQuoteRequest } from "@/features/quote-request";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";

function DesktopNavDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
  active?: boolean;
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
        className={cn(
          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "inline-flex items-center gap-1",
          active || open
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform duration-200", open ? "rotate-180" : "")} />
        {(active || open) && (
          <span
            aria-hidden
            className="absolute inset-x-3 -bottom-[0.82rem] h-0.5 rounded-full bg-brand-signal"
          />
        )}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-2 grid w-[34rem] grid-cols-2 gap-1 rounded-xl border border-border bg-background p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
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
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 shadow-[0_1px_0_rgba(10,34,51,0.03)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="hidden border-b border-border/65 bg-brand-ink text-white md:block">
          <div className="container-shell flex h-8 items-center justify-between text-[11px] font-semibold tracking-wide text-white/72">
            <span>Food &amp; agriculture export sourcing • India to global markets</span>
            <span>Quote-led catalogue • Buyer-aligned specifications</span>
          </div>
        </div>
        <div className="h-1 w-full bg-brand-gradient" aria-hidden />

        <div className="container-shell flex h-16 items-center justify-between gap-5">
          <FoodsLink 
            href="/" 
            className="inline-flex shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4" 
            onClick={() => setOpen(false)} 
            aria-label="Harobal Foods home"
          >
            <span className="md:hidden">
              <HarobalLogo variant="horizontal" size="xs" showDescriptor />
            </span>
            <span className="hidden md:inline-flex">
              <HarobalLogo variant="horizontal" size="sm" showDescriptor />
            </span>
          </FoodsLink>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {foodsNav.map((item) => {
              if (item.type === "dropdown") {
                const isChildActive = item.items.some((child) => pathname.startsWith(child.href));
                return (
                  <DesktopNavDropdown 
                    key={item.label} 
                    label={item.label} 
                    items={item.items} 
                    active={isChildActive} 
                  />
                );
              }

              const active = isRouteActive(item.href);

              return (
                <FoodsLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-[0.82rem] h-0.5 rounded-full bg-brand-signal"
                    />
                  )}
                </FoodsLink>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Button variant="ghost" size="sm" asChild>
              <a
                href={siteConfig.primarySiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Main site
                <ExternalLink aria-hidden className="size-3.5 ml-1" />
              </a>
            </Button>
            <Button size="sm" asChild className="whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90">
              <FoodsLink href="/rfq">
                Send RFQ
                {count > 0 ? (
                  <span
                    className={cn(
                      "ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black/15 px-1.5 text-xs font-bold",
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
            aria-label={open ? "Close site navigation" : "Open site navigation"}
            aria-expanded={open}
            aria-controls="foods-mobile-navigation"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </header>

      <MobileNavSheet 
        id="foods-mobile-navigation"
        open={open} 
        onOpenChange={setOpen} 
        label="Harobal Foods navigation"
      >
        <div className="border-b border-border pb-6 pr-12">
          <HarobalLogo variant="horizontal" size="sm" showDescriptor />
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col gap-1 py-6">
          <FoodsLink
            href="/"
            onClick={() => setOpen(false)}
            aria-current={pathname === "/" ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
              pathname === "/" && "bg-muted text-brand-primary font-semibold",
            )}
          >
            Home
          </FoodsLink>

          {foodsNav.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label} className="py-2">
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
                <div className="mt-1 flex flex-col gap-1">
                  {item.items.map((child) => (
                    <FoodsLink
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted",
                        pathname.startsWith(child.href) && "bg-muted text-brand-primary font-semibold",
                      )}
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
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                  isRouteActive(item.href) && "bg-muted text-brand-primary font-semibold",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </FoodsLink>
            ),
          )}
        </nav>

        <div className="space-y-3 border-t border-border pt-6 mt-auto">
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <FoodsLink href="/rfq" onClick={() => setOpen(false)}>
              Send RFQ {count > 0 ? `(${count})` : ""}
            </FoodsLink>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a
              href={siteConfig.primarySiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit Harobal main site
              <ExternalLink aria-hidden className="size-4 ml-1" />
            </a>
          </Button>
        </div>
      </MobileNavSheet>
    </>
  );
}
