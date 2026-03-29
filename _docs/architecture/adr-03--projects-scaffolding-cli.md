# ADR-03: Add A Projects Scaffolding CLI

## Status

Accepted

## Date

2026-03-29

## Context

The repository now standardizes project creation under:

- `projects/<category>/<project-slug>`

And template sources under:

- `projects/_project-templates/<template-name>`

Today, project creation is manual copy/paste plus manual metadata edits (`package.json`, `manifest.json`). That creates repeated friction and easy-to-miss inconsistencies:

- wrong workspace package names
- wrong `manifest.json.category`
- accidental copying of template artifacts (`dist`, `node_modules`)
- drift between intended taxonomy and actual folder placement

## Decision

Introduce a repository-local CLI script at:

- `scripts/new-project.js`

The CLI will:

1. require `--name`, `--category`, and `--template`
2. create a slug from `--name` (or `--slug` override)
3. copy from `projects/_project-templates/<template>` into `projects/<category>/<slug>`
4. exclude `dist/`, `node_modules/`, and `.git` during copy
5. patch generated metadata:
- `package.json.name` -> `@wbk-frontend-forge/<category>__<slug>`
- `manifest.json.name` -> `--name`
- `manifest.json.category` -> `--category`
- `manifest.json.source` and `manifest.json.sourceUrl` via CLI defaults/overrides
6. fail fast when template/category is invalid or target exists
7. support `--dry-run` for safe preview

## Why this is better

1. Removes repetitive manual setup steps
- New projects start from one deterministic command.

2. Preserves taxonomy integrity
- Category is explicit and validated at creation time.

3. Avoids junk in generated projects
- Build artifacts and local dependency directories are not copied.

4. Keeps implementation lightweight
- A plain Node script fits current repo conventions with no new external service/tooling.

## Consequences

### Positive

- Faster and more consistent project bootstrapping.
- Lower chance of broken workspace package naming.
- Better migration velocity from `libraries/` to `projects/`.

### Trade-offs

- CLI must be maintained as template conventions evolve.
- Script currently assumes categories already exist under `projects/`.

These trade-offs are acceptable for the current repository scale and governance model.

## Alternatives considered

1. Continue manual copy + edits
- Rejected: high error rate and repeated toil.

2. Add a larger scaffolding framework
- Rejected: unnecessary complexity for current needs.

3. Store template artifacts and copy them as-is
- Rejected: creates noisy generated projects and install/build confusion.

## Scope boundary

This ADR covers project generation from templates only.

It does not cover:

- automatic category creation
- post-generation dependency installation
- dashboard registration automation beyond manifest updates
