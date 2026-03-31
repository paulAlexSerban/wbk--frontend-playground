# Toggle Group

Toggle group pattern for segmented controls and stateful options.

Source: `libraries/dev-days-matrix-library/src/library/patterns/toggle-group`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/toggle-group dev
yarn --cwd projects/components/toggle-group build
```
