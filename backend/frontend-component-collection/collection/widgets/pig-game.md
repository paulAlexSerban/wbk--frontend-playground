---
title: "Pig Game"
type: "widget"
assets: { main-js: "PigGame.widget.js", main-css: "pig-game.widget.css" }
---

<article class="widget-pig-game__base" data-js-widget="PigGame">
  <div class="widget-pig-game__button-container">
    <button class="widget-pig-game__btn widget-pig-game__btn--new js-btn--new">🔄 New game</button>
  </div>
  <div class="widget-pig-game__players">
    <section class="widget-pig-game__player js-player--0 widget-pig-game__player--active">
      <h2 class="widget-pig-game__name" id="name--0">Player 1</h2>
      <p class="widget-pig-game__score" id="score--0">43</p>
      <div class="widget-pig-game__current">
        <p class="widget-pig-game__current-label">Current</p>
        <p class="widget-pig-game__current-score" id="current--0">0</p>
      </div>
    </section>
    <section class="widget-pig-game__player js-player--1">
      <h2 class="widget-pig-game__name" id="name--1">Player 2</h2>
      <p class="widget-pig-game__score" id="score--1">24</p>
      <div class="widget-pig-game__current">
        <p class="widget-pig-game__current-label">Current</p>
        <p class="widget-pig-game__current-score" id="current--1">0</p>
      </div>
    </section>
  </div>
  <img src="/images/dice-5-original.webp" alt="Playing dice" class="widget-pig-game__dice js-dice" />
  <div class="widget-pig-game__button-container">
    <button class="widget-pig-game__btn widget-pig-game__btn--roll js-btn--roll">🎲 Roll dice</button>
    <button class="widget-pig-game__btn widget-pig-game__btn--hold js-btn--hold">📥 Hold</button>
  </div>
</article>
