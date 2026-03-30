# ADR-04.3 Wave 1 Progress

## Status
In progress

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
- Project path: projects/systems/big-frontend-dev
- Build validation: yarn --cwd projects/components/browser-detect build
- Build validation: yarn --cwd projects/components/drag-n-drop build
- Build validation: yarn --cwd projects/components/keyboard-keys build
- Build validation: yarn --cwd projects/components/paint build
- Build validation: yarn --cwd projects/components/timer build
- Build validation: yarn --cwd projects/components/toast build
- Build validation: yarn --cwd projects/components/like build
- Build validation: yarn --cwd projects/components/theme-switch build
- Build validation: yarn --cwd projects/components/toggle-group build
- Build validation: yarn --cwd projects/systems/big-frontend-dev build
- Guardrail validation: yarn check:migration:wave0 (20 manifests)

## Migration Lessons

- System templates may include additional CSS via `feLibs ... css` in source partials; this dependency must be copied into local project styles under `src/styles/` during migration.
- Imported dependency styles should be reduced to only code used by the target template, then wired through `src/styles.scss` and validated with a standalone project build.

## Next candidate

- libraries/dev-days-matrix-library/src/system/templates/codepen-challenges -> projects/systems/codepen-challenges
