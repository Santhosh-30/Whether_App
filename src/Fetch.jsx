import React, { useState, useEffect } from "react";
import Forecast from "./Forecast";
import App from "./App";

const API_KEY = "78976437d112fdd42c2a82f4f6487805";

function Fetch({ city }) {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      setError("City is required");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          throw new Error(data.message);
        }
        setCurrentWeatherData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  return (
    <div>
      <h1 className="city-name">
        {loading
          ? "Loading city..."
          : currentWeatherData.name}
      </h1>
      <div className="date-time">
        {loading
          ? "Loading date..."
          : new Date().toLocaleDateString([], {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
      </div>
      <div className="weather-info">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="whether-data">
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0]?.icon}@4x.png`}
              alt={currentWeatherData.weather[0].description}
            />
            <h2 className="temperature">
              {loading
                ? "Loading temperature..."
                : currentWeatherData.main.temp ?? "N/A"}°C
            </h2>
            <p>{currentWeatherData.weather[0].description}</p>
          </div>
        )}
      </div>
      {loading ? (
        <div className="loading-forecast">Loading forecast...</div>
      ) : (
        <Forecast
          lat={currentWeatherData.coord.lat}
          lon={currentWeatherData.coord.lon}
        />
      )}

      {error && <div className="error">{error}</div>}
      
    </div>

  );
}

export default Fetch;
