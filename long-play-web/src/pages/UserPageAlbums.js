import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { Star, Favorite } from "@material-ui/icons";

const UserPageAlbums = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  let userIsLogged = false;
  let user_info;
  let content;
  let contentAlbums;

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: isUser, data: user } = useQuery(
    ["user-data", username],
    () => userData(username),
    { retry: 0 }
  );

  if (status === "success") {
    if (data.user.username === username) {
      userIsLogged = true;
    }
  }

  if (isUser === "error") {
    navigate("/404");
  }
  if (isUser === "success") {
    user_info = user;
    content = <InfoAccount person={{ userIsLogged, user_info }} />;
  }

  return (
    <>
      {content}
      <section className="managing-music">
        <NavLink
          end
          to={"/user/".concat(`${username}`)}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Profil główny</p>
        </NavLink>
        <NavLink
          end
          to={"/user/".concat(`${username}`, "/albums")}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Oceny albumów</p>
        </NavLink>
        <NavLink
          end
          to={"/user/".concat(`${username}`, "/songs")}
          className={({ isActive }) =>
            isActive
              ? "heroUser__choose-link heroUser__choose-link--selected"
              : "heroUser__choose-link"
          }
        >
          <p className="heroUser__settings-link">Oceny utworów</p>
        </NavLink>
      </section>

      <section className="user-page__options">
        <div className="user-page__sorters">
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">daty ocen</div>
            <div className="user-page__sortBy-item">najnowsze</div>
            <div className="user-page__sortBy-item">najstarsze</div>
          </div>
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">oceny</div>
            <div className="user-page__sortBy-item">najwyższe</div>
            <div className="user-page__sortBy-item">najniższe</div>
          </div>
        </div>
        <div className="user-page__filters">
          <div className="user-page__filterBy">
            <Star />
            Pokaż tylko ulubione
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPageAlbums;
