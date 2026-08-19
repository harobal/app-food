"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { brand, navItems } from "@/content/site";
import { APP_ROUTES } from "@/config/navigation";
import HarobalLogo from "@/brand/Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out border-border/40 bg-background/80 shadow-[0_4px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl supports-backdrop-filter:bg-background/70",
      )}
    >
      <div
        className={cn(
          "container-shell flex items-center justify-between gap-3 transition-[height,padding] duration-300 ease-out h-16 md:h-19",
        )}
      >
        <Link
          href="/"
          aria-label={brand.name}
          className={cn(
            "flex shrink-0 items-center rounded-xl px-2 py-1.5 transition-all duration-300 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ",
          )}
        >
          <span className="md:hidden">
            <HarobalLogo variant="horizontal" size="xs" showDescriptor={false} />
          </span>
            <span className="hidden md:inline-flex">
              <HarobalLogo variant="horizontal" size="md" showDescriptor />
            </span>
        </Link>

        
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>
        

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            size={"lg"}
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] rounded-full px-8",
            )}
          >
            <Link href={APP_ROUTES.CONTACT}>Get a Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border p-2 transition-colors lg:hidden",
          )}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-header-menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="site-header-menu" className="border-t border-border bg-background/96 backdrop-blur-xl lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center gap-2 px-3">
              <Button asChild className="flex-1">
                <Link href={APP_ROUTES.CONTACT} onClick={() => setOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
