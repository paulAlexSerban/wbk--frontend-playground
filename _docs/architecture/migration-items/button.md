# Migration Checklist: button

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/button
- **Target**: projects/components/button
- **Category**: components (confirmed — UI control component with local interactions)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: none (legacy base entry used shared design tokens; migrated project localized styles)
- Entry files: 1 JS (ripple-button.entry.js), 2 SCSS (button.entry.scss, ripple-button.entry.scss), 2 HBS (button.entry.hbs, ripple-button.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/button
- [x] Build config copied from existing migrated component scaffold

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only includes
- [x] `src/_partials/_button-base.hbs` — base semantic button variants
- [x] `src/_partials/_ripple-button.hbs` — ripple interaction demo
- [x] `src/styles.scss` + split modules in `src/styles/`
- [x] `src/scripts.js` + `src/scripts/index.js` + `src/scripts/_ripple-button.js`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts/tags set
- [x] `README.md` — source link, architecture guidance, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/button build` → webpack compiled successfully
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 34 manifests.

## Notes

- Ripple click coordinate logic updated to use `getBoundingClientRect()` for reliable effect placement.
- Suggested improvements:
    - add keyboard-triggered ripple behavior parity (Enter/Space)
    - add explicit button state matrix (`:hover`, `:focus-visible`, `:disabled`)
    - centralize color/spacing token usage for easier theme scaling

## Phase 2 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (`yarn --cwd projects/components/button build`)
- [x] Manual runtime parity smoke-check for ripple and base variants

## Phase 3 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
