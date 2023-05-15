---
title: "Math Game"
type: "widget"
assets: { main-js: "MathGame.widget.js", main-css: "math-game.widget.css" }
---

<div class="widget-math-game__base" data-js-widget="MathGame">
  <div class="widget-math-game__container" id="container">
      <div class="widget-math-game__score" id="score">
          Score: <span id="scorevalue">0</span>
      </div>
      <div class="widget-math-game__correct" id="correct">
          Correct
      </div>
      <div class="widget-math-game__wrong" id="wrong">
          Try again
      </div>
      <div class="widget-math-game__question" id="question">
      </div>
      <div class="widget-math-game__instruction" id="instruction">
          Click on the correct answer
      </div>
      <div class="widget-math-game__choices" id="choices">
          <div id="box1" class="widget-math-game__box"></div>
          <div id="box2" class="widget-math-game__box"></div>
          <div id="box3" class="widget-math-game__box"></div>
          <div id="box4" class="widget-math-game__box"></div>
      </div>
      <div  class="widget-math-game__start-reset" id="startreset">
          Start Game
      </div>
      <div class="widget-math-game__time-remaining" id="timeremaining">
          Time remaining: <span id="timeremainingvalue">60</span> sec
      </div>
      <div class="widget-math-game__game-over" id="gameOver">
      </div>
  </div>

</div>
