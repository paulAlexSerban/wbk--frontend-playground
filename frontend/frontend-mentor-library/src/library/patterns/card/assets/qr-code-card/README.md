# QR Code Component (Frontend Mentor - Solution)

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [QR Code Component (Frontend Mentor - Solution)](#qr-code-component-frontend-mentor---solution)
    -   [Table of contents](#table-of-contents)
    -   [Overview](#overview)
        -   [Screenshot](#screenshot)
        -   [Links](#links)
    -   [My process](#my-process)
        -   [Built with](#built-with)
        -   [What I learned](#what-i-learned)
        -   [Continued development](#continued-development)
        -   [Useful resources](#useful-resources)
    -   [Author](#author)
    -   [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![](https://github.com/paulAlexSerban/prj--js-component-lib/blob/main/frontend/generic-component-library/src/library/patterns/card/assets/qr-code-card/screenshots/Screen%20Shot%202023-07-30%20at%2020.31.46.png?raw=true)

### Links

-   Solution URL:
    -   [Markup](https://github.com/paulAlexSerban/prj--js-component-lib/blob/main/frontend/generic-component-library/src/library/patterns/card/markup/qr-code-card.entry.hbs)
    -   [Styles](https://github.com/paulAlexSerban/prj--js-component-lib/blob/main/frontend/generic-component-library/src/library/patterns/card/scss/qr-code-card.entry.scss)
-   Live Site URL: [QR Code Card](https://paulalexserban.github.io/prj--js-component-lib/generic-component-library/library/patterns/card/qr-code-card.html)

## My process

### Built with

-   Semantic HTML5 markup
-   Handlebars for HTML templating
-   SCSS for easier to read CSS and structure
-   CSS Flexbox
-   Mobile-first Development workflow
-   BEM as a naming convention for CSS classes
-   Atomic Design for structuring the project and its components

### What I learned

How to use the "lobotomized owl selector":

```scss
.container {
    * + * {
        margin-top: 1.5rem;
    }
}
```

Custom CSS properties:

```scss
:root {
    --color-white: hsl(0, 0%, 100%);
    --color-grayish-blue: hsl(219, 15%, 55%);
    --color-light-gray: hsl(212, 45%, 89%);
    --color-dark-blue: hsl(218, 44%, 22%);

    --container-background-color: var(--color-white);
    --text-description-color: var(--color-grayish-blue);
    --title-color: var(--color-dark-blue);
    --container-shadow-color: var(--color-light-gray);

    --container-border-radius: 20px;
    --container-box-shadow: 0px 20px 35px 0px var(--container-shadow-color);
}
```

Flex Scss `@mixin`:

```scss
@mixin flex($main: center, $cross: center, $direction: row) {
    display: flex;
    flex-direction: $direction;
    justify-content: $main;
    align-items: $cross;
}

.container {
    @include flex($direction: column);
}
```

Convert-rem Scss `@function`:

```scss
@function convert-rem($px) {
    @if unit($px) != 'px' {
        @warn "Expected argument $px to be of type `px`, instead received: `#{unit($px)}`";
    }

    @if meta.function-exists('div', 'math') {
        @return math.div($px, $default-font-size) * 1rem;
    } @else {
        @return ($px / $default-font-size) * 1rem;
    }
}

.container {
    padding-block: convert-rem(16px);
}
```

### Continued development

**Improve Accessibility**: Focus on improving the accessibility of the project by adding more comprehensive ARIA labels or exploring other accessibility features.

**Enhance Interactivity**: Consider adding more interactivity to the QR code card, such as a hover effect, a click event, or animations.

**Dynamic QR Code Generation**: Work on a feature that allows dynamic QR code generation, enabling users to create their own QR codes.

**Dark Mode**: Develop a dark mode feature for the project. This is an increasingly common feature and good for practice.

**Responsive Design**: Ensure the project is fully responsive and adapts to all screen sizes, including tablets and mobile devices.

**Unit Tests**: To ensure the stability of the project, you could write unit tests for your components and any utility functions you've created.

**Integration with a Backend**: Could build a backend for this project or integrate it with an existing one. This could include features like storing generated QR codes or saving user preferences.

**Localization**: You can make your project available in multiple languages. This could involve setting up a way to translate the text in your project, and would make it more accessible to people from different language backgrounds.

### Useful resources

-   [A List Apart - Axiomatic CSS and Lobotomized Owls](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) - Helped reduce bloat, speed up development, and help automate the styling of arbitrary, dynamic content.

## Author

-   Website - [Paul Serban](https://paulserban.eu)
-   Frontend Mentor - [@paulAlexSerban](https://www.frontendmentor.io/profile/paulAlexSerban)
-   Github - [paulAlexSerban](https://github.com/paulAlexSerban)

## Acknowledgments

I would like to express my gratitude towards a few resources that significantly contributed to the completion of this project.

Firstly, [FreeCodeCamp](https://www.freecodecamp.org/) has been instrumental in providing comprehensive and accessible coding tutorials and challenges. It has been an indispensable resource in my journey towards understanding and applying various web technologies.

Secondly, I would like to acknowledge the wealth of knowledge provided by Jon Duckett's books, specifically "HTML & CSS: Design and Build Websites" and "JavaScript & JQuery: Interactive Front-End Web Development". These books have been my go-to resources for understanding the basics and the intricacies of HTML, CSS, and JavaScript.

All these resources have enriched my understanding of web development and aided me in effectively tackling the challenges posed by this project. I highly recommend them to anyone embarking on their coding journey.
