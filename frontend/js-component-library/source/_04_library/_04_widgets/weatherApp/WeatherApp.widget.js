import { config } from "./config";
import { getApiUrl } from "./WeatherApp.utils";
import { findOne } from "../../../_01_abstracts/dom/traversing";

(() => {
  
  class WeatherApp {
    constructor() {
      this.init();
    }

    getUserGeolocation() {
      fetch("https://ipapi.co/json/") // Call the fetch function passing the url of the API as a parameter
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          // Code for handling the data you get from the API
          this.latData = data.latitude;
          this.lonData = data.longitude;

          this.latitudeEl.append(this.latData);
          this.longitudeEl.append(this.lonData);

          this.getWeather();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getWeather() {
      fetch(getApiUrl(this.latData, this.lonData))
        .then((weatherData) => weatherData.json())
        .then((weatherData) => {
          console.log(weatherData);
          // Code for handling the data you get from the API
          // fetch image and display weather and icon down below
          const weatherTemp = weatherData.main.temp;
          const iconNumber = weatherData.weather[0].icon;
          const icon = `http://openweathermap.org/img/w/${iconNumber}.png`;
          const weatherDescription = weatherData.weather[0].description;
          const iconImage = `${weatherDescription} image`;
          const cityName = weatherData.name;

          this.weatherImageEl.setAttribute("src", icon);
          this.weatherImageEl.setAttribute("alt", iconImage);

          this.weatherDescriptionEl.append(weatherDescription);
          this.cityName.append(cityName);

          findOne(".js-weather-app-windSpeed").append(weatherData.wind.speed + "km/h");
          findOne(".js-weather-app-pressure").append(weatherData.main.pressure + "º");
          findOne(".js-weather-app-humidity").append(weatherData.main.humidity + "%");

          this.minF = Math.floor((weatherData.main.temp_min * 9) / 5 - 459.67);
          this.maxF = Math.floor((weatherData.main.temp_max * 9) / 5 - 459.67);

          // translate Kelvin to Celsius
          this.celsius = Math.floor(weatherTemp - 273.15);

          this.minCelsius = Math.floor(weatherData.main.temp_min - 273.15);
          this.maxCelsius = Math.floor(weatherData.main.temp_max - 273.15);
          // translate Kelvin to Farenhait T(K) × 9/5 - 459.67
          this.fahrenheit = Math.floor((weatherTemp * 9) / 5 - 459.67);

          // display celsius by default
          findOne(".js-weather-app-celsius").append(this.celsius + "ºC");
          findOne(".js-weather-app-min").append(`Min: ${this.minCelsius} ºC`);
          findOne(".js-weather-app-max").append(`Max: ${this.maxCelsius} ºC`);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    switchCelsius() {
      this.switchBtnFahrenheit.classList.remove("active-case");
      this.switchBtnCelsius.classList.add("active-case");

      // this.tempInfoFahrenheit.empty();
      // findOne("#min").empty();
      // findOne("#max").empty();
      // findOne(".js-weather-app-celsius").append(this.celsius + "ºC");
      // findOne("#min").append(this.minCelsius + "ºC");
      // findOne("#max").append(this.maxCelsius + "ºC");
    }

    switchFahrenheit() {
      this.switchBtnFahrenheit.classList.add("active-case");
      this.switchBtnCelsius.classList.remove("active-case");

      // $(".js-weather-app-celsius").empty();
      // $("#min").empty();
      // $("#max").empty();
      // $(".js-weather-app-fahrenheit").append(fahrenheit + "ºF");
      // $("#min").append(this.minF + "ºF");
      // $("#max").append(this.maxF + "ºF");
    }

    setupDomReferences() {
      this.latitudeEl = findOne(`.${config.selectors.latitude}`);
      this.longitudeEl = findOne(`.${config.selectors.longitude}`);
      this.tempInfoCelsius = findOne(".js-weather-app-celsius");
      this.tempInfoFahrenheit = findOne(".js-weather-app-fahrenheit");
      this.weatherImageEl = findOne(".js-weather-app-image");
      this.weatherDescriptionEl = findOne(".js-weather-app-description");
      this.cityName = findOne(".js-weather-app-city");
      this.switchButton = findOne(".switch-button");
      this.switchBtnFahrenheit = findOne(".js-weather-app-button-fahrenheit");
      this.switchBtnCelsius = findOne(".js-weather-app-button-celsius");
    }

    setupEvents() {
      this.switchBtnCelsius.addEventListener(
        "click",
        () => {
          this.switchCelsius();
        },
        false
      );


      this.switchBtnFahrenheit.addEventListener(
        "click",
        () => {
          this.switchFahrenheit();
        },
        false
      );
    }

    init() {
      this.setupDomReferences();
      this.getUserGeolocation();
      this.setupEvents();

      console.log("weather app");
    }
  }

  document.querySelectorAll('[data-js-widget="WeatherApp"]').forEach((el) => new WeatherApp(el));
})();
