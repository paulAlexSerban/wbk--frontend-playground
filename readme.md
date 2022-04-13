# Front-end Component Library [Demo](https://paulalexserban.github.io/frontend-component-library/)

## How to start development
- `make install-core-static` - to install Docker nginx container and start the instance
- `npm run deploy` - to compile and deploy the entire project with all modules and submodules
- `npm run site` and then `make release-site` - to update ./docs and deploy to Github pages 

## Components

## Micro-kernel Architecture (main architecture pattern)

- sometimes referred to as the plug-in architecture is a natural pattern for implementing product-based applications
- consists of two types of architecture components: core system and plug-in modules
- application logic is divided between independent plug-in models and the basic core system, providing extensibility, flexibility, and isolation of application features and custom logic

### Core System

- based on MVC (model-view-control)
- the core system of the micro-kernel architecture pattern traditionally contains only the minimal functionality required to make the system operational

### Plug-in Modules

- using BEM as a naming convention
- based on Atomic Design Pattern, ITCSS, SMACSS and 7-in-1
- the plug-in modules are stand-alone, independent components that contain specialized processing, additional features, and custom code that is meant to enhance or extend the core system to produce additional business capabilities
