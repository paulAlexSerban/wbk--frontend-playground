# Progress Steps

Consolidated progress playground containing step progression controls.

Source: libraries/dev-days-matrix-library/src/library/patterns/progress

## Architecture

- src/styles/\_\*.scss per variation plus shared layout styles in \_shared.scss
- src/scripts/\_\*.js per interactive variation plus an index.js initializer entry
- src/_partials/_\*.hbs per variation; keep body.hbs as composition-only includes

Reference implementation notes: projects/components/slider/ARCHITECTURE.md

## Concepts

- step-progress: visual state progression across numbered milestones
- stateful-controls: previous and next controls update active state
- track-fill: progress bar width reflects active step
- single-variation-demo: focused migration of one progress pattern

## Commands

yarn --cwd projects/components/progress dev
yarn --cwd projects/components/progress build
