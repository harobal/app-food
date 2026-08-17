"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("harobal-cookie-consent");
  });

  if (!show) return null;

  const accept = () => {
    window.localStorage.setItem("harobal-cookie-consent", "accepted");
    setShow(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 shadow-lg">
      <p className="text-sm text-muted-foreground">
        We use cookies to improve experience, measure performance, and support inquiry analytics.
      </p>
      <div className="mt-3 flex justify-end">
        <Button onClick={accept}>Accept</Button>
      </div>
    </div>
  );
}
