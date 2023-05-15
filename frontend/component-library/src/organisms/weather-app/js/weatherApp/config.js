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
