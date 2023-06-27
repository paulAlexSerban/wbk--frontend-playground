#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  🐳  STOP all docker containers"
docker compose --env-file ../.env.development \
  --file ../docker/docker-compose.traefik-proxy.yml \
  --file ../docker/docker-compose.frontend-component-collection.yml \
  down
