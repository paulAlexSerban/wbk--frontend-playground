# Migration Item Checklist Template

Use this template for each legacy item migrated from libraries to projects.

## Item Identification

- Legacy item path:
- Legacy meta path:
- Target project path:
- Planned target category:
- Category rationale:

## Dependency Review

- JS dependencies identified from ADR-04.2:
- SCSS dependencies identified from ADR-04.2:
- JS dependency migration strategy (copy/localize/shared):
- SCSS dependency migration strategy (copy/localize/shared):
- `feLibs ... css` helper usages audited in source markup/partials:
- Referenced shared styles copied into local `src/styles/` dependency files:
- Copied style dependency code reduced to only what the target template uses:
- Cross-folder import removal verified:

## Project Scaffold

- Created with scripts/new-project.js:
- Template used:
- Slug:

## Files Ported

- Markup ported:
- Script entry ported:
- Style entry ported:
- Assets ported:

## Manifest And README

- manifest.json name set:
- manifest.json category matches folder:
- manifest.json concepts/tags updated:
- manifest.json source/sourceUrl set:
- README explains intent and provenance:

## Verification

- Project build passes:
- Preview run checked:
- validate:project-manifest-categories passes:
- No runtime imports from libraries path:
- No style imports from libraries path or other projects:

## Notes

- Open issues:
- Follow-up actions:
