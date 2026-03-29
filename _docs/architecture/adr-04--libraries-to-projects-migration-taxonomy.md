# ADR-04: Migrate Legacy Libraries Into Projects Taxonomy

## Status
Accepted

## Date
2026-03-30

## Context

The repository target architecture defines projects as self-contained units under projects with category-first organization and metadata-first discovery through manifest.json.

Architecture decisions already in place:
- ADR-01 moved dashboard generation toward stronger contracts and quality gates.
- ADR-02 established shared build helpers and centralized toolchain governance.
- ADR-03 established a scaffolding CLI for consistent project creation.

Current state analysis:
- Existing migrated projects with manifests: 10
- Existing active categories with migrated projects: interactions, systems, reverse-engineering
- Legacy source still concentrated in libraries/dev-days-matrix-library with 69 meta-defined items
- Legacy item distribution:
- src/library/components: 12
- src/library/modules: 27
- src/library/patterns: 20
- src/system/products: 1
- src/system/templates: 9

The legacy library still contains mixed concerns (components, interactions, layouts, integrations, app-like compositions, and system templates) that do not map 1:1 to the target taxonomy unless explicitly reclassified.

## Decision

Adopt a taxonomy-first migration from libraries to projects and treat each meta.json item as an independent migration unit.

### 1. Canonical destination is projects only

All runnable learning/demo units currently in libraries/dev-days-matrix-library/src are migrated into projects/`<category>/<slug>` and become self-contained project packages with:
- src/index.hbs or src/index.html
- src/styles.scss or src/styles.css
- src/scripts.js or equivalent entry
- manifest.json
- README.md
- package.json

### 2. Add missing target categories now

The following categories are added to align with the repository architecture:
- projects/components
- projects/foundations
- projects/compositions
- projects/architectures
- projects/layouts
- projects/integrations
- projects/multi-page-projects

Existing categories remain:
- projects/interactions
- projects/systems
- projects/reverse-engineering

### 3. Namespace-to-category mapping policy

Initial default mapping:
- src/library/components -> projects/components
- src/library/patterns -> projects/components unless primary concern is layout or architecture
- src/library/modules -> classify by dominant intent:
- behavior-first -> projects/interactions
- API/browser-data-first -> projects/integrations
- multi-feature app -> projects/compositions
- structure/pattern-first -> projects/architectures
- src/system/templates and src/system/products -> projects/systems

Exception policy:
- If an item is primarily a layout technique, place in projects/layouts
- If an item is primarily semantic HTML/CSS fundamentals, place in projects/foundations
- If item provenance is third-party teardown/copy, place in projects/reverse-engineering

IMPORTANT: For every component migration analyze the codebase and make sure to understand it and if it is placed under the correct category. For example, if a component is primarily a layout technique, it should be placed in projects/layouts instead of projects/components.

### 4. Dependency audit is mandatory migration input

Before moving each item, JS and SCSS dependencies must be recorded and validated against the new project boundary.
The full baseline inventory is captured in ADR-04.2.

### 5. Shared code promotion rule

If repeated JS or SCSS dependencies emerge across migrated projects, extract those into projects/_shared in deliberate follow-up changes - this will be handled on a case-by-case basis after the initial migration wave to avoid over-engineering shared abstractions upfront.

IMPORTANT: Do not silently keep cross-folder imports into the old libraries tree.

## Consequences

Positive:
- Aligns repository structure with readme architecture and dashboard contract.
- Reduces hidden coupling from legacy cross-imports.
- Makes each migrated item searchable, runnable, and evolvable as a standalone project.

Trade-offs:
- Initial migration cost is high due to 69-item scope.
- Some legacy items require decomposition where one module currently bundles many entries.
- Metadata normalization work is required to keep category semantics consistent.

## Scope boundary

This ADR covers taxonomy, destination rules, and migration contracts.

This ADR does not cover:
- deleting libraries directory immediately
- changing dashboard renderer contract in this step
- changing build-family decisions from ADR-02

## Acceptance criteria

- All new migrated units land under projects categories only.
- Every migrated unit includes manifest.json and README.md.
- No migrated unit imports runtime code from libraries path.
- Dependency notes for each legacy item are traceable via ADR-04.2.
