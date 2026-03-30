# Popup

Consolidated popup playground containing modal overlay open and close behavior.

Source: libraries/dev-days-matrix-library/src/library/patterns/popup

## Architecture

- src/styles/_*.scss per variation plus shared layout styles in _shared.scss
- src/scripts/_*.js per interactive variation plus an index.js initializer entry
- src/_partials/_*.hbs per variation; keep body.hbs as composition-only includes

Reference implementation notes: projects/components/slider/ARCHITECTURE.md

## Concepts

- modal-popup: opens and closes a centered popup dialog
- overlay-dismiss: supports close via backdrop click
- action-driven-close: close via explicit CTA or icon button
- single-variation-demo: focused migration of one popup pattern

## Commands

yarn --cwd projects/components/popup dev
yarn --cwd projects/components/popup build
