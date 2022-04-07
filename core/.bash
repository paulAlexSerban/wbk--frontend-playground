#!/bin/bash

function install-static () {
  if [ ! -d ./core/dist/ ]; then
    mkdir -p ./core/dist/
  fi
  cp -rfv ./core/source/docker/nginx/* ./core/dist/ &&
  docker-compose --env-file ./core/.env -f ./core/dist/docker-compose.yml up -d --build
}

function stop () {
  docker-compose -f ./core/dist/docker-compose.yml down -v
}

$1