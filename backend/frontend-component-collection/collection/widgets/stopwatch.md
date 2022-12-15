---
title: "Stopwatch"
type: "widget"
assets: { main-js: "Stopwatch.widget.js", main-css: "stopwatch.widget.css" }
---
<link href='https://fonts.googleapis.com/css?family=Vollkorn' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

<div class="widget-stopwatch__base" data-js-widget="Stopwatch">
  <div class="widget-stopwatch__container container-fluid">
    <!--Lap Time-->
    <div class="widget-stopwatch__lap" id="lap">
      <span class="js-lapMinutes" id="lapminute">00</span>:
      <span class="js-lapSeconds" id="lapsecond">00</span>:
      <span class="js-lapCentiseconds" id="lapcentisecond">00</span>
    </div>
    <!--Time-->
    <div class="widget-stopwatch__time" id="time">
      <span class="js-timeMinute" id="timeminute">00</span>:
      <span class="js-timeSecond" id="timesecond">00</span>:
      <span class="js-timeCentiseconds" id="timecentisecond">00</span></div>
    <!--Controls-->
    <div class="widget-stopwatch__controlsContainer" id="controlsContainer" class="row">
      <div class="widget-stopwatch__control-row">
        <div  class="widget-stopwatch__control js-control js-startButton">
            Start
        </div>
        <div class="widget-stopwatch__control js-control js-stopButton">
            Stop
        </div>
        <div class="widget-stopwatch__control js-control js-resumeButton">
            Resume
        </div>
      </div>
      <div class="widget-stopwatch__control-row">
        <div class="widget-stopwatch__control js-control js-lapButton">
          Lap
        </div>
        <div class="widget-stopwatch__control js-control js-resetButton">
          Reset
        </div>
      </div>
    </div>
    <!--Laps-->
    <div class="widget-stopwatch__laps js-laps" id="laps"></div>
  </div>
</div>