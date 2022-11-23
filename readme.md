# Front-end Component Library

## Tech-stack

[![Traefik](https://img.shields.io/badge/Traefik-v2-green)](https://traefik.io/)
[![NodeJS](https://img.shields.io/badge/NodeJS-14.19.1-green)](https://nodejs.org/docs/latest-v14.x/api/)
[![Docker](https://img.shields.io/badge/Docker-20-blue)](https://docs.docker.com/release-notes/)
[![Nginx](https://img.shields.io/badge/Nginx-1.21.6-green)](https://www.nginx.com/)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-2.0.0-green)](https://semver.org/spec/v2.0.0.html)


## Useful Local Development URLs

- [traefik dashboard](http://localhost:8080/dashboard)
- [frontend-component-collection-service](https://nginx-frontend-component-collection-server.localhost/)

## Start Development
- install pm2 globally and run `pm2 start ecosystem.config.js && pm2 monit` - to start development
  - to stop run `pm2 stop ecosystem.config.js`
  - to delete leftover process in pm2 run `pm2 delete all`
  - `pm2 stop ecosystem.config.js && pm2 delete all`

- in separate terminal tab run `bash scripts/frontend-js-component-library-watch.bash`
- in separate terminal tab run `bash scripts/frontend-living-style-guide-watch.bash`