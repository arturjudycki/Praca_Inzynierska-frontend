import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { base_url, userAuth } from "../API-utils/endpoints";

const Logged = () => {
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  let logged = false;

  useEffect(() => {
    userAuth().then((res) => {
      setId(id.id_user);
    });
  });

  if (!id) {
    return (
      <div className="header__logged">
        <FontAwesomeIcon icon={faRightToBracket} className="faRightToBracket" />
        <div className="header__logged-container">
          Zaloguj się <br />
          Zarejestruj się
        </div>
      </div>
    );
  } else {
    return (
      <div className="header__logged">
        <div className="header__logged-container">Elo Arczi</div>
      </div>
    );
  }
};

export default Logged;
