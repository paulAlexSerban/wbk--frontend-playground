# Migration Checklist: alert

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/alert
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/patterns/alert/meta.json
- **Target**: projects/components/alert
- **Category**: components (confirmed — local dismissible messaging pattern)
- **Source attribution**: Coding Artist

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (alert.entry.js), 1 SCSS (alert.entry.scss), 1 HBS (alert.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/_partials/body.hbs — composition-only include
- [x] src/_partials/_alert.hbs — dismissible alert variation
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/_alert.js

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/alert build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 37 manifests.

## Notes

- Alert closes through all local close triggers and removes only the scoped demo alert node.
