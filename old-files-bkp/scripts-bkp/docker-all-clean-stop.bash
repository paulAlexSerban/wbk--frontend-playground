#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  STOP ALL 🐳  Docker and clean containers"
docker compose --env-file ../.env.development \
  --file ../docker/docker-compose.traefik-proxy.yml \
  --file ../docker/docker-compose.frontend-component-collection.yml \
  down --volumes --rmi all
docker container prune -f
docker volume prune -f
docker image prune -af
