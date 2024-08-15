import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar />
      </section>
      <section className="profile__clothSection">
        <ClothesSection handleAddClick={handleAddClick} />
      </section>
    </div>
  );
  
}

export default Profile;
