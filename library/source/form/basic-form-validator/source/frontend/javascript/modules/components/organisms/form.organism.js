import { regexValidator, getFieldName } from "./form.utils";
import { findOne } from "../../../abstracts/dom/traversing";
import { addClass, removeClass } from "../../../abstracts/dom/manipulation";

const config = {
  selectors: {
    username: "#username",
    email: "#email",
    password: "#password",
    confirmPassword: "#confirmPassword",
    errorMessage: ".a-validation-message__base"
  },
  classes: {
    formControlError: "t-error",
    formControlSuccess: "t-success"
  }
};

export const form = (el) => {
  const formEl = el;
  const username = findOne(config.selectors.username, formEl);
  const email = findOne(config.selectors.email, formEl);
  const password = findOne(config.selectors.password, formEl);
  const confirmPassword = findOne(config.selectors.confirmPassword, formEl);

  const showError = (input, message) => {
    const formControl = input.parentElement;
    addClass(config.classes.formControlError, input);
    addClass(config.classes.formControlError, formControl);
    const errorMessage = findOne(config.selectors.errorMessage, formControl);
    errorMessage.innerText = message;
  };

  const showSuccess = (input) => {
    const formControl = input.parentElement;
    addClass(config.classes.formControlSuccess, input);
    removeClass(config.classes.formControlError, input);
    addClass(config.classes.formControlSuccess, formControl);
    removeClass(config.classes.formControlError, formControl);
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
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
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
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      checkRequired([username, email, password, confirmPassword]);
      checkLength(username, 3, 15);
      checkLength(password, 6, 25);
      checkEmail(email);
      checkPasswordsMatch(password, confirmPassword);
    });
  };

  const init = () => {
    setupEvents();
  };

  init();
};
