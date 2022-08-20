#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "📦  Package Frontend Nginx"
mkdir -p ../package/frontend-component-collection
cp -rfv ../frontend/frontend-component-collection/dist/* ../package/frontend-component-collection