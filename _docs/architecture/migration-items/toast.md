# Migration Checklist: toast

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/toast
- **Target**: projects/components/toast
- **Category**: components (confirmed — self-contained notification widget)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (toast-notification.entry.js), 1 SCSS (toast-notification.entry.scss), 1 HBS (toast-notification.entry.hbs)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Toast" --category components --template handlebars-template --slug toast`
- [x] Target directory created: projects/components/toast

## Files Ported

- [x] `src/_partials/body.hbs` — `#toasts` container div + `.btn` button
- [x] `src/scripts.js` — `createNotification()` factory with optional message/type; random selection from arrays; `setTimeout` 3000ms auto-remove; event listener on button click
- [x] `src/styles.scss` — rebeccapurple body, white button, fixed `.toasts` bottom-right, toast styles with three colour variants (info→purple, success→green, error→red)

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: dom-creation, dynamic-element-insertion, self-dismissing-timeout, random-message-selection, notification-types; tags: toast, notification, dom-manipulation, interactive, transient-ui
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/toast build` → webpack compiled successfully in 725 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 16 manifests.

## Notes

- Auto-dismiss timeout hardcoded to 3000ms
- Random selection used when no explicit message/type passed to `createNotification()`
