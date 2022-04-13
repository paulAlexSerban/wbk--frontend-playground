// const config = {
//   selectors: {
//     container: ".o-waveForm__base",
//   },
//   classes: {
//     bookingSeat: ".selected"
//   }
// };

export const waveFrom = (el) => {
  const waveFormEl = el;

  const init = () => {
    console.log(waveFormEl);
    const labels = document.querySelectorAll(".form-control label");
    const inputs = document.querySelectorAll(".form-control input");

    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) =>
            `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
        )
        .join("");
    });

    inputs.forEach((input) => {
      input.addEventListener("keyup", (e) => {
        if (e.target === input && input.value) {
          input.classList.add('hasValue');
        } else {
          input.classList.remove('hasValue');
        }
      });
    });
  };

  init();
};
