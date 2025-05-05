import Requests from "./api.js";
import { setUnitOption } from "./click-functions.js";
import { setActive, updateWeather } from "./helper-functions.js";
import Images from "./images.js";

export const active = "active";

export const weatherIcons = {};

for (const [status, _url] of Object.entries(Images)) {
  weatherIcons[status] = `icon-${status.toLowerCase()}`;
}

const weatherContainerSelector = ".weather";
export const weatherContainer = document.querySelector(
  weatherContainerSelector
);

export const cityDisplay = document.querySelector(".city");
export const tempDisplay = document.querySelector(".temp");
export const humidityDisplay = document.querySelector(".humidity");
export const windDisplay = document.querySelector(".wind");
export const weatherIcon = document.querySelector("#weather-icon");
export const feelsLike = document.querySelector(".feels-like");
export const highTemp = document.querySelector(".high-temp");
export const lowTemp = document.querySelector(".low-temp");
export const descriptionDisplay = document.querySelector(".description");

export const getAllBounceInAnimations = document.querySelectorAll(
  `[data-animation="bounceIn"]`
);

export const cityNameErrorMessage = document.querySelector(".city-error");
export const loader = document.querySelector(".loader");

const searchBoxSelector = ".search input";
export const searchBox = document.querySelector(searchBoxSelector);
const searchBtnSelector = ".search button";
const searchBtn = document.querySelector(searchBtnSelector);

const unitsSelectionSelector = ".units-selection";
const unitsSelection = document.querySelector(unitsSelectionSelector);

updateWeather(Requests.apiSettings);

searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") Requests.fetchByCityName();
});

unitsSelection.addEventListener("click", setUnitOption);

searchBtn.addEventListener("click", Requests.fetchByCityName);
