import "./WeatherCard.css";
import {
  weatherOperations,
  defaultWeatherOptions,
} from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filterOptions = weatherOperations.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filterOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filterOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F" ? (
          <>{weatherData.temp.F} &deg; F</>
        ) : (
          <>{weatherData.temp.C} &deg; C</>
        )}
      </p>
      <img
        src={weatherOption?.url}
        alt={
          filterOptions.length
            ? `Card showing ${weatherOption?.day ? "day" : "night"} time ${
                weatherOption?.condition
              }weather`
            : `Card showing ${weatherData.isDay ? "day" : "night"} time ${
                weatherData.condition
              }weather`
        }
        className="weather-card__image"
      />
      <img
        src={filterOptions[0]?.url}
        alt={
          filterOptions.length
            ? `Card showing ${weatherOption?.day ? "day" : "night"} time ${
                weatherOption?.condition
              }weather`
            : `Card showing ${weatherData.isDay ? "day" : "night"} time ${
                weatherData.condition
              }weather`
        }
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
