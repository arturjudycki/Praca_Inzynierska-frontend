import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { Star } from "@material-ui/icons";
import {
  getCountOfAlbums,
  getTop100ListOfAlbums,
} from "../API-utils/endpointsManageMusic";
import { getRateAlbumByUser } from "../API-utils/endpointsManageRates";
import { img_path } from "../API-utils/links";

const Rated = ({ props }) => {
  const album_id = props.album.id_music_album;
  const { status, data: rated_value } = useQuery(
    ["rated_value", album_id],
    () => getRateAlbumByUser(album_id),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  let contentRateValue;

  if (status === "success") {
    contentRateValue = (
      <div className="rated-value__content">{rated_value.numerical_rating}</div>
    );
  } else {
    contentRateValue = (
      <div className="rated-value__content">
        <Star />
      </div>
    );
  }

  return (
    <div className="rated-value rated-value--topRight">{contentRateValue}</div>
  );
};

const MusicAlbums = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let numberOfAlbums;
  let top100Albums;

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const displayReleaseYear = (releaseDate) => {
    let time = new Date(releaseDate);
    let year = time.getFullYear();

    return year;
  };

  const displayTypeOfAlbum = (typeOfAlbum) => {
    if (typeOfAlbum === "studio_album") return "album studyjny";
    else if (typeOfAlbum === "live_album") return "album koncertowy";
    else if (typeOfAlbum === "compilation_album") return "album kompilacyjny";
    else if (typeOfAlbum === "EP") return "EP";
    else if (typeOfAlbum === "OST") return "OST";
  };

  const { status: isNumberAlbums, data: albums_amount } = useQuery(
    "albums_amount",
    getCountOfAlbums,
    { retry: 0 }
  );

  if (isNumberAlbums === "success") {
    numberOfAlbums = (
      <div className="db-amount">
        {" "}
        Liczba albumów w bazie:
        <p className="db-amount__value">{albums_amount.amount}</p>
      </div>
    );
  }

  const { status: isTop100, data: albums_top } = useQuery(
    "albums_top",
    getTop100ListOfAlbums,
    { retry: 0 }
  );

  if (isTop100 === "success") {
    let number = 0;
    top100Albums = albums_top.map((album) => (
      <div key={album.id_music_album} className="top__box">
        <div className="top__number">{++number}</div>
        <div className="top__cover">
          <NavLink
            to={"/music-album/".concat(`${album.id_music_album}`)}
            className="link-to-artist"
          >
            <img
              src={img_path + album.cover}
              alt="cover"
              className="top__img"
            />
            {isLogged === "success" ? <Rated props={{ album }} /> : ""}
          </NavLink>
        </div>
        <div className="top__info">
          <p className="top__item-type">
            {displayTypeOfAlbum(album.type_of_album)}
          </p>
          <NavLink
            to={"/music-album/".concat(`${album.id_music_album}`)}
            className="link-to-artist"
          >
            <p className="top__item-title">{album.title}</p>
          </NavLink>
          <NavLink
            to={"/music-album/".concat(`${album.id_music_album}`)}
            className="link-to-artist"
          ></NavLink>
          <p className="top__item-year">
            {displayReleaseYear(album.release_date)}
          </p>
        </div>
        <div className="top__rates">
          <p className="top__rates-mean">
            <Star className="top-icon" /> {parseFloat(album.mean).toFixed(2)}
          </p>
          <p className="top__rates-counts">Liczba ocen</p>
          <p>{album.counts}</p>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {numberOfAlbums}
      <div className="title-ranking">Ranking top 100 - albumy</div>
      <div className="top">{top100Albums}</div>

      {/* <section className="user-page__options">
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

          >
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default MusicAlbums;
