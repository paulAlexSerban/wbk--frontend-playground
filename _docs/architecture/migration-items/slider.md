# Migration Checklist: slider

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/slider
- **Target**: projects/components/slider
- **Category**: components (confirmed — multi-variation interactive carousel/slider playground)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none external
- SCSS deps: none external
- Entry files: 4 JS interactive entries + 5 SCSS entries + 5 HBS entries (consolidated)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/slider
- [x] Build helpers wired: build/helpers/handlebars/feLibs.js

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only include
- [x] Variation partials migrated:
    - `src/_partials/_background-image-slider.hbs`
    - `src/_partials/_double-vertical-slider.hbs`
    - `src/_partials/_image-carousel.hbs`
    - `src/_partials/_css-carousel.hbs`
    - `src/_partials/_gallery-grid.hbs`
- [x] Script orchestrator and variation modules:
    - `src/scripts/index.js`
    - `src/scripts/_background-image-slider.js`
    - `src/scripts/_double-vertical-slider.js`
    - `src/scripts/_image-carousel.js`
    - `src/scripts/_gallery-grid.js`
- [x] Style entry and variation modules:
    - `src/styles.scss`
    - `src/styles/_shared.scss`
    - `src/styles/_background-image-slider.scss`
    - `src/styles/_double-vertical-slider.scss`
    - `src/styles/_image-carousel.scss`
    - `src/styles/_css-carousel.scss`
    - `src/styles/_gallery-grid.scss`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl and concepts/tags set
- [x] `README.md` — architecture and source notes present

## Verification

- [x] `yarn --cwd projects/components/slider build` -> webpack compiled successfully (2026-03-31)
- [x] HBS/helper validation: `feLibs 'all'` present, helper available in project build/helpers
- [x] JS/util validation: no unresolved imports or legacy path references
- [x] SCSS validation: all variation modules imported from `styles.scss`; no missing mixin/function dependency

## Suggested Improvements

- Add keyboard navigation support for all interactive slider variations.
- Add reduced-motion fallback behavior for timed/animated transitions.
- Add shared slide index utility to avoid duplicated next/prev logic across modules.
- Add explicit aria-live or status text for active slide changes.

## Phase 2 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + modules validated
- [x] Build validation passed
- [x] Manual runtime parity smoke-check across all five variations

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk--frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
