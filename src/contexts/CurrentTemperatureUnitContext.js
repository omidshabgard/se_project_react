import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "F",
  handleToggleSwitchChange: () => {},
  handleCardClick: () => {},
  weatherData: {},
  clothItems:[],
});

export { CurrentTemperatureUnitContext };
