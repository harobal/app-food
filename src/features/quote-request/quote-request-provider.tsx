"use client";

import * as React from "react";
import { parseStoredQuote, QUOTE_STORAGE_KEY, serializeStoredQuote } from "./persistence";
import { initialQuoteRequestState, quoteRequestReducer } from "./reducer";
import type { FoodsQuoteProductRef } from "./types";

type QuoteRequestContextValue = {
  items: ReturnType<typeof parseStoredQuote>;
  hydrated: boolean;
  count: number;
  announcement: string;
  addItem: (product: FoodsQuoteProductRef) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: string) => void;
  setNotes: (slug: string, notes: string) => void;
  clear: () => void;
};

const QuoteRequestContext = React.createContext<QuoteRequestContextValue | null>(null);

export function FoodsQuoteRequestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(quoteRequestReducer, initialQuoteRequestState);
  const [announcement, setAnnouncement] = React.useState("");

  React.useEffect(() => {
    dispatch({
      type: "hydrate",
      items: parseStoredQuote(window.localStorage.getItem(QUOTE_STORAGE_KEY)),
    });
  }, []);

  React.useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(QUOTE_STORAGE_KEY, serializeStoredQuote(state.items));
    } catch {
      // Persistence is an enhancement; the in-memory request remains usable.
    }
  }, [state.hydrated, state.items]);

  const value = React.useMemo<QuoteRequestContextValue>(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      count: state.items.length,
      announcement,
      addItem: (product) => {
        dispatch({ type: "add", product });
        setAnnouncement(`${product.title} added to the RFQ.`);
      },
      removeItem: (slug) => {
        const item = state.items.find((candidate) => candidate.slug === slug);
        dispatch({ type: "remove", slug });
        setAnnouncement(`${item?.title ?? "Product"} removed from the RFQ.`);
      },
      setQuantity: (slug, quantity) => dispatch({ type: "setQuantity", slug, quantity }),
      setNotes: (slug, notes) => dispatch({ type: "setNotes", slug, notes }),
      clear: () => {
        dispatch({ type: "clear" });
        setAnnouncement("RFQ list cleared.");
      },
    }),
    [announcement, state.hydrated, state.items],
  );

  return (
    <QuoteRequestContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </QuoteRequestContext.Provider>
  );
}

export function useFoodsQuoteRequest() {
  const context = React.useContext(QuoteRequestContext);
  if (!context) {
    throw new Error("useFoodsQuoteRequest must be used within FoodsQuoteRequestProvider");
  }
  return context;
}
