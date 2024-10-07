import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ currentUser, setCurrentUser, handleAddClick, handleLogout }) {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar currentUser={currentUser} handleLogout={handleLogout} setCurrentUser={setCurrentUser}  />
      </section>
      <section className="profile__clothSection">
        <ClothesSection handleAddClick={handleAddClick} currentUser={currentUser} />
      </section>
    </div>
  );
}

export default Profile;
