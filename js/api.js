const apiKey = `34b0eca3b26480797180859fc2e45272`;
let currentWeatherUrl;

const apiSettings = {
  cityName: "new york",
  units: "imperial",
};

const setCurrentWeatherUrl = ({ units, cityName }) => {
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${cityName}&appid=${apiKey}`;
};

const setApiSettings = (settings) => {
  for (const prop in settings) {
    const value = settings[prop];
    apiSettings[prop] = value;
  }
};

const fetchCurrentWeather = () =>
  fetch(currentWeatherUrl).then((response) => response.json());

const Requests = {
  apiKey,
  currentWeatherUrl,
  apiSettings,
  setCurrentWeatherUrl,
  setApiSettings,
  fetchCurrentWeather,
};

export default Requests;
