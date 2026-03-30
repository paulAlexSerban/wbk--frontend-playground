# Generic Base

Generic base page template for demos, proofs of concept, and design-system explorations.

Source: `libraries/dev-days-matrix-library/src/system/templates/generic-base`

## Concepts

- `design-system-demo` - combines content, link, code, and grid showcase sections in one shell
- `shared-grid-layout` - includes a localized 12-column flexbox grid stylesheet under `src/styles/`
- `portable-style-dependencies` - replaces legacy helper-based reset, theme, and typography dependencies with project-local modules

## Commands

```bash
yarn --cwd projects/systems/generic-base dev
yarn --cwd projects/systems/generic-base build
```
