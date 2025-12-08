const params = new URLSearchParams(window.location.search);
const icao = params.get("icao");

document.getElementById("loading-title").innerText = "Flying to " + icao + "...";

fetch(`http://localhost:3000/weather/${icao}`)
    .then(r => r.json())
    .then(data => {
        if (!data.success) {
            document.getElementById("loading-weather").innerText = "No weather found";
            return;
        }

        const weatherText =
            `🌡 ${data.temperature}°C\n` +
            `💨 ${data.wind} m/s\n` +
            `☁ ${decodeWeather(data.weathercode)}`;

        document.getElementById("loading-weather").innerText = weatherText;
    });

setTimeout(() => {
    window.location.href = "game.html";
}, 3000);

function flyTo(icao) {
    window.location.href = `loading.html?icao=${icao}`;
}

function decodeWeather(code) {
    const map = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Freezing fog",
        51: "Light drizzle",
        61: "Rain",
        71: "Snow",
        95: "Thunderstorm"
    };
    return map[code] || "Unknown";
}