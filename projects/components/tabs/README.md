# Tabs

Consolidated tabs playground containing CSS-only and JavaScript-powered navigation tabs.

Source: `libraries/dev-days-matrix-library/src/library/patterns/tabs`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `tabbed-navigation` - switches content panels while keeping users in context
- `css-state-tabs` - controls active panel with form state only
- `js-state-tabs` - controls active panel through button click handlers
- `multi-variation-demo` - combines CSS and JS tab patterns

## Commands

```bash
yarn --cwd projects/components/tabs dev
yarn --cwd projects/components/tabs build
```
