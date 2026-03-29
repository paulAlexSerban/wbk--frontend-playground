# Migration Checklist: paint

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/paint
- **Target**: projects/components/paint
- **Category**: components (confirmed — self-contained canvas drawing widget)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (drawing-app.entry.js), 1 SCSS (drawing-app.entry.scss), 1 HBS (drawing-app.entry.hbs)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Paint" --category components --template handlebars-template --slug paint`
- [x] Target directory created: projects/components/paint

## Files Ported

- [x] `src/_partials/body.hbs` — `<canvas id="canvas">` + `.toolbox` with decrease/size/increase buttons, colour input, clear button
- [x] `src/scripts.js` — `mousedown`/`mousemove`/`mouseup` listeners; `drawCircle` and `drawLine` helpers; increase/decrease clamp to 5–50; colour change; clear rect
- [x] `src/styles.scss` — Roboto font, `#f5f5f5` body, column-flex center, steelblue canvas border, `.toolbox` steelblue bar (804px wide), children as square buttons, last-child margin-left auto

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: canvas-api, mouse-events, freehand-drawing, dom-manipulation, stateful-ui; tags: canvas, drawing, paint, interactive, color-picker
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/paint build` → webpack compiled successfully in 834 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 14 manifests.

## Notes

- Canvas dimensions (800×700) match the original exactly
- Toolbox width (804px) matches canvas + border (2px each side) intentionally
