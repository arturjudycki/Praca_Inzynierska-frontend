import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { Favorite } from "@material-ui/icons";
import { getAllRatesAlbumsByUserQuery } from "../API-utils/endpointsManageRates";

const UserPageAlbums = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  let option;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFavourite, setIsFavourite] = useState(false);

  let userIsLogged = false;
  let user_info;
  let content;
  let contentAlbums;

  const handleSearchParamsFav = (arg) => {
    if (arg) {
      searchParams.set("favourite", "1");
      setSearchParams(searchParams, { replace: true });
      console.log(searchParams);
    } else {
      searchParams.delete("favourite");
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleSearchParams = (arg) => {
    if (arg === "rating-date_ASC") {
      searchParams.set("sortBy", "rating-date_ASC");
      setSearchParams(searchParams, { replace: true });
    } else if (arg === "numerical-rating_DESC") {
      searchParams.set("sortBy", "numerical_rating_DESC");
      setSearchParams(searchParams, { replace: true });
    } else if (arg === "numerical-rating_ASC") {
      searchParams.set("sortBy", "numerical-rating_ASC");
      setSearchParams(searchParams, { replace: true });
    } else {
      searchParams.delete("sortBy");
      setSearchParams(searchParams, { replace: true });
    }
  };

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: isUser, data: user } = useQuery(
    ["user-data", username],
    () => userData(username),
    { retry: 0 }
  );

  const { status: isRates, data: rates } = useQuery(
    ["rates-query-data", username, searchParams],
    () => getAllRatesAlbumsByUserQuery(username, searchParams),
    { retry: 0 }
  );

  if (isRates === "success") {
    console.log("sukces");
  }

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
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_DESC";
                  handleSearchParams(option);
                }}
              >
                najnowsze
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_ASC";
                  handleSearchParams(option);
                }}
              >
                najstarsze
              </div>
            </div>
          </div>
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">oceny</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_DESC";
                  handleSearchParams(option);
                }}
              >
                najwyższe
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_ASC";
                  handleSearchParams(option);
                }}
              >
                najniższe
              </div>
            </div>
          </div>
        </div>
        <div className="user-page__filters">
          <div
            className="user-page__filterBy"
            onClick={() => {
              if (isFavourite) {
                console.log(isFavourite);
                setIsFavourite(!isFavourite);
                let value = false;
                handleSearchParamsFav(value);
              } else {
                console.log(isFavourite);
                setIsFavourite(!isFavourite);
                let value = true;
                handleSearchParamsFav(value);
              }
            }}
          >
            <Favorite />
            Pokaż tylko ulubione
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPageAlbums;
