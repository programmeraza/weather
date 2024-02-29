import React, { useState } from "react";
import "./WetherApp.scss";
import clear from "../../assets/clear.png";
import cloud from "../../assets/cloud.png";
import drizzle from "../../assets/drizzle.png";
import humidity1 from "../../assets/humidity.png";
import rain from "../../assets/rain.png";
import search__icon from "../../assets/search.png";
import snow from "../../assets/snow.png";
import wind from "../../assets/wind.png";
const Weather = () => {
  const [country, setCountry] = useState("");

  let API = "9f2b65c06589e9bcc829867591a46c84";
  const search = async () => {
    if (!search) {
      return;
    }

    const countries = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${country}&appid=${API}`
    ).then((res) => res.json());

    const { lat, lon } = countries[0];
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    const humm = document.getElementsByClassName("weather__hum");
    const windd = document.getElementsByClassName("weather__speed");
    const temp = document.getElementsByClassName("weather__temp");
    const loc = document.getElementsByClassName("weather__loc");
    humm[0].innerHTML = data.main.humidity;
    windd[0].innerHTML = data.wind.speed;
    temp[0].innerHTML = `${data.main.temp} C`;
    loc[0].innerHTML = data.name;
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
              <div
                className="weather__icon"
                onClick={() => {
                  search();
                }}
              >
                <img src={search__icon} alt="asd" />
              </div>
            </div>
            <div className="weather__info">
              <div className="weather__img">
                <img src={cloud} alt="asd" />
              </div>
              <div className="weather__temperature">
                <div className="weather__temp">24°C</div>
                <div className="weather__loc">London</div>
              </div>
              <div className="weather__data">
                <div className="weather__el">
                  <img src={humidity1} alt="asd" />
                  <div className="weather__item-data">
                    <div className="weather__hum">64%</div>
                    <div className="weather__hum-text">Humidity</div>
                  </div>
                </div>
                <div className="weather__el">
                  <img src={wind} alt="asd" />
                  <div className="weather__item-data">
                    <div className="weather__speed">18 km/h</div>
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

export default Weather;
