# ADR-04.4 Plan: Migration Validation and Practice Roadmap

## Status
Draft

## Date
2026-03-31

## Goal
Establish a repeatable validation workflow to confirm each migrated component has complete migration coverage:
- HBS code and helper usage
- JS code and utility migration
- SCSS code plus required mixins/functions
- recommended improvements and enhancements per migrated project

Also provide practice project recommendations for currently unpopulated project categories.

## Scope Decision
- Typography component migration to projects/components is intentionally excluded.
- Typography is represented by projects/systems/typography-tokens.
- Effective migration scope remains complete when validated at 41/41 in-scope items.

## Where To Start (For Future Agents)
1. Use _docs/migration-inventory-libraries-vs-projects.md as canonical mapping source.
2. Use this plan to execute validation in risk-priority order.
3. Update progress checkpoints in this file after each validation batch.
4. Add findings and fixes per item under _docs/architecture/migration-items/<slug>.md.

## Validation Checklist (Per Component)

### A. HBS and Helper Coverage
- Confirm src/index.hbs includes _partials/body composition.
- Confirm src/_partials/body.hbs renders all intended variation partials.
- Confirm each migrated legacy variation has one corresponding _*.hbs partial.
- If any helper is used in templates (feLibs, responsiveImage, other custom helper), verify helper exists in build/helpers/handlebars and is wired.
- Confirm no unresolved legacy helper calls remain.

### B. JS and Utility Coverage
- Confirm src/scripts/index.js initializes all variation modules and does not miss modules.
- Confirm all migrated utilities are local (or intentionally omitted with rationale).
- Confirm selectors used in JS exist in migrated HBS.
- Confirm event listeners are scoped and avoid global side effects unless intentional.
- Confirm no dead imports and no references to removed legacy paths.

### C. SCSS, Mixins, and Functions Coverage
- Confirm src/styles.scss imports all needed modules.
- Confirm each variation has scoped partial(s) under src/styles/.
- If legacy used ScssAbstracts, ensure local _abstracts.scss contains required helpers.
- Confirm mixins/functions used in migrated SCSS are defined and imported.
- Confirm there is no flattened compiled CSS committed where authored SCSS was expected.

### D. Build and Runtime Validation
- Run yarn --cwd projects/components/<slug> build.
- Record build result and warnings.
- Smoke-test interactions for JS-driven items.
- Update migration-item checklist with validation timestamp and notes.

## Baseline Audit Snapshot (2026-03-31)

### Component Structure Anomalies (Highest Priority)
- browser-detect: missing src/scripts and src/styles directories.
- drag-n-drop: missing src/scripts and src/styles directories.
- keyboard-keys: missing src/scripts and src/styles directories.

### Complex Components (Validate Early)
- slider: 5 partials, 4 JS modules, 6 style partials.
- loader: 3 partials, 2 JS modules, 5 style partials.
- navigation: 3 partials, 2 JS modules, 4 style partials.
- button, tabs, accordion: multi-part style architecture.

## Validation Execution Plan

### Phase 1 (Critical Gaps)
- browser-detect
- drag-n-drop
- keyboard-keys

Expected output:
- scripts/styles scaffolds restored where needed
- migration-item checklists updated with explicit rationale for any intentionally static project

### Phase 2 (High Complexity)
- slider
- loader
- navigation
- button
- tabs
- accordion

Expected output:
- verified utility and helper completeness
- verified SCSS helper/mixin coverage

### Phase 3 (Remaining Components)
- alert, audio, card, card-list, digital-clock, form-components, form-patterns, hero, image, layouts, like, list, modal, paint, pill, popup, progress, scrollspy, theme-switch, timer, toast, toggle-group

Expected output:
- all migration-item docs updated with validation status and suggested enhancements

## Suggested Improvements and Enhancements Per Migrated Component
- accordion: add keyboard navigation tests and aria-expanded synchronization checks.
- alert: add semantic roles and dismiss animation timing tests.
- audio: add preload/error handling and a11y labels for controls.
- browser-detect: add proper script/style split and explicit unsupported-browser states.
- button: normalize token usage for spacing/color and add state matrix examples.
- card: add content-agnostic card slots and responsive density variants.
- card-list: add virtualization strategy note for large datasets.
- digital-clock: add timezone mode and reduced-motion fallback for transitions.
- drag-n-drop: add script/style architecture and touch-device behavior notes.
- form-components: add validation states and helper-text/error variants.
- form-patterns: add keyboard flow tests and focus management checks.
- hero: add responsive image strategy and content-length stress cases.
- image: add srcset/lazy-loading parity checks per variation.
- keyboard-keys: add script/style architecture and key alias normalization.
- layouts: add container-query examples and spacing scale variants.
- like: add tap/mobile behavior and animation throttling safeguards.
- list: add semantic variants (ordered/unordered/definition) and spacing tokens.
- loader: add reduced-motion fallbacks and deterministic timing mode for tests.
- modal: add focus trap, escape handling, and scroll lock regression tests.
- navigation: add active-link strategy and mobile/desktop parity checks.
- paint: add clear/undo control and canvas resize persistence handling.
- pill: add interaction states and contrast compliance checks.
- popup: add stacking/context collision checks and dismissal rules.
- progress: add state machine validation and percent/step sync tests.
- scrollspy: add threshold configurability and performance throttling.
- slider: add accessible labels, keyboard support, and bounds validation.
- tabs: add arrow-key navigation and aria-controls consistency checks.
- theme-switch: add persistence strategy and prefers-color-scheme behavior.
- timer: add pause/resume support and drift-correction strategy.
- toast: add queue policy and duplicate-notification suppression.
- toggle-group: add invariant tests for mutually constrained toggles.

## Recommended Practice Projects For Unpopulated Categories

### projects/architectures (currently unpopulated)
- design-system-monorepo-starter
- micro-frontend-shell-and-remote-demo
- feature-sliced-frontend-reference

### projects/compositions (currently unpopulated)
- ecommerce-product-page-composition
- analytics-dashboard-composition
- blog-landing-composition-kit

### projects/foundations (currently unpopulated)
- spacing-typography-token-playground
- color-accessibility-token-generator
- motion-foundations-library

### projects/integrations (currently unpopulated)
- cms-content-renderer-integration
- payment-flow-ui-integration-sandbox
- auth-provider-ui-integration-sandbox

### projects/layouts (currently unpopulated)
- holy-grail-layout-system
- editorial-magazine-layout-system
- adaptive-dashboard-layout-system

## Progress Tracker
- [x] Baseline inventory captured (2026-03-31)
- [x] Scope decision documented (typography excluded from components)
- [x] Phase 1 validation complete (2026-03-31: browser-detect, drag-n-drop, keyboard-keys refactored to split architecture and built)
- [x] Phase 2 validation complete (2026-03-31: slider, loader, navigation, button, tabs, accordion validated and built)
- [x] Phase 3 build validation complete (2026-03-31: 22 remaining components built successfully; see ADR-04.5)
- [x] All migration-item checklists updated with Phase 3 validation baseline and runtime smoke-check placeholders

## Notes For Handoff
- Always reconcile findings against _docs/migration-inventory-libraries-vs-projects.md before changing status totals.
- Keep architecture ADRs as status summaries; keep deep per-item details in migration-items files.
- When fixing a component during validation, run project build immediately and record evidence in the corresponding migration-item file.
- Phase 3 build validation and enhancement backlog are documented in _docs/architecture/adr-04.5--phase3-validation-report.md.
