import Requests from "./api.js";

const active = "active";
const weatherIcons = ["fa-cloud-rain", "fa-cloud", "fa-sun"];

const weatherContainerSelector = ".weather";
const weatherContainer = document.querySelector(weatherContainerSelector);
const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

const unitContainerSelector = ".units-selection-container";
const unitSelectionContainer = document.querySelector(unitContainerSelector);
const unitSelectionSelector = ".units-selection";
const unitSelectionOptions = document.querySelector(unitSelectionSelector);
const unitsDisplaySelector = ".units-display";
const unitsDisplay = document.querySelector(unitsDisplaySelector);

const cityNameErrorMessage = document.querySelector(".city-name-error");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const setActive = (target, selector = null) => {
  const selectedElement = document.querySelector(`${selector}${active}`);
  if (selectedElement !== null) removeActive(selectedElement);
  target.classList.add(active);
};

const toggleActive = (target, selector = null) => {
  if (target.classList.contains(active)) removeActive(target, selector);
  else setActive(target);
};

const removeActive = (element) => {
  element.classList.remove(active);
};

const getWeatherIcon = (status) => {
  switch (status) {
    case "Rain":
      return "fa-cloud-rain";
    case "Clouds":
      return "fa-cloud";
    case "Clear":
      return "fa-sun";
    default:
      return "fa-sun";
  }
};

const clearWeatherIcons = () => {
  weatherIcons.forEach((string) => {
    if (weatherIcon.classList.contains(string))
      weatherIcon.classList.remove(string);
  });
};

const updateUnitsDisplay = ({ units }) =>
  (unitsDisplay.innerHTML = `Units: ${
    units.slice(0, 1).toUpperCase() + units.slice(1)
  }`);

const updateDataFields = (data, settings) => {
  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ main, description }],
  } = data;

  const tempUnit = settings.units === "imperial" ? "F" : "C";
  const speedUnit = settings.units === "imperial" ? "mph" : "km/h";
  const iconClass = getWeatherIcon(main);

  console.log(main);
  setActive(weatherContainer);
  removeActive(cityNameErrorMessage);

  updateUnitsDisplay(settings);

  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = `${Math.round(temp)}°${tempUnit}`;
  humidityDisplay.innerHTML = `${humidity}%`;
  windDisplay.innerHTML = `${speed} ${speedUnit}`;

  clearWeatherIcons();
  weatherIcon.classList.add(iconClass);
};

async function updateWeather(settings) {
  Requests.setCurrentWeatherUrl(settings);
  let currentWeatherData;
  try {
    currentWeatherData = await Requests.fetchCurrentWeather();
    if (currentWeatherData.cod === 200) {
      updateDataFields(currentWeatherData, settings);
    } else {
      removeActive(weatherContainer);
      setActive(cityNameErrorMessage);
      console.log(currentWeatherData.message);
    }
  } catch (e) {
    removeActive(weatherContainer);
  }
}

updateWeather(Requests.apiSettings);

searchBox.addEventListener("change", ({ target }) => {});

searchBtn.addEventListener("click", () => {
  Requests.setApiSettings({ cityName: searchBox.value });
  updateWeather(Requests.apiSettings);
});

unitSelectionContainer.addEventListener("click", ({ target }) => {
  toggleActive(target);
});

unitSelectionOptions.addEventListener("click", ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    Requests.apiSettings.units = target.dataset.option;
    updateWeather(Requests.apiSettings);
  }
});

document.addEventListener("click", ({ target }) => {
  const isSelectionContainer = target === unitSelectionContainer;
  if (!isSelectionContainer) removeActive(unitSelectionContainer);
});
