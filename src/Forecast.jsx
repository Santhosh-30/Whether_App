import React, { useState, useEffect } from "react";

const API_KEY = "f56f24967aaf51182d1d4df628297c6d";

function Forecast({ lat, lon }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data.daily.slice(1, 6)); 
        setLoading(false);
      });
  }, [lat, lon]);

  return (
    <div className="forecast-wrapper">
      <h3>5 Day Forecast </h3>
      <div className="forecast">
        {loading ? (
          <div className="loading-forecast">Loading forecast...</div>
        ) : (
          forecastData.map((day, index) => (
            <div key={index} className="day">
              <span className="forecast-date">
                {new Date(day.dt * 1000).toLocaleDateString([],{weekday:'long'})}
              </span>
              <div className="forecast-temp-wrapper">
                <img
                  className="forecast-image"
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <span >
                  {day.temp.min} / {day.temp.max}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forecast;
