#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Frontend Component Collection"
export NODE_ENV="watch"
npm --prefix ../frontend/frontend-component-collection run watch
