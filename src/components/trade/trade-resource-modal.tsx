"use client";

import { useEffect, useRef } from "react";
import { Globe, Scale, X } from "lucide-react";
import { IncotermsMatrix } from "./incoterms-matrix";
import { TradePortals } from "./trade-portals";

export function TradeResourceModal({
  isOpen,
  onClose,
  onSelectIncoterm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectIncoterm?: (term: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    if (isOpen) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("button")?.focus());
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      if (isOpen) restoreFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Shell */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="trade-resource-title"
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Scale className="size-4.5" />
            </div>
            <div>
              <h3 id="trade-resource-title" className="text-base font-bold text-foreground">
                Incoterms® 2020 &amp; Food Export Compliance Standards
              </h3>
              <p className="text-xs text-muted-foreground">
                Official international commercial terms and verified APEDA / FSSAI export standards.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <IncotermsMatrix
            onSelectTerm={(code) => {
              if (onSelectIncoterm) onSelectIncoterm(code);
              onClose();
            }}
          />

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Globe className="size-4 text-primary" />
              Verified Agri-Food Standards &amp; Export Development Portals
            </h4>
            <TradePortals />
          </div>
        </div>
      </div>
    </div>
  );
}
