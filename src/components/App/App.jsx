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
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { deleteItem, getItems, postItems } from "../../utils/Api";
import { ItemContext } from "../../contexts/ItemsContext";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';
import ProtectedRoute from '../ProtectedRoute';
import { checkToken, signup, signin } from '../../utils/auth'
import { useCallback } from 'react';
import { StateContext } from "../../contexts/StateContext,js";

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

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const closeRegisterModal = () => setIsRegisterOpen(false);
  const closeLoginModal = () => setIsLoginOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Token validation failed:', err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItemList();
  }, []);

  const getItemList = useCallback(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(() => console.log('Error'));
  }, []);

  const handleSubButton = (subButtonValue) => {
    if (subButtonValue === 'Login') {
      closeRegisterModal();
      setIsLoginOpen(true);
    } else {
      closeLoginModal();
      setIsRegisterOpen(true);
    }
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
    setFormData({ imageUrl: '', name: '', weather: 'hot' });
    setMobileView(false);
  };

  const closeActiveModal = () => {
    setActiveModal('');
    setDeleteCard(false);
  };

  const handleDeleteItem = (deleteID = '') => {
    deleteItem(deleteID)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== deleteID)
        );
        setDeleteCard(false);
        closeActiveModal();
      })
      .catch(() => console.log('Error'));
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
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
          alert('Validation failed:', e);
        }
      })
      .catch((error) => {
        console.log('Add item error:', error);
      });
  };

  const handleUserRegister = async ({ name, avatar, email, password }) => {
    try {
      const data = await signup(name, avatar, email, password);
      handleUserLogin({ email, password });
      closeRegisterModal();
      alert('Registration and login successful!');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed.');
    }
  };

  const handleUserLogin = async ({ email, password }) => {
    try {
      const data = await signin(email, password);
      localStorage.setItem('token', data.token);
      const userData = await checkToken(data.token);
      setCurrentUser(userData);
      setIsLoggedIn(true);
      getItemList();
      closeLoginModal();
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <StateContext.Provider value={{ isLoggedIn, setCurrentUser, setIsRegisterOpen, setIsLoginOpen }}>
      <CurrentUserContext.Provider value={{ currentUser }}>
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
                    closeRegisterModal={closeRegisterModal}
                    getItemList={getItemList}
                    isLoggedIn={isLoggedIn}
                    handleAddClick={handleAddClick}
                    setIsRegisterOpen={setIsRegisterOpen}
                    setIsLoginOpen={setIsLoginOpen}
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
                      element={
                        <ProtectedRoute>
                          <Profile handleAddClick={handleAddClick} handleLogout={handleLogout} getItemList={getItemList} />
                        </ProtectedRoute>
                      }
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
              {isRegisterOpen && (
                <RegisterModal isOpen={isRegisterOpen}
                  onClose={closeRegisterModal}
                  onRegisterSuccess={handleUserRegister}
                  handleSubButton={handleSubButton}
                />
              )}

              {isLoginOpen && (
                <LoginModal
                  isOpen={isLoginOpen}
                  onClose={closeLoginModal}
                  onLoginSuccess={handleUserLogin}
                  handleSubButton={handleSubButton}
                />
              )}
            </div>
          </ItemContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
