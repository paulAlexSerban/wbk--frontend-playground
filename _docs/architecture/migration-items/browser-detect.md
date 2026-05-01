# Migration Checklist: Browser Detect

## Item Identification

- Legacy item path: libraries/dev-days-matrix-library/src/library/components/browser-detect
- Legacy meta path: libraries/dev-days-matrix-library/src/library/components/browser-detect/meta.json
- Target project path: projects/components/browser-detect
- Planned target category: components
- Category rationale: Single focused UI behavior component with a narrow interactive responsibility.

## Dependency Review

- JS dependencies identified from ADR-04.2: (none detected)
- SCSS dependencies identified from ADR-04.2: (none detected)
- JS dependency migration strategy (copy/localize/shared): localized split modules (`src/scripts/index.js`, `src/scripts/_browser-detect.js`)
- SCSS dependency migration strategy (copy/localize/shared): localized split modules (`src/styles/_shared.scss`, `src/styles/_browser-detect.scss`)
- Cross-folder import removal verified: yes

## Project Scaffold

- Created with scripts/new-project.js: yes
- Template used: handlebars-template
- Slug: browser-detect

## Files Ported

- Markup ported: yes (`src/_partials/body.hbs` + variation partial `src/_partials/_browser-detect.hbs`)
- Script entry ported: yes (`src/scripts.js` imports `src/scripts/index.js`; behavior in `src/scripts/_browser-detect.js`)
- Style entry ported: yes (`src/styles.scss` imports `src/styles/_shared.scss` and `src/styles/_browser-detect.scss`)
- Assets ported: n/a
-

## Manifest And README

- manifest.json name set: yes
- manifest.json category matches folder: yes
- manifest.json concepts/tags updated: yes
- manifest.json source/sourceUrl set: yes
- README explains intent and provenance: yes

## Verification

- Project build passes: yes
- Preview run checked: not run in this step
- validate:project-manifest-categories passes: yes
- No runtime imports from libraries path: yes

## Notes

- Open issues: none
- Suggested improvements:
    - add browser map grouping (browser family, version, platform) for easier scanning
    - add row virtualization/pagination if sample UA list grows significantly
    - add test fixtures to validate parser output deterministically

## Phase 1 Validation (2026-03-31)

- [x] HBS structure split and variation partial introduced
- [x] JS moved to split architecture with scoped root selector
- [x] SCSS moved to split architecture with shared + component modules
- [x] Runtime parity smoke-check in browser (manual)

## Phase 2 Use Shared Dependences

- [x] Update styles to use shared abstracts where applicable (mixins, functions, variables)
- [x] Update build config to resolve shared abstracts from `@wbk-frontend-forge/_shared__styles/src/abstracts`
- [x] Validate no visual regressions introduced by shared abstracts integration
- [x] Update styles to use shared demo page styles where applicable (layout, typography, spacing)
- [x] Ensure project name in package is updated correctly such as `ui-components`, `ui-patterns`, or `ui-modules`
