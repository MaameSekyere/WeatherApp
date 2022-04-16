var citySave = [];
let listEl = document.querySelector("#second-list");
//Show current time and day
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
// Display weather forecast
function displayWeatherForecast(response) {
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

// Get coordinates API to display weather forecast
function getForecast(coordinates) {
  let apiKey = "573a564668504c3a4328912c04e8e7e5";
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial
  `;
  axios.get(apiUrl).then(displayWeatherForecast);
  getUVIndex(coordinates, apiKey);
}

function displayUVIndex(response) {
  // Create Elements for UV Index Data
  let uvEl = document.querySelector("#uv-index");
  uvEl.innerHTML = response.data.current.uvi;

  // Set Styling for UV Value Based on Conditions
  if (uvEl.textContent < 3) {
    uvEl.style.color = "Blue";
  } else if (uvEl.textContent > 3 || uvEl.textContent < 5) {
    uvEl.style.color = "Orange";
  } else {
    uvEl.style.color = "Red";
  }
}

// Function to Get UV Index Data
function getUVIndex(coordinates, apiKey) {
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial
  `;
  axios.get(apiUrl).then(displayUVIndex);
}

// display tempearature and select elements
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

// search city with API
function search(city) {
  let apiKey = "573a564668504c3a4328912c04e8e7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);

  savedCities();
}

//create function for saving city buttons to localstorage
function savedCities() {
  for (var i = 0; i < citySave.length; i++) {
    localStorage.setItem(i, citySave[i]);
  }
}

// show fahrenehit temp
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusDegree * 9) / 5 + 32);
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = fahrenheitTemp;
}

// city search
function submitHandle(event) {
  event.preventDefault();
  let citySearchEl = document.querySelector("#city-search");
  search(citySearchEl.value);
}
// city search form
let form = document.querySelector("#form-search");
form.addEventListener("submit", submitHandle);

// unit search
let fahrenheitDegree = document.querySelector("#fahrenheit-degree");
fahrenheitDegree.addEventListener("click", showFahrenheitTemp);

search("Buffalo");
