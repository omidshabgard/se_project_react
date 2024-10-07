import './Header.css';
import logo from '../../assets/night/logo.svg';
import avatar from '../../assets/night/avatar.png';
import subMenu from '../../assets/menuIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useState } from 'react';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';
import { checkToken, signin } from '../../utils/auth'


function Header({ setCurrentUser, setIsLoggedIn, currentUser, isLoggedIn, handleAddClick, weatherData, setMobileView, mobileView }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const handleUserRegister = async ({ name, avatar, email, password }) => {
    try {
      const data = await signup(name, avatar, email, password);
      const loginData = await signin(email, password);
      localStorage.setItem('token', loginData.token);
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
      closeLoginModal();
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <header className="header">
      <div className="header_logo_and_location">
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
            <Link to={"/profile"} className="profile__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser ? currentUser.name : "User"}</p>
                <img src={currentUser ? currentUser.avatar : avatar} alt={currentUser ? currentUser.name : "User"} className="header__avatar" />
              </div>
            </Link>
          </>
        )}
      </div>

      {isRegisterOpen && (
        <RegisterModal isOpen={isRegisterOpen}
          onClose={closeRegisterModal}
          onRegisterSuccess={handleUserRegister} />
      )}

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeLoginModal}
          onLoginSuccess={handleUserLogin}
        />
      )}
    </header>
  );
}
export default Header;
