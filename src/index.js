function updateTemperature(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let displayedCity = document.querySelector("#weather-app-city");
  displayedCity.innerHTML = response.data.city;
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  let weatherDescriptionElement = document.querySelector("#description");
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  // timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

  timeElement.innerHTML = formatDate(date);

  console.log(response.data);
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let forecast = document.querySelector("#forecast");

function searchCity(city) {
  let apiKey = "c20161a98fff44a06b23236e2obd0t3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemperature);
}

function showSearchedCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-form-input");

  searchCity(enterCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "c20161a98fff44a06b23236e2obd0t3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="row">
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>

      <img
        src="${day.condition.icon_url} "
        alt=""
        width="36"
        class="weather-forecast-icon"
      />
      <div class="weather-forecast-temperatures">
        <span class="wether-forecast-temperature-max">
          <strong>${Math.round(day.temperature.maximum)}</strong>
        </span>
        <span class="wether-forecast-temperature-mim">${Math.round(
          day.temperature.minimum
        )}</span>
      </div>
    </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", showSearchedCity);

searchCity("Berlin");
