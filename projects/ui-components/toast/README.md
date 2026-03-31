# Toast

Toast notification patterns for transient status messaging.

Source: `libraries/dev-days-matrix-library/src/library/components/toast`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/toast dev
yarn --cwd projects/components/toast build
```
