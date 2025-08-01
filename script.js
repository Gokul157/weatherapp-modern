const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

async function checkWeather() {
    const city = document.getElementById("search").value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        weatherDiv.style.display = "block";
        errorDiv.style.display = "none";

    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorDiv.style.display = "block";
    errorDiv.innerText = message;
    weatherDiv.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('searchButton').addEventListener('click', checkWeather);
});
