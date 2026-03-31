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

- [x] `src/_partials/body.hbs` + `src/_partials/_keyboard-keys.hbs` — variation partial composed into page shell
- [x] `src/scripts.js` -> `src/scripts/index.js` + `src/scripts/_keyboard-keys.js` — keydown listener retained and scoped to component root
- [x] `src/styles.scss` -> `src/styles/_shared.scss` + `src/styles/_keyboard-keys.scss` — split style architecture with original key-card behavior preserved

## Manifest and README

- [x] `manifest.json` — source/sourceUrl updated; concepts: keyboard-events, event-keycode, event-key, event-code, dom-manipulation; tags: keyboard, keydown, event-listener, interactive
- [x] `README.md` — source link, concepts, dev/build commands

## Verification

- [x] `yarn --cwd projects/components/keyboard-keys build` → webpack compiled successfully in 889 ms
- [x] `yarn check:migration:wave0` → Project manifest category validation passed. Checked 13 manifests.

## Notes

- `event.keyCode` is deprecated in the Web standard but retained as-is to faithfully represent the source material
- No shared SCSS or JS dependencies; fully self-contained
- Suggested improvements:
	- add optional toggle to hide deprecated `event.keyCode`
	- add key history list with capped length for repeated keypress debugging
	- add escape hatch to disable `preventDefault` for non-demo contexts

## Phase 1 Validation (2026-03-31)

- [x] HBS structure split and variation partial introduced
- [x] JS moved to split architecture with scoped root selector
- [x] SCSS moved to split architecture with shared + component modules
- [ ] Runtime parity smoke-check in browser (manual)
