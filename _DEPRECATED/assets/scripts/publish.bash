#!/bin/bash 
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

source ../../.env

echo "🔧  Publisjing assets to AWS S3"
node ../aws/push-assets.js