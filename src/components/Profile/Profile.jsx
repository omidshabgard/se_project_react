import React from "react";
import SideBar from "../SideBar/SideBar";
import ClotheSection from "../ClothSection/ClotheSection";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar />
      </section>
      <section className="profile__clothSection">
        <ClotheSection />
      </section>
    </div>
  );
}

export default Profile;
