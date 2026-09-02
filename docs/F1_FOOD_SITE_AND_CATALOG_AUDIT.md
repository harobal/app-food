# F1 — Harobal Foods Site and Catalogue Audit

Status: Complete; awaiting F1 approval  
Project: `app-food`  
Audit date: 2026-08-20  
Design direction: **Harvest Meridian**

## 1. Decision summary

The site has a credible brand base, a structurally consistent 750-record catalogue, useful RFQ persistence, and clean responsive containment. It is not production-ready in its present form.

The highest-risk findings are:

1. The Contact and Suppliers forms report successful capture without transmitting or storing an inquiry.
2. The only advertised CSV download does not exist and opens the 404 page.
3. Public phone and WhatsApp links use obvious placeholder numbers.
4. The catalogue renders all 750 product cards at once: the built `/catalog` HTML is 662,595 bytes, its RSC payload is 567,265 bytes, and the hydrated page measured about 7.12 MB of HTML with 25,000+ DOM nodes.
5. Catalogue query parameters are read only on first mount. Selecting a category from the header while already on `/catalog` changes the URL but leaves all 750 results visible.
6. The 750 variant records produce only 183 unique display titles. 738 records belong to duplicate-title groups; generated descriptions are almost entirely repeated.
7. Product media is not product-specific. Thirty URL references resolve to only 27 remote Unsplash assets, reused algorithmically across all 750 products.
8. Lint fails on catalogue state initialization and has one unused-import warning. There is no automated test or complete quality-gate script.

### F1 recommendation

Proceed to F2 with the following approved direction:

- preserve all raw catalogue records and existing product slugs;
- make catalogue discovery family-first and variant-aware instead of presenting hundreds of nearly identical cards;
- make filters, search, sort, and pagination URL-backed;
- use owned, optimized, no-human imagery as atmospheric backgrounds, wide editorial media, and selective product/category proof—not the same short image box on every section;
- vary page composition by business purpose while keeping one design system;
- remove deceptive success states and placeholder contact actions before any public release;
- retain existing business copy unless a factual claim is unsafe, duplicated for SEO, copied from another domain, or needs a small clarity/accessibility correction.

## 2. Audit scope and evidence

### Routes reviewed

All static routes were inspected in the production build and browser:

- `/`
- `/catalog`
- `/contact`
- `/downloads`
- `/logistics`
- `/quality`
- `/rfq`
- `/services`
- `/suppliers`
- global loading state
- global 404 state
- invalid product route

The production build generated 762 pages: 10 visible application/static boundaries plus 750 catalogue detail paths and framework boundaries.

### Catalogue coverage

The full JSON dataset was validated, not sampled. Browser detail-page coverage included every:

- category: 9 of 9;
- form: 13 of 13;
- origin state: 10 of 10;
- certification family;
- missing-HS-code edge case;
- fresh and shelf-stable content pattern.

Twenty-five representative product routes were opened in the browser. All resolved to product detail pages with the expected record-specific specification set.

### Responsive coverage

Home, catalogue, contact, RFQ, and a representative product page were reviewed at 360, 390, 768, 1024, and 1440 CSS pixels.

- No horizontal content overflow was found at the tested widths.
- Header switching and general stacking work.
- The catalogue becomes impractically long: about 464,000 px at 360 px wide, 232,000 px at 768 px, and 182,000 px at 1440 px.
- The mobile filter treatment is an inline accordion rather than a focused filter sheet; it lacks a persistent result summary and apply/close workflow.

### Build and tooling evidence

| Gate | Result |
| --- | --- |
| TypeScript (`tsc --noEmit`) | Pass |
| ESLint | Fail: one error, one warning |
| Production build | Pass |
| Generated pages | 762 |
| Static generation | 762 pages in about 70 seconds after compilation/data collection |
| Unit tests | None configured |
| Interaction tests | None configured |
| `check` aggregate script | Missing |

Lint findings:

- `catalog-client.tsx`: synchronous state updates inside an effect (`react-hooks/set-state-in-effect`).
- `mobile-nav-sheet.tsx`: unused `cn` import.

## 3. Catalogue data audit

### Structural integrity

| Measure | Result |
| --- | ---: |
| Records | 750 |
| Unique IDs | 750 |
| Unique slugs | 750 |
| Unsafe route slugs | 0 |
| Mixed field types | 0 |
| Missing IDs/slugs/core taxonomy | 0 |
| Records with optional variant blank | 624 |
| Records with HS-code hint blank | 42 |
| Origin country | India for all 750 |
| Shelf-life range | 1–24 months |
| Lead-time range | 7–35 days |

Category distribution:

| Category | Records |
| --- | ---: |
| Spices & Herbs | 321 |
| Pulses & Lentils | 96 |
| Nuts & Dry Fruits | 81 |
| Cereals & Grains | 75 |
| Dehydrated & Processed | 54 |
| Oilseeds & Oils | 48 |
| Fresh Fruits | 30 |
| Fresh Vegetables | 30 |
| Sweeteners | 15 |

### Data risks requiring domain review

- The dataset is mechanically variant-heavy. Only 183 unique display titles represent 750 records.
- There are 171 duplicate display-title groups; the largest has 12 records.
- 738 records sit inside a duplicate-title group.
- Only two unique `notes` values exist; one value is repeated 732 times.
- Product summaries reduce to two generic patterns: fresh vs shelf-stable.
- Examples such as Alphonso mango display a three-month shelf-life. All 60 fresh records use 1–3 **months**, which is commercially sensitive and should be reviewed by a food/logistics specialist before publication.
- Certification, MOQ, lead-time, shelf-life, seasonality, and test statements are phrased as available/typical/program-dependent, but they remain commercial claims. They need a documented source-of-truth owner.
- HS values are explicitly hints and are sometimes broad chapter-level codes. They must not be presented as customs advice.

No catalogue facts will be silently rewritten during implementation. F2 should introduce validation and provenance/status fields; content changes that alter a commercial claim require approval.

## 4. Functional audit

| Journey | Current result | Decision |
| --- | --- | --- |
| Text search | Works; `turmeric` returned 15 records | Keep logic, add URL state and debounce |
| Multi-filter | Category + form filtering works; `Spices & Herbs` + `Powder` returned 144 | Keep selector semantics, rebuild state/UI |
| Sort | Featured and title A–Z work | Refine; URL-back sort and define featured ordering |
| Filter chips | Individual removal works | Keep behavior; add accessible names/live result count |
| Clear/reset | Works and returns to 750 records | Keep behavior; synchronize URL/history |
| Empty result | Shows `0 results` and Reset All, but no explanatory empty-state content | Rebuild state |
| Header category navigation | URL changes but filters do not update when already on catalogue | Fix in F2/F4 |
| Product detail | Routes, specs, badges, gallery, and RFQ action resolve | Refine hierarchy, media truth, variant identity, related products |
| Add/remove RFQ | Works | Keep and harden |
| RFQ persistence | Quantity and notes persist across navigation/reload | Keep with versioned schema and recovery |
| RFQ copy | Works and changes to `Copied` | Keep; add live announcement and failure state |
| RFQ email | Correctly composes a mailto message | Keep as fallback |
| RFQ WhatsApp | Composes a message but targets placeholder number | Disable until configured |
| Contact inquiry | Client validation works; no request is sent | Rebuild transport and truthful states |
| Supplier inquiry | Reuses buyer inquiry form; no request is sent | Rebuild as supplier-specific flow |
| Download | Advertised CSV is absent and returns 404 | Fix before release |
| Loading | Branded loader exists | Refine and add route-specific skeletons |
| 404 | Works visually | Fix title duplication and copy/style consistency |

### Trust-critical content defects

- `+91 90000 00000` and `+919000000000` are exposed in footer, floating WhatsApp, and generated RFQ links.
- The form states “captured” and promises a response within 24 hours even though nothing leaves the browser.
- The Suppliers page requests supplier content but uses the same generic portfolio categories as the buyer form.
- The inquiry product placeholder says “Black galaxy granite,” copied from the stones domain.
- The cookie banner claims performance measurement and inquiry analytics although no matching analytics implementation was found.
- The 404 document title renders as `... | Harobal Foods | Harobal Foods` because both page metadata and the root template append the brand.

## 5. UX and visual-system audit

### What is working

- Deep green, leaf green, harvest gold, warm canvas, and restrained borders create a suitable food-export base.
- The home hero has clear hierarchy and a strong catalogue/RFQ split.
- Controlled gradients are already concentrated in the hero, header accent, footer, and selected actions.
- Typography, spacing primitives, container width, and CTA styling are generally consistent.
- Product cards expose category, form, origin, and certification cues useful to buyers.
- Responsive layouts contain content without horizontal overflow.

### What needs refinement

- Quality, Logistics, and Services share the same heading-plus-six-card composition and are visually interchangeable.
- Contact, Suppliers, and Downloads also rely on plain card grids with little domain-specific storytelling.
- Many sections are vertically repetitive: heading, grid of equal cards, footer.
- Product pages place a large media rectangle above descriptive content, but the image is remote, sometimes visibly unavailable, and not reliably product-accurate.
- Cards use strong image strips even when the image is a category placeholder rather than the named product.
- Motion is minimal and does not yet explain state, route change, RFQ addition, filtering, or progressive disclosure.
- Dark tokens exist without an intentional exposed theme behavior.
- The catalogue’s utility design is overwhelmed by the number of cards and repeated titles.

### Approved page-composition direction

The redesign should use one design language with distinct page archetypes:

| Page | Composition direction |
| --- | --- |
| Home | Editorial full-bleed crop/commodity hero; category discovery; proof strip; sourcing flow; origin/logistics story; RFQ close |
| Catalogue | Calm utility surface; family-first results; sticky desktop rail; mobile filter sheet; incremental results |
| Product detail | Wide contextual media background; compact trade identity; variant selector; spec table; packaging/quality bands; sticky RFQ action |
| Quality | Laboratory/instrument atmosphere without people; traceability flow; test/document checkpoints; certification caveats |
| Logistics | Port/container/cold-chain background; route timeline; responsibility and document map |
| Services | Alternating workflow bands rather than identical cards; clear inputs/outputs |
| Suppliers | Field/produce/packhouse atmosphere without people; qualification path; supplier-specific application |
| Downloads | Compact resource library with file status, format, size, and last updated date |
| Contact | Focused conversion page with contact-channel confidence, response expectations, and real submission states |
| RFQ | Procurement workspace rather than generic cards; line-item editing, buyer/shipment details, review, submit/fallback |
| Loading/404 | Lightweight branded state aligned with the food system and correct metadata |

## 6. Media audit and approved image strategy

### Current state

- Catalogue media contains 30 URL references but only 27 unique remote Unsplash URLs.
- Images are assigned by category and slug hash, not by product identity.
- Each product receives one reused hero plus two rotated reused gallery images.
- CSS backgrounds bypass Next image optimization, responsive source selection, intrinsic sizing, and meaningful alt text.
- Browser inspection showed a product hero rendering as a neutral/empty gradient when the remote asset did not arrive.
- Existing media must be treated as placeholder-only, not as publishable product evidence.

### Approved no-human policy

Every generated or selected image must exclude:

- people, faces, hands, bodies, silhouettes, reflections of people, mannequins, or human-shaped figures;
- visible brands, unverifiable certificates, readable private labels, or facility claims;
- imagery that misrepresents grade, variety, origin, processing, packaging, or certification.

### F2/F3 media foundation

Create an owned, local, optimized image library with HD source masters and responsive AVIF/WebP derivatives:

1. One brand hero: export commodities arranged as a premium still life with field/route atmosphere.
2. Nine category scenes: accurate ingredient/material groupings, composed as wide backgrounds with safe text zones.
3. Quality scene: clean lab instruments, sealed samples, batch labels without real company claims and without people.
4. Logistics scenes: refrigerated container, pallets, port/route context, cold-chain monitoring devices—no people.
5. Supplier scene: fields, harvest crates, packhouse geometry, produce detail—no people.
6. Contact/RFQ scene: packaging samples, specification sheets, freight context—no people and no sensitive readable data.

Use wide backgrounds, split bleeds, editorial bands, and masked atmospheric media to vary pages. Do not repeat a small image box on every section. Product cards should use product-specific imagery only where accuracy is defensible; otherwise use a clearly contextual category treatment. Gradients may improve text legibility but must not distort the perceived color of food products.

AI images are brand/editorial assets, not proof that Harobal owns a facility, holds a certification, or supplied a pictured shipment.

## 7. Accessibility audit

### Positive baseline

- Primary navigation, RFQ actions, filters, and forms use native controls.
- Focus-ring classes are present on most interactive primitives.
- Mobile navigation declares a modal dialog, supports Escape, and locks page scroll.
- Main text contrast is generally strong on calm surfaces.

### Required improvements

- Mobile navigation needs focus entry, focus containment, and focus restoration.
- Catalogue result changes need an `aria-live` status.
- Applied-filter remove buttons need explicit labels such as “Remove category: Spices & Herbs.”
- The mobile filter experience needs dialog semantics, focus management, result count, Apply, Clear, and Close behavior.
- Form controls need stable `id`/`name`, autocomplete tokens, required/invalid semantics, and error associations.
- Multi-step progress needs semantic status, and validation should focus the first invalid field.
- Copy, add/remove RFQ, clear, submission success, and submission failure need live announcements.
- Decorative background images should remain hidden, but meaningful product images require useful alt text through real image elements.
- Motion must honor `prefers-reduced-motion`; no implementation should depend on animation to communicate state.
- Cookie consent needs a truthful policy, keyboard-safe presentation, and hydration-safe initialization—or removal when only essential storage is used.

## 8. SEO and discoverability audit

### Existing strengths

- Every valid slug is statically generated.
- Static routes and product pages have titles and descriptions.
- Product pages expose Open Graph images.
- Invalid product slugs route to the global 404.

### Required work

- Add canonical URLs and correct domain ownership. Root Open Graph currently resolves to `https://harobalventures.com`, not the food-domain URL.
- Add sitemap and robots routes.
- Add Organization, WebSite, BreadcrumbList, ItemList, and Product/Offer-safe structured data only where facts support it.
- Generate unique, factual titles/descriptions using existing form, grade, variant, and origin fields.
- Resolve the 183-title/750-route duplication problem without deleting records or slugs.
- Recommended catalogue model: 183 discoverable product-family cards, each exposing matching variants; retain the 750 current variant slugs for shareability and backward compatibility.
- Do not emit price, availability, rating, or certification schema that the source data cannot prove.
- Add food-domain social imagery and route-level canonical consistency.
- Correct 404 title duplication.

## 9. Architecture audit

### Current issues

- Feature logic lives under `components/features` and `components/pages` rather than owned feature boundaries.
- Catalogue ingestion, normalization, image selection, caching, selectors, and presentation mapping share one service file.
- `types/types.ts` is ambiguous and mixes raw data, presentation models, and quote state.
- Quote persistence is coupled to a global provider without version/migration semantics.
- Inquiry validation is client-only and has no transport, server boundary, or failure model.
- Copied corporate content/config remains in the food project beyond the reachable food experience.
- Route files contain significant product presentation detail.
- `next.config.ts` is effectively empty.
- There is no runtime catalogue validator, test suite, route/link test, or aggregate quality command.

### F2 target structure

```text
src/
  app/                         # route composition, metadata, route boundaries
  brand/                       # Harvest Meridian tokens, logo, loaders, motion contract
  components/
    layout/                    # shell, navigation, footer, global utilities
    sections/                  # domain page sections
    ui/                        # domain-neutral primitives
  features/
    catalog/
      data/                    # raw ingestion + validation
      domain/                  # catalogue/family/variant models
      selectors/               # pure filter/group/sort/query logic
      components/              # catalogue and product UI
      tests/
    inquiry/
      domain/
      server/
      components/
      tests/
    quote-request/
      domain/
      persistence/
      server/
      components/
      tests/
  config/                      # environment parsing, domains, navigation, SEO
  content/                     # approved copy and catalogue source
  lib/                         # small cross-cutting helpers
  types/                       # stable project-wide contracts only
  test/                        # route, data, and integration harness
```

F2 should match `app-main` in naming, quality scripts, validation boundaries, configuration approach, and interaction contracts while keeping catalogue and food-domain rules local.

## 10. Keep / refine / rebuild matrix

| Surface | Decision | Protected strengths | Required change |
| --- | --- | --- | --- |
| Brand palette/tokens | Refine | Forest/leaf/harvest identity | Normalize semantic tokens, focus/motion/media rules; intentional theme behavior |
| Header | Refine | Clear navigation and RFQ count | Active states, URL-sync fix, focus-complete mobile nav, responsive catalogue discovery |
| Footer | Refine | Useful route/contact structure | Remove placeholder contacts; simplify repeated claims; truthful channel availability |
| Home | Rebuild composition | Core proposition, categories, RFQ journey | Editorial background imagery, stronger proof/origin/logistics story, less card repetition |
| Catalogue | Rebuild | Search/filter fields, quote actions | Family-first results, URL source of truth, pagination/incremental rendering, mobile sheet, empty/loading/error states |
| Product detail | Refine deeply | Specs and RFQ intent | Unique variant identity, accurate local media, readable specs, related variants/products, sticky action |
| RFQ | Rebuild workflow | Persistent line items, notes, message, email/copy fallback | Versioned storage, buyer/shipment details, validation, server submit, failure/retry/confirmation |
| Quality | Rebuild composition | Existing copy themes | Evidence/checkpoint narrative and distinct no-human proof imagery |
| Logistics | Rebuild composition | Route/incoterm/cold-chain topics | Route timeline/map pattern and distinct logistics imagery |
| Services | Rebuild composition | Six service descriptions | Alternating workflow/input-output composition |
| Suppliers | Rebuild journey | Partnership purpose and requested evidence | Supplier-specific schema, submission, qualification states, relevant category options |
| Downloads | Rebuild state | RFQ-template intent | Create/verify file, metadata, status, accessible download action |
| Contact | Rebuild journey | Buyer guidance copy | Real transport, server validation, honest SLA, channel/config handling |
| Loading | Refine | Branded identity | Route skeletons and reduced-motion behavior |
| 404 | Refine | Distinct food-domain voice | Correct metadata, shorter composition, base-path-safe links |
| Cookie notice | Rebuild or remove | Consent intent | Match actual optional processing and legal policy; hydration-safe state |

## 11. Content-preservation matrix

| Content class | Treatment |
| --- | --- |
| Legal company name and approved brand names | Preserve exactly unless the owner supplies a correction |
| Existing route purposes and primary business proposition | Preserve meaning |
| All 750 raw records and existing slugs | Preserve; no silent deletion or slug replacement |
| Product specifications | Preserve values; add validation/provenance; change claims only after business approval |
| Quality, logistics, services, supplier, and RFQ educational copy | Preserve meaning; recompose visually and trim duplication only where helpful |
| Sales/info email addresses | Preserve until configuration owner confirms alternatives |
| Phone/WhatsApp placeholders | Do not preserve publicly; make optional/configured and render only when valid |
| 24-hour response promise | Remove or qualify unless operations confirms it |
| Fresh shelf-life values and other sensitive commercial claims | Flag for specialist verification before public indexing |
| Form success language | Correct immediately to reflect actual transport state |
| Stones-specific form placeholder | Replace with food-relevant example |
| Metadata | May be rewritten for unique, factual SEO without inventing facts |
| CTA, error, empty, loading, and accessibility copy | May be refined for clarity and truthfulness |
| Images | Replace placeholder/reused remote media; preserve only verified brand-owned assets |

## 12. Prioritized issue register

### P0 — release blockers

- F1-001: False inquiry success without transport.
- F1-002: Missing advertised RFQ CSV.
- F1-003: Placeholder phone and WhatsApp exposed publicly.
- F1-004: Catalogue payload/DOM is excessive at 750 cards.
- F1-005: Same-page header category navigation does not update filter state.
- F1-006: No automated regression coverage or aggregate quality gate.

### P1 — material quality, trust, and growth risks

- F1-101: Duplicate/thin SEO across 750 variant pages.
- F1-102: Remote, reused, non-product-specific media.
- F1-103: Fresh shelf-life and other commercial claims need provenance review.
- F1-104: Supplier journey is a reused buyer form.
- F1-105: Form and navigation accessibility gaps.
- F1-106: Missing canonical, sitemap, robots, structured data, and food-domain Open Graph ownership.
- F1-107: Repetitive page composition weakens brand storytelling.
- F1-108: Catalogue lint failure and query-state architecture issue.

### P2 — refinement and maintainability

- F1-201: Ambiguous/copy-heavy folder ownership.
- F1-202: Cookie messaging does not match demonstrated behavior.
- F1-203: 404 title duplication.
- F1-204: Unused dark-theme system and incomplete reduced-motion contract.
- F1-205: Gallery/category mapping exists but has no media truth/provenance model.

## 13. F2 execution brief after approval

F2 will remain a foundation phase, not a full-site redesign. It will:

1. Introduce the common feature-owned folder shape.
2. Add catalogue runtime validation, family/variant modeling, pure selectors, and data-quality tests.
3. Make representative catalogue state URL-driven and prove family-first cards without rolling out all F4 UI.
4. Add `typecheck`, `test`, and `check` scripts with clean lint/build expectations.
5. Establish optional, validated contact configuration and remove public placeholder-channel rendering.
6. Establish truthful inquiry/transport contracts without claiming delivery when no adapter is configured.
7. Implement Harvest Meridian token, motion, accessibility, and media contracts.
8. Generate and integrate a small representative set of HD, realistic, no-human local assets for the foundation prototypes.
9. Provide representative catalogue/card/filter prototypes and verification evidence.

F2 will stop at its approval gate before the global shell and homepage rollout in F3.

## 14. F1 approval decisions requested

Approval of this document confirms:

- Harvest Meridian and the varied page-archetype direction;
- the strict no-human, owned/local, background-led media strategy;
- family-first catalogue discovery while retaining all 750 records and slugs;
- URL-backed filtering, sorting, search, and incremental result rendering;
- removal/hiding of placeholder contact channels until configured;
- correction of deceptive form/download states;
- preservation rules and specialist review of sensitive food-commercial claims;
- progression to F2 architecture and design-system foundation only.
