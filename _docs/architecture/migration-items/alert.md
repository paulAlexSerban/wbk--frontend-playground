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

- [x] src/\_partials/body.hbs — composition-only include
- [x] src/\_partials/\_alert.hbs — dismissible alert variation
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/\_alert.js

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/alert build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 37 manifests.

## Notes

- Alert closes through all local close triggers and removes only the scoped demo alert node.

## Suggested Improvements

- add semantic role="alert" coverage and dismiss timing tests
- add variant tokens for info/success/warning/error states
- add optional auto-dismiss with pause-on-hover behavior

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/alert build)
- [x] Manual runtime parity smoke-check

## Phase 4 Use Shared Dependences

- [x] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [x] Update build config to resolve shared abstracts from `@wbk--frontend-forge/_shared__styles/src/abstracts`
- [x] Validate no visual regressions introduced by shared abstracts integration
- [x] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [x] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
