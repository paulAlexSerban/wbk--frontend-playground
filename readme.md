# JavaScript Component Library

-   A collection of reusable components for JavaScript projects.
-   Scss only components, JavaScript only components, and full components with both JavaScript and Scss.

## Install Project Dependencies
- `bash modulize.bash -e dev -p install` - Install all dependencies for all modules.

## Start Local Development Dcoker-Compose Setup
2. `bash modulize.bash -e production -p docker-start` - start docker compose setup
3. `bash modulize.bash -e production -p watch` - start component library watcher

## Process and Publish assets to AWS S3
- `bash modulize.bash -e dev -m assets -p process` - Process assets before publishing to AWS.
- `bash modulize.bash -e dev -m assets -p publish` - Publish assets to AWS.

## Component Library Development
1. `bash modulize.bash -e dev -m generic-component-library -p build` - Build the component library to make sure it is up to date and building correctly.
2. `bash modulize.bash -e dev -m generic-component-library -p watch` - Watch the component library for changes and rebuild when changes are detected.

## How to add new module
1. `bash modulize.bash -e dev -m <module-name> -p fe-generate` - will generate new FE module
   @TODO: copy template
   @TODO: find and replace template-module-name-library with module-name
