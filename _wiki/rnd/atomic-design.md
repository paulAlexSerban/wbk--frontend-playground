# Extended & Refactored Atomic Design

1. Components (Atoms)

-   The foundational design elements that you cannot break down further. For example, buttons, icons, forms, etc.
-   If you can't divide without it becoming useless, then it's a Component or a Component/Atom

2. Patterns (Molecules)

-   Created by combining Components/Atoms to create larger UI components or patterns, like pagination, breadcrumbs, etc.
-   Groups of Components/Atoms that work as a single component with a single function

3. Modules (Organisms)

-   Complex UI patterns comprising of Components/Atoms and Patterns/Molecules. These patterns shape a user interface with cards, navigation bars, logos, search fields, etc.
-   Combinations of multiple Patterns/Molecules and have more than one function
-   Modules/Organisms let us break down the web-page into a series of smaller applications - we can craft pages or screens out of a series of components

4. Widgets (Special Organisms)
