import React from "react";
import { Route, Routes } from "react-router-dom";
import img from "../images/lpw-logo.png";
import Logged from "../components/Logged";

const Navigation = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img src={img} alt="logo" className="header__logo" />
        <form className="header__form" action="">
          <input className="header__search-input" type="text" />
        </form>
        <Logged />
      </div>
      <nav></nav>
    </header>
  );
};

export default Navigation;
