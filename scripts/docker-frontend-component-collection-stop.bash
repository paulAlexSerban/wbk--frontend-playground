#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  🐳  STOP Portfolio Website Service docker container"
docker compose --env-file ../config.env \
  --file ../docker/docker-compose.frontend-component-collection.yml \
  down --volumes --rmi all
