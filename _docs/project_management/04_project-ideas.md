# Project Ideas: Showcase-Oriented Backlog

## Status

Living document

## Date

2026-03-31

## Purpose

Curated list of projects to build under `projects/` to demonstrate frontend engineering, system design,
and architecture skills. Organized by category. Each entry includes the project slug, a one-line intent,
the primary skill signal it communicates, and a rough difficulty level.

Legend: (B) beginner / (I) intermediate / (A) advanced / (P) portfolio flagship

---

## architectures (0 of many — high priority for skill signaling)

| Slug                         | Intent                                                                                          | Skill Signal                                                      | Level |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----- |
| `state-machine-ui`           | Model a UI widget (traffic light, multi-step form, drag state) with a pure state machine        | explicit state modeling, finite automata, no framework dependency | A     |
| `observer-pattern-event-bus` | Build a typed pub/sub event bus and wire 3 independent widgets through it                       | decoupled module communication, event-driven architecture         | I     |
| `flux-counter`               | Implement a one-way data-flow counter: action → dispatcher → store → view                       | Flux/Redux mental model without any library                       | I     |
| `mvc-todo`                   | Classic to-do app separated into Model, View, Controller without a framework                    | MVC pattern discipline, separation of concerns                    | I     |
| `micro-frontend-shell`       | Host shell that loads two independently-built remote modules (vanilla ES modules / import maps) | micro-frontends, module isolation, integration contracts          | A     |
| `feature-sliced-module-demo` | Organise a small CRUD app using FSD layers: app / pages / features / entities / shared          | scalable frontend architecture, FSD methodology                   | A     |
| `command-undo-redo`          | Paint-style app with unlimited undo/redo stack via Command pattern                              | Command pattern, history/snapshot management                      | I     |
| `optimistic-ui-update`       | Form that applies an optimistic update locally then reconciles with a mock async response       | resilient UI patterns, conflict resolution, rollback strategy     | A     |

---

## foundations (0 of many — demonstrates raw quality thinking)

| Slug                            | Intent                                                                                       | Skill Signal                                                    | Level |
| ------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----- |
| `accessible-modal-from-scratch` | Focus-trapped, scroll-locked, escape-dismissible modal with zero dependencies                | ARIA authoring, focus management, a11y regression thinking      | A     |
| `keyboard-nav-patterns`         | Demonstrate rover, grid, tree, and combobox keyboard navigation contracts                    | ARIA patterns, keyboard interaction model (W3C APG)             | A     |
| `skip-links-and-landmark-nav`   | Multi-region page with audited skip links, landmarks, and heading hierarchy                  | screen reader compatibility, semantic HTML, audit mindset       | B     |
| `focus-visible-design-tokens`   | Token system for hover/focus/active/disabled ring styles that pass WCAG 2.1 AA               | accessible design tokens, visual state coverage                 | I     |
| `color-contrast-explorer`       | Live contrast ratio inspector built with Canvas 2D color sampling                            | color theory, WCAG math, Canvas API                             | I     |
| `motion-reduced-demo`           | Side-by-side page where every animation has an explicit `prefers-reduced-motion` fallback    | motion accessibility, CSS custom media, progressive enhancement | I     |
| `form-validation-patterns`      | Native constraint validation API augmented with custom error messaging and ARIA live regions | form UX engineering, a11y error communication                   | I     |
| `css-custom-properties-cascade` | Visual demo of CSS variable inheritance, fallbacks, and scope-based theming                  | CSS architecture depth, theming patterns                        | B     |

---

## interactions (1 existing — room to build a strong JS behavior portfolio)

| Slug                        | Intent                                                                                             | Skill Signal                                               | Level |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----- |
| `infinite-scroll`           | Intersection Observer-based list loader with debounced fetch, loading state, and end-of-list guard | Intersection Observer API, async patterns, performance     | I     |
| `virtual-scroll`            | Render only visible list items in a 10k-row list using a scroll-driven viewport window             | DOM virtualisation, performance engineering, scroll math   | A     |
| `drag-drop-kanban`          | Kanban board with multi-column drag-and-drop, touch support, and drop-zone animations              | drag API + touch fallback, accessibility, state management | A     |
| `gesture-swipe-carousel`    | Touch-swipe carousel with snap inertia and pointer events (no library)                             | Pointer Events API, physics simulation, mobile UX          | I     |
| `scroll-driven-animations`  | Use the native CSS Scroll Timeline API to animate a reading-progress bar and reveal cards          | CSS scroll-driven animations, progressive enhancement      | I     |
| `web-animation-api-demo`    | Three animations built with WAAPI: spring, stagger, and sequence orchestration                     | WAAPI, animation orchestration, timing control             | I     |
| `resize-observer-dashboard` | Dashboard that re-lays tiles using ResizeObserver and container queries                            | ResizeObserver API, responsive container logic             | I     |
| `long-press-context-menu`   | Mobile-style long-press action menu using Pointer Events and timers                                | gesture engineering, event cancellation, mobile-first UX   | B     |

---

## layouts (0 of many — pure CSS showcase)

| Slug                          | Intent                                                                                  | Skill Signal                                           | Level |
| ----------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----- |
| `css-grid-magazine`           | Multi-column editorial layout with named grid areas, spanning, and responsive reflow    | CSS Grid advanced, editorial design patterns           | I     |
| `holy-grail-modern`           | Three implementations: float, flexbox, grid — same result, different primitives         | CSS evolution literacy, layout trade-offs              | B     |
| `subgrid-card-alignment`      | Card grid where inner elements align across cards via `subgrid`                         | CSS Subgrid, cross-element alignment                   | I     |
| `container-query-adaptive-ui` | Component that changes its own layout based on container width, not viewport            | CSS Container Queries, component-driven responsiveness | I     |
| `masonry-auto-placement`      | CSS `grid-auto-flow: dense` masonry approximation + JS-enhanced true masonry            | layout algorithms, CSS vs JS masonry trade-offs        | I     |
| `logical-properties-demo`     | Full-page layout using only CSS logical properties (inline/block instead of left/right) | internationalisation, writing-mode awareness           | B     |
| `sticky-table-headers`        | Complex table with sticky headers, frozen first column, and overflow scroll             | overflow engineering, `position: sticky` edge cases    | I     |
| `fluid-typography-grid`       | Page demonstrating `clamp()`-based fluid type scale paired with a fluid column grid     | fluid design systems, `clamp()` + `min()/max()`        | I     |

---

## compositions (0 of many — demonstrates composing components into real UIs)

| Slug                            | Intent                                                                                       | Skill Signal                                                   | Level |
| ------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----- |
| `expense-tracker`               | Budget app: add/edit/delete transactions, running balance, category breakdown chart          | component composition, local state, data derivation            | I     |
| `movie-seat-booking`            | Cinema seat grid with price tiers, seat-state persistence, and booking summary               | grid UX, data binding, localStorage persistence                | I     |
| `pomodoro-timer`                | Timer with work/break cycles, session log, and sound notification                            | state machine in practice, timer accuracy, a11y controls       | I     |
| `quiz-app`                      | Multi-step quiz with progress tracking, per-question scoring, and animated result summary    | multi-step UX, scoring logic, animation orchestration          | I     |
| `notes-with-rich-text-editor`   | Notes app with a basic `contenteditable` rich text toolbar (bold, italic, link)              | document editing, `execCommand` vs input events, selection API | A     |
| `analytics-mini-dashboard`      | Dashboard composing chart, summary cards, date-range filter, and table with mock data        | dashboard UX patterns, layout composition, data shaping        | A/P   |
| `kanban-with-local-persistence` | Full kanban board with drag-and-drop, inline editing, board reset, and IndexedDB persistence | composition + interaction + integration layering               | P     |

---

## integrations (0 of many — browser APIs and external data)

| Slug                           | Intent                                                                                 | Skill Signal                                                       | Level |
| ------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----- |
| `github-user-search`           | Type-ahead search hitting the GitHub public API with debounce and error/empty states   | fetch + debounce, loading/error/empty UX triad                     | I     |
| `offline-first-notes`          | Notes app that works offline, syncs on reconnection via Service Worker + Cache API     | Service Worker lifecycle, offline-first strategy                   | A     |
| `indexeddb-contact-book`       | CRUD contact book backed by IndexedDB with a clean async adapter layer                 | IndexedDB API, async abstraction, storage design                   | I     |
| `web-speech-voice-notes`       | Browser-native speech recognition feeding a live transcript notes pad                  | Web Speech API, streaming input, progressive enhancement           | I     |
| `geolocation-distance-tool`    | Pick two points on a canvas map and compute great-circle distance                      | Geolocation API, Haversine math, Canvas                            | I     |
| `clipboard-and-share-api-demo` | Copy-to-clipboard with fallback and Web Share API for mobile share targets             | modern browser API, graceful degradation strategy                  | B     |
| `battery-and-network-status`   | Live display of battery level and network connection change events                     | BatteryManager API, NetworkInformation API, sensors in the browser | B     |
| `broadcast-channel-sync`       | Two tabs synchronized via BroadcastChannel: toggle dark mode in one, other reflects it | cross-tab communication, BroadcastChannel API                      | I     |

---

## multi-page-projects (0 of many — demonstrates navigation, routing, code organisation)

| Slug                            | Intent                                                                             | Skill Signal                                                | Level |
| ------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----- |
| `developer-portfolio-multipage` | Portfolio with home, about, projects, and contact pages; zero-JS scroll animations | multi-page architecture, performance-first HTML, SEO basics | I     |
| `documentation-site`            | Handlebars-generated docs site: sidebar nav, collapsible sections, code blocks     | static site generation patterns, HBS templating at scale    | A     |
| `e-commerce-product-catalog`    | Product listing, filter, product detail, and cart — client-side routing via hash   | SPA-lite routing, URL contract, component re-use            | A/P   |
| `personal-blog-with-rss`        | HBS-rendered multi-article blog with pagination and an RSS XML feed                | content-first multi-page architecture, feed generation      | I     |

---

## systems (12 existing — deepen design-system depth thinking)

| Slug                     | Intent                                                                                        | Skill Signal                                            | Level |
| ------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| `design-tokens-explorer` | Live token browser: color palette, spacing scale, type scale, motion scale — all token-driven | design token architecture, token taxonomy, tooling      | A/P   |
| `icon-system`            | SVG sprite + `<use>` icon system with size/color token variants and an accessibility audit    | icon architecture, SVG system design, a11y              | I     |
| `css-architecture-demos` | Four SCSS architecture approaches (BEM, utility, ITCSS, layer-based) applied to the same UI   | CSS architecture literacy, trade-off analysis           | A     |
| `dark-mode-system`       | Token-layer dark mode: system preference auto-detection, user override, persistence, no FOUC  | theming architecture, SSR/FOUC prevention, token layers | A/P   |
| `responsive-type-scale`  | Fluid type scale generator that demonstrates modular scale math and `clamp()` output          | type system design, responsive typography               | I     |
| `spacing-density-system` | Compact/default/spacious density tokens applied to a set of components                        | density theming, token composability                    | I     |

---

## Notes

- Start with **architectures** (state-machine, observer, flux) and **foundations** (accessible-modal, keyboard-nav-patterns) — these have the highest
  signal per effort ratio for senior engineering perception.
- For system design depth: `design-tokens-explorer` and `dark-mode-system` are the portfolio flagships in `systems`.
- For breadth: one project in each currently empty category lifts the portfolio from "component collection" to "full-spectrum frontend engineer."
- Each project should include:
    - `manifest.json` with accurate `concepts` and `tags`.
    - `README.md` with: problem statement, architecture decision, trade-offs, known limitations.
    - ADR or inline doc for any non-obvious architectural choice.
