"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileNavSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  label?: string;
};

export function MobileNavSheet({ open, onOpenChange, children, label = "Site navigation" }: MobileNavSheetProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] xl:hidden">
      <button type="button" className="absolute inset-0 bg-foreground/10 backdrop-blur-xs" aria-label="Close navigation" onClick={() => onOpenChange(false)} />
      <div role="dialog" aria-modal="true" aria-label={label} className="absolute inset-y-0 right-0 flex w-3/4 max-w-sm flex-col overflow-y-auto border-l border-border bg-background p-6 text-foreground shadow-2xl">
        <button type="button" className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close navigation" onClick={() => onOpenChange(false)}>
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
