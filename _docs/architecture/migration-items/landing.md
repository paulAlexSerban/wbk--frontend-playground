# Migration Checklist: landing

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/system/templates/landing
- **Legacy meta**: libraries/dev-days-matrix-library/src/system/templates/landing/meta.json
- **Target**: projects/systems/landing
- **Category**: systems (confirmed — reusable page template baseline)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: `~ScssAbstracts`
- Entry files: 1 JS (landing.entry.js), 1 SCSS (landing.entry.scss)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/\_partials/body.hbs — landing template structure (hero/features/testimonial/footer)
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/\_landing.js
- [x] src/styles/\_abstracts.scss — local port replacing `~ScssAbstracts` alias usage

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and template concepts documented

## Verification

- [x] yarn --cwd projects/systems/landing build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 38 manifests.

## Notes

- Legacy source includes only JS/SCSS/meta entries; migrated body partial provides a reusable baseline layout while preserving source intent.

- [x] DONE

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
