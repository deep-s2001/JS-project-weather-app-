// Configuration
const API_KEY = '7115c24d585093fca87795b58cb86d17';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    weatherCard: document.getElementById('weatherCard'),
    errorMessage: document.getElementById('errorMessage'),
    loader: document.getElementById('loader'),
    weatherIcon: document.getElementById('weatherIcon'),
    cityName: document.getElementById('cityName'),
    temp: document.getElementById('temp'),
    weatherDescription: document.getElementById('weatherDescription'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    feelsLike: document.getElementById('feelsLike'),
    pressure: document.getElementById('pressure')
};

// API Functions
async function fetchWeatherData(city) {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }
    
    return data;
}

// UI Functions
function updateWeatherCard(data) {
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    elements.cityName.textContent = data.name;
    elements.temp.textContent = Math.round(data.main.temp);
    elements.weatherDescription.textContent = data.weather[0].description;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
    
    showWeatherCard();
}

function showLoader() {
    elements.loader.style.display = 'block';
}

function hideLoader() {
    elements.loader.style.display = 'none';
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorMessage.style.display = 'block';
}

function hideError() {
    elements.errorMessage.style.display = 'none';
}

function showWeatherCard() {
    elements.weatherCard.style.display = 'block';
}

function hideWeatherCard() {
    elements.weatherCard.style.display = 'none';
}

// Event Handlers
async function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (!city) return;

    showLoader();
    hideError();
    hideWeatherCard();

    try {
        const data = await fetchWeatherData(city);
        updateWeatherCard(data);
    } catch (error) {
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        hideLoader();
    }
}

// Event Listeners
elements.searchBtn.addEventListener('click', handleSearch);
elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});