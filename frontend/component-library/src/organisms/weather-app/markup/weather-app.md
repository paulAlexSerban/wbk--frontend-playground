---
title: "Weather App"
type: "widget"
assets: { main-js: "WeatherApp.widget.js", main-css: "weather-app.widget.css" }
---

<article class="widget-weather-app__base"
        data-js-widget="WeatherApp">
  <div class="widget-weather-app__weather">
    <h2 class="cmp-heading__base
              cmp-heading__base--heading-200
              cmp-heading__base--is-center-aligned
              js-weather-app-city"></h2>
    <img class="cmp-image__icon js-weather-app-image"  src="#" alt="text"/>
    <p class="cmp-paragraph__base
              js-weather-app-description"></p>
    <p class="widget-weather-app__temp-info
              js-weather-app-fahrenheit"></p>
    <p class="widget-weather-app__temp-info
              js-weather-app-celsius"></p>
  </div>

  <div class="widget-weather-app__details-container">
    <div class="pat-navigation-tabs-css__base">
      <input class="pat-navigation-tabs-css__radio pat-navigation-tabs-css__radio--one" id="one" name="group" type="radio" checked />
      <input class="pat-navigation-tabs-css__radio pat-navigation-tabs-css__radio--two" id="two" name="group" type="radio" />
      <input class="pat-navigation-tabs-css__radio pat-navigation-tabs-css__radio--three" id="three" name="group" type="radio" />
      <ul class="pat-navigation-tabs-css__tabs-list">
        <li><label class="pat-navigation-tabs-css__tab pat-navigation-tabs-css__tab--one" id="one-tab" for="one">Min - Max Temperature</label></li>
        <li><label class="pat-navigation-tabs-css__tab pat-navigation-tabs-css__tab--two" id="two-tab" for="two">Longitude and Latitude</label></li>
        <li><label class="pat-navigation-tabs-css__tab pat-navigation-tabs-css__tab--three" id="three-tab" for="three">Humidity - Pressure - Wind Speed</label></li>
      </ul>
      <div class="pat-navigation-tabs-css__panels-list">
        <div class="pat-navigation-tabs-css__panel pat-navigation-tabs-css__panel--one" >
          <p class="widget-weather-app__details">
            <span class="js-weather-app-min"></span>
            <span class="js-weather-app-max"></span>
          </p>
        </div>
        <div class="pat-navigation-tabs-css__panel pat-navigation-tabs-css__panel--two">
          <p class="widget-weather-app__details">
            <span class="js-weather-app-longitude"></span>
            <span class="js-weather-app-latitude"></span>
          </p>
        </div>
        <div class="pat-navigation-tabs-css__panel pat-navigation-tabs-css__panel--three">
          <p class="widget-weather-app__details">
            <span class="cmp-paragraph__base js-weather-app-humidity"></span>
            <span class="cmp-paragraph__base js-weather-app-pressure"></span>
            <span class="cmp-paragraph__base js-weather-app-windSpeed"></span>
          </p>
        </div>
      </div>
    </div>

  </div>

  <div class="widget-weather-app__buttons-group">
    <button class="cmp-button__base js-weather-app-button-celsius active-case">Celsius</button>
    <button class="cmp-button__base js-weather-app-button-fahrenheit">Farenheit</button>
  </div>
</article>
