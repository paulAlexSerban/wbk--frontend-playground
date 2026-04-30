# Migration Checklist: modal

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/modal
- **Target**: projects/components/modal
- **Category**: components (confirmed — interaction widget with overlay and keyboard handling)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: none (legacy entry referenced shared abstractions; migrated project localized styles)
- Entry files: 1 JS (modal-window.entry.js), 1 SCSS (modal-window.entry.scss), 1 HBS (modal-window.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/modal
- [x] Build config copied from existing migrated component scaffold

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only includes
- [x] `src/_partials/_modal-window.hbs` — modal trigger + surface + overlay
- [x] `src/styles.scss` + split modules in `src/styles/`
- [x] `src/scripts.js` + `src/scripts/index.js` + `src/scripts/_modal-window.js`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts/tags set
- [x] `README.md` — source link, architecture guidance, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/modal build` → webpack compiled successfully
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 34 manifests.

## Notes

- Escape key handling is scoped to close only when modal is open.

## Suggested Improvements

- add focus trap and escape-key regression tests
- add scroll-lock and background inert-state validation
- add stacked-modal conflict handling notes

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/modal build)
- [ ] Manual runtime parity smoke-check

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
