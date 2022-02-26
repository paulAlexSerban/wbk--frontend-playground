
clean-dist:
	# rm -rfv source/library/*/*/dist/*
	echo 'clean dist directories'

clean-node-modules:
	echo 'clean node_modules'

install-npm-deps:
	npm run install:npm

build-dev:
	cd source && npm run build:dev

start-dev-server:
	cd source && npm start

start-docker:
	docker-compose --env-file .env -f ./core/docker/docker-compose.yml up -d --build
