# Form Patterns

Interactive form patterns and validation-oriented demos.

Source: `libraries/dev-days-matrix-library/src/library/patterns/form-patterns`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/form-patterns dev
yarn --cwd projects/components/form-patterns build
```
