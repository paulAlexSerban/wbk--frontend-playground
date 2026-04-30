# ADR-04.1 Plan: Implement Libraries To Projects Migration

## Goal

Implement ADR-04 by migrating all 69 legacy meta-defined items from libraries/dev-days-matrix-library into projects taxonomy with explicit JS and SCSS dependency handling.

## Inputs

- Target architecture and taxonomy rules from readme.md
- Prior decisions: ADR-01, ADR-02, ADR-03
- Dependency baseline: ADR-04.2

## Current baseline snapshot

- Migrated projects (manifest-backed, non-template): 10
- Legacy items pending migration: 69
- Pending by namespace:
- src/library/components: 12
- src/library/modules: 27
- src/library/patterns: 20
- src/system/products: 1
- src/system/templates: 9

## Migration waves

### Wave 0: Guardrails and tooling

1. Keep scripts/new-project.js as the only project creation entrypoint.
2. Add migration checklist template used for each item:

- selected destination category and reason
- JS dependencies copied/replaced
- SCSS dependencies copied/replaced
- manifest fields completed
- README provenance and concepts completed

3. Add a lightweight validation script to fail if any project manifest points to a missing category.

### Wave 1: Low-coupling items first

1. Migrate items with no detected JS deps and no SCSS deps first.
2. Prioritize single-entry items from:

- src/library/components
- src/library/patterns
- src/system/templates

3. Validate each migrated item by running package build and preview.

Expected outcome: fast migration throughput and validation of process with minimal refactoring risk.

### Wave 2: Shared-abstract dependency items

1. Migrate items depending on legacy internal abstractions such as:

- \_abstracts/js/dom/manipulation
- \_abstracts/js/dom/traversing
- ~ScssAbstracts

2. For each dependency type choose one strategy:

- copy local utility into project scope when usage is unique
- extract to projects/\_shared when reused by multiple migrated items

3. Remove references to libraries paths from migrated units.

Expected outcome: dependency decoupling from old library tree.

### Wave 3: High-complexity module bundles

1. Decompose large bundles into project granularity where needed, especially:

- src/library/modules/mini-games
- src/library/modules/form-modules
- src/library/modules/quiz
- src/system/products/resume

2. Ensure one manifest per runnable project output.
3. If one legacy folder represents multiple independent demos, split into multiple projects by entry.

Expected outcome: taxonomy consistency and manageable project boundaries.

### Wave 4: Systems and template consolidation

1. Migrate src/system/templates and src/system/products to projects/systems.
2. Distinguish reusable system assets from demo projects:

- demo/exploration stays in projects/systems
- reusable package code promoted to libraries only if intentionally shared as package output

Expected outcome: systems category becomes the canonical home for design-system and template explorations.

### Wave 5: Finalization and cleanup

1. Rebuild dashboard and verify manifests are discoverable.
2. Remove migrated equivalents from libraries/dev-days-matrix-library.
3. Update root scripts to stop building removed legacy paths.
4. Keep an archived migration map in docs for traceability.

## Per-item execution checklist

1. Select legacy item and target category.
2. Scaffold target project with scripts/new-project.js.
3. Port markup/scripts/styles and assets.
4. Resolve JS imports and SCSS imports/use/forward dependencies.
5. Fill manifest metadata:

- name
- category
- concepts
- tags
- source and sourceUrl when relevant

6. Write/update README with intent and provenance.
7. Build and verify output.
8. Record completion in migration tracker.

## Validation gates

- No runtime import paths may reference libraries/dev-days-matrix-library from migrated projects.
- Every migrated project must include manifest.json and README.md.
- Category in manifest must match folder category.
- Dashboard build succeeds and includes migrated projects.

## Suggested sequencing by count

1. components (12)
2. patterns (20)
3. modules without shared abstractions
4. modules with shared abstractions
5. mini-games/form-modules/quiz/resume (highest complexity)
6. system templates/products

## Done definition

- All 69 legacy meta-defined items are represented as projects entries (single or split by entry where needed).
- Legacy library paths are no longer required for migrated runtime behavior.
- Dashboard indexes projects metadata as the single source of truth.
