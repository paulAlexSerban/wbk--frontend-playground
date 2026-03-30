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
