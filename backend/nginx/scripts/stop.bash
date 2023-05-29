#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  STOP 🐳  Nginx server"
docker compose --env-file ../config.env \
  --file ../docker/docker-compose.dev.yml \
  down --volumes --rmi all
