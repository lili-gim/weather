function showSearchedCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-form-input");
  let city = document.querySelector("#weather-app-city");
  city.innerHTML = enterCity.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", showSearchedCity);
