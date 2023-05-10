---
title: "Form Wave"
type: "pat"
assets: { main-js: "FormWave.pat.js", main-css: "form-wave.pat.css" }
---

<div class="pat-form-wave__base" data-js-pat="FormWave">
  <div class="pat-form-wave__container">
    <h3 class="cmp-heading__base cmp-heading__base--heading-400">Please Login</h3>
    <form>
      <div class="pat-form-wave__form-control js-form-control">
        <input class="pat-form-wave__input" type="email" required id="email" placeholder="" />
        <label class="pat-form-wave__label" for="email">Email</label>
        <!-- <label>
          <span style="transition-delay: 0ms">E</span>
            <span style="transition-delay: 50ms">m</span>
            <span style="transition-delay: 100ms">a</span>
            <span style="transition-delay: 150ms">i</span>
            <span style="transition-delay: 200ms">l</span>
      </label> -->
      </div>
      <div class="pat-form-wave__form-control js-form-control">
        <input class="pat-form-wave__input" type="password" required id="password" />
        <label class="pat-form-wave__label" for="password">Password</label>
      </div>
      <button class="cmp-button__base">Login</button>
      <p class="cmp-paragraph__text">Don't have an account? <a class="cmp-link__base" href="#">Register</a></p>
    </form>
  </div>
</div>
