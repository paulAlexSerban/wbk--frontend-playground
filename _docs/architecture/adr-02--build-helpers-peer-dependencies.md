# ADR-02: Use `peerDependencies` For Shared Build Helpers

## Status

Accepted

## Date

2026-03-29

## Context

We extracted duplicated webpack logic from handlebars-template-based projects into a shared workspace package:

- `projects/_shared/build-helpers`

This package is consumed by projects aligned with:

- `projects/_project-templates/handlebars-template`

The shared package does not produce runtime app code. It composes and configures the host project's build toolchain (`webpack`, loaders, plugins, Babel, Sass). That means it executes inside the consumer project's build process and must stay version-compatible with that process.

Before this ADR, each project duplicated the same build dependencies and config files. That created drift and high maintenance cost.

## Decision

Use `peerDependencies` (not regular `dependencies`) for build toolchain packages in `projects/_shared/build-helpers/package.json`.

Examples of peer-owned packages:

- `webpack`, `webpack-cli`, `webpack-merge`
- `terser-webpack-plugin`
- `babel-loader`, `@babel/core`, `@babel/preset-env`
- `sass`, `sass-loader`, `css-loader`
- `html-webpack-plugin`, `copy-webpack-plugin`, `mini-css-extract-plugin`
- `handlebars-loader`

The monorepo root (`package.json`) becomes the single source of truth for those versions.

## Why this is better

1. Single toolchain version across consumers

- Prevents subtle incompatibilities from multiple webpack/plugin versions in different projects.
- Keeps all handlebars-template-based projects on one verified build stack.

2. Correct ownership model

- `build-helpers` is an adapter over the host build environment, not an isolated runtime library.
- Peer dependencies express exactly that contract: "consumer provides toolchain".

3. Less duplication in project packages

- Each project only depends on `@wbk--frontend-forge/_shared__build-helpers` for build setup reuse.
- Reduces dependency noise and maintenance churn across many project `package.json` files.

4. Clear upgrade path

- Toolchain upgrades are coordinated once at root, tested once across all consumers.
- Avoids piecemeal upgrades that silently diverge project behavior.

5. Better long-term fit for multiple setup families

- As additional shared build setups are added in this package, peer-based ownership scales better than embedding full toolchains per setup.

## Consequences

### Positive

- Lower maintenance and duplication.
- Reduced risk of "works in one project, breaks in another" due to version skew.
- Cleaner dependency graphs in consumer projects.

### Trade-offs

- Requires consumers (or workspace root) to provide peer packages.
- Local installs fail faster when peer ranges are unsatisfied.
- Version governance shifts to root maintainers and must be intentional.

These trade-offs are acceptable because this repository is a monorepo with centralized governance and shared templates.

## Alternatives considered

1. Keep toolchain in each project `dependencies`

- Rejected: duplicates config and versions, guarantees drift over time.

2. Keep toolchain inside `build-helpers` regular `dependencies`

- Rejected: can produce parallel webpack/plugin copies and blurry ownership boundaries.
- Rejected: hides compatibility problems until runtime/build-time conflicts appear.

3. Keep everything duplicated (no shared package)

- Rejected: highest maintenance cost, already shown to drift.

## Implementation notes

- Shared package declares toolchain via `peerDependencies`.
- Root workspace `package.json` pins shared toolchain versions.
- Handlebars-template-based projects depend on shared package and keep thin webpack wrappers.
- Entry overrides remain supported (`entry`, `entryResolver`) to allow project-specific script/style file names without forking shared config.

## Scope boundary

This ADR applies to webpack setup families in `projects/_shared/build-helpers` used by handlebars-template-based projects.

It does not force non-handlebars project families to adopt the same setup; future build families can be added with their own peer contracts.
