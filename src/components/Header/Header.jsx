import './Header.css';
import logo from '../../assets/night/logo.svg';
import avatar from '../../assets/night/avatar.png';
import subMenu from '../../assets/menuIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { StateContext } from '../../contexts/StateContext.js';

function Header({ handleAddClick, weatherData, setMobileView, mobileView, getItemList }) {
  
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn, setIsRegisterOpen, setIsLoginOpen } = useContext(StateContext);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const openRegisterModal = () => setIsRegisterOpen(true);
  const openLoginModal = () => setIsLoginOpen(true);

  return (
    <header className="header">
      <div className="header_logo_and_location" onClick={getItemList}>
        <Link to={"/"}>
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="mobile_view_menu">
        <button className="submenu" onClick={() => setMobileView(true)}>
          <img src={subMenu} alt="submenu" />
        </button>
        {mobileView && (
          <div className="mobile_menu">
            <button
              className="submenu_close"
              onClick={() => setMobileView(false)}
            >
              <img src={closeIcon} alt="close" className="mobileClose" />
            </button>

            {!isLoggedIn && (
              <>
                <div className='header__signup' onClick={openRegisterModal}>
                  SignUp
                </div>
                <div className='header__login' onClick={openLoginModal}>
                  LogIn
                </div>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to={"/profile"}
                  className="profile__link"
                  onClick={() => setMobileView(false)}
                >
                  <div className="mobileView__user-container">
                    <p className="header__username">{currentUser ? currentUser.name : "User"}</p>
                    <img
                      src={currentUser ? currentUser.avatar : avatar}
                      alt={currentUser ? currentUser.name : "User"}
                      className="header__avatar"
                    />
                  </div>
                </Link>

                <button
                  onClick={handleAddClick}
                  type="button"
                  className="header__add-clothes-btn"
                >
                  + Add clothes
                </button>
              </>
            )}
          </div>
        )}
      </div>


      <div className="header_menu_content">
        <ToggleSwitch />

        {!isLoggedIn && (
          <>
            <div className='header__signup' onClick={openRegisterModal}>
              SignUp
            </div>
            <div className='header__login' onClick={openLoginModal}>
              LogIn
            </div>
          </>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to={"/profile"} className="profile__link" onClick={getItemList}>
              <div className="header__user-container">
                <p className="header__username">{currentUser ? currentUser.name : "User"}</p>
                <img src={currentUser ? currentUser.avatar : avatar} alt={currentUser ? currentUser.name : "User"} className="header__avatar" />
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
