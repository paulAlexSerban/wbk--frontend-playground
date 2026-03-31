# Migration Inventory: Libraries vs Projects

## Status
Snapshot

## Date
2026-03-31

## Scope
- Source libraries scanned:
  - libraries/dev-days-matrix-library/src/library/components
  - libraries/dev-days-matrix-library/src/library/patterns
  - libraries/dev-days-matrix-library/src/system/templates
- Target projects scanned:
  - projects/components
  - projects/systems
  - category counts under projects/* (excluding _project-templates and _shared)

## Scope Decision
- Typography component from library/components is intentionally excluded from projects/components migration scope.
- Reason: typography is covered as a systems concern in projects/systems/typography-tokens.
- Effective migration scope for completion tracking is 41 items.

## Source Inventory

### library/components (13)
- browser-detect
- button
- drag-n-drop
- form-components
- image
- keyboard-keys
- list
- loader
- paint
- pill
- timer
- toast
- typography

### library/patterns (20)
- accordion
- alert
- audio
- card
- card-list
- digital-clock
- form-patterns
- hero
- layouts
- like
- loader
- modal
- navigation
- popup
- progress
- scrollspy
- slider
- tabs
- theme-switch
- toggle-group

### system/templates (9)
- big-frontend-dev
- codepen-challenges
- dev-days-matrix
- free-code-camp
- frontend-mentor
- frontend-practice
- generic-base
- great-frontend
- landing

## Target Inventory

### projects/components (31)
- accordion
- alert
- audio
- browser-detect
- button
- card
- card-list
- digital-clock
- drag-n-drop
- form-components
- form-patterns
- hero
- image
- keyboard-keys
- layouts
- like
- list
- loader
- modal
- navigation
- paint
- pill
- popup
- progress
- scrollspy
- slider
- tabs
- theme-switch
- timer
- toast
- toggle-group

### projects/systems (12)
- act-school-wisdom-accent
- big-frontend-dev
- codepen-challenges
- dev-days-matrix
- free-code-camp
- frontend-mentor
- frontend-practice
- generic-base
- great-frontend
- harmonic-sizes
- landing
- typography-tokens

### Projects Category Counts
- architectures: 0
- components: 31
- compositions: 0
- foundations: 0
- integrations: 0
- interactions: 1 (hoverboard)
- layouts: 0
- multi-page-projects: 0
- reverse-engineering: 6
- systems: 12

### projects/interactions (1)
- hoverboard

### projects/reverse-engineering (6)
- fcc-rwd-example-personal-portfolio-webpage
- landing-page-animated-tawilwind-template
- landing-page-menu-slide
- landing-page-splash-clone
- portfolio-light-and-dark-mode
- portfolio-simplefolio

### projects/multi-page-projects (0)
- none

## Migration Mapping

### Components Mapping (library/components -> projects/components)
- browser-detect -> projects/components/browser-detect (migrated)
- button -> projects/components/button (migrated)
- drag-n-drop -> projects/components/drag-n-drop (migrated)
- form-components -> projects/components/form-components (migrated)
- image -> projects/components/image (migrated)
- keyboard-keys -> projects/components/keyboard-keys (migrated)
- list -> projects/components/list (migrated)
- loader -> projects/components/loader (migrated)
- paint -> projects/components/paint (migrated)
- pill -> projects/components/pill (migrated)
- timer -> projects/components/timer (migrated)
- toast -> projects/components/toast (migrated)
- typography -> projects/components/typography (excluded by scope decision; covered by projects/systems/typography-tokens)

Summary: 12 of 13 migrated, 1 excluded.

### Patterns Mapping (library/patterns -> projects/components)
- accordion -> projects/components/accordion (migrated)
- alert -> projects/components/alert (migrated)
- audio -> projects/components/audio (migrated)
- card -> projects/components/card (migrated)
- card-list -> projects/components/card-list (migrated)
- digital-clock -> projects/components/digital-clock (migrated)
- form-patterns -> projects/components/form-patterns (migrated)
- hero -> projects/components/hero (migrated)
- layouts -> projects/components/layouts (migrated)
- like -> projects/components/like (migrated)
- loader -> projects/components/loader (migrated)
- modal -> projects/components/modal (migrated)
- navigation -> projects/components/navigation (migrated)
- popup -> projects/components/popup (migrated)
- progress -> projects/components/progress (migrated)
- scrollspy -> projects/components/scrollspy (migrated)
- slider -> projects/components/slider (migrated)
- tabs -> projects/components/tabs (migrated)
- theme-switch -> projects/components/theme-switch (migrated)
- toggle-group -> projects/components/toggle-group (migrated)

Summary: 20 of 20 migrated.

### System Templates Mapping (library/system/templates -> projects/systems)
- big-frontend-dev -> projects/systems/big-frontend-dev (migrated)
- codepen-challenges -> projects/systems/codepen-challenges (migrated)
- dev-days-matrix -> projects/systems/dev-days-matrix (migrated)
- free-code-camp -> projects/systems/free-code-camp (migrated)
- frontend-mentor -> projects/systems/frontend-mentor (migrated)
- frontend-practice -> projects/systems/frontend-practice (migrated)
- generic-base -> projects/systems/generic-base (migrated)
- great-frontend -> projects/systems/great-frontend (migrated)
- landing -> projects/systems/landing (migrated)

Summary: 9 of 9 migrated.

## Project-Only Items

### projects/components not present in library/components or library/patterns
- none

### projects/systems not present in library/system/templates
- act-school-wisdom-accent
- harmonic-sizes
- typography-tokens

## Progress Totals
- Source items total: 42 (13 components + 20 patterns + 9 system templates)
- Effective in-scope total: 41 (42 minus excluded typography component target)
- Migrated in-scope items total: 41
- Missing in-scope items total: 0

## Notes
- This inventory is based on current directory existence and slug matching.
- Detailed migration-item checklists remain under _docs/architecture/migration-items/.