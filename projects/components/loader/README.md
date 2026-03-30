# Loader

Consolidated loader playground containing kinetic loader and auto-text variations.

Source: `libraries/dev-days-matrix-library/src/library/components/loader`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `css-animation` - triangle borders rotate to create the kinetic loader effect
- `typewriter-effect` - progressively reveals a string in a loop
- `range-input-control` - updates the typewriter speed live
- `multi-variation-demo` - combines both legacy entry points into one project page

## Commands

```bash
yarn --cwd projects/components/loader dev
yarn --cwd projects/components/loader build
```
