import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { Favorite, Star } from "@material-ui/icons";
import { getAllRatesAlbumsByUserQuery } from "../API-utils/endpointsManageRates";
import { img_path } from "../API-utils/links";

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

  const displayPublicationDate = (publicationDate) => {
    let time = new Date(publicationDate);
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}-${month}-${year}`;
  };

  const displayTypeOfAlbum = (typeOfAlbum) => {
    if (typeOfAlbum === "studio_album") return "album studyjny";
    else if (typeOfAlbum === "live_album") return "album koncertowy";
    else if (typeOfAlbum === "compilation_album") return "album kompilacyjny";
    else if (typeOfAlbum === "EP") return "EP";
    else if (typeOfAlbum === "OST") return "OST";
  };

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
        {rates.length !== 0 ? (
          rates.map((rate) => (
            <div key={rate.id_rate} className="rated-music__box">
              <div className="rated-music__container">
                <NavLink
                  to={{
                    pathname: "/music-album/".concat(`${rate.id}`),
                  }}
                  className="rated-music__img-box"
                >
                  <img
                    src={img_path + rate.cover}
                    alt="cover"
                    className="rated-music__cover"
                  />
                </NavLink>

                <div className="rated-music__info">
                  <p className="rated-music__info-type">
                    {displayTypeOfAlbum(rate.type_of_album)}
                  </p>
                  <NavLink
                    to={{
                      pathname: "/music-album/".concat(`${rate.id}`),
                    }}
                    className="link-to-artist"
                  >
                    <p className="rated-music__info-title">{rate.title}</p>
                  </NavLink>
                  <p className="rated-music__info-date">
                    {displayPublicationDate(rate.release_date)}
                  </p>
                </div>
              </div>
              <div className="rated-music__rate">
                <div className="rated-music__rate-box">
                  <div className="rated-music__rate-values">
                    {" "}
                    <span className="rated-music__rate-value">
                      {rate.numerical_rating}
                    </span>
                    {[...Array(10)].map((star, index) => {
                      const value_rating = index + 1;

                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            className="star-input"
                            value={value_rating}
                          />
                          <Star
                            className="rated-icon rated-icon--noCursor"
                            style={
                              value_rating <= rate.numerical_rating
                                ? { color: "#ffc200" }
                                : { color: "#ddd" }
                            }
                          />
                        </label>
                      );
                    })}
                    <Favorite
                      className="rated-icon rated-icon--noCursor rated-icon--marginLeft"
                      style={
                        rate.favourites
                          ? { color: "#ffc200" }
                          : { color: "#ddd" }
                      }
                    />
                  </div>
                  {rate.verbal_rating !== "" ? (
                    <div className="rated-music__rate-verbal">
                      {rate.verbal_rating}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="rated-music__rate-date">
                  {displayPublicationDate(rate.rating_date)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="nope-rates">brak ocen</p>
        )}
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
