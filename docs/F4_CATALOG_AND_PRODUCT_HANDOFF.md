# F4 — Catalogue and Product Experience Handoff

## Outcome

F4 completes the visual and interaction rollout for catalogue discovery and product-detail journeys while retaining all 750 validated catalogue records, 184 category-safe product families, and the URL-backed filter contract established in F2.

## Catalogue discovery

- Search, category, form, origin, certification, sort, and progressive-page state remain URL-backed and shareable.
- The catalogue begins with a compact, trade-oriented overview showing the family, exact-specification, and category inventory instead of repeating a generic marketing hero.
- Search is debounced, includes an immediate clear control, and shares one action surface with mobile filters and the live RFQ count.
- A horizontally scrollable quick-category rail supports fast high-level browsing without replacing the complete multi-select filter model.
- Desktop filtering uses a viewport-bounded sticky panel with one independent scroll area, keeping its header, reset action, and guidance visible while making every filter reachable.
- Filter sections are collapsible, expose selected-state badges, and show the number of matching product families beside every option.
- Mobile filtering now uses a focused full-height sheet with backdrop dismissal, Escape handling, focus trapping/restoration, body scroll lock, live family count, and clear/show actions.
- Grid and list views are user-switchable without changing catalogue state.
- Result status exposes both family and matching-variant totals through a polite live region.
- Applied-filter chips remain individually removable.
- Empty state clearly explains recovery and resets the complete URL state.
- Catalogue results use URL-backed pagination with 12 families per page, compact page numbers, previous/next controls, a visible result range, and automatic normalization of invalid page values.

## Family cards

- All nine catalogue categories use owned local media.
- Category-specific accent colors distinguish the system without changing semantic UI tokens.
- Cards use a larger, crop-safe visual field, restrained image motion, clearer category/variant hierarchy, concise form/origin summaries, certification availability, detail navigation, and direct RFQ action.
- Buyers must choose an exact form, grade, and origin combination before adding an item. Detail links and RFQ state update to that selected variant, eliminating the former implicit first-variant behavior.
- Grid cards use consistent desktop content regions for titles, summaries, metadata, selectors, certifications, and actions; mobile removes those artificial minimum heights to stay compact.
- Specification controls use width-safe labels, a dedicated chevron, and selected form/origin metadata. The primary RFQ action spans the card width and the secondary detail action is separated to prevent clipping at three-column widths.
- RFQ actions are reversible on the card, and a desktop summary bar provides a direct continuation into quantities, notes, and shipment details. Mobile uses the integrated toolbar action to avoid content obstruction.
- Images are decorative within cards because the product and category names already provide the accessible link context.

## Product detail

- Product title, variant, form, grade, origin, and category are integrated into a large editorial hero.
- Local category media is served through Next Image optimization with descriptive alternative text.
- A visible truthfulness note clarifies that category art is sourcing context and that product appearance, crop, and packaging vary by batch/specification.
- MOQ, lead time, and shelf-life are elevated as key commercial facts.
- Specifications use a scan-friendly definition grid.
- Quality parameters, safety-test scope, certification availability, and use cases have differentiated content structures.
- RFQ actions and the buyer request checklist remain sticky on wide screens.
- Related product families provide category-continuation discovery without inventing recommendations.

## Rendering strategy

Static generation remains appropriate: the final build generated 768 pages successfully, including all 750 product paths. No evidence justified replacing the predictable SSG model.

## Verification

- Catalogue contract: 750 valid records, no duplicate slugs.
- Family grouping: 184 families retaining all 750 variants.
- Media contract test: every catalogue category maps to an existing local WebP asset.
- Automated tests: 25/25 passed.
- Production build: 768 pages generated.
- Desktop catalogue QA: 1440×1000, responsive two-column working area, readable sticky filters, hidden category scrollbar, and no remote card imagery.
- Mobile catalogue QA: 390×844, compact inventory header, single-column action hierarchy, unobstructed content, and a full-height filter dialog with background scroll lock.
- URL QA: selecting Spices & Herbs produced `?category=Spices+%26+Herbs` and 49 matching families; adding `q=turmeric` reduced the result to two families.
- Variant/RFQ QA: selecting the Premium Basmati specification changed the detail target to the Premium slug, added that exact variant, exposed the one-item RFQ state, and allowed removal.
- View QA: grid/list controls update their pressed state without resetting filters or the selected RFQ items.
- Filter-scroll QA: the 900px desktop viewport reaches Origin and Certification sections through the panel scrollbar without moving the catalogue column.
- Pagination QA: `?category=Spices+%26+Herbs&page=2` rendered exactly 12 cards, reported families 13–24 of 49, and preserved the category when moving to page 3.
- Card QA: three-column cards align without clipped actions; selecting Wheat Flour updates the selected form metadata and keeps the origin visible; the 375px mobile layout has no horizontal overflow.
- Empty/recovery QA: an unmatched query produced the designed empty state; reset restored 184 families and the clean catalogue URL.
- Product QA: representative Basmati detail rendered local optimized imagery, related products, responsive layout, and working RFQ state.

## Approval gate

F4 ends here. F5 should begin only after approval and will refine RFQ, inquiry, quality, logistics, services, suppliers, downloads, contact, loading, and not-found journeys.
