import { checkResponse } from "./Api";
import { APIkey } from "./constants"; // Import the API key from constants

export const getWeather = ({ latitude, longitude }) => {
	// Check if API key is available
	if (!APIkey) {
		console.error("API key is missing. Please check your .env file or constants.js.");
		return Promise.reject("API key is missing");
	}

	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
	)
		.then(checkResponse)
		.catch((error) => {
			console.error("Failed to fetch weather data:", error);
			return Promise.reject(error);
		});
};

export const filterWeatherData = (data) => {
	const result = {};
	result.city = data.name;
	result.temp = {
		F: Math.round(data.main.temp),
		C: Math.round((data.main.temp - 32) * (5 / 9)),
	};
	result.type = getWeatherType(result.temp.F);
	result.condition = data.weather[0].main.toLowerCase();
	result.isDay = isDay(data.sys, Date.now());
	return result;
};

const isDay = ({ sunrise, sunset }, now) => {
	return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
	if (temperature > 86) {
		return "hot";
	} else if (temperature >= 66 && temperature < 86) {
		return "warm";
	} else {
		return "cold";
	}
};
