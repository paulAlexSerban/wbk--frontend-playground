#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching BE Next.JS Frontend Component Collection"
npm --prefix ../../../backend/frontend-component-collection run watch:public
