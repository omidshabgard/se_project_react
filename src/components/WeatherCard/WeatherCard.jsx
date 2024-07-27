import './WeatherCard.css';
import { weatherOpetions, defaultWeatherOptions } from '../../utils/constants';

function WeatherCard({ weatherData }) {
	const filterOptions = weatherOpetions.filter((option) => {
		return (
			option.day === weatherData.isDay &&
			option.condition === weatherData.condition
		);
	});

	let weatherOption;
	if (filterOptions.length === 0) {
		weatherOption = defaultWeatherOptions[weatherData.isDay ? "day"	: "night"];
	} else {
		weatherOption = filterOptions[0];
	}

	return (
		<section className='weather-card'>
			<p className='weather-card__temp'> {weatherData.temp.F} &deg; F</p>
			<img
				src={weatherOption?.url}
				alt={`Card showing ${
					weatherOption?.day ? 'day' : 'night'
				} time ${weatherOption?.condition}weather`}
				className='weather-card__image'
			/>
		</section>
	);
}

export default WeatherCard;

// <p className='weather-card__temp'> {WeatherData.temp.F} &deg; F</p>
