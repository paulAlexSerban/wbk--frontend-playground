# Migration Checklist: timer

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/timer
- **Target**: projects/components/timer
- **Category**: components (confirmed — interactive animated countdown widget)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (animated-countdown.entry.js), 1 SCSS (animated-countdown.entry.scss), 1 HBS (animated-countdown.entry.hbs)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Timer" --category components --template handlebars-template --slug timer`
- [x] Target directory created: projects/components/timer

## Files Ported

- [x] `src/_partials/body.hbs` — `.counter` div with `.nums` containing 4 spans (3-2-1-0); `.final` div with GO and replay button
- [x] `src/scripts.js` — `runAnimation()` orchestrates countdown via `animationend` listeners; `resetDOM()` resets for replay; state machine toggles (in → out) sequence the flow
- [x] `src/styles.scss` — `.counter` and `.final` centered via fixed + transform; `@keyframes goIn/goOut` with rotation (120° ↔ 0°) and spin effects; `hide/show` scale animations; button hover animation (padding-right + arrow)

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: css-animations, animation-events, dom-manipulation, timing-state-machine, keyframe-transforms; tags: timer, countdown, animation, interactive, replay
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/timer build` → webpack compiled successfully in 751 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 15 manifests.

## Notes

- Complex animation state machine: relies on animationend events to sequence through 3 → 2 → 1 → 0 → GO
- No external timers or intervals; purely CSS-driven timeline via keyframes
