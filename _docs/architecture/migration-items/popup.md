# Migration Checklist: popup

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/popup
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/patterns/popup/meta.json
- **Target**: projects/components/popup
- **Category**: components (confirmed — local modal interaction pattern)
- **Source attribution**: Coding Artist

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (popup.entry.js), 1 SCSS (popup.entry.scss), 1 HBS (popup.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/_partials/body.hbs — composition-only include
- [x] src/_partials/_popup.hbs — popup variation
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/_popup.js

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/popup build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 37 manifests.

## Notes

- Popup supports open, close icon, close action, and backdrop dismiss with variation-scoped handlers.
