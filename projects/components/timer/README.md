# Timer

Animated countdown timer (3-2-1-0) with a GO reveal and replay button.

**Source:** [50 Projects In 50 Days - HTML, CSS & JavaScript](https://www.udemy.com/course/50-projects-50-days/)

## Concepts

- `css-animations` — `@keyframes goIn`/`goOut` with rotation transforms
- `animation-events` — listening to `animationend` to sequence the countdown
- `timing-state-machine` — class toggles (`in`, `out`) drive the animation chain
- `dom-manipulation` — toggling `.hide` and `.show` on `.counter` and `.final`
- `keyframe-transforms` — scale and rotation timing coordinating visual effects

## Commands

```bash
# Development
yarn --cwd projects/components/timer dev

# Production build
yarn --cwd projects/components/timer build
```
