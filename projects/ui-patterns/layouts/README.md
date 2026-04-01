# Layouts

Layouts pattern collection with cards and dashboard sections.

## Note on stacks

### The Problem
We style elements or classes of elements directly, this way we make style declarations belong to elements -
the issue comes with <code>margin</code> which is a property relationship between 2 proximate elements
### The Solution
Style the context, not the individual elements.
<b>Stack</b> as a layout primitive injects margin between elements via their common parent.</p>

## Suggested Improvements
- add container-query variants for layout primitives
- add spacing-token examples for each layout mode
- add min/max content stress tests
