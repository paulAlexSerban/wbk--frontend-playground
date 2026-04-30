# Project Management: Improvements

## Status

Snapshot

## Date

2026-03-31

## Objective

Convert the current migration-complete repository into a high-signal frontend engineering portfolio that demonstrates:

- frontend architecture decisions and trade-off thinking
- system design maturity (catalog contracts, packaging flow, metadata governance)
- implementation quality (a11y, performance, testing, maintainability)

## Current State (Observed)

### Strengths

- Migration scope is documented as complete for in-scope items in `_docs/migration-inventory-libraries-vs-projects.md`.
- Validation governance exists and is structured in ADRs:
    - ADR-04.4 (plan/tracker)
    - ADR-04.5 (Phase 3 build report)
- Dashboard catalog migration ADR is accepted (ADR-05) with implementation plan (ADR-05.1).
- Dashboard tests pass (`dashboard/core/*` and `dashboard/quality/*` suites).
- Project manifest category validation passes.

### Gaps / Risks

- Runtime parity checks are still pending in migration-item docs (build-complete != behavior-complete).
- Dashboard visibility does not currently represent full intended public catalog:
    - current generated dashboard summary shows 49 visible entries.
    - canonical project manifests at `projects/*/*/manifest.json` are 52.
    - `_project-templates` are intentionally hidden, but one systems project (`typography-tokens`) is currently packaged under `_project-templates` naming, reducing systems visibility.
- Project management docs are underused (`01_features.md`, `02_maintenance.md`, and this file were mostly placeholders).
- Several top-level categories remain unpopulated by first-principles projects (architectures, compositions, foundations, integrations, layouts, multi-page-projects).

## Next Steps Plan (Showcase-Oriented)

### Phase A: Reliability and Truth Alignment (High Priority)

1. Close runtime validation debt

- Execute manual smoke checks for all Phase 3 migration items.
- Replace placeholder checklist item with concrete evidence in each migration-item file.
- Update ADR-04.4 status from build-complete baseline to full validation closure.

2. Fix dashboard catalog truth mismatch

- Correct `projects/systems/typography-tokens/package.json` category naming to systems.
- Re-run `scripts/package-projects.bash` and `node dashboard`.
- Verify generated dashboard contains full intended visible set (non-template projects).

3. Add a dashboard catalog integrity gate for count drift

- Add an assertion in integrity checks to compare expected visible projects vs generated visible entries.
- Fail build when drift exceeds accepted threshold.

### Phase B: Engineering Depth Signals (Portfolio Quality)

1. Add explicit architecture records for key subsystems

- Document dashboard data-flow (manifest discovery -> normalization -> rendering -> integrity).
- Document per-project split architecture pattern (`index.hbs`, partials, scripts modules, styles modules).
- Add one ADR describing source strategy precedence and fallback behavior rationale.

2. Standardize component quality contract

- Define a lightweight quality checklist for every project:
    - keyboard/a11y checks
    - reduced-motion behavior
    - responsive behavior
    - edge-case interaction behavior
- Apply checklist to highest-leverage components first (modal, slider, tabs, navigation, toast).

3. Establish measurable performance and accessibility baseline

- Add a repeatable script/report for Lighthouse or equivalent local checks on selected showcase projects.
- Store results under `_docs/quality/` (create if missing) with date-stamped snapshots.

### Phase C: Frontend System Design Showcase (Architecture Breadth)

1. Fill currently sparse categories with intentional flagship projects

- architectures: state-machine UI, feature-sliced module architecture, micro-frontend shell demo.
- foundations: token playground (color/type/spacing/motion) + accessibility utility primitives.
- integrations: API-driven UI with caching/error/retry strategy.
- layouts: adaptive dashboard layout system with container-query variants.
- compositions: one medium-complex app composing reusable components.

2. Promote reusable cross-project primitives

- Move proven helpers/patterns into `projects/_shared` (or dedicated package when stable).
- Document promotion criteria (when a project pattern becomes a reusable primitive).

3. Add decision-to-implementation traceability

- For each flagship project, add links in README:
    - problem statement
    - architecture decision
    - trade-offs
    - testing strategy
    - known limitations and next iteration

## Suggested Execution Order (Pragmatic)

1. Runtime smoke-check closure and ADR status updates.
2. Typography tokens category fix + packaging/dashboard regeneration.
3. Add catalog drift integrity test.
4. Launch 2 flagship projects first:

- `projects/architectures/state-machine-ui-reference`
- `projects/foundations/design-tokens-a11y-foundations`

5. Create a monthly architecture review cadence in `_docs/architecture/`.

## Notes

- This repository already demonstrates strong migration rigor; the next leap is converting that rigor into visible engineering narratives and measurable quality outcomes.
- The fastest skill signal improvement is not adding many small projects; it is adding fewer, better-documented, architecture-rich projects with explicit trade-offs.
- Keep reverse-engineering projects clearly separated from original builds to preserve authenticity of portfolio signals.
