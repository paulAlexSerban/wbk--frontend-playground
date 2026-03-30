# Button

Consolidated button playground containing base button styles and a ripple interaction variation.

Source: `libraries/dev-days-matrix-library/src/library/components/button`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `button-variants` - demonstrates semantic button styles on a shared base component
- `micro-interactions` - includes subtle hover and active transitions
- `ripple-effect` - adds click-position feedback animation to the ripple button
- `multi-variation-demo` - combines legacy base and ripple entries in one page

## Commands

```bash
yarn --cwd projects/components/button dev
yarn --cwd projects/components/button build
```
