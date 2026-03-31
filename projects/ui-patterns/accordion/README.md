# Accordion

Consolidated accordion playground containing CSS accordion and FAQ collapse variations.

Source: `libraries/dev-days-matrix-library/src/library/patterns/accordion`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `accordion-disclosure` - collapsible content sections using labels and content panels
- `css-only-interaction` - no-JS expansion logic using checkbox/radio state
- `faq-toggle` - click to open or close individual FAQ items
- `multi-variation-demo` - combines CSS and JS-driven accordion patterns

## Commands

```bash
yarn --cwd projects/components/accordion dev
yarn --cwd projects/components/accordion build
```
