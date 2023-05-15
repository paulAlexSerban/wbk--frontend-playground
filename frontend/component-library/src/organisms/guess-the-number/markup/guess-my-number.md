---
title: "Guess My Number"
type: "widget"
assets: { main-js: "GuessMyNumber.widget.js", main-css: "guess-my-number.widget.css" }
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

<div class="widget-guess-my-number__base" data-js-widget="GuessMyNumber">
<header class="widget-guess-my-number__header">
  <p class="widget-guess-my-number__between">(Between 1 and 20)</p>
  <button class="widget-guess-my-number__btn widget-guess-my-number__again js-again">Again!</button>
  <div class="widget-guess-my-number__number js-number">?</div>
</header>
<main class="widget-guess-my-number__main">
  <section class="widget-guess-my-number__left">
    <input type="number" class="widget-guess-my-number__guess js-guess" />
    <button class="widget-guess-my-number__btn widget-guess-my-number__check js-check">Check!</button>
  </section>
  <section class="widget-guess-my-number__right">
    <p class="widget-guess-my-number__message js-message">Start guessing...</p>
    <p class="widget-guess-my-number__label-score ">
      💯 Score: <span class="widget-guess-my-number__score js-score">20</span>
    </p>
    <p class="widget-guess-my-number__label-highscore">
      🥇 Highscore: <span class="widget-guess-my-number__highscore js-highscore">0</span>
    </p>
  </section>
</main>
</div>
