export const config = {
  type: "pat",
  name: "FormValidation",
  selectors: {
    username: ".js-validation-username",
    email: ".js-validation-email",
    password: ".js-validation-password",
    confirmPassword: ".js-validation-confirm-password",
    errorMessage: ".js-validation-message"
  },
  classes: {
    error: "error",
    success: "success"
  }
};
