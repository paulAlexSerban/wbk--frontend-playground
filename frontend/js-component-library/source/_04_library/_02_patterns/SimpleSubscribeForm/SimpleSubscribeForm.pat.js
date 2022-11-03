import { config } from "./config.js";

(() => {
  const SimpleSubscribeForm = (el) => {
    const global = { state: {}, elements: {} };
    const USERNAME_PATTERN = /^[a-zA-Z]{6,12}$/;

    const init = () => {
      setupDomReferences();
      setupEventListeners();
    };

    const setupDomReferences = () => {
      global.elements.form = document.querySelector(".signup-form");
      global.elements.feedback = document.querySelector(".feedback");
    };

    const submitValidation = () => {
      const username = global.elements.form.username.value;

      if (USERNAME_PATTERN.test(username)) {
        global.elements.feedback.textContent = "that username is valid!";
      } else {
        global.elements.feedback.textContent = "username must contain only letters & be between 6 & 12 characters";
      }
    };

    const liveFeedback = (e) => {
      if (USERNAME_PATTERN.test(e.target.value)) {
        global.elements.form.username.setAttribute("class", "success");
      } else {
        global.elements.form.username.setAttribute("class", "error");
      }
    };

    const setupEventListeners = () => {
      global.elements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        submitValidation();
      });

      global.elements.form.username.addEventListener("keyup", (e) => {
        liveFeedback(e);
      });
    };

    init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
    SimpleSubscribeForm(el);
  });
})();
