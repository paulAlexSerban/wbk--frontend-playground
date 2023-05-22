import { findOne } from "../../../_commons/js/dom/traversing";

export const config = {
    type: "widget",
    name: "WeatherApp",
    selectors: {
        longitude: ".js-weather-app-longitude",
        latitude: ".js-weather-app-latitude",
        tempInfoCelsius: ".js-weather-app-celsius",
        tempInfoFahrenheit: ".js-weather-app-fahrenheit",
        weatherImage: ".js-weather-app-image",
        weatherDescription: ".js-weather-app-description",
        cityName: ".js-weather-app-city",
        switchBtnFahrenheit: ".js-weather-app-button-fahrenheit",
        switchBtnCelsius: ".js-weather-app-button-celsius",
        tempInfoMinTemp: ".js-weather-app-min",
        tempInfoMaxTemp: ".js-weather-app-max",
        windSpeed: ".js-weather-app-windSpeed",
        pressure: ".js-weather-app-pressure",
        humidity: ".js-weather-app-humidity",
    },
    states: {
        active: "active",
    },
};


export const getApiUrl = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=059dcee9c15c93a942eb1f38b72876be`;
};


(() => {
    const WeatherApp = (el) => {
        const global = { state: {}, elements: {}, data: {} };

        const init = () => {
            setupDomReferences();
            getUserGeolocation();
            setupEventListeners();
        };

        const getUserGeolocation = () => {
            fetch("https://ipapi.co/json/") // Call the fetch function passing the url of the API as a parameter
                .then((data) => data.json())
                .then((data) => {
                    // Code for handling the data you get from the API
                    global.data.latData = data.latitude;
                    global.data.lonData = data.longitude;

                    global.elements.latitudeEl.append(`Lat: ${global.data.latData}`);
                    global.elements.longitudeEl.append(`Lon: ${global.data.lonData}`);

                    getWeather();
                })
                .catch(() => {
                });
        };

        const getWeather = () => {
            fetch(getApiUrl(global.data.latData, global.data.lonData))
                .then((weatherData) => weatherData.json())
                .then((weatherData) => {
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
                .catch(() => {
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
