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
- libraries/dev-days-matrix-library/src/library/patterns/toggle-group -> projects/components/toggle-group
- libraries/dev-days-matrix-library/src/library/patterns/theme-switch -> projects/components/theme-switch
- libraries/dev-days-matrix-library/src/library/patterns/loader -> projects/components/loader
- libraries/dev-days-matrix-library/src/library/patterns/like -> projects/components/like
- libraries/dev-days-matrix-library/src/library/patterns/layouts -> projects/components/layouts
- libraries/dev-days-matrix-library/src/library/components/toast -> projects/components/toast
- libraries/dev-days-matrix-library/src/library/components/timer -> projects/components/timer
- libraries/dev-days-matrix-library/src/library/components/paint -> projects/components/paint
- libraries/dev-days-matrix-library/src/library/components/image -> projects/components/image
- libraries/dev-days-matrix-library/src/library/patterns/scrollspy -> projects/components/scrollspy
- libraries/dev-days-matrix-library/src/library/patterns/hero -> projects/components/hero
- libraries/dev-days-matrix-library/src/library/patterns/form-patterns -> projects/components/form-patterns
- libraries/dev-days-matrix-library/src/library/patterns/digital-clock -> projects/components/digital-clock
- libraries/dev-days-matrix-library/src/library/patterns/card-list -> projects/components/card-list
- libraries/dev-days-matrix-library/src/library/patterns/card -> projects/components/card
- libraries/dev-days-matrix-library/src/library/patterns/audio -> projects/components/audio
- libraries/dev-days-matrix-library/src/library/components/typography -> projects/components/typography (excluded from components scope; covered by projects/systems/typography-tokens)
- libraries/dev-days-matrix-library/src/library/components/list -> projects/components/list
- libraries/dev-days-matrix-library/src/library/components/form-components -> projects/components/form-components
- libraries/dev-days-matrix-library/src/library/components/button -> projects/components/button
- libraries/dev-days-matrix-library/src/library/components/pill -> projects/components/pill
- libraries/dev-days-matrix-library/src/library/patterns/accordion -> projects/components/accordion
- libraries/dev-days-matrix-library/src/library/patterns/modal -> projects/components/modal
- libraries/dev-days-matrix-library/src/library/patterns/tabs -> projects/components/tabs
- libraries/dev-days-matrix-library/src/library/patterns/alert -> projects/components/alert
- libraries/dev-days-matrix-library/src/library/patterns/popup -> projects/components/popup
- libraries/dev-days-matrix-library/src/library/patterns/progress -> projects/components/progress
- libraries/dev-days-matrix-library/src/system/templates/landing -> projects/systems/landing

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
- When source SCSS imports `~ScssAbstracts`, create a local `src/styles/_abstracts.scss` in the target project and keep mixin/function calls in migrated partials (`@include ...`, `get-color(...)`, `convert-rem(...)`) rather than flattening to compiled CSS output.

## Reconciliation Note (2026-03-31)

- A full libraries-vs-projects slug inventory and migration mapping is tracked in _docs/migration-inventory-libraries-vs-projects.md.
- Scope decision: libraries/dev-days-matrix-library/src/library/components/typography is intentionally excluded from components migration, because typography is represented in projects/systems/typography-tokens.
