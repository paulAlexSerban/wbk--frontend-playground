# ADR-04.3 Wave 1 Progress

## Status
In progress

## Date
2026-03-30

## Completed

1. libraries/dev-days-matrix-library/src/library/components/browser-detect -> projects/components/browser-detect
2. libraries/dev-days-matrix-library/src/library/components/drag-n-drop -> projects/components/drag-n-drop
3. libraries/dev-days-matrix-library/src/library/components/keyboard-keys -> projects/components/keyboard-keys

## Evidence

- Migration checklist: _docs/architecture/migration-items/browser-detect.md
- Migration checklist: _docs/architecture/migration-items/drag-n-drop.md
- Migration checklist: _docs/architecture/migration-items/keyboard-keys.md
- Project path: projects/components/browser-detect
- Project path: projects/components/drag-n-drop
- Project path: projects/components/keyboard-keys
- Build validation: yarn --cwd projects/components/browser-detect build
- Build validation: yarn --cwd projects/components/drag-n-drop build
- Build validation: yarn --cwd projects/components/keyboard-keys build
- Guardrail validation: yarn check:migration:wave0 (13 manifests)

## Next candidate

- libraries/dev-days-matrix-library/src/library/components/paint -> projects/components/paint
