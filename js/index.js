let selectedCity = "bangalore";
let selectedUnit = "metric";

const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");

const apiKey = `34b0eca3b26480797180859fc2e45272`;

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${selectedUnit}&q=${selectedCity}&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

searchBox.addEventListener("change", (e) => {
  console.log(e.target.value);
});

searchBtn.addEventListener("click", () => {
  console.log("success");
});

async function checkWeather() {
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

const weatherData = fetch(apiUrl);
