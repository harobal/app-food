# F4 — Catalogue and Product Experience Handoff

## Outcome

F4 completes the visual and interaction rollout for catalogue discovery and product-detail journeys while retaining all 750 validated catalogue records, 184 category-safe product families, and the URL-backed filter contract established in F2.

## Catalogue discovery

- Search, category, form, origin, certification, sort, and progressive-page state remain URL-backed and shareable.
- Desktop filtering uses a sticky, scan-friendly panel with bounded scrolling only for long option groups.
- Mobile filtering now uses a focused full-height sheet with backdrop dismissal, Escape handling, focus trapping/restoration, body scroll lock, live family count, and clear/show actions.
- Search and sort form one consolidated discovery toolbar.
- Result status exposes both family and matching-variant totals through a polite live region.
- Applied-filter chips remain individually removable.
- Empty state clearly explains recovery and resets the complete URL state.
- Progressive disclosure retains the 24-family initial render and URL-backed “show more” behavior.

## Family cards

- All nine catalogue categories use owned local media.
- Category-specific accent colors distinguish the system without changing semantic UI tokens.
- Cards use a larger, crop-safe visual field, restrained image motion, clearer category/variant hierarchy, concise form/grade/origin summaries, certification availability, detail navigation, and direct RFQ action.
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

Static generation remains appropriate: the final build generated 763 routes successfully, including all 750 product routes. No evidence justified replacing the predictable SSG model.

## Verification

- Catalogue contract: 750 valid records, no duplicate slugs.
- Family grouping: 184 families retaining all 750 variants.
- Media contract test: every catalogue category maps to an existing local WebP asset.
- Automated tests: 10/10 passed.
- Production build: 763 routes generated.
- Desktop catalogue QA: 1440×950, zero horizontal overflow and no remote card imagery.
- Mobile catalogue QA: 390×844, zero horizontal overflow; filter dialog fills the 844px viewport and locks background scroll.
- URL QA: selecting Cereals & Grains produced `?category=Cereals+%26+Grains` and 25 matching families.
- Empty/recovery QA: an unmatched query produced the designed empty state; reset restored 184 families and the clean catalogue URL.
- Product QA: representative Basmati detail rendered local optimized imagery, related products, responsive layout, and working RFQ state.

## Approval gate

F4 ends here. F5 should begin only after approval and will refine RFQ, inquiry, quality, logistics, services, suppliers, downloads, contact, loading, and not-found journeys.
