import React, { useState, useEffect } from 'react';

interface WeatherInfo {
    temperature: string;
    description: string;
    iconUrl: string;
}

const WeatherApp: React.FC = () => {
    const [weather, setWeather] = useState<WeatherInfo | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            const city = "Tokyo";
            const apiKey = "dbb81e72c02837d3eaf96d115e9ed2d4"; // あなたのAPIキーをここに置き換えてください
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setWeather({
                    temperature: `${data.main.temp} °C`,
                    description: data.weather[0].description,
                    iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                });
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        }

        fetchWeather();
    }, []);

    return (
        <div>
            {weather ? (
                <div>
                    <h1>Weather in Tokyo</h1>
                    <p>Temperature: {weather.temperature}</p>
                    <p>Description: {weather.description}</p>
                    <img src={weather.iconUrl} alt="Weather Icon" />
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherApp;
