# ADR-05.1 Plan: Implement Dashboard Projects Catalog Migration

## Objective

Implement ADR-05 by switching dashboard catalog loading, output artifacts, and preview integrity checks from `libraries` to `projects`.

## Scope

In scope:
- dashboard catalog source strategy
- generator source/destination paths
- preview URL construction and integrity checks
- tests for rendering and integrity contract
- architecture documentation updates

Out of scope:
- dashboard visual redesign
- migration/deletion of remaining legacy libraries
- introducing multi-variation manifest schema

## Work Plan

1. Introduce path resolver for packaged repository and catalog root
- add a reusable resolver for `package/<repo>/<catalog>`
- support environment overrides for CI and deployment

2. Replace catalog source strategies
- remove `componentList.json` dependency as primary contract
- add manifest scanner for packaged projects
- add workspace fallback scanner for `projects/**/manifest.json`
- transform each manifest into normalized dashboard component entries

3. Migrate generator and quality entry points
- update generator source/destination to `projects`
- update quality runner to read generated files from `projects`
- set repository/catalog URL segments for rendering and integrity layers

4. Migrate preview path handling
- update preview URL generation to projects path shape
- keep optional compatibility path for `libraries` mode
- update integrity preview target and asset resolution for project structure

5. Refresh tests
- update rendering URL expectations
- update integrity fixtures and assertions to projects path contract
- execute node test suites directly when workspace engine constraints block yarn

6. Documentation and rollout
- publish ADR-05 and this implementation plan
- run dashboard generator and verify generated artifacts in `package/<repo>/projects`

## Verification Checklist

- [x] `node --test dashboard/core/catalog/*.test.js dashboard/core/rendering/*.test.js dashboard/core/templates/*.test.js dashboard/core/*.test.js dashboard/quality/*.test.js` passes
- [x] `node dashboard` succeeds and reports integrity pass
- [x] generated files exist at `package/<repo>/projects/index.html` and `package/<repo>/projects/index.json`
- [x] preview links in generated HTML target `/projects/<category>/<slug>/index.html`

## Risks And Mitigations

Risk: missing/invalid manifests reduce discoverable cards.
Mitigation: keep validator warnings visible and fail on empty catalogs.

Risk: environment-specific repository name mismatch in preview URLs.
Mitigation: allow explicit overrides via `DASHBOARD_REPOSITORY_SEGMENT` and `DASHBOARD_PACKAGE_REPOSITORY_DIR`.

Risk: legacy checks/scripts still assume libraries output path.
Mitigation: compatibility switch remains available via `DASHBOARD_CATALOG_SEGMENT=libraries` during transition.
