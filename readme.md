# JavaScript Component Library

-   A collection of reusable components for JavaScript projects.
-   Scss only components, JavaScript only components, and full components with both JavaScript and Scss.

## Useful Scripts

-   install all dependencies: `yarn install`

## How to add new module

1. `bash modulize.bash -e dev -m <module-name> -p fe-generate` - will generate new FE module
   @TODO: copy template
   @TODO: find and replace template-module-name-library with module-name

## Backlog

### v2.0 Restructure to Monorepo

-   [ ] Monorepo w. Lerna & Yarn for FE & BE development
    -   [ ] setup yarn instead of npm
    -   [ ] setup workspaces w. lerna
-   [ ] Modulize for local setup w. Docker Compose (traefik, nginx and node.js)
