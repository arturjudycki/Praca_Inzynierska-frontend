import React from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const InfoAccount = ({ person }) => {
  const { username } = useParams();
  const urlUser = "/user/".concat(`${username}`);

  return (
    <section className="heroUser">
      {person.userIsLogged ? (
        <NavLink to="/settings-user" className="heroUser__settings">
          <FontAwesomeIcon icon={faGear} className="faGear" />
          <p className="heroUser__settings-link">Ustawienia profilu</p>
        </NavLink>
      ) : (
        ""
      )}
      <NavLink
        to={{
          pathname: urlUser,
        }}
        className="heroUser__username"
      >
        {person.username}
      </NavLink>
    </section>
  );
};

export default InfoAccount;
