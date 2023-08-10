#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

if [[ -z $ENV ]]; then
  source ../.env.development
fi

# Parse command-line options
while getopts ":m:p:e:" opt; do
  case $opt in
  e) ENV="$OPTARG" ;;
  *) usage ;;
  esac
done

# Shift the options and arguments so that $1 refers to the first non-option argument
shift $((OPTIND - 1))

# set some default values
if [[ -z $ENV ]]; then
  ENV=dev
fi

echo "Cleaning ./public/*"
rm -rfv ../public/*

ecoh "Creating ./public/* for each module"
mkdir -v ../public
mkdir -v ../public/generic-component-library
mkdir -v ../public/frontend-mentor-library
mkdir -v ../public/dev-days-matrix-library
mkdir -v ../public/big-frontend-dev-library

if [[ $ENV == 'production' ]]; then
  cp -rfv ../../../package/dist/generic-component-library/componentList.json ../public/generic-component-library/componentList.json
  cp -rfv ../../../package/dist/frontend-mentor-library/componentList.json ../public/frontend-mentor-library/componentList.json
  cp -rfv ../../../package/dist/dev-days-matrix-library/componentList.json ../public/dev-days-matrix-library/componentList.json
  cp -rfv ../../../package/dist/big-frontend-dev-library/componentList.json ../public/big-frontend-dev-library/componentList.json
else
  cp -rfv ../../generic-component-library/dist/componentList.json ../public/generic-component-library/componentList.json
  cp -rfv ../../frontend-mentor-library/dist/componentList.json ../public/frontend-mentor-library/componentList.json
  cp -rfv ../../dev-days-matrix-library/dist/componentList.json ../public/dev-days-matrix-library/componentList.json
  cp -rfv ../../big-frontend-dev-library/dist/componentList.json ../public/big-frontend-dev-library/componentList.json
fi

if [[ $ENV == "dev" ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
  export ENV_NAME="dev"
elif [[ $ENV == "gh_pages" ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
  export ENV_NAME="gh_pages"
elif [[ $ENV == 'prod' ]]; then
  echo "Builing ${MODULE_NAME} in $ENV mode"
  export ENV_NAME="prod"
fi

npm --prefix .. run build
