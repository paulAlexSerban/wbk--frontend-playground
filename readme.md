# Frontend Forge (forge skills by building with deliberate practice and refinement)

## Overview

Repositoy used as a forge for frontend development skills, where I build various projects, experiments, and examples to refine my understanding of frontend architectures, design patternts, new native frontend APIs, and more. The goal is to create a space for hands-on learning and exploration of frontend concepts, with a focus on practical application and skill development.

## Goal:

When I want to find that thing I built with that used the Observer pattern, I can just search for “observer pattern” and find the project that demonstrates it. When I want to find a good example of a drag-and-drop interaction, I can just search for “drag and drop” and find the project that implements it. This way, I can easily reference my own work and see how different concepts are applied across various projects.

## Folder structure example:

```
/dashboard
/projects
    /foundations <-- HTML/CSS fundamentals, accessibility, screen-reader patterns, focus management, ARIA implementations, keyboard navigation, etc.
        /accessible-modal
        /tribute-page
        /survey-form
        /tables
        /forms

    /components <- isolated UI pieces (cards, modals, accordions, etc.)
        /expanding-cards
        /progress-steps

    /systems <- design systems, UI kits, token systems, theming, component families, documentation sandboxes, etc.
        /design-tokens-foundations
        /component-library-primitives
        /theme-variation-playground

    /interactions <- JS driven behavior (drag and drop, scroll, sliders, gestures, etc.)
        /drag-and-drop-kanban
        /scroll-animation

    /compositions <- multi-component apps (dashboards, trackers, etc.)
        /expense-tracker
        /movie-seat-booking

    /architectures <- pattern-exploration and system design (MVC, Flux, micro-frontends, state-machines, etc.)
        /todo-mvc-pattern
        /flux-counter
        /observer-pattern-demo

    /layouts <- different layout techniques (flexbox, grid, multi-column, responsive patterns, spatial design etc.)
        /flexbox-gallery
        /grid-dashboard

    /integrations <- APIs, browser APIs, external data, storage, etc.
        /weather-app
        /local-storage-todo

    /shared <- reusable code across projects (utilities, styles, and assets used across projects, etc.)
        /css
        /utils
        /test-helpers

    /multi-page-projects <- projects that require multiple HTML pages to demonstrate a concept or pattern (e-commerce site, blog, portfolio, etc.)
        /e-commerce-site
        /personal-blog

    /_project-templates <- base template for new projects (basic HTML structure, CSS reset, common utilities, etc.)
        /basic-html-template
        /handlebars-template
        /e-commerce-template
        /blog-template
        /dashboard-template

/_docs
    /guides <- in-depth explanations of frontend concepts (state management, component design, performance optimization, etc.)
        /state-management-guide
        /component-design-guide
    /best-practices <- tips and recommendations for frontend development (code organization, testing, accessibility, etc.)
        /code-organization-best-practices
        /accessibility-best-practices
```

    /project-templates <- boilerplate code for common project types (e-commerce, blogs, dashboards, etc.)

### Single Project Init Structure:

```
/any-project-name
    /index.hbs
    /styles.scss
    /main.js
    /README.md
    manifest.json
```

### manifest.json example:

```json
{
    "name": "Expanding Cards",
    "source": "50 Projects in 50 Days",
    "description": "A project demonstrating an expanding card UI pattern using HTML, CSS, and JavaScript.",
    "concepts": ["css-transitions", "flexbox", "event-handling", "dom-manipulation"],
    "category": "components",
    "tags": ["ui-patterns", "interactive-design", "frontend-development"],
    "status": "complete",
    "dificulty": "beginner"
}
```

### Notes

- each project is fully self-contained with its own HTML, CSS, and JavaScript files, allowing for easy reference and reuse.
    - every folder under a category has it's own HTML, CSS, and JavaScript files, along with a README.md that explains the project, the concepts it demonstrates, and any relevant details.
    - you can open an project independently in a browser, which is critical for the dashboard to lnk to them and for the developer to iterate without touching anthing else
- the categories are comlpexity/purpose gradient, not atomic design
    - foundations means you are practicing RAW HTML/CSS/JS, no frameworks, no libraries, no build tools, just the basics
    - components means a single isolated UI element, but it can be built with any tools or frameworks you want, as long as it's self-contained and demonstrates a specific UI pattern
    - systems means the focus is on reusable UI foundations across many screens, such as design tokens, spacing/type scales, theming, component families, naming conventions, documentation playgrounds, and how the pieces fit into a coherent design language
    - intaractions means the focus is on JS behavior
    - compositoins means you are combining multiple concerns into a small app
    - architectures means you are exploring design patterns and system design, so the focus is on how the code is organized and structured, not on the UI or interactions
    - layouts means the focus is on CSS layout techniques and patterns, so the projects should demonstrate different ways to structure and arrange content on a page using CSS
    - integrations means the focus is on working with APIs, browser features, and external data sources, so the projects should demonstrate how to fetch data, interact with browser APIs, and manage external resources in a frontend context
    - shared means reusable code that can be used across multiple projects, such as utility functions, common styles, and test helpers, so the focus is on creating modular and reusable code that can be easily integrated into different projects
    - project-templates means boilerplate code for common project types, so the focus is on providing a starting point for new projects with pre-configured structures, styles, and utilities that can be easily customized and extended for specific use cases
- placement rule for design systems
    - if it is an exploratory or learning project that demonstrates a design system idea end-to-end, place it in `/projects/systems`
    - if it becomes reusable package code consumed by multiple projects, promote it into `/libraries/<design-system-name>` and keep only demos or experiments in `/projects/systems`
- the manifest.json is what ties everything to the dashboard
    - the dasboard can recursively scan `/projects` for manifest.json files and use the metadata to organize and display the projects in a user-friendly way, allowing for easy navigation and discovery of projects based on concepts, categories, tags, and other attributes.
