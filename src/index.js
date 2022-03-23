function displayTemp(response) {
  console.log(response.data);
  let temperatureEl = document.querySelector("#temperature");
  let cityEl = document.querySelector("#city");
  let descriptionEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  temperatureEl.innerHTML = Math.round(response.data.main.temp);
  cityEl.innerHTML = response.data.name;
  descriptionEl.innerHTML = response.data.weather[0].description;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "573a564668504c3a4328912c04e8e7e5";
let city = "Buffalo";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
