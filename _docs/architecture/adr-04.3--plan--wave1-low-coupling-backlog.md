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

Stretch Wave 1 complete.

## Post-Wave 1 Continuation (Same Migration Recipe)

Status: in progress (2026-03-30)

Completed continuation items:
- libraries/dev-days-matrix-library/src/library/components/button -> projects/components/button
- libraries/dev-days-matrix-library/src/library/patterns/accordion -> projects/components/accordion
- libraries/dev-days-matrix-library/src/library/patterns/modal -> projects/components/modal
- libraries/dev-days-matrix-library/src/library/patterns/tabs -> projects/components/tabs
- libraries/dev-days-matrix-library/src/library/patterns/alert -> projects/components/alert
- libraries/dev-days-matrix-library/src/library/patterns/popup -> projects/components/popup
- libraries/dev-days-matrix-library/src/library/patterns/progress -> projects/components/progress

Execution rules remain unchanged:
- Keep split architecture for all new migrations: per-variation `src/styles/_*.scss`, `src/scripts/_*.js`, and `src/_partials/_*.hbs` with entry orchestrators.
- Keep one migration checklist file per migrated legacy item under `_docs/architecture/migration-items/`.
- Run per-project build and `yarn check:migration:wave0` after each continuation batch.

## Execution Notes
- Use scripts/new-project.js for every scaffold action.
- For each candidate, create a completed copy of migration-item-checklist-template.md.
- Run yarn check:migration:wave0 after each migration batch.
- For system template migrations, audit all `feLibs ... css` helper usages in source partials and copy each referenced dependency stylesheet into the target project's local `src/styles/` directory.
- Copy only the dependency code actually used by the migrated template; avoid broad cross-project style imports and avoid keeping unused mixins/functions.
- Wire local dependency files through the project's `src/styles.scss`, then validate with a project build before continuing to the next migration.
