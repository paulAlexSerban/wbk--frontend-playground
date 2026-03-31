# Card List

Card list pattern collection including expanding and pricing variants.

Source: `libraries/dev-days-matrix-library/src/library/patterns/card-list`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/card-list dev
yarn --cwd projects/components/card-list build
```
