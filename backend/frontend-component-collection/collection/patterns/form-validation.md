---
title: "Form Validation"
type: "pat"
assets: { main-js: "FormValidation.pat.js", main-css: "form-validation.pat.css" }
---

<div class="pat-form-validation__base" data-js-pat="FormValidation">
  <form class="pat-form-validation__container">
    <h2 class="u-heading-form">Register With Us</h2>
    <fieldset class="pat-fieldset__base">
      <label class="cmp-input__label" for="username">Username</label>
      <input class="cmp-input__input js-validation-username" type="text" id="username" placeholder="Enter username" />
      <span class="pat-form-validation__message js-validation-message">Error message</span>
    </fieldset>
    <fieldset class="pat-fieldset__base">
      <label class="cmp-input__label" for="email">Email</label>
      <input class="cmp-input__input js-validation-email" type="text" id="email" placeholder="Enter email" />
      <span class="pat-form-validation__message js-validation-message">Error message</span>
    </fieldset>
    <fieldset class="pat-fieldset__base">
      <label class="cmp-input__label" for="password">Password</label>
      <input class="cmp-input__input js-validation-password" type="password" id="password" placeholder="Enter password" />
      <span class="pat-form-validation__message js-validation-message">Error message</span>
    </fieldset>
    <fieldset class="pat-fieldset__base">
      <label class="cmp-input__label" for="confirmPassword">Confirm Password</label>
      <input class="cmp-input__input js-validation-confirm-password" type="password" id="confirmPassword" data-name="confirm password"
        placeholder="Enter password again" />
      <span class="pat-form-validation__message js-validation-message">Error message</span>
    </fieldset>
    <button class="cmp-button__base cmp-button__base--primary" type="submit">Submit</button>
  </form>
</div>