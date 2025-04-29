import { updateWeather } from "./helper-functions.js";
import { searchBox } from "./index.js";

const apiKey = `34b0eca3b26480797180859fc2e45272`;

const apiSettings = {
  cityName: "bangalore",
  units: "metric",
};

const setApiSettings = (settings) => {
  for (const prop in settings) {
    const value = settings[prop];
    apiSettings[prop] = value;
  }
};

const fetchCurrentWeather = ({ cityName, units }) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${cityName}&appid=${apiKey}`
  ).then((response) => response.json());

const fetchByCityName = () => {
  Requests.setApiSettings({ cityName: searchBox.value });
  updateWeather(Requests.apiSettings);
};

const Requests = {
  apiKey,
  apiSettings,
  setApiSettings,
  fetchCurrentWeather,
  fetchByCityName,
};

export default Requests;
