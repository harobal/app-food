# F2 — Food Architecture and Design-System Foundation Handoff

Status: Complete; awaiting F2 approval  
Project: `app-food`  
Date: 2026-08-20

## 1. Outcome

F2 establishes a tested, feature-owned foundation for the large food catalogue, quote request, and inquiry systems while proving the Harvest Meridian visual direction with owned no-human media.

The phase deliberately does not redesign every route. F3 remains the shell/homepage rollout, F4 the complete catalogue/product experience, F5 the conversion/supporting-page rollout, and F6 release hardening.

## 2. Delivered architecture

```text
src/
  app/
    api/inquiries/route.ts
    catalog/
  components/
    layout/
    pages/
    ui/
  features/
    catalog/
      components/
      data/
      domain/
      selectors/
    inquiry/
    quote-request/
  config/
  content/
  lib/
  types/
tests/
```

### Catalogue ownership

- `features/catalog/data/catalog.ts`: server-only ingestion, normalization, mapping, and caching.
- `features/catalog/data/validate.ts`: runtime boundary validation for every raw record.
- `features/catalog/data/media.ts`: explicit owned-media mapping rather than image logic hidden in UI.
- `features/catalog/domain/types.ts`: raw, product, compact variant, family, filter, and validation contracts.
- `features/catalog/selectors/catalog-selectors.ts`: pure query parsing, serialization, filtering, grouping, sorting, and option derivation.
- `features/catalog/components/`: catalogue orchestration and family-card UI.

### Quote-request ownership

- Versioned storage envelope: version 2.
- Legacy array storage remains readable.
- Invalid JSON and invalid entries recover to a safe empty collection.
- Duplicate slugs are removed deterministically.
- Reducer logic is pure and tested.
- Add/remove/clear changes publish accessible live announcements.
- The provider owns browser persistence; UI components depend only on the feature contract.

### Inquiry ownership

- Food-specific category contract replaces copied portfolio-wide categories.
- Client and server use the same validation.
- Inputs have stable IDs/names, error associations, required/invalid semantics, and focus-first-error behavior.
- Honeypot and timing checks provide a basic spam boundary.
- `POST /api/inquiries` enforces JSON/content size, validates server-side, rate-limits, detects recent duplicates, and delegates delivery.
- Delivery is adapter-based through `INQUIRY_WEBHOOK_URL` and optional token.
- Without a configured adapter, the endpoint returns an honest 503. The interface never claims capture or acceptance.
- Verified email remains available as the fallback.

## 3. Catalogue data contract

The build now fails if the catalogue contains invalid root data, missing required values, non-positive shelf life/lead time, unsafe slugs, duplicate IDs, or duplicate slugs.

Validated production data:

- 750 records;
- 750 unique IDs;
- 750 unique route-safe slugs;
- 0 validation issues;
- 9 categories;
- 13 forms;
- 10 origin states.

### Family model

The original 750 records contain 183 unique display titles. A title-only merge is unsafe because Garlic exists in both Fresh Vegetables and Spices & Herbs. Category/subcategory-safe grouping therefore yields **184 families** while retaining all 750 variants and all existing URLs.

The client receives compact variant records inside families rather than repeating family title, category, summary, and media fields for every variant.

## 4. URL-backed catalogue contract

The URL is now the source of truth:

| State | Query parameter |
| --- | --- |
| Search | `q` |
| Category | `category` |
| Form | `form` |
| Origin | `origin` |
| Certification | `cert` |
| Sort | `sort` |
| Incremental page | `page` |

Behavior verified in the production browser:

- Header navigation from an already-open catalogue updates the selected category and results.
- `Fresh Fruits` resolves to 10 families / 30 variants.
- Search/filter state is shareable and removable.
- Clear/reset returns to 184 families / 750 variants.
- Empty queries produce a dedicated explanation and reset action.
- Initial rendering is 24 families; “Show 24 more” changes the URL to `page=2` and displays 48.
- Applied filters have explicit accessible removal labels.
- Result totals are announced through a live region.

## 5. Performance evidence

Desktop production-browser comparison at 1440px:

| Measure | F1 baseline | F2 | Change |
| --- | ---: | ---: | ---: |
| Initially rendered product links/cards | 750 | 24 | −96.8% |
| DOM nodes | 25,072 | about 1,100 | −95.6% |
| Document scroll height | 181,949px | about 5,700px | −96.9% |
| Hydrated outer HTML | about 7.12 MB | about 0.69 MB | −90.3% |
| Built catalogue HTML | 662,595 bytes | 529,009 bytes | −20.2% |
| Built catalogue RSC | 567,265 bytes | 449,727 bytes | −20.7% |

Responsive browser review at 360, 390, 768, 1024, and 1440px found no horizontal overflow. The initial result count remained 24 at every width.

The RSC payload still carries all compact variants so filters work immediately. F4 will evaluate server pagination, indexed search, or a slimmer client index against deployment constraints before changing that trade-off.

## 6. Harvest Meridian foundation

Implemented foundation tokens/patterns:

- existing forest, leaf, harvest, warm-canvas, and semantic surface tokens retained;
- explicit fast/base/slow motion durations and branded easing;
- reusable interactive lift and media-backdrop contracts;
- global `prefers-reduced-motion` behavior;
- controlled gradient use remains confined to atmospheric surfaces and selected emphasis;
- catalogue hero uses a full-bleed owned image with a text-safe overlay;
- catalogue cards use wide category context rather than identical short product thumbnails.

Representative owned media:

- `public/media/harvest-meridian/foods-export-hero.webp`
- `public/media/harvest-meridian/spices-herbs.webp`

Full prompts, constraints, sizes, and provenance are recorded in `docs/F2_MEDIA_PROVENANCE.md`.

## 7. Accessibility and trust fixes

- Mobile navigation now focuses the close action when opened, traps Tab within the sheet, supports Escape, restores focus to the trigger, and restores body scrolling.
- Catalogue filter/results changes are announced.
- Filter removal actions have explicit accessible labels.
- Inquiry validation is associated with the correct controls and moves focus to errors.
- Inquiry pending, error, accepted, copy, quote-add, remove, and clear states have truthful semantics.
- Placeholder phone and WhatsApp numbers were removed from public output.
- Phone/WhatsApp render only when verified public environment values exist.
- The unused cookie banner was removed because no optional analytics/cookie behavior currently justifies its claim.
- The missing advertised RFQ CSV now exists at `public/downloads/harobal-foods-rfq-template.csv`.
- Product metadata now includes form, grade, and origin to reduce duplicate titles without changing catalogue facts.
- Metadata base/Open Graph ownership now uses the food-domain URL.

## 8. Removed legacy/copy-owned code

Active imports were migrated before deletion. F2 removed:

- legacy `components/features` inquiry implementation;
- legacy catalogue client under `components/pages/catalog`;
- global quote provider under `providers`;
- ambiguous `services/catalog.ts` and `types/types.ts`;
- unused generic corporate `site-header`;
- unused copied divisions, operations, trust, markets, insights, domain details, and corporate navigation content;
- unused cookie banner.

The remaining project-wide `types/site.ts` now owns only the navigation contract actually used by the food application.

## 9. Tooling and tests

`package.json` now includes:

- `typecheck`
- `test`
- `check`

Automated coverage contains 9 passing tests:

1. all 750 records satisfy the runtime contract;
2. URL query parse/serialize behavior;
3. family grouping retains all variants;
4. duplicate/missing-field validation failures;
5. advertised RFQ template existence;
6. food inquiry acceptance and normalization;
7. invalid category and bot-timing rejection;
8. quote reducer behavior;
9. legacy/versioned persistence recovery.

Final quality results:

| Gate | Result |
| --- | --- |
| TypeScript | Clean |
| ESLint | Clean |
| Tests | 9/9 passing |
| Production build | Pass |
| Generated routes | 763 including the inquiry API and 750 product paths |

## 10. Content preservation

- All 750 raw records and slugs remain unchanged.
- Existing page purposes and business copy remain unchanged except for trust/accuracy corrections approved by F1.
- No certification, test, origin, MOQ, lead-time, shelf-life, or availability fact was invented or silently rewritten.
- No unverified phone/WhatsApp detail is displayed.
- The generated images contain no text or human entities and do not make facility/certification claims.

## 11. Deferred by design

These are scheduled, not forgotten:

- F3: complete shell and homepage redesign plus wider no-human visual set.
- F4: full category media rollout, product detail variant navigation, related products, mobile filter-sheet composition, and remaining payload strategy.
- F5: buyer/shipment RFQ submission, supplier-specific onboarding, supporting-page redesign, and download library metadata.
- F6: sitemap/robots/structured data, canonical/indexing strategy, full media/data checks, and release crawl.
- Business review: sensitive fresh shelf-life and other commercial claims remain flagged.
- Operations: inquiry transport remains deliberately unconfigured until an authorized endpoint is supplied.
- Legacy remote media outside the Spices & Herbs prototype remains placeholder-only until F4.

## 12. F2 approval gate

Approval confirms:

- the feature-owned architecture and common contract alignment with `app-main`;
- the 184-family / 750-variant catalogue model;
- the URL-backed and incremental catalogue behavior;
- the no-human, owned/local, background-led media contract;
- the optional verified-contact and truthful inquiry-delivery model;
- progression to F3 global shell and homepage redesign.
