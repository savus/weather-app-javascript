import Requests from "./api.js";
import {
  removeActive,
  toggleActive,
  updateWeather,
} from "./helper-functions.js";

export const active = "active";
export const weatherIcons = ["fa-cloud-rain", "fa-cloud", "fa-sun"];

const weatherContainerSelector = ".weather";
export const weatherContainer = document.querySelector(
  weatherContainerSelector
);
export const cityDisplay = document.querySelector(".city");
export const tempDisplay = document.querySelector(".temp");
export const humidityDisplay = document.querySelector(".humidity");
export const windDisplay = document.querySelector(".wind");
export const weatherIcon = document.querySelector(".weather-icon");

const unitContainerSelector = ".units-selection-container";
const unitSelectionContainer = document.querySelector(unitContainerSelector);
const unitSelectionSelector = ".units-selection";
const unitSelectionOptions = document.querySelector(unitSelectionSelector);
const unitsDisplaySelector = ".units-display";
export const unitsDisplay = document.querySelector(unitsDisplaySelector);

export const cityNameErrorMessage = document.querySelector(".city-name-error");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

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
