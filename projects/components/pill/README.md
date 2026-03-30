# Pill

Compact pill component with round and active variants for step and status indicators.

Source: `libraries/dev-days-matrix-library/src/library/components/pill`

## Architecture

- `src/styles/_*.scss` per variation plus shared page layout in `_shared.scss`
- `src/scripts/_*.js` per variation plus `index.js` initializer entry
- `src/_partials/_*.hbs` per variation, composed in `body.hbs`

## Concepts

- `status-pill` - compact numeric/state indicator chip
- `active-state` - highlighted border for current step/status
- `component-variation` - inactive and active visual variants

## Commands

```bash
yarn --cwd projects/components/pill dev
yarn --cwd projects/components/pill build
```
