// weather api key - store securely in production
const API_KEY = "acb00e2fdab68ec7b7296b4911a1cf2c";
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

// Add loading indicator
const loading = document.createElement('div');
loading.className = 'loading';
loading.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;';
document.body.appendChild(loading);

function showLoading() {
    loading.classList.add('active');
}

function hideLoading() {
    loading.classList.remove('active');
}

searchButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const userInput = searchInput.value.trim();
    
    if (userInput) {
        await processInput(userInput);
    }
});

// Allow pressing Enter to search
searchInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const userInput = searchInput.value.trim();
        
        if (userInput) {
            await processInput(userInput);
        }
    }
});

async function processInput(city) {
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    showLoading();
    
    try {
        // First try with the city name as-is
        let weatherData = await fetchWeatherData(city);
        
        if (!weatherData) {
            // Try with common country codes
            const variations = [
                city,
                city + ',us',
                city + ',uk',
                city + ',in',
                city + ',de',
                city + ',fr',
                city + ',jp',
                city + ',cn',
                city + ',au',
                city + ',ca',
                city + ',es',
                city + ',it'
            ];
            
            for (const variation of variations) {
                weatherData = await fetchWeatherData(variation);
                if (weatherData) break;
            }
        }
        
        if (weatherData) {
            updateDOMWithWeatherData(weatherData);
        } else {
            alert(`City "${city}" not found. Please try:\n- Using full city name (e.g., "New York, US")\n- Checking spelling\n- Trying a major city nearby`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch weather data! Please check your internet connection.");
    } finally {
        hideLoading();
    }
}

async function fetchWeatherData(query) {
    // Encode the query to handle special characters
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedQuery}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        
        if (response.status === 200) {
            const jsonData = await response.json();
            console.log("Weather data for", query + ":", jsonData);
            return jsonData;
        } else if (response.status === 404) {
            console.log("City not found:", query);
            return null;
        } else {
            console.error("API error:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

function updateDOMWithWeatherData(data) {
    // Update temperature
    const tempElement = document.querySelector('.temp');
    tempElement.textContent = `${data.main.temp.toFixed(1)} °C`;

    // Update place name (city, country)
    const placeElement = document.querySelector('.place');
    const countryCode = data.sys.country;
    placeElement.textContent = `${data.name}, ${countryCode}`;

    // Update weather icon
    const iconElement = document.querySelector('.icon img');
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;

    // Update weather condition (in the icon .meta)
    const iconMetaElement = document.querySelector('.icon .meta');
    iconMetaElement.textContent = data.weather[0].description;

    // Update time info if available
    const metaElements = document.querySelectorAll('.card .meta');
    if (metaElements.length > 1) {
        const date = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        metaElements[1].textContent = date.toLocaleDateString('en-US', options);
    }

    // Add humidity and wind info if elements exist
    updateExtraWeatherData(data);
}

function updateExtraWeatherData(data) {
    // You can add more elements to index.html and update them here
    // For example: humidity, wind speed, etc.
    console.log("Weather details:", {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        feelsLike: data.main.feels_like
    });
}

// Test with a known city on load
console.log("Weather App initialized. Ready to search for cities worldwide!");

