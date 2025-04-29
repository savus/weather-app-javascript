import Requests from "./api.js";
import {
  active,
  cityDisplay,
  cityNameErrorMessage,
  humidityDisplay,
  tempDisplay,
  weatherContainer,
  weatherIcon,
  weatherIcons,
  windDisplay,
} from "./index.js";

export const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}${active}`);
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

export const getWeatherIcon = (status) => {
  if (!weatherIcons[status]) weatherIcons[status] = "fa-sun";
  return weatherIcons[status];
};

export const clearWeatherIcons = () => {
  Object.values(weatherIcons).forEach((string) => {
    if (weatherIcon.classList.contains(string))
      weatherIcon.classList.remove(string);
  });
};

// export const updateUnitsDisplay = ({ units }) =>
//   (unitsDisplay.innerHTML = `Units: ${
//     units.slice(0, 1).toUpperCase() + units.slice(1)
//   }`);

export const updateDataFields = (data, settings) => {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ main, description }],
  } = data;

  const tempUnit = settings.units === "imperial" ? "F" : "C";
  const speedUnit = settings.units === "imperial" ? "mph" : "km/h";
  const iconClass = getWeatherIcon(main);

  console.log(main, iconClass);
  setActive(weatherContainer);
  removeActive(cityNameErrorMessage);

  // updateUnitsDisplay(settings);

  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = `${Math.round(temp)}°${tempUnit}`;
  humidityDisplay.innerHTML = `${humidity}%`;
  windDisplay.innerHTML = `${speed} ${speedUnit}`;

  clearWeatherIcons();
  weatherIcon.classList.add(iconClass);
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
