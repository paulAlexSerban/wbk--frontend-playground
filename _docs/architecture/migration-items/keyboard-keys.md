# Migration Checklist: keyboard-keys

## Item Identification

- **Source**: libraries/dev-days-matrix-library/src/library/components/keyboard-keys
- **Target**: projects/components/keyboard-keys
- **Category**: components (confirmed — single interactive UI component)
- **Source attribution**: 50 Projects In 50 Days - HTML, CSS & JavaScript (Udemy)

## Dependency Review

- JS deps: none
- SCSS deps: none
- Entry files: 1 JS (event-key-codes.entry.js), 1 SCSS (event-key-codes.entry.scss), 1 HBS (event-key-codes.entry.hbs)
- Wave 1 tier: Strict

## Project Scaffold

- [x] `yarn new:project --name "Keyboard Keys" --category components --template handlebars-template --slug keyboard-keys`
- [x] Target directory created: projects/components/keyboard-keys

## Files Ported

- [x] `src/_partials/body.hbs` — `#insert` div with initial `.key` prompt text
- [x] `src/scripts.js` — `keydown` listener on `window`; renders three `.key` boxes for `event.key`, `event.keyCode`, `event.code`
- [x] `src/styles.scss` — Muli font, `#e1e1e1` body, centered flex layout, `.key` bordered boxes with elevated `<small>` labels, responsive stack at 768px

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: keyboard-events, event-keycode, event-key, event-code, dom-manipulation; tags: keyboard, keydown, event-listener, interactive
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/keyboard-keys build` → webpack compiled successfully in 889 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 13 manifests.

## Notes

- `event.keyCode` is deprecated in the Web standard but retained as-is to faithfully represent the source material
- No shared SCSS or JS dependencies; fully self-contained
