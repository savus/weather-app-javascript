import Requests from "./api.js";
import {} from "./click-functions.js";
import { updateWeather } from "./helper-functions.js";

export const active = "active";

export const weatherIcons = {
  Rain: "icon-rain",
  Clouds: "icon-cloud",
  Clear: "icon-sun",
  Snow: "icon-snow",
};

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

// const unitContainerSelector = ".units-selection-container";
// export const unitSelectionContainer = document.querySelector(
//   unitContainerSelector
// );
// const unitSelectionSelector = ".units-selection";
// const unitSelectionOptions = document.querySelector(unitSelectionSelector);
// const unitsDisplaySelector = ".units-display";
// export const unitsDisplay = document.querySelector(unitsDisplaySelector);

export const cityNameErrorMessage = document.querySelector(".city-error");

const searchBoxSelector = ".search input";
export const searchBox = document.querySelector(searchBoxSelector);
const searchBtnSelector = ".search button";
const searchBtn = document.querySelector(searchBtnSelector);

updateWeather(Requests.apiSettings);

// searchBox.addEventListener("change", ({ target }) => {});

searchBtn.addEventListener("click", Requests.fetchByCityName);

// unitSelectionContainer.addEventListener("click", toggleUnitsContainer);

// unitSelectionOptions.addEventListener("click", fetchByUnitOption);

// document.addEventListener("click", removeActiveOnBlur);
