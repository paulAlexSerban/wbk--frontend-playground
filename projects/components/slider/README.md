# Slider

Consolidated slider playground containing background, vertical, carousel, CSS-only carousel, and gallery grid pagination variations.

Source: `libraries/dev-days-matrix-library/src/library/patterns/slider`

## Architecture

This component demonstrates the recommended **modular split pattern** for multi-variation components:

- **Styles**: Per-variation SCSS modules in `src/styles/` + shared base in `_shared.scss`
- **Scripts**: Per-variation handlers in `src/scripts/` + orchestrator in `index.js`
- **Markup**: Per-variation partials in `src/_partials/` + body.hbs includes them

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete guidance on organizing multi-variation components and how to apply this pattern to future projects.

## Concepts

- `stateful-slider-ui` - updates active slides in response to button presses
- `carousel-controls` - includes previous and next controls for manual slide changes
- `css-scroll-snap` - keeps one carousel variation JavaScript-free using anchors and scroll snapping
- `timed-rotation` - auto-advances the image carousel until the user interacts with it
- `grid-pagination` - multi-page grid layout with dot-based page navigation
- `multi-variation-demo` - combines five legacy entry points into one project page

## Commands

```bash
yarn --cwd projects/components/slider dev
yarn --cwd projects/components/slider build
```
