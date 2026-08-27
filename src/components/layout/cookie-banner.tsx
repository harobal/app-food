"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "harobal-cookie-consent";
const CONSENT_CHANGE_EVENT = "harobal-consent-change";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CONSENT_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CONSENT_CHANGE_EVENT, listener);
  };
}

export function CookieBanner() {
  const acknowledged = useSyncExternalStore(
    subscribe,
    () => Boolean(window.localStorage.getItem(CONSENT_KEY)),
    () => true,
  );
  const show = !acknowledged;

  useEffect(() => {
    document.documentElement.toggleAttribute("data-cookie-banner", show);
    return () => document.documentElement.removeAttribute("data-cookie-banner");
  }, [show]);

  if (!show) return null;

  return (
    <aside aria-label="Site storage notice" className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-xl border border-border bg-card/96 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-5">
      <p className="text-sm leading-6 text-muted-foreground">This site stores a small preference locally so it can remember your choices. Analytics tracking is not enabled.</p>
      <div className="mt-3 flex shrink-0 justify-end sm:mt-0"><Button type="button" onClick={() => { window.localStorage.setItem(CONSENT_KEY, "acknowledged"); window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT)); }}>Understood</Button></div>
    </aside>
  );
}
