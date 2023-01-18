import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPerson } from "@fortawesome/free-solid-svg-icons";

const InfoAccount = ({ person }) => {
  const { user } = person.user_info;
  const { username } = useParams();
  const urlUser = "/user/".concat(`${username}`);

  const displayName = () => {
    if (user.user_type === "admin" || user.user_type === "editor") {
      if (user.first_name !== null && user.last_name !== null) {
        return (
          <p className="heroUser__names">
            {"".concat(`${user.first_name}`, " ", `${user.last_name}`)}
          </p>
        );
      }
    }
  };

  return (
    <section className="heroUser">
      {user.user_type === "admin" && person.userIsLogged ? (
        <NavLink
          to="/create-accounts"
          className="heroUser__createAccounts heroUser__createAccounts--flexStart"
        >
          <FontAwesomeIcon icon={faPerson} className="faPerson" />
          <p className="heroUser__settings-link">Utwórz konta</p>
        </NavLink>
      ) : (
        ""
      )}

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
        {user.username}
        {displayName()}
      </NavLink>
    </section>
  );
};

export default InfoAccount;
