// const config = {
//   selectors: {
//     container: ".o-splitScreenHero__base",
//   },
//   classes: {
//     bookingSeat: ".selected"
//   }
// };

export const splitScreenHero = (el) => {
  const splitScreenHeroEl = el;

  const init = () => {
    console.log(splitScreenHeroEl);
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const container = document.querySelector(".container");

    left.addEventListener("mouseenter", () =>
      container.classList.add("hover-left")
    );
    left.addEventListener("mouseleave", () =>
      container.classList.remove("hover-left")
    );

    right.addEventListener("mouseenter", () =>
      container.classList.add("hover-right")
    );
    right.addEventListener("mouseleave", () =>
      container.classList.remove("hover-right")
    );
  };

  init();
};
