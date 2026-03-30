# Component Architecture: Modular Split Strategy

## Overview
This document outlines how multi-variation components should be organized and split to maintain clean separation of concerns and improve maintainability.

## Architecture Layers

The `slider` component demonstrates the recommended three-layer split:

### 1. **Stylesheets (SCSS)**
**Location**: `src/styles/`

Each variation gets its own scoped stylesheet:
- `_shared.scss` - Page layout, typography, grid, common demo-card styles shared across all variations
- `_[variation-name].scss` - Per-variation specific styles only (e.g., `_background-image-slider.scss`)
- `styles.scss` - Entry point that imports all modules via `@use` only

**Benefits**:
- Easy to locate variation-specific CSS rules
- Prevent style pollution across variations
- `_shared.scss` provides a single place for common infrastructure
- Entry file acts as a clear manifest of all variations

**Example Structure**:
```scss
// styles.scss (entry point)
@use './styles/shared';
@use './styles/background-image-slider';
@use './styles/double-vertical-slider';
@use './styles/image-carousel';
```

### 2. **JavaScript (Handlers)**
**Location**: `src/scripts/`

Each variation's runtime behavior is isolated in its own module:
- `_[variation-name].js` - Exports a single initialization function (e.g., `initBackgroundImageSlider()`)
- `index.js` - Entry point that imports and calls all initializers
- `scripts.js` - Wrapper that simply imports `scripts/index.js`

**Benefits**:
- Easy to add/remove variations without touching main logic
- Event handlers don't interfere between variations (scoped via data attributes)
- Clear initialization contract: each handler is a pure function
- No global state pollution

**Example Structure**:
```javascript
// scripts/index.js (orchestrator)
import { initBackgroundImageSlider } from './_background-image-slider.js';
import { initDoubleVerticalSlider } from './_double-vertical-slider.js';
// ... other imports

initBackgroundImageSlider();
initDoubleVerticalSlider();
// ... call all initializers

// scripts.js (gateway)
import './scripts/index.js';
```

**Naming Convention**:
- Function names: `init[VariationName]()` (camelCase)
- File names: `_[variation-name].js` (kebab-case)
- Data attributes: `data-[variation-name]` (kebab-case)

### 3. **Handlebars Partials (Markup)**
**Location**: `src/_partials/`

Each variation's markup lives in its own partial:
- `_[variation-name].hbs` - Full demo-card article with label, header, and widget markup
- `body.hbs` - Main template that includes all variation partials

**Benefits**:
- Easy to locate and edit variation-specific HTML
- Parent template (`body.hbs`) shows the structure at a glance
- Variations are reusable if needed elsewhere
- Clear semantics: each partial is a self-contained demo card

**Example Structure**:
```handlebars
<!-- src/_partials/body.hbs -->
<section class="slider-grid">
    {{> _background-image-slider}}
    {{> _double-vertical-slider}}
    {{> _image-carousel}}
    {{> _css-carousel}}
    {{> _gallery-grid}}
</section>

<!-- src/_partials/_background-image-slider.hbs -->
<article class="demo-card demo-card--hero" data-background-slider>
    <!-- self-contained demo -->
</article>
```

## Implementation Checklist

When adding a new variation or refactoring an existing component:

### Step 1: Identify Variation Boundaries
- [ ] Determine unique CSS classes/module for the variation
- [ ] List all non-shared styles that apply only to this variation
- [ ] Identify the data attribute selector for JavaScript (e.g., `data-background-slider`)
- [ ] Note all interactive elements (buttons, clickable areas)

### Step 2: Split Styles
- [ ] Create `src/styles/_[variation-name].scss`
- [ ] Copy all variation-specific CSS rules into this file
- [ ] Keep shared infrastructure in `_shared.scss` (grid layout, typography, demo-card wrapper)
- [ ] Add `@use './styles/_[variation-name]';` to `styles.scss` entry point
- [ ] Delete the variation styles from the old monolithic stylesheet

### Step 3: Split JavaScript
- [ ] Create `src/scripts/_[variation-name].js`
- [ ] Extract the variation's event handler block into an exported `init[VariationName]()` function
- [ ] Use scoped selectors: `document.querySelectorAll('[data-variation-name]')`
- [ ] Ensure handler is self-contained: no global state, closures capture all needed context
- [ ] Add import and function call to `src/scripts/index.js`

### Step 4: Split Markup
- [ ] Create `src/_partials/_[variation-name].hbs`
- [ ] Move the complete `<article class="demo-card">` block into the partial
- [ ] Ensure the data attribute selector matches: `data-variation-name`
- [ ] Add `{{> _[variation-name]}}` include to `src/_partials/body.hbs`
- [ ] Delete the markup from the old monolithic template

### Step 5: Documentation & Build
- [ ] Update README.md with the new variation name (if adding new feature)
- [ ] Update manifest.json concepts array (if adding new feature)
- [ ] Run build: `yarn --cwd projects/components/[component] build`
- [ ] Verify no compilation errors and all variations render/interact correctly

## Data Attribute Naming
Maintain consistency with single data attribute per variation:

```html
<!-- Good: single scoped selector -->
<article data-background-slider>
    <button data-hero-prev></button>
    <button data-hero-next></button>
</article>

<!-- Also good: element-specific attributes are nested children -->
<article data-image-carousel>
    <div data-carousel-track></div>
    <button data-carousel-prev></button>
</article>

<!-- Avoid: too many top-level data attributes -->
<div data-carousel data-carousel-image data-carousel-auto></div>
```

## File Organization Summary

```
src/
├── styles.scss              # Entry: imports all variation modules
├── styles/
│   ├── _shared.scss         # Common: page, typography, grid, card wrapper
│   ├── _background-image-slider.scss
│   ├── _double-vertical-slider.scss
│   ├── _image-carousel.scss
│   ├── _css-carousel.scss
│   └── _gallery-grid.scss
├── scripts.js               # Gateway: imports modular handler
├── scripts/
│   ├── index.js             # Orchestrator: imports and inits all handlers
│   ├── _background-image-slider.js
│   ├── _double-vertical-slider.js
│   ├── _image-carousel.js
│   ├── _css-carousel.js
│   └── _gallery-grid.js
└── _partials/
    ├── body.hbs             # Main template: includes all variation partials
    ├── _background-image-slider.hbs
    ├── _double-vertical-slider.hbs
    ├── _image-carousel.hbs
    ├── _css-carousel.hbs
    └── _gallery-grid.hbs
```

## When to Use This Pattern

✅ **Use modular splits when:**
- Component has 2+ variations with different:
  - CSS rules (not just class naming)
  - JavaScript event handlers or interactions
  - Markup structure (HTML elements, layout)
- Component has a playground context (multiple demos on one page)
- You anticipate future variations or reusable demos

❌ **Don't use modular splits when:**
- Variations are simply theme/color differences (use CSS variables instead)
- Single variation with no real demo playground
- Monolithic component that can't be reasonably separated

## Moving Forward

Future multi-variation components should:
1. Create style module for each variation from the start (don't build monolithic first)
2. Write handler as a function exporting initializer (don't put in global scope)
3. Create partial file per variation immediately (don't put huge markup in body.hbs)
4. Document the pattern in the component's README

This ensures maintainability, discoverability, and makes it easy to add new variations iteratively.
