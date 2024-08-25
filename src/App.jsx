import React, { useState } from "react";
import Fetch from "./Fetch";
import "./App.css";

function App() {
  const [city, setCity] = useState("Madurai");
  const [inputValue, setInputValue] = useState(city);

  const inputChange = (event) => {
    setInputValue(event.target.value);
  };

  const citySearch = (event) => {
    event.preventDefault();
    setCity(inputValue); 
  };

  return (
    <div className="app">
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={inputChange}
          placeholder="Enter city..."
        />
        <button type="submit" onClick={citySearch}>
          <span role="img" aria-label="search" className="search-icon">
            🔍
          </span>
        </button>
      </div>
      <Fetch city={city} />
    </div>
  );
}

export default App;
