import React from "react";
import { NavLink } from "react-router-dom";
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
          <section className="subpage-choose">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "subpage-choose__type texts_selected"
                  : "subpage-choose__type"
              }
              to="/texts"
            >
              teksty
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "subpage-choose__type albums_selected"
                  : "subpage-choose__type"
              }
              to="/music-albums"
            >
              albumy
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "subpage-choose__type songs_selected"
                  : "subpage-choose__type"
              }
              to="/songs"
            >
              utwory
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "subpage-choose__type artists_selected"
                  : "subpage-choose__type"
              }
              to="/artists"
            >
              wykonawcy
            </NavLink>
          </section>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
