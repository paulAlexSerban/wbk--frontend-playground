# ADR-04.3 Wave 1 Progress

## Status
In progress

## Date
2026-03-30

## Completed

1. libraries/dev-days-matrix-library/src/library/components/browser-detect -> projects/components/browser-detect
2. libraries/dev-days-matrix-library/src/library/components/drag-n-drop -> projects/components/drag-n-drop

## Evidence

- Migration checklist: _docs/architecture/migration-items/browser-detect.md
- Migration checklist: _docs/architecture/migration-items/drag-n-drop.md
- Project path: projects/components/browser-detect
- Project path: projects/components/drag-n-drop
- Build validation: yarn --cwd projects/components/browser-detect build
- Build validation: yarn --cwd projects/components/drag-n-drop build
- Guardrail validation: yarn check:migration:wave0

## Next candidate

- libraries/dev-days-matrix-library/src/library/components/drag-n-drop -> projects/components/drag-n-drop
- libraries/dev-days-matrix-library/src/library/components/keyboard-keys -> projects/components/keyboard-keys
