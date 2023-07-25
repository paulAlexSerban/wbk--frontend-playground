#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

source ../.env.development

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

echo "Builing ${MODULE_NAME} in $ENV mode"


echo "Builing ${MODULE_NAME} in $ENV mode"

export ASSETS_PATH=$ASSETS_PATH
npm --prefix .. run build
