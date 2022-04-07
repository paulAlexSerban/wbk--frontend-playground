import { regexValidator, getFieldName } from "./form.utils";
import { findOne } from "../../../abstracts/dom/find";

const config = {
  selectors: {
    username: "#username",
    email: "#email",
    password: "#password",
    confirmPassword: "#confirmPassword",
    errorMessage: ".form__error-message"
  },
  classes: {
    formControlError: "form__control error",
    formControlSuccess: "form__control success"
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
    formControl.className = config.classes.formControlError;
    const errorMessage = findOne(config.selectors.errorMessage, formControl);
    errorMessage.innerText = message;
  };

  const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = config.classes.formControlSuccess;
  };

  const checkRequired = (inputArr) => {
    console.log(inputArr);
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
    console.log(input);
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
