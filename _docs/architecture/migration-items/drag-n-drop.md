# Migration Checklist: Drag N Drop

## Item Identification

- Legacy item path: libraries/dev-days-matrix-library/src/library/components/drag-n-drop
- Legacy meta path: libraries/dev-days-matrix-library/src/library/components/drag-n-drop/meta.json
- Target project path: projects/components/drag-n-drop
- Planned target category: components
- Category rationale: Single interaction-focused component with isolated behavior and standalone UI.

## Dependency Review

- JS dependencies identified from ADR-04.2: (none detected)
- SCSS dependencies identified from ADR-04.2: (none detected)
- JS dependency migration strategy (copy/localize/shared): localized split modules (`src/scripts/index.js`, `src/scripts/_drag-n-drop.js`)
- SCSS dependency migration strategy (copy/localize/shared): localized split modules (`src/styles/_shared.scss`, `src/styles/_drag-n-drop.scss`)
- Cross-folder import removal verified: yes

## Project Scaffold

- Created with scripts/new-project.js: yes
- Template used: handlebars-template
- Slug: drag-n-drop

## Files Ported

- Markup ported: yes (`src/_partials/body.hbs` + variation partial `src/_partials/_drag-n-drop.hbs`)
- Script entry ported: yes (`src/scripts.js` imports `src/scripts/index.js`; behavior in `src/scripts/_drag-n-drop.js`)
- Style entry ported: yes (`src/styles.scss` imports `src/styles/_shared.scss` and `src/styles/_drag-n-drop.scss`)
- Assets ported: n/a

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
	- add keyboard-accessible drag alternatives for accessibility parity
	- support touch interactions for mobile devices
	- add visual placeholder state while dragging over empty slots

## Phase 1 Validation (2026-03-31)

- [x] HBS structure split and variation partial introduced
- [x] JS moved to split architecture with root-scoped query usage
- [x] SCSS moved to split architecture with shared + component modules
- [ ] Runtime parity smoke-check in browser (manual)
