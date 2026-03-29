# Theme Switch

Analog clock with real-time updates and dark/light theme toggle.

**Source:** [50 Projects In 50 Days - HTML, CSS & JavaScript](https://www.udemy.com/course/50-projects-50-days/)

## Concepts

- `analog-clock` — 3 rotating needles (hour, minute, second) scaled to 360° rotations
- `date-time-api` — `new Date()` with `.getHours()`, `.getMinutes()`, `.getSeconds()` updates
- `transform-rotate` — CSS transforms position and rotate clock hands smoothly
- `css-variables` — `--primary-color` and `--secondary-color` swap on theme toggle
- `interval-timer` — `setInterval(setTime, 1000)` refreshes clock every second
- `theme-toggling` — adding/removing `.dark` class on `<html>` element for theme switching

## Commands

```bash
# Development
yarn --cwd projects/components/theme-switch dev

# Production build
yarn --cwd projects/components/theme-switch build
```
