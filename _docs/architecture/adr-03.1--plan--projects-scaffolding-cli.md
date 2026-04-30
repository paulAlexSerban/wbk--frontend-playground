# ADR-03.1 Plan: Implement Projects Scaffolding CLI

## Goal

Implement ADR-03 with a minimal, reliable CLI to scaffold projects from `projects/_project-templates`.

## Implementation plan

1. Create CLI entrypoint

- Add `scripts/new-project.js` as a Node ESM executable.
- Implement argument parsing for `--name`, `--category`, `--template`, optional `--slug`, `--description`, `--source`, `--source-url`, and `--dry-run`.

2. Add validation and fail-fast behavior

- Validate required arguments.
- Validate template existence under `projects/_project-templates`.
- Validate category existence under `projects` and reject `_internal` targets.
- Reject creation if destination already exists.

3. Implement copy strategy

- Recursively copy template files to destination.
- Exclude `node_modules`, `dist`, `.git`, and `.DS_Store`.

4. Patch generated metadata

- Update `package.json.name` to `@wbk-frontend-forge/<category>__<slug>` when present.
- Update `manifest.json` values for `name`, `category`, `source`, `sourceUrl`, and optional `description`.
- Ensure non-empty tags by defaulting to `[slug]` if missing.

5. Integrate command in root scripts

- Add `new:project` command in root `package.json`.

6. Verify implementation

- Run help command and at least one dry-run execution.
- Confirm script output and validation messages are clear.

## Rollout notes

- Start by scaffolding one project in each active category to validate assumptions.
- If category creation-on-demand becomes necessary, propose ADR follow-up before changing behavior.

## Success criteria

- A project can be scaffolded with one CLI command.
- Generated project folder is clean (no copied build/dependency artifacts).
- Generated metadata follows repo naming and category conventions.
- Invalid inputs fail with actionable messages.
