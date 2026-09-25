<div align="center">

# 🌦️ Weather App

**Search any city and get its current weather — temperature, conditions and icon — from the OpenWeatherMap API.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap_API-EB6E4B?style=flat-square)

</div>

---

## ✨ Features

- 🔎 **City search** — click *Search* or press <kbd>Enter</kbd>
- 🌡️ **Current conditions** — temperature (°C), description and weather icon
- 🌍 **Smart lookup** — if a city isn't found, it automatically retries with common country codes (IN, US, UK, …)
- ⏳ **Loading indicator** while data is fetched
- ⚠️ **Friendly errors** for empty input or unknown cities

## 🛠 Tech Stack

- HTML5 & CSS3 (with a CSS reset)
- Vanilla JavaScript — `fetch` + `async/await`
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)

## 🚀 Run Locally

```bash
git clone https://github.com/Awaneesh03/weather-app.git
cd weather-app
python3 -m http.server 8000   # → http://localhost:8000
```

### API key

1. Create a free account at [openweathermap.org](https://openweathermap.org/api) and copy your API key.
2. Replace the value of `API_KEY` at the top of [`script.js`](script.js).

> For a production app, keep API keys out of client-side code (use a small backend or serverless function).

## 📁 Project Structure

```text
weather-app/
├── index.html   # Search bar + weather card
├── style.css    # Layout and card styling
├── reset.css    # CSS reset
├── script.js    # API calls, retry logic, DOM updates
└── app.md       # Notes (JavaScript Promises practice)
```

## 🧠 What I Learned

- Working with a real REST API using `fetch` and `async/await`
- Handling loading, empty and error states in the UI
- URL-encoding user input and building query strings

---

## 👤 Author

**Awaneesh Gupta** — B.Tech CSE (AI) @ Vedam School of Technology

[![GitHub](https://img.shields.io/badge/GitHub-Awaneesh03-181717?style=flat-square&logo=github)](https://github.com/Awaneesh03)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-awaneesh--gupta-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/awaneesh-gupta)

<p align="center"><sub>If you found this project useful, consider giving it a ⭐</sub></p>
