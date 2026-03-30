# Alert

Consolidated alert playground containing dismissible alert pattern.

Source: `libraries/dev-days-matrix-library/src/library/patterns/alert`

## Architecture

Follow the modular split pattern for future updates:

- `src/styles/_*.scss` per variation plus shared layout styles in `_shared.scss`
- `src/scripts/_*.js` per interactive variation plus an `index.js` initializer entry
- `src/_partials/_*.hbs` per variation; keep `body.hbs` as composition-only includes

Reference implementation notes: `projects/components/slider/ARCHITECTURE.md`

## Concepts

- `dismissible-alert` - remove alert from DOM through close triggers
- `inline-actions` - keep contextual action controls in the alert footer
- `dom-removal` - demonstrates imperative element removal
- `single-variation-demo` - focused migration of one alert pattern

## Commands

```bash
yarn --cwd projects/components/alert dev
yarn --cwd projects/components/alert build
```
