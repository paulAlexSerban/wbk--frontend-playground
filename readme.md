# JavaScript Component Library

-   A collection of reusable components for JavaScript projects.
-   Scss only components, JavaScript only components, and full components with both JavaScript and Scss.

## Some Useful Development Commands
- `bash modulize.bash -e dev -p install` - Install all dependencies for all modules.
- `bash modulize.bash -e dev -m component-library -p build` - Build the component library.
- `bash modulize.bash -e dev -m dashboard -p start` - Start the dashboard for local development.

### For local development
1. start docker compose setup - `bash modulize.bash -e production -p docker-start`
2. start component library watcher - `bash modulize.bash -e production -p watch`