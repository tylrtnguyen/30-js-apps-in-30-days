import React, {useState} from 'react';
import fetchWeather from './api/fetchWeather';
import './App.css';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({})

    const weatherSearch = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(city);
            setWeather(data);
            setCity('');
        }
    }

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Your city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={weatherSearch}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name"> 
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="relative">
                        <h2>Humidity: {weather.main.humidity}%</h2>
                        <h2>Feels like: {Math.round(weather.main.feels_like)}<sup>&deg;C</sup></h2>
                        <h2>Wind: {Math.round((weather.wind.speed)*3.6)} km/h</h2>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;