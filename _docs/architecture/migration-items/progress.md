# Migration Checklist: progress

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/progress
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/patterns/progress/meta.json
- **Target**: projects/components/progress
- **Category**: components (confirmed — local stateful step indicator pattern)
- **Source attribution**: Coding Artist

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (progress.entry.js), 1 SCSS (progress.entry.scss), 1 HBS (progress.entry.hbs)
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/\_partials/body.hbs — composition-only include
- [x] src/\_partials/\_progress-steps.hbs — progress steps variation
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/\_progress-steps.js

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/progress build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 37 manifests.

## Notes

- Progress step state updates are fully scoped to each demo root and keep button disabled states in sync.

## Suggested Improvements

- add percent/step synchronization assertions
- add boundary-condition checks for min/max steps
- add reduced-motion animation options

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/progress build)
- [ ] Manual runtime parity smoke-check

## Phase 4 Use Shared Dependences

- [ ] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [ ] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [ ] Validate no visual regressions introduced by shared abstracts integration
- [ ] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [ ] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
