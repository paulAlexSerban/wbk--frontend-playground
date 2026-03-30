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

Strict Wave 1 complete.

## Stretch Wave 1 Candidates (No Deps, Multi-Entry)

1. libraries/dev-days-matrix-library/src/library/components/loader -> projects/components/loader
2. libraries/dev-days-matrix-library/src/library/patterns/navigation -> projects/components/navigation
3. libraries/dev-days-matrix-library/src/library/patterns/slider -> projects/components/slider

## Execution Notes
- Use scripts/new-project.js for every scaffold action.
- For each candidate, create a completed copy of migration-item-checklist-template.md.
- Run yarn check:migration:wave0 after each migration batch.
- For system template migrations, audit all `feLibs ... css` helper usages in source partials and copy each referenced dependency stylesheet into the target project's local `src/styles/` directory.
- Copy only the dependency code actually used by the migrated template; avoid broad cross-project style imports and avoid keeping unused mixins/functions.
- Wire local dependency files through the project's `src/styles.scss`, then validate with a project build before continuing to the next migration.
