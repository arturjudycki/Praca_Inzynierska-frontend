import React from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFileAudio,
  faGuitar,
} from "@fortawesome/free-solid-svg-icons";

const ManagingMusic = () => {
  const navigate = useNavigate();

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  if (isLogged === "error") {
    navigate("/");
  }

  if (isLogged === "success") {
    if (data.user.user_type !== "admin") {
      navigate("/");
    } else {
      return (
        <section className="managing-music">
          <NavLink to="/" className="heroUser__link heroUser__link--flexStart">
            <FontAwesomeIcon icon={faRecordVinyl} className="faRecordVinyl" />
            <p className="heroUser__settings-link">Albumy muzyczne</p>
          </NavLink>
          <NavLink to="/" className="heroUser__link heroUser__link--flexStart">
            <FontAwesomeIcon icon={faFileAudio} className="faFileAudio" />
            <p className="heroUser__settings-link">Piosenki</p>
          </NavLink>
          <NavLink to="/" className="heroUser__link heroUser__link--flexStart">
            <FontAwesomeIcon icon={faGuitar} className="faGuitar" />
            <p className="heroUser__settings-link">Wykonawcy</p>
          </NavLink>
        </section>
      );
    }
  }
};

export default ManagingMusic;
