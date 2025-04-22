const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");

const apiKey = `34b0eca3b26480797180859fc2e45272`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBox.addEventListener("change", (e) => {});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

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
  } = data;

  console.log(data);
  cityDisplay.innerHTML = name;
  tempDisplay.innerHTML = Math.round(temp);
  humidityDisplay.innerHTML = humidity;
  windDisplay.innerHTML = speed;
}

checkWeather();
