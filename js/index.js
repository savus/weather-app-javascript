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

const weatherSettings = {
  cityName: "new york",
  units: "imperial",
};

const apiKey = `34b0eca3b26480797180859fc2e45272`;
let currentWeatherUrl;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const setWeatherSettings = (settings) => {
  for (const prop in settings) {
    const value = settings[prop];
    weatherSettings[prop] = value;
  }
};

const setCurrentWeatherUrl = ({ units, cityName }) => {
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${cityName}&appid=${apiKey}`;
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

const fetchCurrentWeather = () =>
  fetch(currentWeatherUrl).then((response) => {
    return response.json();
  });

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

  setActive(weatherContainer);

  updateUnitsDisplay(settings);

  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = `${Math.round(temp)}°${tempUnit}`;
  humidityDisplay.innerHTML = `${humidity}%`;
  windDisplay.innerHTML = `${speed} ${speedUnit}`;

  clearWeatherIcons();
  weatherIcon.classList.add(iconClass);
};

async function updateWeather(settings) {
  setCurrentWeatherUrl(settings);
  const currentWeatherData = await fetchCurrentWeather();

  if (currentWeatherData.cod === 200) {
    updateDataFields(currentWeatherData, settings);
  } else {
    removeActive(weatherContainer);
    console.log(currentWeatherData.message);
  }
}

updateWeather(weatherSettings);

searchBox.addEventListener("change", ({ target }) => {});

searchBtn.addEventListener("click", () => {
  setWeatherSettings({ cityName: searchBox.value });
  updateWeather(weatherSettings);
});

unitSelectionContainer.addEventListener("click", ({ target }) => {
  toggleActive(target);
});

unitSelectionOptions.addEventListener("click", ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    weatherSettings.units = target.dataset.option;
    updateWeather(weatherSettings);
  }
});

document.addEventListener("click", ({ target }) => {
  const isSelectionContainer = target === unitSelectionContainer;
  if (!isSelectionContainer) removeActive(unitSelectionContainer);
});
