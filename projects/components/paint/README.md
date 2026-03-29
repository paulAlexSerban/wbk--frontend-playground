# Paint

A canvas-based freehand drawing app with adjustable brush size, colour picker, and clear button.

**Source:** [50 Projects In 50 Days - HTML, CSS & JavaScript](https://www.udemy.com/course/50-projects-50-days/)

## Concepts

- `canvas-api` — `getContext('2d')`, `arc`, `moveTo`/`lineTo`, `clearRect`
- `mouse-events` — `mousedown`, `mousemove`, `mouseup` for press-and-drag drawing
- `freehand-drawing` — connecting dots with filled circles and stroke lines for smooth paths
- `stateful-ui` — tracking `isPressed`, current `x`/`y`, `size`, and `color` across events

## Commands

```bash
# Development
yarn --cwd projects/components/paint dev

# Production build
yarn --cwd projects/components/paint build
```
