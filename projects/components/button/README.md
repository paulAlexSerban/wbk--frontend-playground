# Button

Consolidated button playground containing base button styles and a ripple interaction variation.

## Concepts

- `button-variants` - demonstrates semantic button styles on a shared base component
- `micro-interactions` - includes subtle hover and active transitions
- `ripple-effect` - adds click-position feedback animation to the ripple button
- `multi-variation-demo` - combines legacy base and ripple entries in one page

## Improvements and expansions to consider:
- add keyboard-triggered ripple behavior parity (Enter/Space)
- add explicit button state matrix (`:hover`, `:focus-visible`, `:disabled`)
- centralize color/spacing token usage for easier theme scaling
- add disabled state styles and behavior
- support for icon-only buttons and button groups
- explore accessibility features like focus styles and ARIA attributes
- add unit tests for interaction states and accessibility
- make the component responsive for different screen sizes
- allow customization of colors, sizes, and ripple effect through props or CSS variables
- optimize ripple animation performance and compatibility across browsers
- consider adding a loading state with a spinner or progress indicator
