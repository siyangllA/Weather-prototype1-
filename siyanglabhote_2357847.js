const apiKey = '98b6a000eedc2239f8171bb5173120c9'; 

const searchBox = document.querySelector('.search-box');
const inputField = searchBox.querySelector('input');
const searchButton = searchBox.querySelector('button');
const infoTxt = document.querySelector('.info-txt');
const weatherImg = document.querySelector('.weather-img');
const tempElement = document.querySelector('.temp .numb');
const weatherElement = document.querySelector('.weather');
const locationElement = document.querySelector('.location span');
const feelsLikeElement = document.querySelector('.feels .numb-2');
const humidityElement = document.querySelector('.humidity span');

// Add event listener for search button
searchButton.addEventListener('click', () => {
  getWeatherData(inputField.value);
});

// Add event listener for enter key in input field
inputField.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(inputField.value);
  }
});

// -----------------------for default---------------------
// https://api.openweathermap.org/data/2.5/weather?q=tulsipur&units=metric&appid=98b6a000eedc2239f8171bb5173120c9


function getDefaultWeatherData() {
  const city = "Tulsipur";
  infoTxt.innerText = 'Getting weather details...';
  infoTxt.classList.add('pending');
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=98b6a000eedc2239f8171bb5173120c9`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name;
      const country = data.sys.country;
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const weather = data.weather[0].description;

      infoTxt.innerText = '';
      infoTxt.classList.remove('pending');
      weatherImg.src = getWeatherIconURL(data.weather[0].icon);
      tempElement.innerText = temperature;
      weatherElement.innerText = weather;
      locationElement.innerText = `${cityName}, ${country}`;
      feelsLikeElement.innerText = feelsLike;
      humidityElement.innerText = humidity;
    });
}

getDefaultWeatherData();


// -------------------for search functionality-----------------


/**

 * @param {string} city The city to fetch the weather data.
 */
function getWeatherData(city) {
  infoTxt.innerText = 'Getting weather details...';
  infoTxt.classList.add('pending');
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        infoTxt.innerText = `${city} isn't a valid city name`;
        infoTxt.classList.replace('pending', 'error');
      } else {
        const city = data.name;
        const country = data.sys.country;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const weather = data.weather[0].description;

        infoTxt.innerText = '';
        infoTxt.classList.remove('pending', 'error');
        weatherImg.src = getWeatherIconURL(data.weather[0].icon);
        tempElement.innerText = temperature;
        weatherElement.innerText = weather;
        locationElement.innerText = `${city}, ${country}`;
        feelsLikeElement.innerText = feelsLike;
        humidityElement.innerText = humidity;
      }
    })
    .catch((error) => {
      infoTxt.innerText = 'An error occurred. Please try again later.';
      infoTxt.classList.replace('pending', 'error');
    });
}

/**
 
 * @param {string} iconCode The icon code.
 * @returns {string} The URL of the weather icon.
 */
function getWeatherIconURL(iconCode) {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
}
