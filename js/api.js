const apiKey = `34b0eca3b26480797180859fc2e45272`;

const apiSettings = {
  cityName: "new york",
  units: "imperial",
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

const Requests = {
  apiKey,
  apiSettings,
  setApiSettings,
  fetchCurrentWeather,
};

export default Requests;
