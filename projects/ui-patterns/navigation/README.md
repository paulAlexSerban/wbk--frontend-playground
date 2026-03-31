# Navigation

Consolidated navigation playground containing side-nav buttons, a mobile footer navigation demo, and a segmented workspace navigation demo.

Source: `libraries/dev-days-matrix-library/src/library/patterns/navigation`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `interactive-navigation` - demonstrates hover and click-driven navigation states
- `hover-reveal-links` - slides side navigation tabs in from the left edge
- `tabbed-mobile-navigation` - swaps active mobile panels when footer items are pressed
- `segmented-workspace-navigation` - toggles inline application sections without leaving the page
- `multi-variation-demo` - combines multiple navigation patterns into one project page

## Commands

```bash
yarn --cwd projects/components/navigation dev
yarn --cwd projects/components/navigation build
```
