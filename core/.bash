#!/bin/bash

function initialize () {
	echo "[INFO] --- initialize"
	mkdir -p core/dist/node/app
}

function getSources () {
	initialize \
	echo "[INFO] --- getSources"
	cp -rfv ./core/source/node/package*.json ./core/dist/node & \
	cp -rfv ./core/source/docker/* ./core/dist & \
	cp -rfv ./core/source/app/* ./core/dist/node/app
}

function install () {
	getSources \
	echo "[INFO] --- install"
	docker-compose --env-file .env -f ./core/dist/docker-compose.yml build
}

function up () {
	install \
	echo "[INFO] --- start"
  docker-compose --env-file .env -f ./core/dist/docker-compose.yml up -d
}

up