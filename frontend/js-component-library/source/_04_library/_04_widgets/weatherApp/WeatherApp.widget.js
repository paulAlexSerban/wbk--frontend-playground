import { config } from "./config";
import { getApiUrl } from "./WeatherApp.utils";
import { findOne } from "../../../_01_abstracts/dom/traversing";

(() => {
  const WeatherApp = (el) => {
    const global = { state: {}, elements: {}, data: {} };

    const init = () => {
      setupDomReferences();
      getUserGeolocation();
      setupEventListeners();

      console.log("weather app");
    };

    const getUserGeolocation = () => {
      fetch("https://ipapi.co/json/") // Call the fetch function passing the url of the API as a parameter
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          // Code for handling the data you get from the API
          global.data.latData = data.latitude;
          global.data.lonData = data.longitude;

          global.elements.latitudeEl.append(`Lat: ${global.data.latData}`);
          global.elements.longitudeEl.append(`Lon: ${global.data.lonData}`);

          getWeather();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getWeather = () => {
      fetch(getApiUrl(global.data.latData, global.data.lonData))
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

          global.elements.weatherImage.setAttribute("src", icon);
          global.elements.weatherImage.setAttribute("alt", iconImage);

          global.elements.weatherDescription.append(weatherDescription);
          global.elements.cityName.append(cityName);

          global.elements.windSpeed.append(`Winds: ${weatherData.wind.speed} km/h`);
          global.elements.pressure.append(`Pressure: ${weatherData.main.pressure} º`);
          global.elements.humidity.append(`Humidity: ${weatherData.main.humidity} %`);

          global.data.minFahrenheit = Math.floor((weatherData.main.temp_min * 9) / 5 - 459.67);
          global.data.maxFahrenheit = Math.floor((weatherData.main.temp_max * 9) / 5 - 459.67);

          // translate Kelvin to Celsius
          global.data.celsius = Math.floor(weatherTemp - 273.15);

          global.data.minCelsius = Math.floor(weatherData.main.temp_min - 273.15);
          global.data.maxCelsius = Math.floor(weatherData.main.temp_max - 273.15);
          // translate Kelvin to Fahrenheit T(K) × 9/5 - 459.67
          global.data.fahrenheit = Math.floor((weatherTemp * 9) / 5 - 459.67);

          // display celsius by default
          global.elements.tempInfoCelsius.append(`${global.data.celsius} ºC`);
          global.elements.tempInfoMinTemp.append(`Min: ${global.data.minCelsius} ºC`);
          global.elements.tempInfoMaxTemp.append(`Max: ${global.data.maxCelsius} ºC`);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const switchCelsius = () => {
      global.elements.switchBtnFahrenheit.classList.remove(config.states.active);
      global.elements.switchBtnCelsius.classList.add(config.states.active);

      global.elements.tempInfoFahrenheit.innerHTML = "";
      global.elements.tempInfoCelsius.innerHTML = "";
      global.elements.tempInfoMinTemp.innerHTML = "";
      global.elements.tempInfoMaxTemp.innerHTML = "";
      global.elements.tempInfoCelsius.append(`${global.data.celsius} ºC`);
      global.elements.tempInfoMinTemp.append(`${global.data.minCelsius} ºC`);
      global.elements.tempInfoMaxTemp.append(`${global.data.maxCelsius} ºC`);
    };

    const switchFahrenheit = () => {
      global.elements.switchBtnFahrenheit.classList.add(config.states.active);
      global.elements.switchBtnCelsius.classList.remove(config.states.active);

      global.elements.tempInfoCelsius.innerHTML = "";
      global.elements.tempInfoFahrenheit.innerHTML = "";
      global.elements.tempInfoMinTemp.innerHTML = "";
      global.elements.tempInfoMaxTemp.innerHTML = "";
      global.elements.tempInfoFahrenheit.append(`${global.data.fahrenheit} ºF`);
      global.elements.tempInfoMinTemp.append(`${global.data.minFahrenheit} ºF`);
      global.elements.tempInfoMaxTemp.append(`${global.data.maxFahrenheit} ºF`);
    };

    const setupDomReferences = () => {
      global.elements.latitudeEl = findOne(config.selectors.latitude, el);
      global.elements.longitudeEl = findOne(config.selectors.longitude, el);
      global.elements.tempInfoCelsius = findOne(config.selectors.tempInfoCelsius, el);
      global.elements.tempInfoFahrenheit = findOne(config.selectors.tempInfoFahrenheit, el);
      global.elements.weatherImage = findOne(config.selectors.weatherImage, el);
      global.elements.weatherDescription = findOne(config.selectors.weatherDescription, el);
      global.elements.cityName = findOne(config.selectors.cityName, el);
      global.elements.switchBtnFahrenheit = findOne(config.selectors.switchBtnFahrenheit, el);
      global.elements.switchBtnCelsius = findOne(config.selectors.switchBtnCelsius, el);
      global.elements.tempInfoMinTemp = findOne(config.selectors.tempInfoMinTemp, el);
      global.elements.tempInfoMaxTemp = findOne(config.selectors.tempInfoMaxTemp, el);
      global.elements.windSpeed = findOne(config.selectors.windSpeed, el);
      global.elements.pressure = findOne(config.selectors.pressure, el);
      global.elements.humidity = findOne(config.selectors.humidity, el);
    };

    const setupEventListeners = () => {
      global.elements.switchBtnCelsius.addEventListener(
        "click",
        () => {
          switchCelsius();
        },
        false
      );

      global.elements.switchBtnFahrenheit.addEventListener(
        "click",
        () => {
          switchFahrenheit();
        },
        false
      );
    };

    init();
  };

  document.querySelectorAll(`[data-js-${config.type}=${config.name}]`).forEach((el) => WeatherApp(el));
})();
