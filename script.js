const API_KEY = 'a2242467a943d54de7c3ad714bcd1bb4';
const addCityBtn = document.getElementById('addCityBtn');
const cityInput = document.getElementById('cityInput');
const weatherCards = document.getElementById('weatherCards');

let cities = [];

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${a2242467a943d54de7c3ad714bcd1bb4}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        name: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed
      };

      cities.push(weatherData);
      cities.sort((a, b) => a.temp - b.temp);

      renderWeatherCards();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function renderWeatherCards() {
  weatherCards.innerHTML = '';

  cities.forEach(city => {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
      <h2>${city.name}</h2>
      <img src="https://openweathermap.org/img/w/${city.icon}.png" alt="${city.condition}">
      <p>Temperature: ${city.temp}°C</p>
      <p>Condition: ${city.condition}</p>
      <p>Humidity: ${city.humidity}%</p>
      <p>Pressure: ${city.pressure} hPa</p>
      <p>Wind Speed: ${city.wind} m/s</p>
    `;

    weatherCards.appendChild(card);
  });
}

addCityBtn.addEventListener('click', () => {
  const cityName = cityInput.value.trim();

  if (cityName !== '' && cities.every(city => city.name.toLowerCase() !== cityName.toLowerCase())) {
    fetchWeather(cityName);
    cityInput.value = '';
  }
});
