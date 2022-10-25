import { regexValidator, getFieldName } from "./utils";
import { findOne } from "../../../_01_abstracts/dom/traversing";
import { addClass, removeClass } from "../../../_01_abstracts/dom/manipulation";
import { config } from "./config";

(() => {
  const FormValidation = (el) => {
    const global = { state: {}, elements: {} };

    const init = () => {
      setupDomReferences();
      setupEvents();
    };

    const setupDomReferences = () => {
      global.elements.username = findOne(config.selectors.username, el);
      global.elements.email = findOne(config.selectors.email, el);
      global.elements.password = findOne(config.selectors.password, el);
      global.elements.confirmPassword = findOne(config.selectors.confirmPassword, el);
    };

    const showError = (input, message) => {
      const formControl = input.parentElement;
      addClass(config.classes.error, input);
      addClass(config.classes.error, formControl);
      const errorMessage = findOne(config.selectors.errorMessage, formControl);
      errorMessage.innerText = message;
    };

    const showSuccess = (input) => {
      const formControl = input.parentElement;
      addClass(config.classes.success, input);
      removeClass(config.classes.error, input);
      addClass(config.classes.success, formControl);
      removeClass(config.classes.error, formControl);
    };

    const checkRequired = (inputArr) => {
      inputArr.forEach((input) => {
        if (input.value.trim() === "") {
          showError(input, `${getFieldName(input)} is required`);
        } else {
          showSuccess(input);
        }
      });
    };

    const checkEmail = (input) => {
      if (regexValidator(input.value.trim())) {
        showSuccess(input);
      } else {
        showError(input, "Email is not valid");
      }
    };

    const checkLength = (input, min, max) => {
      if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
      } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
      } else {
        showSuccess(input);
      }
    };

    const checkPasswordsMatch = (input1, input2) => {
      if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
      }
    };

    const setupEvents = () => {
      el.addEventListener("submit", (e) => {
        e.preventDefault();
        checkRequired([
          global.elements.username,
          global.elements.email,
          global.elements.password,
          global.elements.confirmPassword,
        ]);
        checkLength(global.elements.username, 3, 15);
        checkLength(global.elements.password, 6, 25);
        checkEmail(global.elements.email);
        checkPasswordsMatch(global.elements.password, global.elements.confirmPassword);
      });
    };

    init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => {
    FormValidation(el);
  });
})();
