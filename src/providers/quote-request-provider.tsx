"use client";

import * as React from "react";
import type { FoodsQuoteItem, FoodsQuoteProductRef } from "@/types/types";

type FoodsQuoteRequestContextValue = {
  items: FoodsQuoteItem[];
  hydrated: boolean;
  count: number;
  addItem: (product: FoodsQuoteProductRef) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: string) => void;
  setNotes: (slug: string, notes: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "harobal-foods-quote-request";

const FoodsQuoteRequestContext = React.createContext<FoodsQuoteRequestContextValue | null>(null);

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : Date.now();
}

function safeParseItems(raw: string | null): FoodsQuoteItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        const slug = safeString(item?.slug);
        if (!slug) return null;

        const title = safeString(item?.title) || slug;

        return {
          slug,
          title,
          category: safeString(item?.category),
          subCategory: safeString(item?.subCategory),
          form: safeString(item?.form),
          grade: safeString(item?.grade),
          originState: safeString(item?.originState),
          quantity: safeString(item?.quantity),
          notes: safeString(item?.notes),
          createdAt: safeNumber(item?.createdAt),
        } satisfies FoodsQuoteItem;
      })
      .filter((item): item is FoodsQuoteItem => Boolean(item));
  } catch {
    return [];
  }
}

function dedupeBySlug(items: FoodsQuoteItem[]) {
  const map = new Map<string, FoodsQuoteItem>();
  for (const item of items) {
    if (!map.has(item.slug)) {
      map.set(item.slug, item);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.createdAt - b.createdAt);
}

type State = {
  hydrated: boolean;
  items: FoodsQuoteItem[];
};

type Action =
  | { type: "hydrate"; items: FoodsQuoteItem[] }
  | { type: "add"; product: FoodsQuoteProductRef }
  | { type: "remove"; slug: string }
  | { type: "setQuantity"; slug: string; quantity: string }
  | { type: "setNotes"; slug: string; notes: string }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate": {
      return {
        hydrated: true,
        items: dedupeBySlug(action.items),
      };
    }
    case "add": {
      if (state.items.some((item) => item.slug === action.product.slug)) return state;

      return {
        ...state,
        items: dedupeBySlug([
          ...state.items,
          {
            ...action.product,
            quantity: "",
            notes: "",
            createdAt: Date.now(),
          },
        ]),
      };
    }
    case "remove": {
      return {
        ...state,
        items: state.items.filter((item) => item.slug !== action.slug),
      };
    }
    case "setQuantity": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.slug ? { ...item, quantity: action.quantity } : item,
        ),
      };
    }
    case "setNotes": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.slug ? { ...item, notes: action.notes } : item,
        ),
      };
    }
    case "clear": {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function FoodsQuoteRequestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    hydrated: false,
    items: [],
  });

  React.useEffect(() => {
    dispatch({ type: "hydrate", items: safeParseItems(window.localStorage.getItem(STORAGE_KEY)) });
  }, []);

  React.useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore persistence failures (private mode, storage quotas, etc.)
    }
  }, [state.hydrated, state.items]);

  const value = React.useMemo<FoodsQuoteRequestContextValue>(() => {
    return {
      items: state.items,
      hydrated: state.hydrated,
      count: state.items.length,
      addItem: (product) => dispatch({ type: "add", product }),
      removeItem: (slug) => dispatch({ type: "remove", slug }),
      setQuantity: (slug, quantity) => dispatch({ type: "setQuantity", slug, quantity }),
      setNotes: (slug, notes) => dispatch({ type: "setNotes", slug, notes }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.hydrated, state.items]);

  return <FoodsQuoteRequestContext.Provider value={value}>{children}</FoodsQuoteRequestContext.Provider>;
}

export function useFoodsQuoteRequest() {
  const context = React.useContext(FoodsQuoteRequestContext);
  if (!context) {
    throw new Error("useFoodsQuoteRequest must be used within FoodsQuoteRequestProvider");
  }
  return context;
}
