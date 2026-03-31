# Loader

Loader pattern set including CSS animated loading indicators.

Source: `libraries/dev-days-matrix-library/src/library/patterns/loader`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/loader dev
yarn --cwd projects/components/loader build
```
