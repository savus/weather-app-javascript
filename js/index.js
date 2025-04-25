const active = "active";
const weatherIcons = ["fa-cloud-rain", "fa-cloud", "fa-sun"];

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

const weatherSettings = {
  cityName: "new york",
  units: "imperial",
};

const apiKey = `34b0eca3b26480797180859fc2e45272`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${weatherSettings.units}&q=${weatherSettings.cityName}&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const setUrl = (settings) => {
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${settings.units}&q=${settings.cityName}&appid=${apiKey}`;
};

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

async function updateWeather(settings) {
  setUrl(settings);
  const response = await fetch(apiUrl);
  const data = await response.json();

  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ main, description }],
  } = data;

  const tempUnit = settings.units === "imperial" ? "F" : "C";
  const iconClass = getWeatherIcon(main);

  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = `${Math.round(temp)}°${tempUnit}`;
  humidityDisplay.innerHTML = humidity;
  windDisplay.innerHTML = speed;

  clearWeatherIcons();
  weatherIcon.classList.add(iconClass);
}

updateWeather(weatherSettings);
updateUnitsDisplay(weatherSettings);

searchBox.addEventListener("change", (e) => {});

searchBtn.addEventListener("click", () => {
  // checkWeather(searchBox.value);
});

unitSelectionContainer.addEventListener("click", ({ target }) => {
  toggleActive(target);
});

unitSelectionOptions.addEventListener("click", ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    cityDisplay.innerHTML = target.dataset.option;
  }
});

document.addEventListener("click", ({ target }) => {
  const isSelectionContainer = target === unitSelectionContainer;
  if (!isSelectionContainer) removeActive(unitSelectionContainer);
});
