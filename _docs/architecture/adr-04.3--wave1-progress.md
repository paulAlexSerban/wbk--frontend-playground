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

## Evidence

- Migration checklist: _docs/architecture/migration-items/browser-detect.md
- Migration checklist: _docs/architecture/migration-items/drag-n-drop.md
- Migration checklist: _docs/architecture/migration-items/keyboard-keys.md
- Migration checklist: _docs/architecture/migration-items/paint.md
- Project path: projects/components/browser-detect
- Project path: projects/components/drag-n-drop
- Project path: projects/components/keyboard-keys
- Project path: projects/components/paint
- Build validation: yarn --cwd projects/components/browser-detect build
- Build validation: yarn --cwd projects/components/drag-n-drop build
- Build validation: yarn --cwd projects/components/keyboard-keys build
- Build validation: yarn --cwd projects/components/paint build
- Guardrail validation: yarn check:migration:wave0 (14 manifests)

## Next candidate

- libraries/dev-days-matrix-library/src/library/components/timer -> projects/components/timer
