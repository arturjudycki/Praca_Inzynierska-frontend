import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { base_url, userAuth } from "../API-utils/endpoints";
import { NavLink } from "react-router-dom";

const Logged = () => {
  const [username, setUsername] = useState();

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data: user } = useQuery("user", userAuth);

  let content;

  if (!isError) {
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
  } else {
    setUsername(user);
    content = (
      <div className="header__logged">
        <div className="header__logged-box">
          <div className="header__logged-account">
            <FontAwesomeIcon icon={faUser} className="faRightToBracket" />
            <p className="logged-data">{username} </p>
          </div>
          <div className="header__loggedOut">
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
