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
- JS dependency migration strategy (copy/localize/shared): direct local copy into src/scripts.js
- SCSS dependency migration strategy (copy/localize/shared): local style definition in src/styles.scss
- Cross-folder import removal verified: yes

## Project Scaffold

- Created with scripts/new-project.js: yes
- Template used: handlebars-template
- Slug: browser-detect

## Files Ported

- Markup ported: yes (table container moved into src/_partials/body.hbs)
- Script entry ported: yes (src/scripts.js)
- Style entry ported: yes (src/styles.scss)
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
- Follow-up actions: continue with next strict Wave 1 candidate
