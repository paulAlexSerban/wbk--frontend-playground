// const config = {
//   selectors: {
//     container: ".o-hiddenSearch__base",
//   },
//   classes: {
//     bookingSeat: ".selected"
//   }
// };

export const hiddenSearch = (el) => {
  const hiddenSearchEl = el;

  const init = () => {
    console.log(hiddenSearchEl);

    const search = document.querySelector(".search");
    const btn = document.querySelector(".btn");
    const input = document.querySelector(".input");

    btn.addEventListener("click", () => {
      search.classList.toggle("active");
      input.focus();
    });
  };

  init();
};
