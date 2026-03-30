const base_url = "https://api.openweathermap.org/data/2.5/weather";

 

const API_KEY = "353d7afe0ab7df46fbbb47239f0a85d5";

const searchCity = document.querySelector('#city-input');

const searchBtn = document.getElementById('search-btn');

const cityName = document.querySelector('#city-name');

const dateString = document.querySelector('#date-string');

const weatherIcon = document.querySelector('#weather-icon');

const temperature = document.querySelector('#temperature');

const weatherDescription = document.querySelector('#weather-description');

const humidity = document.querySelector('#humidity');

const windSpeed = document.querySelector('#wind-speed');

const feelsLike = document.querySelector('#feels-like');

const pressure = document.querySelector('#pressure');

const weatherResult = document.querySelector('#weather-result');

const errorMsg = document.querySelector('#error-msg');

///
async function getWeather(city) {
    const url = `${base_url}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === '404') {
        alert('❌ City not found! Please check spelling!');
        return;
    }
    // function call ho rha hai
     displayData(data);


}

// serach city btn

searchBtn.addEventListener('click', () => {
    weatherResult.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    getWeather(searchCity.value);
})

//
window.addEventListener('load', () => {
   navigator.geolocation.getCurrentPosition(
    (position) => {
        // allow
        getWeatherByLocation(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
        weatherResult.classList.add('hidden'); 
        errorMsg.classList.remove('hidden');      
    }
)
})


// / 2nd api fetch kerway gy

async function getWeatherByLocation(lat,lon) {
    const url = `${base_url}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
     // function call ho rha hai
     displayData(data);

    
}

 function displayData(data) {
    cityName.textContent = data.name;
    temperature.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    feelsLike.textContent = data.main.feels_like;
    pressure.textContent = data.main.pressure;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const date = new Date();
    dateString.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

 }