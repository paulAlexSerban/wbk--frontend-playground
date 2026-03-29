# Migration Checklist: theme-switch

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/patterns/theme-switch
- **Target**: projects/components/theme-switch
- **Category**: components (confirmed — interactive theme pattern → components per ADR-04 mapping)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)
- **Dribbble inspiration**: https://dribbble.com/shots/5958443-Alarm-clock

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (theme-clock.entry.js), 1 SCSS (theme-clock.entry.scss), 1 HBS (theme-clock.entry.hbs)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Theme Switch" --category components --template handlebars-template --slug theme-switch`
- [x] Target directory created: projects/components/theme-switch

## Files Ported

- [x] `src/_partials/body.hbs` — `.toggle` button, `.clock-container` with `.clock` (3 needle divs + center-point), `.time` and `.date` display divs
- [x] `src/scripts.js` — toggle listener toggling `.dark` class on `<html>`; `setTime()` updates clock hands via `scale()` function; `setInterval(setTime, 1000)` for real-time updates
- [x] `src/styles.scss` — CSS custom properties (--primary-color, --secondary-color) swapped on `.dark`; analog clock using transform: rotate; date formatter with day/month/date circle

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: analog-clock, date-time-api, transform-rotate, css-variables, interval-timer, theme-toggling; tags: clock, theme, dark-mode, time, animation, interactive
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/theme-switch build` → webpack compiled successfully in 840 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 18 manifests.

## Notes

- Clock hand calculations use `scale()` helper to map units (0-12 hours, 0-60 minutes/seconds) to rotation degrees (0-360°)
- Theme toggle affects button foreground/background plus entire page via CSS variables with 0.5s transition
- Date display includes formatted day name, month abbreviation, and date in circle badge
- Time uses 12-hour format with AM/PM indicator
