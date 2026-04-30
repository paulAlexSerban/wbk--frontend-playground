# ADR-04.2: Library Items JS and SCSS Dependency Audit

## Status

Accepted

## Date

2026-03-29

## Scope

- Library: libraries/dev-days-matrix-library
- Items discovered from meta.json: 69

## Item counts by namespace

- src/library/components: 12
- src/library/modules: 27
- src/library/patterns: 20
- src/system/products: 1
- src/system/templates: 9

## Per-item dependency notes

### libraries/dev-days-matrix-library/src/library/components/browser-detect

- JS entry files: 1
- SCSS entry files: 0
- JS files total: 1
- SCSS files total: 0
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/button

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: use:sass:color, use:sass:map, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/components/drag-n-drop

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/form-components

- JS entry files: 2
- SCSS entry files: 3
- JS files total: 2
- SCSS files total: 3
- JS deps: Abstracts/js/dom/manipulation, Abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/components/image

- JS entry files: 0
- SCSS entry files: 2
- JS files total: 0
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/components/keyboard-keys

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/loader

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/paint

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/pill

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/components/timer

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/toast

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/components/typography

- JS entry files: 0
- SCSS entry files: 3
- JS files total: 0
- SCSS files total: 3
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/audio-player

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 2
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/book-list

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 5
- SCSS files total: 1
- JS deps: ./BookList/Book, ./BookList/Store, ./BookList/UI, ./UI, ./\_BookList
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/calculator

- JS entry files: 6
- SCSS entry files: 5
- JS files total: 6
- SCSS files total: 5
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/card-list

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/counter

- JS entry files: 3
- SCSS entry files: 3
- JS files total: 3
- SCSS files total: 3
- JS deps: ../../../../\_abstracts/js/functions/stopBubbling
- SCSS deps: use:sass:math, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/dashboard

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/filter

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/form-modules

- JS entry files: 7
- SCSS entry files: 7
- JS files total: 7
- SCSS files total: 7
- JS deps: ../../../../\_abstracts/js/constants/patterns, ../../../../\_abstracts/js/dom/manipulation, ../../../../\_abstracts/js/dom/traversing
- SCSS deps: import:../../\_01_components/typography/link/link.scss, import:../fieldset/fieldset.pat.scss, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/gallery

- JS entry files: 4
- SCSS entry files: 4
- JS files total: 4
- SCSS files total: 4
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/image-comparison-slider

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/list-keeper

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/loader

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/mini-games

- JS entry files: 17
- SCSS entry files: 16
- JS files total: 18
- SCSS files total: 35
- JS deps: ./common/\_confetti.js, jquery
- SCSS deps: forward:breakpoints, forward:colors, use:../variables/variables.scss, use:./cops-and-robbers/article, use:./cops-and-robbers/basepage, use:./cops-and-robbers/boardElements, use:./cops-and-robbers/button, use:./cops-and-robbers/gameGrid, use:./cops-and-robbers/header, use:./cops-and-robbers/main, use:./cops-and-robbers/modal, use:./cops-and-robbers/normalize, use:./cops-and-robbers/player, use:./cops-and-robbers/playground, use:./cops-and-robbers/scoreboard, use:./cops-and-robbers/section, use:./cops-and-robbers/switch, use:./cops-and-robbers/weapons, use:./mixins/mixins.scss, use:./variables/variables.scss, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/movie-seat-booking

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 2
- SCSS files total: 2
- JS deps: ../../../../\_abstracts/js/dom/manipulation, ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/navigation

- JS entry files: 5
- SCSS entry files: 5
- JS files total: 5
- SCSS files total: 5
- JS deps: ../../../../\_abstracts/js/dom/manipulation, ../../../../\_abstracts/js/dom/traversing
- SCSS deps: import:../../\_01_components/typography/link/link.scss, import:../../\_01_components/typography/list-unordered/list-unordered.scss, import:../link-list/link-list.pat.scss, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/note-manager

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/notes

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: marked
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/pagination

- JS entry files: 3
- SCSS entry files: 3
- JS files total: 3
- SCSS files total: 3
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/quiz

- JS entry files: 5
- SCSS entry files: 5
- JS files total: 9
- SCSS files total: 5
- JS deps: ../../../../../\_abstracts/js/dom/traversing, ./Quiz/Controller, ./Quiz/QuizController, ./Quiz/UIController
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/search

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 2
- SCSS files total: 2
- JS deps: axios
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/stopwatch

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/text-generator

- JS entry files: 4
- SCSS entry files: 4
- JS files total: 4
- SCSS files total: 4
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/text-reader

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 3
- SCSS files total: 2
- JS deps: ./joke-teller/voideRSS
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/timer

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 2
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/modules/to-do-list

- JS entry files: 6
- SCSS entry files: 5
- JS files total: 6
- SCSS files total: 5
- JS deps: (none detected)
- SCSS deps: use:sass:math, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/video-player

- JS entry files: 4
- SCSS entry files: 4
- JS files total: 4
- SCSS files total: 4
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/modules/weather-app

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/accordion

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: use:sass:color, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/alert

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:sass:color, use:sass:map, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/audio

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/card-list

- JS entry files: 1
- SCSS entry files: 3
- JS files total: 1
- SCSS files total: 3
- JS deps: ../../../../\_abstracts/js/dom/manipulation, ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/card

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/digital-clock

- JS entry files: 2
- SCSS entry files: 2
- JS files total: 2
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/form-patterns

- JS entry files: 2
- SCSS entry files: 3
- JS files total: 2
- SCSS files total: 3
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/hero

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/layouts

- JS entry files: 0
- SCSS entry files: 12
- JS files total: 0
- SCSS files total: 12
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/like

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/patterns/loader

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/modal

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/navigation

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/patterns/popup

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/progress

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:sass:math, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/scrollspy

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/slider

- JS entry files: 3
- SCSS entry files: 4
- JS files total: 3
- SCSS files total: 4
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/patterns/tabs

- JS entry files: 1
- SCSS entry files: 2
- JS files total: 1
- SCSS files total: 2
- JS deps: ../../../../\_abstracts/js/dom/manipulation, ../../../../\_abstracts/js/dom/traversing
- SCSS deps: use:sass:math, use:~ScssAbstracts

### libraries/dev-days-matrix-library/src/library/patterns/theme-switch

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/library/patterns/toggle-group

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/products/resume

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 15
- JS deps: (none detected)
- SCSS deps: use:../base/functions, use:../base/variables, use:partials/base/base-styles, use:partials/base/functions, use:partials/base/normalize, use:partials/base/typography, use:partials/base/utils, use:partials/base/variables, use:partials/modules/buttons, use:partials/modules/code, use:partials/modules/forms, use:partials/modules/grid, use:partials/modules/lists, use:partials/modules/media-queries, use:partials/modules/spacing, use:partials/modules/tables, use:sass:color, use:sass:math, use:variables

### libraries/dev-days-matrix-library/src/system/templates/big-frontend-dev

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/codepen-challenges

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/dev-days-matrix

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/free-code-camp

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/frontend-mentor

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/frontend-practice

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/generic-base

- JS entry files: 1
- SCSS entry files: 0
- JS files total: 1
- SCSS files total: 0
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/great-frontend

- JS entry files: 0
- SCSS entry files: 1
- JS files total: 0
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: (none detected)

### libraries/dev-days-matrix-library/src/system/templates/landing

- JS entry files: 1
- SCSS entry files: 1
- JS files total: 1
- SCSS files total: 1
- JS deps: (none detected)
- SCSS deps: use:~ScssAbstracts
