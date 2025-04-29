import Requests from "./api.js";
import {
  active,
  cityDisplay,
  cityNameErrorMessage,
  descriptionDisplay,
  feelsLike,
  highTemp,
  humidityDisplay,
  lowTemp,
  tempDisplay,
  weatherContainer,
  weatherIcon,
  weatherIcons,
  windDisplay,
} from "./index.js";

export const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}.${active}`);
  console.log(selectedElement);
  if (selectedElement !== null) removeActive(selectedElement);
  target.classList.add(active);
};

export const toggleActive = (target, selector = null) => {
  if (target.classList.contains(active)) removeActive(target, selector);
  else setActive(target);
};

export const removeActive = (element) => {
  element.classList.remove(active);
};

export const setWeatherIcon = (status) => {
  const iconSelector = !weatherIcons[status]
    ? `.icon-sun`
    : `.${weatherIcons[status]}`;
  setActive(document.querySelector(iconSelector), `.weather-icon`);
};

export const updateDataFields = (data, settings) => {
  const {
    name,
    main: { temp, humidity, feels_like, temp_max, temp_min },
    sys: { country },
    wind: { speed },
    weather: [{ main, description, icon }],
  } = data;

  const tempUnit = settings.units === "imperial" ? "F" : "C";
  const speedUnit = settings.units === "imperial" ? "mph" : "km/h";

  console.log(data);
  setActive(weatherContainer);
  removeActive(cityNameErrorMessage);

  setWeatherIcon(main);
  cityDisplay.innerHTML = `${name}, ${country}`;
  tempDisplay.innerHTML = `${Math.round(temp)}°${tempUnit}`;
  humidityDisplay.innerHTML = `${humidity}%`;
  windDisplay.innerHTML = `${speed} ${speedUnit}`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(feels_like)}°${tempUnit}`;
  highTemp.innerHTML = `High: ${Math.round(temp_max)}°${tempUnit}`;
  lowTemp.innerHTML = `Low: ${Math.round(temp_min)}°${tempUnit}`;
  descriptionDisplay.innerHTML = `${description}`;
};

export async function updateWeather(settings) {
  let currentWeatherData;
  try {
    currentWeatherData = await Requests.fetchCurrentWeather(settings);
    if (currentWeatherData.cod === 200) {
      updateDataFields(currentWeatherData, settings);
    } else {
      removeActive(weatherContainer);
      setActive(cityNameErrorMessage);
      console.log(currentWeatherData.message);
    }
  } catch (e) {
    console.log(e);
    removeActive(weatherContainer);
  }
}
