// const config = {
//   selectors: {
//     container: ".o-expanding-cards__base",
//   },
//   classes: {
//     bookingSeat: ".selected"
//   }
// };

export const expandingCards = (el) => {
  const expandingCardsEl = el;

  const init = () => {
    console.log(expandingCardsEl);

    const panels = document.querySelectorAll(".panel");

    panels.forEach((panel) => {
      panel.addEventListener("click", () => {
        removeActiveClasses();
        panel.classList.add("active");
      });
    });

    function removeActiveClasses() {
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });
    }
  };

  init();
};
