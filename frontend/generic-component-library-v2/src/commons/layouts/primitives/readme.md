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
-   Center - center an element horizontally
-   Cluster - Cluster components suit any groups of elements that differ in length and are liable to wrap. Buttons that appear together at the end of forms are ideal candidates, as well as lists of tags, keywords, or other meta information. Use the Cluster to align any groups of horizontally laid out elements to the left or right, or in the center.
-   Sidebar - The Sidebar layout is named for the element that forms the diminutive sidebar: the narrower of two adjacent elements. It is a quantum layout, existing simultaneously in one of the two configurations—horizontal and vertical.
-   Switcher - element (based on the bizarrely named Flexbox Holy Albatross ) switches a Flexbox context between a horizontal and a vertical layout at a given, container-based breakpoint.
-   Grid - The Grid layout is a quantum layout, existing simultaneously in one of the two configurations—horizontal and vertical. It is named for the element that forms the diminutive grid: the narrower of two adjacent elements.
-   Frame The Frame is mostly useful for cropping media (videos and images) to a desired aspect ratio. Once you start controlling the aspect ratio, you can of course tailor it to the current circumstances. The Frame is also useful for creating a consistent visual rhythm for images of different sizes.
