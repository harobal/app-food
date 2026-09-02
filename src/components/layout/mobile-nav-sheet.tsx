"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");
const emptySubscribe = () => () => undefined;

type MobileNavSheetProps = {
  id?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  label?: string;
  className?: string;
};

export function MobileNavSheet({
  id,
  open,
  onOpenChange,
  children,
  label = "Site navigation",
  className,
}: MobileNavSheetProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const inertSiblings = Array.from(document.body.children).filter(
      (element) => element !== panelRef.current?.parentElement,
    );

    for (const element of inertSiblings) {
      element.setAttribute("inert", "");
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.removeEventListener("keydown", onKeyDown);
      for (const element of inertSiblings) {
        element.removeAttribute("inert");
      }
      restoreFocusRef.current?.focus();
    };
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] xl:hidden touch-none overscroll-contain" data-mobile-navigation>
      <button
        type="button"
        className="absolute inset-0 animate-in fade-in bg-brand-ink/35 backdrop-blur-sm duration-200"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={() => onOpenChange(false)}
        onTouchMove={(e) => e.preventDefault()}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] animate-in flex-col overflow-y-auto border-l border-border bg-background p-6 text-foreground shadow-2xl slide-in-from-right duration-300 overscroll-contain touch-pan-y [scrollbar-width:thin]",
          className,
        )}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close navigation"
          onClick={() => onOpenChange(false)}
        >
          <X className="size-5" aria-hidden />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
