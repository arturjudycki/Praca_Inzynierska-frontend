import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { base_url, userAuth, logoutAuth } from "../API-utils/endpoints";
import { NavLink, useNavigate } from "react-router-dom";

const Logged = () => {
  const navigate = useNavigate();

  const { status, error, data } = useQuery("user", userAuth, {
    retry: 0,
  });

  const logout = useMutation(logoutAuth, {
    onSuccess: () => {
      navigate("/");
      navigate(0);
    },
  });

  const handleLogout = () => {
    logout.mutate();
  };

  let content;

  // console.log(error, status);
  if (status === "loading") {
    content = <div></div>;
  }
  if (status === "error") {
    content = (
      <div className="header__logged">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          className="faRightToBracket"
        />
        <NavLink to="/login" exact="true" className="header__logged-container">
          Zaloguj się <br />
          Zarejestruj się
        </NavLink>
      </div>
    );
  }
  if (status === "success") {
    content = (
      <div className="header__logged">
        <div className="header__logged-box">
          <div className="header__logged-account">
            <FontAwesomeIcon icon={faUser} className="faRightToBracket" />
            <p className="logged-data">{data.user.username}</p>
          </div>

          <div onClick={handleLogout} className="header__loggedOut">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="faArrowRightFromBracket"
            />
            <p className="header__loggedOut-text">Wyloguj się</p>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default Logged;
