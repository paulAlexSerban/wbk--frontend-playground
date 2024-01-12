# Layouts

-   Reusable Layout patterns
-   Only LAYOUT related properties that can be inherited by the components
-   NO COSMETIC STYLING ALLOWED IN HERE
-   It is useful to have a site/page layout for distributing the main elements.

## Notes

-   each layout requires a container element which etablishes the formatting context for its children - simple elements, without children for which they establish a context, can be through of as 'end nodes' in the layout hierarchy

# Warning

-   do nt create layout entry files, as you will need to import a template that might use one of the template as layout container, and it will create a circular dependency error and crash the app

## Layout Primitives

-   Stack - inject vertical spacings (margin-block) between elements via common parent
-   Box - take care of any styles that can be considered intrinsic to individual elements - styles that are not dictated, inherited, or inferred from meta-layouts to which an individual element may be subjected
