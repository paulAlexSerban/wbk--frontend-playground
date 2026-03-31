# Migration Checklist: scrollspy

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/scrollspy
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/patterns/scrollspy/meta.json
- **Target**: projects/components/scrollspy
- **Category**: components (confirmed — isolated UI/pattern migration)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none (external package deps)
- SCSS deps: ~ScssAbstracts (resolved via local _abstracts.scss)
- Entry files: migrated into split variation modules
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/_partials/body.hbs — composition-only include
- [x] src/_partials/_scrollspy.hbs — variation partial
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/_scrollspy.js
- [x] src/styles/_abstracts.scss — local port replacing ~ScssAbstracts alias

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/scrollspy build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 49 manifests.

## Notes

- Migrated as standalone component playground preserving split architecture and local abstracts recipe.

## Suggested Improvements
- add threshold configurability and throttling options
- add smooth-scroll and section highlighting parity checks
- add dynamic-content height recalculation handling

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/scrollspy build)
- [ ] Manual runtime parity smoke-check
