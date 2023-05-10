---
title: "Modal Window"
type: "pat"
assets: { main-js: "ModalWindow.pat.js", main-css: "modal-window.pat.css" }
---

<div class="pat-modal-window__base" data-js-pat="ModalWindow">
  <button class="pat-modal-window__show-modal js-show-modal">Show modal 1</button>
  <button class="pat-modal-window__show-modal js-show-modal">Show modal 2</button>
  <button class="pat-modal-window__show-modal js-show-modal">Show modal 3</button>

  <div class="pat-modal-window__modal pat-modal-window__hidden js-modal">
    <button class="pat-modal-window__close-modal js-close-modal">&times;</button>
    <h2 class="pat-modal-window__heading">I'm a modal window 😍</h1>
    <p class="pat-modal-window__paragraph">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </p>
  </div>
  <div class="pat-modal-window__overlay pat-modal-window__hidden js-overlay"></div>
</div>

## About

-   intrusive interactive component, not passive
-   design structure to organize and hide content, so as not to overwhelm the user
-   When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information
-   Modal dialog displays content that requires user interaction, in a layer above the page
-   best used when there is a requirement the user be made aware of the content being shown, moving focus from the main content to the dialog content
-   Modals provide an opportunity to display content, focused actions or alerts while maintaining the context of an existing view. This limits workflow interruptions and allows for focused communication and user interactions.
