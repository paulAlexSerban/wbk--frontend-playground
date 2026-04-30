# Keyboard Keys

Displays the key name, keyCode, and code values when any keyboard key is pressed.

## Improvements and expansions to consider:

- `event.keyCode` is deprecated in the Web standard but retained as-is to faithfully represent the source material
- No shared SCSS or JS dependencies; fully self-contained
- Suggested improvements:
    - add optional toggle to hide deprecated `event.keyCode`
    - add key history list with capped length for repeated keypress debugging
    - add escape hatch to disable `preventDefault` for non-demo contexts
    - add support for key combinations (e.g. Ctrl + C) and modifier keys (e.g. Shift, Alt)
        - add support for international keyboard layouts and localization of key names
        - add support for accessibility features such as screen reader announcements of key presses and ARIA roles/states for interactive elements
        - add support for different display modes (e.g. light/dark theme, compact/expanded view)
        - add support for customizable key mappings and user-defined key aliases
        - add support for visualizing key press duration and repeat events for long presses
        - add support for touch and virtual keyboard events on mobile devices
