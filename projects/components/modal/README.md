# Modal

Consolidated modal playground containing modal window interaction pattern.

Source: `libraries/dev-days-matrix-library/src/library/patterns/modal`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `dialog-overlay` - layered overlay and centered dialog surface
- `keyboard-dismiss` - Escape key closes open modal
- `focus-surface` - keeps user attention on a single elevated panel
- `single-variation-demo` - focused migration of one modal pattern

## Commands

```bash
yarn --cwd projects/components/modal dev
yarn --cwd projects/components/modal build
```
