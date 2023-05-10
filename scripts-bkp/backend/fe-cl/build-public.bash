#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Build BE Next.JS Frontend Component Collection"
npm --prefix ../../../backend/frontend-component-collection run build:public
