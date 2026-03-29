# ADR-04.3 Plan: Wave 1 Low-Coupling Backlog

## Status
Draft

## Date
2026-03-29

## Selection Rules
- Source constrained to: src/library/components, src/library/patterns, src/system/templates
- Strict Wave 1 set: JS deps none, SCSS deps none, JS entry files <= 1, SCSS entry files <= 1
- Stretch set: deps none but multi-entry, migrate after strict set
- Category assignment follows ADR-04 defaults and still requires per-item review

## Strict Wave 1 Candidates (Start Here)

1. libraries/dev-days-matrix-library/src/library/patterns/like -> projects/components/like
2. libraries/dev-days-matrix-library/src/library/patterns/theme-switch -> projects/components/theme-switch
3. libraries/dev-days-matrix-library/src/library/patterns/toggle-group -> projects/components/toggle-group
4. libraries/dev-days-matrix-library/src/system/templates/big-frontend-dev -> projects/systems/big-frontend-dev
5. libraries/dev-days-matrix-library/src/system/templates/codepen-challenges -> projects/systems/codepen-challenges
6. libraries/dev-days-matrix-library/src/system/templates/dev-days-matrix -> projects/systems/dev-days-matrix
7. libraries/dev-days-matrix-library/src/system/templates/free-code-camp -> projects/systems/free-code-camp
8. libraries/dev-days-matrix-library/src/system/templates/frontend-mentor -> projects/systems/frontend-mentor
12. libraries/dev-days-matrix-library/src/system/templates/frontend-practice -> projects/systems/frontend-practice
13. libraries/dev-days-matrix-library/src/system/templates/generic-base -> projects/systems/generic-base
14. libraries/dev-days-matrix-library/src/system/templates/great-frontend -> projects/systems/great-frontend

## Stretch Wave 1 Candidates (No Deps, Multi-Entry)

1. libraries/dev-days-matrix-library/src/library/components/loader -> projects/components/loader
2. libraries/dev-days-matrix-library/src/library/patterns/navigation -> projects/components/navigation
3. libraries/dev-days-matrix-library/src/library/patterns/slider -> projects/components/slider

## Execution Notes
- Use scripts/new-project.js for every scaffold action.
- For each candidate, create a completed copy of migration-item-checklist-template.md.
- Run yarn check:migration:wave0 after each migration batch.
