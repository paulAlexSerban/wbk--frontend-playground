# ADR-05: Dashboard Catalog Source Migrates From Libraries To Projects

## Status

Accepted

## Date

2026-03-30

## Context

The repository is migrating from legacy `libraries/*` units to category-first self-contained projects under `projects/<category>/<slug>` with `manifest.json` as the primary metadata contract.

Current dashboard implementation and prior ADRs still assumed a libraries-oriented pipeline:

- metadata source: `componentList.json` per packaged library
- optional fallback: `libraries/*/dist/componentList.json`
- generated artifacts and preview links rooted in `/libraries/...`

This no longer matches the target architecture described in:

- `readme.md` (manifest-first discovery under `projects`)
- `adr-04--libraries-to-projects-migration-taxonomy.md` (taxonomy migration accepted)

## Decision

Dashboard catalog generation is migrated to a projects-first contract.

### 1. Source of truth

Dashboard data is loaded from packaged project manifests:

- primary: `package/<repo>/projects/**/manifest.json`
- fallback: `projects/**/manifest.json`

Manifest files are transformed into the existing dashboard component shape so rendering/runtime layers can keep feature parity.

### 2. Path and URL contract

Generated dashboard artifacts are written to:

- `package/<repo>/projects/index.json`
- `package/<repo>/projects/index.html`

Preview links resolve under:

- `/<repo>/projects/<category>/<slug>/<variation>.html`

For manifest-based projects, the default variation is `index`.

### 3. Repository resolution

Dashboard build resolves the packaged repository directory dynamically from `package/*`.

Overrides are supported for CI/deployment:

- `DASHBOARD_PACKAGE_REPOSITORY_DIR`
- `DASHBOARD_REPOSITORY_SEGMENT`
- `DASHBOARD_CATALOG_SEGMENT`

### 4. Compatibility mode

Integrity and preview path code keeps support for `libraries` mode through `DASHBOARD_CATALOG_SEGMENT=libraries` so legacy snapshots can still be inspected when needed.

## Consequences

Positive:

- aligns dashboard discovery with the new project taxonomy and migration flow
- removes dependency on legacy `componentList.json`
- allows dashboard generation even when only project manifests are available

Trade-offs:

- manifest transformation currently creates one visible variation per project (`index`)
- metadata richness is initially lower than library `componentList.json`-based catalogs

## Acceptance Criteria

- Dashboard generation succeeds with only `projects/**/manifest.json` present.
- Generated `index.html` and `index.json` are emitted under `package/<repo>/projects`.
- Integrity checks validate preview targets and asset references for projects layout.
- No hard dependency remains on `libraries/*/dist/componentList.json`.

## Non-Goals

- redesigning dashboard UI structure
- changing project packaging strategy outside dashboard contract updates
- deleting legacy libraries in this ADR
