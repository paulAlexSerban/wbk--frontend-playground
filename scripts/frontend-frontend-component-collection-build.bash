#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑 Cleaning Frontend Component Collection"
rm -rfv ../frontend/frontend-component-collection/dist
echo "🏗️ Building Frontend Component Collection "
export NODE_ENV=$1
npm --prefix ../frontend/frontend-component-collection run build