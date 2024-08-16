import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import reload from "../../assets/reload.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { deleteItem, getItems, postItems } from "../../utils/Api";
import { ItemContext } from "../../contexts/ItemsContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 0 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [clothItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [deleteCard, setDeleteCard] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    weather: "hot",
  });

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(() => console.log("Error"));
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setFormData({ imageUrl: "", name: "", weather: "hot" });
    setMobileView(false);
  };

  const closeActiveModal = ( ) => {
    setActiveModal("");
  };

  const handleDeleteItem = (deleteID = "") => {
    console.log(deleteID);
    deleteItem(deleteID)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== deleteID)
        );
        setDeleteCard(false);
        closeActiveModal();
      })
      .catch(() => console.log("Error"));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItem = (e) => {
    postItems(e)
      .then((addData) => {
        if (e.imageUrl?.length && e.name?.length) {
          setClothingItems((prevItems) => {
            const data = [addData, ...prevItems];
            return data.sort((a, b) => b._id - a._id);
          });
          closeActiveModal();
        } else {
          alert("Validation failed:", e);
        }
      })
      .catch((error) => {
        console.log("Add item error:", error);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
        weatherData,
        clothItems,
      }}
    >
      <ItemContext.Provider value={{ handleCardClick }}>
        <div className="page">
          <div className="page__content">
            <div>
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                mobileView={mobileView}
                setMobileView={setMobileView}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                    >
                      <button className="random_mobileView">
                        <img src={reload} alt="reload" />
                        <div>Randomize</div>
                      </button>
                    </Main>
                  }
                />
                <Route
                  path="/profile"
                  element={<Profile handleAddClick={handleAddClick} />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={(val) => handleAddItem(val)}
            formData={formData}
            setFormData={setFormData}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={(id) => handleDeleteItem(id)}
            deleteCard={deleteCard}
            handleDeleteCard={() => setDeleteCard(true)}
          />
        </div>
      </ItemContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
