# Migration Checklist: card

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/card
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/patterns/card/meta.json
- **Target**: projects/components/card
- **Category**: components (confirmed — isolated UI/pattern migration)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none (external package deps)
- SCSS deps: ~ScssAbstracts (resolved via local \_abstracts.scss)
- Entry files: migrated into split variation modules
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/\_partials/body.hbs — composition-only include
- [x] src/\_partials/\_card.hbs — variation partial
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/\_card.js
- [x] src/styles/\_abstracts.scss — local port replacing ~ScssAbstracts alias

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/card build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 49 manifests.

## Notes

- Migrated as standalone component playground preserving split architecture and local abstracts recipe.

## Suggested Improvements

- add responsive density/card-size variants
- define content-slot conventions for richer compositions
- verify hover/focus parity for interactive cards

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/card build)
- [x] Manual runtime parity smoke-check

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
