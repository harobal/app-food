# F3 — Global Shell and Homepage Handoff

## Phase outcome

F3 replaces the previous split-hero and repeated card-grid homepage with a branded, editorial food-export experience. Existing commercial meaning is preserved while category discovery, sourcing, quality, workflow, logistics, and RFQ conversion are presented as visually distinct moments.

## Global shell

- Added a compact export-context utility strip on desktop.
- Refined the sticky header, active-route states, navigation spacing, and restrained harvest accent line.
- Converted the catalogue dropdown into a two-column discovery panel.
- Preserved the RFQ count and primary-site escape hatch.
- Fixed the mobile navigation sheet so it mounts outside the backdrop-filter containing block and fills the viewport.
- Retained focus trapping, Escape handling, focus restoration, body scroll lock, backdrop dismissal, and responsive desktop/mobile switching.

## Homepage composition

1. Full-bleed export hero with a dark copy-safe field and integrated capability rail.
2. Typographic category index instead of another product-card grid.
3. Wide origin panorama with sourcing principles embedded into the landscape.
4. Contained laboratory editorial feature pairing owned media with quality-control content.
5. Linear four-stage sourcing workflow instead of repeated floating cards.
6. Full-width cold-chain and port panorama for logistics confidence.
7. High-contrast harvest-gold RFQ conversion band.

Gradients are limited to legibility overlays, shallow ambient transitions, and the final brand accent. Product and operational imagery remains color-accurate and dominant.

## Owned media

- `/media/harvest-meridian/foods-export-hero.webp` — existing F2 export still life reused as the F3 hero.
- `/media/harvest-meridian/origin-sourcing-panorama.webp` — 1788×880, 232,974 bytes.
- `/media/harvest-meridian/quality-control-lab.webp` — 1536×1024, 132,966 bytes.
- `/media/harvest-meridian/cold-chain-logistics.webp` — 1774×887, 100,788 bytes.

All new images were generated in built-in ImageGen mode, visually inspected, and optimized to WebP. The no-human constraint is absolute: no people, faces, hands, bodies, silhouettes, reflections, mannequins, statues, or human-shaped figures are present.

## Verification

- Full automated check: typecheck, lint, 9/9 tests, and production build passed.
- Final production build after the mobile-sheet correction passed; 763 routes generated.
- Desktop visual QA: 1440×950, no horizontal overflow.
- Mobile visual QA: 390×844, no horizontal overflow.
- Mobile navigation production QA: full 844px viewport height, scroll locked, dialog exposed, panel internally scrollable.

## Approval gate

F3 ends here. F4 should begin only after approval and will roll the visual system through catalogue discovery, category media, product-family cards, and product-detail experiences.
