# Theme Switch

Theme switch pattern for toggling visual palettes and UI state.

Source: `libraries/dev-days-matrix-library/src/library/patterns/theme-switch`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/theme-switch dev
yarn --cwd projects/components/theme-switch build
```
