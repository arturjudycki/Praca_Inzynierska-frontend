import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import img from "../images/lpw-logo.png";
import Logged from "../components/Logged";

const Navigation = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__container">
          <div className="header__box">
            <NavLink to="/" exact="true" className="header__logo">
              <img src={img} alt="logo" />
            </NavLink>
            <form className="header__form" action="">
              <input className="header__search-input" type="text" />
            </form>
          </div>
          <Logged />
        </div>
        <nav className="header__menu">
          <li>Teksty</li>
          <li>Albumy muzyczne</li>
          <li>Wykonawcy</li>
          <li>Piosenki</li>
          <li>Oceny</li>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
