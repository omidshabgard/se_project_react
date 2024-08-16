import React, { useContext } from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './Main.css';

function Main({ weatherData, handleCardClick, children }) {
	const { currentTemperatureUnit, clothItems } = useContext(
		CurrentTemperatureUnitContext
	);
	return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is &nbsp;
          {currentTemperatureUnit === "F" ? (
            <>{`${weatherData.temp.F}`} &deg; F</>
          ) : (
            <>{`${weatherData.temp.C} `}&deg; C</>
          )}
          &nbsp; / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothItems
            ?.filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
      {children}
    </main>
  );
}

export default Main;
