#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "📦  Package"
mkdir -p ../component-library
cp -rfv ../../frontend/component-library/dist/* ../component-library