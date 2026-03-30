# Migration Checklist: accordion

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/accordion
- **Target**: projects/components/accordion
- **Category**: components (confirmed — local UI disclosure/collapse interactions)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: none (legacy entries referenced shared abstractions; migrated project localized styles)
- Entry files: 1 JS (faq-collapse.entry.js), 2 SCSS (accordion-css.entry.scss, faq-collapse.entry.scss), 2 HBS (accordion-css.entry.hbs, faq-collapse.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created: projects/components/accordion
- [x] Build config copied from existing migrated component scaffold

## Files Ported

- [x] `src/_partials/body.hbs` — composition-only includes
- [x] `src/_partials/_accordion-css.hbs` — CSS-only accordion demo
- [x] `src/_partials/_faq-collapse.hbs` — FAQ collapse demo
- [x] `src/styles.scss` + split modules in `src/styles/`
- [x] `src/scripts.js` + `src/scripts/index.js` + `src/scripts/_faq-collapse.js`

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts/tags set
- [x] `README.md` — source link, architecture guidance, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/accordion build` → webpack compiled successfully
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 34 manifests.

## Notes

- FAQ variation kept independent from CSS-only variation to preserve per-variation script scope.
