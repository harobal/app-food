export type FoodsQuoteItem = {
  slug: string;
  title: string;
  category: string;
  subCategory: string;
  form: string;
  grade: string;
  originState: string;
  quantity: string;
  notes: string;
  createdAt: number;
};

export type FoodsQuoteProductRef = Omit<
  FoodsQuoteItem,
  "quantity" | "notes" | "createdAt"
>;

export type QuoteRequestState = {
  hydrated: boolean;
  items: FoodsQuoteItem[];
};

export type QuoteRequestAction =
  | { type: "hydrate"; items: FoodsQuoteItem[] }
  | { type: "add"; product: FoodsQuoteProductRef; createdAt?: number }
  | { type: "remove"; slug: string }
  | { type: "setQuantity"; slug: string; quantity: string }
  | { type: "setNotes"; slug: string; notes: string }
  | { type: "clear" };
