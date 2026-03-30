# ADR-04.3 Wave 1 Progress

## Status
Complete

## Date
2026-03-30

## Completed

1. libraries/dev-days-matrix-library/src/library/components/browser-detect -> projects/components/browser-detect
2. libraries/dev-days-matrix-library/src/library/components/drag-n-drop -> projects/components/drag-n-drop
3. libraries/dev-days-matrix-library/src/library/components/keyboard-keys -> projects/components/keyboard-keys
4. libraries/dev-days-matrix-library/src/library/components/paint -> projects/components/paint
5. libraries/dev-days-matrix-library/src/library/components/timer -> projects/components/timer
6. libraries/dev-days-matrix-library/src/library/components/toast -> projects/components/toast
7. libraries/dev-days-matrix-library/src/library/patterns/like -> projects/components/like
8. libraries/dev-days-matrix-library/src/library/patterns/theme-switch -> projects/components/theme-switch
9. libraries/dev-days-matrix-library/src/library/patterns/toggle-group -> projects/components/toggle-group
10. libraries/dev-days-matrix-library/src/system/templates/big-frontend-dev -> projects/systems/big-frontend-dev
11. libraries/dev-days-matrix-library/src/system/templates/codepen-challenges -> projects/systems/codepen-challenges
12. libraries/dev-days-matrix-library/src/system/templates/dev-days-matrix -> projects/systems/dev-days-matrix
13. libraries/dev-days-matrix-library/src/system/templates/free-code-camp -> projects/systems/free-code-camp
14. libraries/dev-days-matrix-library/src/system/templates/frontend-mentor -> projects/systems/frontend-mentor
15. libraries/dev-days-matrix-library/src/system/templates/frontend-practice -> projects/systems/frontend-practice
16. libraries/dev-days-matrix-library/src/system/templates/generic-base -> projects/systems/generic-base
17. libraries/dev-days-matrix-library/src/system/templates/great-frontend -> projects/systems/great-frontend
18. libraries/dev-days-matrix-library/src/library/components/loader -> projects/components/loader
19. libraries/dev-days-matrix-library/src/library/patterns/navigation -> projects/components/navigation
20. libraries/dev-days-matrix-library/src/library/patterns/slider -> projects/components/slider

## Evidence

- Migration checklist: _docs/architecture/migration-items/browser-detect.md
- Migration checklist: _docs/architecture/migration-items/drag-n-drop.md
- Migration checklist: _docs/architecture/migration-items/keyboard-keys.md
- Migration checklist: _docs/architecture/migration-items/paint.md
- Migration checklist: _docs/architecture/migration-items/timer.md
- Migration checklist: _docs/architecture/migration-items/toast.md
- Migration checklist: _docs/architecture/migration-items/like.md
- Migration checklist: _docs/architecture/migration-items/theme-switch.md
- Project path: projects/components/browser-detect
- Project path: projects/components/drag-n-drop
- Project path: projects/components/keyboard-keys
- Project path: projects/components/paint
- Project path: projects/components/timer
- Project path: projects/components/toast
- Project path: projects/components/like
- Project path: projects/components/theme-switch
- Project path: projects/components/toggle-group
- Project path: projects/components/loader
- Project path: projects/components/navigation
- Project path: projects/components/slider
- Project path: projects/systems/big-frontend-dev
- Project path: projects/systems/codepen-challenges
- Project path: projects/systems/dev-days-matrix
- Project path: projects/systems/free-code-camp
- Project path: projects/systems/frontend-mentor
- Project path: projects/systems/frontend-practice
- Project path: projects/systems/generic-base
- Project path: projects/systems/great-frontend
- Build validation: yarn --cwd projects/components/browser-detect build
- Build validation: yarn --cwd projects/components/drag-n-drop build
- Build validation: yarn --cwd projects/components/keyboard-keys build
- Build validation: yarn --cwd projects/components/paint build
- Build validation: yarn --cwd projects/components/timer build
- Build validation: yarn --cwd projects/components/toast build
- Build validation: yarn --cwd projects/components/like build
- Build validation: yarn --cwd projects/components/theme-switch build
- Build validation: yarn --cwd projects/components/toggle-group build
- Build validation: yarn --cwd projects/components/loader build
- Build validation: yarn --cwd projects/components/navigation build
- Build validation: yarn --cwd projects/components/slider build
- Build validation: yarn --cwd projects/systems/big-frontend-dev build
- Build validation: yarn --cwd projects/systems/codepen-challenges build
- Build validation: yarn --cwd projects/systems/dev-days-matrix build
- Build validation: yarn --cwd projects/systems/free-code-camp build
- Build validation: yarn --cwd projects/systems/frontend-mentor build
- Build validation: yarn --cwd projects/systems/frontend-practice build
- Build validation: yarn --cwd projects/systems/generic-base build
- Build validation: yarn --cwd projects/systems/great-frontend build
- Guardrail validation: yarn check:migration:wave0 (30 manifests)

## Migration Lessons

- System templates may include additional CSS via `feLibs ... css` in source partials; this dependency must be copied into local project styles under `src/styles/` during migration.
- Imported dependency styles should be reduced to only code used by the target template, then wired through `src/styles.scss` and validated with a standalone project build.
- Hidden shared theme stacks can usually be collapsed into smaller project-local modules when the migrated template only needs the rendered outcome, not the full original abstraction chain.
- Multi-entry legacy items can be migrated as a single component playground when the variations are independent; scope each variation's markup, styles, and runtime instead of preserving separate build entries.

## Next candidate

- Wave 1 complete.
