import { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('Paris');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5075bb137f9f4935bb643808242009&q=${city}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    }
  };

  return (
<>
<h1 className="app-title">Weather App</h1>
    <div className="weather-container">
    
      <div className="weather-side">
        <div className="weather-gradient"></div>
        <div className="date-container">
          <h2 className="date-dayname">
            {new Date().toLocaleString('en-US', { weekday: 'long' })}
          </h2>
          <span className="date-day">
            {new Date().toLocaleDateString()}
          </span>
          <i className="location-icon" data-feather="map-pin"></i>
          <span className="location">
            {weatherData ? `${weatherData.location.name}, ${weatherData.location.country}` : location}
          </span>
        </div>
        <div className="weather-info">
          <h1 className="weather-temp">
            {weatherData ? `${weatherData.current.temp_c}°C` : '--°C'}
          </h1>
          <h3 className="weather-desc">
            {weatherData ? weatherData.current.condition.text : 'No data'}
          </h3>
        </div>
      </div>
      <div className="info-side">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="location-input" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter Location" 
          />
          <button type="submit" className="location-button">Get Weather</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="today-info">
            <div className="info-item">
              <span className="title">PRECIPITATION:</span>
              <span className="value">{weatherData.current.precip_mm} mm</span>
            </div>
            <div className="info-item">
              <span className="title">HUMIDITY:</span>
              <span className="value">{weatherData.current.humidity} %</span>
            </div>
            <div className="info-item">
              <span className="title">WIND:</span>
              <span className="value">{weatherData.current.wind_kph} km/h</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default WeatherApp;
