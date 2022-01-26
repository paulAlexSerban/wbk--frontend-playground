clean-dist:
	rm -rfv source/library/*/*/dist/*

install-npm-dependencies:
	cd source && npm install

build-dev:
	cd source && npm run build:dev

start-dev-server:
	cd source && npm start