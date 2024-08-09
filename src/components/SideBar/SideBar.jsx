import React from "react";
import avatar from "../../assets/night/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sideBar">
      <span>
        <img src={avatar} alt="Terren Tegegne" className="sideBar_Avatar" />
      </span>
      <span>Terren Tegegne</span>
    </div>
  );
}

export default SideBar;
