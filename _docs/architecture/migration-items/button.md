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
