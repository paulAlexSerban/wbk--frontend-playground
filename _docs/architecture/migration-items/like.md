# Migration Checklist: like

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/like
- **Target**: projects/components/like
- **Category**: components (confirmed — interactive animation pattern → components per ADR-04 mapping)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (like-image.entry.js), 1 SCSS (like-image.entry.scss), 1 HBS (like-image.entry.hbs)
- External: Font Awesome 5.14.0 via CDN (link in HBS)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Like" --category components --template handlebars-template --slug like`
- [x] Target directory created: projects/components/like

## Files Ported

- [x] `src/_partials/body.hbs` — Font Awesome CDN link, h3 with heart icon, counter span, `.loveMe` image container
- [x] `src/scripts.js` — double-click detection (800ms window); dynamic heart icon creation with coordinate offset tracking; 1000ms removal timeout; incremental counter update
- [x] `src/styles.scss` — Oswald font, `.loveMe` 300×440px with unsplash background image, box-shadow, `@keyframes grow` (scale 0→10, opacity fade), absolute positioning for heart icons

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: double-click-detection, dynamic-font-awesome-icons, animation-sequences, event-coordinate-tracking, incremental-counter; tags: like, heart, animation, interactive, font-awesome, double-click
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/like build` → webpack compiled successfully in 890 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 17 manifests.

## Notes

- Font Awesome loaded via CDN integrity hash (no local copy needed)
- Double-click detection uses 800ms threshold for differentiating from single clicks
- Hearts have 1000ms lifetime before being removed; animation lasts 600ms
- Unsplash image URL hardcoded in CSS (external dependency, no local asset)
