function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay(3)];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayWeatherForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#weather-forecast");

  let forecastHTML = '<div class = "row">';
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="40"
              />
              <div class="weather-forecast-temp">
                <span class="weather-temp-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-temp-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>
          
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "573a564668504c3a4328912c04e8e7e5";
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
  `;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayTemp(response) {
  let temperatureEl = document.querySelector("#temperature");
  let cityEl = document.querySelector("#city");
  let descriptionEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#date");
  let iconEl = document.querySelector("#icon");

  celsiusDegree = response.data.main.temp;

  temperatureEl.innerHTML = Math.round(celsiusDegree);
  cityEl.innerHTML = response.data.name;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = showDate(response.data.dt * 1000);
  iconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "573a564668504c3a4328912c04e8e7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusDegree * 9) / 5 + 32);
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = fahrenheitTemp;
}

function submitHandle(event) {
  event.preventDefault();
  let citySearchEl = document.querySelector("#city-search");
  search(citySearchEl.value);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = Math.round(celsiusDegree);
}

let celsiusDegree = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", submitHandle);

let fahrenheitDegree = document.querySelector("#fahrenheit-degree");
fahrenheitDegree.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Buffalo");
