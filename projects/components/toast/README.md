# Toast

Toast notification system displaying messages in the bottom-right corner, auto-dismissing after 3 seconds.

**Source:** [50 Projects In 50 Days - HTML, CSS & JavaScript](https://www.udemy.com/course/50-projects-50-days/)

## Concepts

- `dom-creation` — dynamically creating `.toast` divs with `document.createElement`
- `dynamic-element-insertion` — appending toasts to `#toasts` container on button click
- `self-dismissing-timeout` — auto-removing toast after 3000ms via `setTimeout`
- `random-message-selection` — picking random messages and types from arrays
- `notification-types` — three classes (info→purple, success→green, error→red) for styling

## Commands

```bash
# Development
yarn --cwd projects/components/toast dev

# Production build
yarn --cwd projects/components/toast build
```
