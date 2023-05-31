#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🟢  START 🐳 Nginx Assets"
docker-compose --env-file ../../config.env \
  --file ../docker-compose.dev.yml \
  up --detach --build
