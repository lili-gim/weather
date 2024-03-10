function updateTemperature(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let city = document.querySelector("#weather-app-city");
  city.innerHTML = response.data.city;
}

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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", showSearchedCity);

searchCity("Berlin");
