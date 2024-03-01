import React, { useState } from "react";
import "./WetherApp.scss";
import cloud from "../../assets/cloud.png";
import humidity from "../../assets/humidity.png";
import searchIcon from "../../assets/search.png";
import wind from "../../assets/wind.png";

const WeatherApp = () => {
  const [country, setCountry] = useState("");

  const API_KEY = "9f2b65c06589e9bcc829867591a46c84";
  const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const search = async () => {
    if (!country) {
      return;
    }

    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${country}&appid=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    const { lat, lon } = geoData[0];
    const weatherUrl = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const humidityElement = document.querySelector(".weather__hum");
    const windElement = document.querySelector(".weather__speed");
    const temperatureElement = document.querySelector(".weather__temp");
    const locationElement = document.querySelector(".weather__loc");

    humidityElement.textContent = `${weatherData.main.humidity}%`;
    windElement.textContent = `${weatherData.wind.speed} km/h`;
    temperatureElement.textContent = `${weatherData.main.temp} °C`;
    locationElement.textContent = weatherData.name;
  };

  return (
    <section className="weather">
      <div className="container">
        <div className="weather__wrapper">
          <div className="weather__left">
            <div className="weather__top">
              <input
                className="weather__input"
                placeholder="Search countries"
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
              <div className="weather__icon" onClick={search}>
                <img src={searchIcon} alt="Search Icon" />
              </div>
            </div>
            <div className="weather__info">
              <div className="weather__img">
                <img src={cloud} alt="Cloud Icon" />
              </div>
              <div className="weather__temperature">
                <div className="weather__temp"></div>
                <div className="weather__loc"></div>
              </div>
              <div className="weather__data">
                <div className="weather__el">
                  <img src={humidity} alt="Humidity Icon" />
                  <div className="weather__item-data">
                    <div className="weather__hum"></div>
                    <div className="weather__hum-text">Humidity</div>
                  </div>
                </div>
                <div className="weather__el">
                  <img src={wind} alt="Wind Icon" />
                  <div className="weather__item-data">
                    <div className="weather__speed"></div>
                    <div className="weather__hum-text">Wind Speed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
