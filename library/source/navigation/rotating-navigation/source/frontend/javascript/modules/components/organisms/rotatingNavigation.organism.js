// const config = {
//   selectors: {
//     container: ".o-blank__base",
//   },
//   classes: {
//     bookingSeat: ".selected"
//   }
// };

export const rotatingNavigation = (el) => {
  const rotatingNavigationEl = el;

  const init = () => {
    console.log(rotatingNavigationEl);

    const open = document.querySelector(".open");
    const close = document.querySelector(".close");
    const container = document.querySelector(".container");

    open.addEventListener("click", () => container.classList.add("show-nav"));

    close.addEventListener("click", () =>
      container.classList.remove("show-nav")
    );
  };

  init();
};
