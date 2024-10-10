import React, { useState } from "react";
import avatar from "../../assets/night/avatar.png";
import "./SideBar.css";
import UpdateUserModal from "../UpdateUserModal";
import { checkToken } from '../../utils/auth';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'; 

function SideBar({ handleLogout }) {

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const openUpdateModal = () => setIsUpdateOpen(true);
  const closeUpdateModal = () => setIsUpdateOpen(false);

  const handleUpdateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Failed to fetch updated user data:", err);
        })
    } else {
      console.error("No token found, please log in.");
    }
  };

  const handleUserUpdateSuccess = () => {
    handleUpdateUser();
    closeUpdateModal();
  };

  return (
    <div>
      <div className="sideBar">
        <span>
          <img
            src={currentUser ? currentUser.avatar : avatar}
            alt={currentUser ? currentUser.name : "User"}
            className="sideBar_Avatar"
          />
        </span>
        <span>{currentUser ? currentUser.name : "User"}</span>
      </div>

      <span className="sideBar" onClick={openUpdateModal}>
        Change profile data
      </span>

      <span className="sideBar" onClick={handleLogout}>
        Log out
      </span>

      {isUpdateOpen && (
        <UpdateUserModal
          isOpen={isUpdateOpen}
          onClose={closeUpdateModal}
          onUpdateSuccess={handleUserUpdateSuccess}
          initialName={currentUser ? currentUser.name : ""}
          initialAvatar={currentUser ? currentUser.avatar : ""}
        />
      )}
    </div>
  );
}

export default SideBar;
