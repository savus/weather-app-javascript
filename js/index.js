const active = "active";

const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");

const unitContainerSelector = ".units-selection-container";
const unitSelectionContainer = document.querySelector(unitContainerSelector);
const unitSelectionSelector = ".units-selection";
const unitSelectionOptions = document.querySelector(unitSelectionSelector);

const apiKey = `34b0eca3b26480797180859fc2e45272`;

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

async function checkWeather(
  selectedCity = "Bangalore",
  selectedUnit = "metric"
) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${selectedUnit}&q=${selectedCity}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ main, description, icon }],
  } = data;

  console.log(data);
  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = Math.round(temp);
  humidityDisplay.innerHTML = humidity;
  windDisplay.innerHTML = speed;
}

// checkWeather();

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
