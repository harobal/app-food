import { dedupeQuoteItems } from "./persistence.ts";
import type { QuoteRequestAction, QuoteRequestState } from "./types.ts";

export const initialQuoteRequestState: QuoteRequestState = {
  hydrated: false,
  items: [],
};

export function quoteRequestReducer(
  state: QuoteRequestState,
  action: QuoteRequestAction,
): QuoteRequestState {
  switch (action.type) {
    case "hydrate":
      return { hydrated: true, items: dedupeQuoteItems(action.items) };
    case "add":
      if (state.items.some((item) => item.slug === action.product.slug)) return state;
      return {
        ...state,
        items: dedupeQuoteItems([
          ...state.items,
          {
            ...action.product,
            quantity: "",
            notes: "",
            createdAt: action.createdAt ?? Date.now(),
          },
        ]),
      };
    case "remove":
      return { ...state, items: state.items.filter((item) => item.slug !== action.slug) };
    case "setQuantity":
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.slug ? { ...item, quantity: action.quantity } : item,
        ),
      };
    case "setNotes":
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.slug ? { ...item, notes: action.notes } : item,
        ),
      };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}
