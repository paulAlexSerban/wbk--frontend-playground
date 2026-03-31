# Digital Clock

Digital clock patterns with multiple visual and JS variations.

Source: `libraries/dev-days-matrix-library/src/library/patterns/digital-clock`

## Architecture

- `src/styles/_*.scss` split modules with local `_abstracts.scss`
- `src/scripts/_*.js` split modules with `index.js` entry
- `src/_partials/_*.hbs` variation partials composed in `body.hbs`

## Commands

```bash
yarn --cwd projects/components/digital-clock dev
yarn --cwd projects/components/digital-clock build
```
