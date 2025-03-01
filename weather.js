async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '56414d293c1737f5c3d3583d44384eeb'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherInfo = document.getElementById('weatherInfo');
    const loading = document.querySelector('.loading');

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    weatherInfo.innerHTML = "";
    loading.style.display = "block";

    try {
        const response = await fetch(url);
        const data = await response.json();
        loading.style.display = "none";

        if (data.cod === 200) {
            const temp = data.main.temp;
            const condition = data.weather[0].description.toLowerCase();

            let weatherMessage = "";
            if (temp > 25) {
                weatherMessage = "☀️ It's Sunny!";
            } else if (temp <= 25 && temp >= 15) {
                weatherMessage = "🌦️ It's a Pleasant Day!";
            } else if (temp < 15) {
                weatherMessage = "❄️ It's Cold!";
            }
            if (condition.includes("rain") || condition.includes("drizzle")) {
                weatherMessage = "🌧️ It's Rainy!";
            }

            weatherInfo.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
                <p>🌡️ Temperature: ${temp}°C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
                <p class="weather-status">${weatherMessage}</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p style='color: red;'>❌ City not found! Try again.</p>`;
        }
    } catch (error) {
        loading.style.display = "none";
        weatherInfo.innerHTML = `<p style='color: red;'>❌ Error fetching data. Please try again later.</p>`;
    }
}
