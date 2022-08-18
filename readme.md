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

## Regression Testing

-install root dependencies

- RUN `npm run install:root`

- check traefik proxy scripts and functionality

  - RUN `bash scripts/docker-traefik-proxy-start.bash`
  - RUN `bash scripts/docker-traefik-proxy-test.bash `
  - RUN `bash scripts/docker-traefik-proxy-stop.bash`

- install frontend-component-collection dependencies

  - RUN `bash scripts/frontend-frontend-component-collection-install.bash`
  - RUN `bash scripts/frontend-living-style-guide-install.bash`

- run linters on projects

  - RUN `bash scripts/frontend-living-style-guide-lint.bash`
  - RUN `bash scripts/frontend-frontend-component-collection-lint.bash`
    - NOTE: this will also lint `./living-style-guide`

- run front-end build
  - RUN `bash scripts/frontend-frontend-component-collection-build.bash development`
  - RUN `bash scripts/frontend-frontend-component-collection-build.bash production`
