# Migration Checklist: pill

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/pill
- **Legacy meta**: libraries/dev-days-matrix-library/src/library/components/pill/meta.json
- **Target**: projects/components/pill
- **Category**: components (confirmed — isolated status indicator UI element)
- **Source attribution**: Dev Days Matrix Library

## Dependency Review

- JS deps: none
- SCSS deps: `~ScssAbstracts`
- Entry files: 0 JS (style-only source), 1 SCSS (pill.entry.scss), 2 HBS entries
- Wave tier: Post-Wave 1 continuation

## Project Scaffold

- [x] Target directory created with scripts/new-project.js
- [x] Template used: handlebars-template

## Files Ported

- [x] src/_partials/body.hbs — composition-only include
- [x] src/_partials/_pill.hbs — shared pill partial
- [x] src/_partials/_pill-round.hbs — round variation
- [x] src/_partials/_pill-round-active.hbs — active variation
- [x] src/styles.scss + split modules in src/styles/
- [x] src/scripts.js + src/scripts/index.js + src/scripts/_pill.js
- [x] src/styles/_abstracts.scss — local port replacing `~ScssAbstracts` alias usage

## Manifest and README

- [x] manifest.json — source/sourceUrl updated; concepts/tags set
- [x] README.md — provenance and split architecture notes

## Verification

- [x] yarn --cwd projects/components/pill build -> webpack compiled successfully
- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 39 manifests.

## Notes

- Source behavior is style-only; scripts module kept as no-op initializer for split architecture consistency.

## Suggested Improvements
- add selected/disabled/loading state variants
- add contrast and accessibility verification across themes
- add keyboard navigation behavior for pill groups

## Phase 3 Validation (2026-03-31)

- [x] HBS + helpers validated
- [x] JS + utilities validated
- [x] SCSS + mixin/function coverage validated
- [x] Build validation passed (yarn --cwd projects/components/pill build)
- [ ] Manual runtime parity smoke-check
