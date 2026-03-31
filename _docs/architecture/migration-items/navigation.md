# Migration Checklist: navigation

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/navigation
- **Target**: projects/components/navigation
- **Category**: components (confirmed — multi-variation interactive navigation playground)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none external
- SCSS deps: none external
- Entry files: 2 JS interactive entries + 3 SCSS entries + 3 HBS entries (consolidated)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/navigation
- [x] Build helpers wired: build/helpers/handlebars/feLibs.js

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only include
- [x] Variation partials migrated:
  - `src/_partials/_side-nav-buttons.hbs`
  - `src/_partials/_mobile-footer-nav.hbs`
  - `src/_partials/_segmented-workspace-nav.hbs`
- [x] Script orchestrator and variation modules:
  - `src/scripts/index.js`
  - `src/scripts/_mobile-footer-nav.js`
  - `src/scripts/_segmented-workspace-nav.js`
- [x] Style entry and variation modules:
  - `src/styles.scss`
  - `src/styles/_shared.scss`
  - `src/styles/_side-nav-buttons.scss`
  - `src/styles/_mobile-footer-nav.scss`
  - `src/styles/_segmented-workspace-nav.scss`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl and concepts/tags set
- [x] `README.md` — architecture and source notes present

## Verification

- [x] `yarn --cwd projects/components/navigation build` -> webpack compiled successfully (2026-03-31)
- [x] HBS/helper validation: `feLibs 'all'` present, helper available in project build/helpers
- [x] JS/util validation: no unresolved imports or legacy path references
- [x] SCSS validation: all variation modules imported from `styles.scss`; no missing mixin/function dependency

## Suggested Improvements

- Add keyboard support and focus-visible states for navigation item activation.
- Persist selected segmented workspace tab across reloads.
- Add touch gesture support and larger hit targets for mobile footer navigation.
- Extract shared active-state class toggling into a small utility helper module.

## Phase 2 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + modules validated
- [x] Build validation passed
- [ ] Manual runtime parity smoke-check for all three variations
