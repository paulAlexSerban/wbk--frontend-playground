# Hero

Hero layout patterns including split-screen interaction.

Source: `libraries/dev-days-matrix-library/src/library/patterns/hero`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/hero dev
yarn --cwd projects/components/hero build
```
