import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <NavLink to="/" exact="true" s className="footer__container-text">
          LongPlayWeb
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
