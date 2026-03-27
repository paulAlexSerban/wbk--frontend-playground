#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

# clean up previous packages
rm -rfv ../package/*

REPOSITORY_NAME=$(node -p "require('../package.json').name")

# Loop through all apps in the libraries directory
for LIBRARY_PATH in ../libraries/*; do
  if [[ -d "$LIBRARY_PATH/dist" ]]; then
    PROJECT_NAME=$(node -p "require('$LIBRARY_PATH/package.json').name")
    
    echo "📦  Package $PROJECT_NAME"
    mkdir -p ../package/$REPOSITORY_NAME/libraries/$PROJECT_NAME
    cp -rfv "$LIBRARY_PATH/dist/"* ../package/$REPOSITORY_NAME/libraries/$PROJECT_NAME
  fi
done
