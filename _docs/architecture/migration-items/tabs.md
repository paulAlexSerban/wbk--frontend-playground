# Migration Checklist: tabs

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/tabs
- **Target**: projects/components/tabs
- **Category**: components (confirmed — navigational UI with local content switching)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: none (legacy entries referenced shared abstractions; migrated project localized styles)
- Entry files: 1 JS (navigation-tabs-js.entry.js), 2 SCSS (navigation-tabs-css..entry.scss, navigation-tabs-js.entry.scss), 2 HBS (navigation-tabs-css.entry.hbs, navigation-tabs-js.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/tabs
- [x] Build config copied from existing migrated component scaffold

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only includes
- [x] `src/_partials/_navigation-tabs-css.hbs` — CSS-driven tabs demo
- [x] `src/_partials/_navigation-tabs-js.hbs` — JS-driven tabs demo
- [x] `src/styles.scss` + split modules in `src/styles/`
- [x] `src/scripts.js` + `src/scripts/index.js` + `src/scripts/_navigation-tabs-js.js`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts/tags set
- [x] `README.md` — source link, architecture guidance, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/tabs build` → webpack compiled successfully
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 34 manifests.

## Notes

- JS tabs use data-id mapping between tab buttons and panels to keep handlers variation-scoped.
- Suggested improvements:
    - add arrow-key and Home/End keyboard navigation support
    - add aria-controls and aria-selected assertions in test coverage
    - share tab activation logic between JS and CSS variation docs/examples

## Phase 2 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (`yarn --cwd projects/components/tabs build`)
- [ ] Manual runtime parity smoke-check for CSS and JS tab variants

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
