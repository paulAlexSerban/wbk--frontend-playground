# Scrollspy

Scrollspy interaction pattern with viewport-triggered reveal behavior.

Source: `libraries/dev-days-matrix-library/src/library/patterns/scrollspy`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/scrollspy dev
yarn --cwd projects/components/scrollspy build
```
