# Webpack Build Helpers Extraction Plan

## Why this change (brutally honest)

Current state in `projects/*/*` (handlebars-based projects) is expensive to maintain and already drifting:

- The webpack setup is duplicated across each project (`build/webpack.common.js`, `build/webpack.dev.js`, `build/webpack.prod.js`, `build/loaders/*`, `build/plugins/index.js`).
- Project `package.json` files duplicate the same webpack/babel/sass/html plugin dependencies and scripts.
- `projects/_shared/build-helpers` exists but is effectively a stub package and not used.
- There is already behavioral drift (`hoverboard` has custom `templateParameters` for `HtmlWebpackPlugin`, others do not), which proves copy-paste scaling is failing.

If this continues, every new project increases maintenance cost and regression risk linearly.

## Goal

Extract shared webpack setup into `projects/_shared/build-helpers` as a first-class workspace package, then make all handlebars-template-based projects consume it with lightweight local config wrappers.

Important scope rule:

- This shared package is consumed only by projects that are created from or aligned with `projects/_project-templates/handlebars-template`.
- Other project families (basic-html, future Vite, etc.) should not depend on this handlebars webpack preset unless intentionally aligned.

## Non-goals

- No migration to Vite/Parcel/etc in this task.
- No redesign of project source structure (`src`, `assets`, `manifest.json`).
- No breaking changes to output contract (`dist` with `scripts.js`, `styles.css`, static assets).

## Target architecture

### 1. Shared package ownership

`projects/_shared/build-helpers` will own:

- Base webpack factories:
    - `createCommonConfig(options)`
    - `createDevConfig(options)`
    - `createProdConfig(options)`
- Shared loader factories:
    - babel loader
    - scss loader
    - handlebars loader
    - assets loader
- Shared plugin factory:
    - css extract
    - html plugin
    - copy plugin
    - remove-style-js plugin
    - progress plugin

### 2. Configuration model

The shared package exports factories, not static config blobs.

Reason:

- Shared defaults stay centralized.
- Projects can opt into small differences (example: `templateParameters` support).
- Future setup variants can be introduced without re-copying whole files.

Config model requirement for entries:

- Default entry discovery remains `src/scripts.js` and `src/styles.scss`.
- Add explicit entry override support so projects can define different script/style files or additional entries without forking config.
- Entry override API should support either:
    - `entry: { scripts: 'src/main.js', styles: 'src/main.scss' }`, or
    - `entryResolver(cwd) => webpackEntryObject` for advanced cases.

### 3. Project-level usage

Each project keeps only thin wrappers:

- `build/webpack.common.js`
- `build/webpack.dev.js`
- `build/webpack.prod.js`

Wrappers import shared factories and pass project-specific options (if any).

Example direction:

```js
const { createCommonConfig } = require('@wbk--frontend-forge/_shared__build-helpers');

module.exports = createCommonConfig({
    entry: {
        scripts: 'src/main.js',
        styles: 'src/theme.scss',
    },
    handlebars: {
        partialDirs: ['src/library', 'src/system'],
        helperDirs: ['build/helpers/handlebars'],
    },
    html: {
        template: 'src/index.hbs',
        inject: false,
    },
});
```

### 4. Setup families (for future build setups)

Do not hardcode a single monolithic "webpack setup" forever. Organize shared package by setup family:

- `setup: 'handlebars-webpack'` as current default/only implemented family.
- Future families can be added (example: `multi-page-webpack`, `library-webpack`) without breaking existing projects.

Expected export shape:

- `createHandlebarsWebpackCommonConfig(options)`
- `createHandlebarsWebpackDevConfig(options)`
- `createHandlebarsWebpackProdConfig(options)`

Optional compatibility aliases can be kept:

- `createCommonConfig` -> handlebars variant (temporary)
- `createDevConfig` -> handlebars variant (temporary)
- `createProdConfig` -> handlebars variant (temporary)

This avoids painting the package into a corner when more build setups are introduced.

## Package design

### package name

Keep existing workspace package name for compatibility:

- `@wbk--frontend-forge/_shared__build-helpers`

### dependencies strategy

Use `peerDependencies` for build toolchain packages to avoid duplicate webpack stacks per project:

- `webpack`
- `webpack-cli`
- `webpack-merge`
- `terser-webpack-plugin`
- `mini-css-extract-plugin`
- `html-webpack-plugin`
- `copy-webpack-plugin`
- `babel-loader`
- `@babel/core`
- `@babel/preset-env`
- `sass-loader`
- `sass`
- `css-loader`
- `handlebars-loader`
- `dotenv`

Optional pragmatic fallback:

- Keep these in `dependencies` during first migration pass if peer-only introduces friction, then harden to peerDependencies in a second pass.

## Migration plan

### Phase 1: Build helper package implementation

1. Implement shared source in `projects/_shared/build-helpers`:
    - `index.js` exports all factories.
    - `src/config/common.js`, `src/config/dev.js`, `src/config/prod.js`.
    - `src/loaders/*.js` and `src/plugins/*.js` or equivalent modules.
2. Preserve current behavior as defaults:
    - Entry points from `src/scripts.js` and `src/styles.scss` when present.
    - Output to `dist`.
    - Existing stats shape.
    - Existing image rules in dev/prod.
3. Add options for controlled variation:
    - `html.templateParameters` callback support.
    - `handlebars.partialDirs`, `handlebars.helperDirs` overrides.
    - `copy.patterns` overrides.

- `entry` and `entryResolver` overrides for non-standard script/style files.

4. Structure exports by setup family (start with handlebars webpack family).

### Phase 2: Template migration first

1. Update `projects/_project-templates/handlebars-template` to consume the shared package.
2. Delete duplicated local loader/plugin implementation from template build folder.
3. Keep only wrappers + project-specific helper files.
4. Ensure wrappers call handlebars-specific exports (not generic names only).

### Phase 3: Project migration

Migrate all current handlebars-based projects:

- `projects/interactions/hoverboard`
- `projects/systems/act-school-wisdom-accent`
- `projects/systems/harmonic-sizes`
- `projects/systems/typography-tokens`

For each project:

1. Add dependency on `@wbk--frontend-forge/_shared__build-helpers`.
2. Replace webpack config internals with wrappers importing handlebars-specific shared factories.
3. Remove duplicated local `build/loaders` and `build/plugins` directories.
4. Keep/retain project `build/helpers/handlebars/*` only when needed by the project.
5. If project uses non-default entry files, configure `entry` override in wrapper.

### Phase 4: Dependency cleanup

1. Remove redundant per-project toolchain dependencies where safe.
2. Keep only project runtime dependencies unique to each project.
3. Validate lockfile/workspace resolution is stable.

### Phase 5: Verification gates

Run for each migrated project:

1. `yarn build`
2. `yarn build:prod`
3. `yarn develop` smoke (start and stop quickly)
4. Output checks:
    - `dist/index.html` exists
    - `dist/scripts.js` exists when `src/scripts.js` exists
    - `dist/styles.css` exists when `src/styles.scss` exists

## Concrete setup checklist

- [x] Implement `projects/_shared/build-helpers/index.js` and internal modules.
- [x] Add/adjust package metadata (`main`, exports, dependencies/peerDependencies).
- [x] Migrate handlebars template to shared factories.
- [x] Migrate hoverboard with preserved manifest `templateParameters` behavior.
- [x] Migrate remaining system projects.
- [x] Remove obsolete duplicated build files from migrated projects.
- [x] Run build verification for all migrated packages.
- [x] Record usage pattern in a short README for future project creation.

Status note:

- Root-level `yarn install` still requires Node `>=24.14.0` per root `package.json` engines. Local validation used project-level build runs.

## Risk assessment

- Risk: `process.cwd()` assumptions break when commands run from wrong directory.
    - Mitigation: all factories continue using `cwd` and project-local relative paths.
- Risk: helper/partial path resolution breaks after centralization.
    - Mitigation: compute paths from project root (`cwd`) and allow explicit overrides.
- Risk: peer dependency mismatch across projects.
    - Mitigation: pin versions in root/workspace and validate with `yarn install` + builds.
- Risk: generic factory names become ambiguous as new build setups are added.
    - Mitigation: adopt setup-specific export names now and keep generic aliases only as compatibility bridge.

## Opinionated constraints going forward

- No more copying `build/loaders` and `build/plugins` into projects.
- Any webpack feature addition must happen first in shared package.
- Project-level webpack files should stay wrappers only.
- New project templates must consume shared helpers by default.
- Handlebars webpack helpers are for handlebars-template-based projects only.
- New build setups must be added as new setup families in shared package, not by mutating handlebars defaults into a god-config.

## Implementation order for this repository

1. Build and export shared webpack factories in `projects/_shared/build-helpers`.
2. Migrate template project first as canonical reference.
3. Migrate `hoverboard` second (because it has the only known custom html parameter behavior).
4. Migrate remaining projects.
5. Validate each package build.

## Acceptance criteria

- One shared webpack implementation lives in `projects/_shared/build-helpers`.
- All handlebars-template-based projects consume that package.
- Duplicated webpack loaders/plugins are removed from project folders.
- Existing project build outputs remain functionally equivalent.
- Adding a new webpack feature requires editing shared package only.
- Projects can override scripts/styles entry paths without forking shared configs.
- Shared package API is structured to add additional build setup families safely.
