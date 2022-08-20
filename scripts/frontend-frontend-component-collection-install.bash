#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Frontend Component Collection node_modules"
rm -rfv ../frontend/frontend-component-collection/node_modules
echo "🔧  Installing Frontend Component Collection"
npm --prefix ../frontend/frontend-component-collection install
