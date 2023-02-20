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
  const [hoverFavorite, setHoverFavorite] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  let userIsLogged = false;
  let user_info;
  let content;
  let contentAlbums;

  const handleSearchParamsFav = (arg) => {
    if (arg) {
      searchParams.set("favourite", "1");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else {
      searchParams.delete("favourite");
      setSearchParams(searchParams, { replace: true });
      refetch();
    }
  };

  const handleSearchParams = (arg) => {
    if (arg === "rating-date_ASC") {
      searchParams.set("sortBy", "rating-date_ASC");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "numerical-rating_DESC") {
      searchParams.set("sortBy", "numerical-rating_DESC");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "numerical-rating_ASC") {
      searchParams.set("sortBy", "numerical-rating_ASC");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else {
      searchParams.delete("sortBy");
      setSearchParams(searchParams, { replace: true });
      refetch();
    }
  };

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: isUser, data: user } = useQuery(
    ["user-data", username],
    () => userData(username),
    { retry: 0 }
  );

  const {
    status: isRates,
    data: rates,
    refetch,
  } = useQuery(
    ["rates-query-data", username, searchParams],
    () => getAllRatesAlbumsByUserQuery(username, searchParams),
    { retry: 0 }
  );

  if (isRates === "success") {
    contentAlbums = (
      <>
        {rates.length !== 0
          ? rates.map((rate) => (
              <div key={rate.id_rate}>{rate.numerical_rating}</div>
            ))
          : "brak ocen"}
      </>
    );
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
            <div className="user-page__sortBy-title">daty ocen:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_DESC";
                  handleSearchParams(option);
                }}
                style={
                  !searchParams.has("sortBy")
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najnowsze
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "rating-date_ASC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "rating-date_ASC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najstarsze
              </div>
            </div>
          </div>
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">oceny:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_DESC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "numerical-rating_DESC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najwyższe
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "numerical-rating_ASC";
                  handleSearchParams(option);
                }}
                style={
                  searchParams.get("sortBy") === "numerical-rating_ASC"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                najniższe
              </div>
            </div>
          </div>
        </div>
        <div className="user-page__filters">
          <div
            className="user-page__filterBy"
            onMouseEnter={() => {
              setHoverFavorite(true);
            }}
            onMouseLeave={() => {
              setHoverFavorite(false);
            }}
            onClick={() => {
              if (searchParams.has("favourite")) {
                let value = false;
                handleSearchParamsFav(value);
              } else {
                let value = true;
                handleSearchParamsFav(value);
              }
            }}
          >
            <Favorite
              className="fav-filter"
              style={
                searchParams.has("favourite") || hoverFavorite
                  ? { color: "#ffc200" }
                  : { color: "#ddd" }
              }
            />
            Pokaż tylko ulubione
          </div>
        </div>
      </section>
      {contentAlbums}
    </>
  );
};

export default UserPageAlbums;
