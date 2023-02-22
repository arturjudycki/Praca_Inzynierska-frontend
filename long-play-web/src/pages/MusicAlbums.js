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
  let option;

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

  const handleSearchParamsRelease = (arg) => {
    if (arg === "1950s") {
      searchParams.set("releaseDate", "1950s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "1960s") {
      searchParams.set("releaseDate", "1960s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "1970s") {
      searchParams.set("releaseDate", "1970s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "1980s") {
      searchParams.set("releaseDate", "1980s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "1990s") {
      searchParams.set("releaseDate", "1990s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "2000s") {
      searchParams.set("releaseDate", "2000s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "2010s") {
      searchParams.set("releaseDate", "2010s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "2020s") {
      searchParams.set("releaseDate", "2020s");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else {
      searchParams.delete("releaseDate");
      setSearchParams(searchParams, { replace: true });
      refetch();
    }
  };

  const handleSearchParamsType = (arg) => {
    if (arg === "studio_album") {
      searchParams.set("typeOfAlbum", "studio_album");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "live_album") {
      searchParams.set("typeOfAlbum", "live_album");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "compilation_album") {
      searchParams.set("typeOfAlbum", "compilation_album");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "EP") {
      searchParams.set("typeOfAlbum", "EP");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else if (arg === "OST") {
      searchParams.set("typeOfAlbum", "OST");
      setSearchParams(searchParams, { replace: true });
      refetch();
    } else {
      searchParams.delete("typeOfAlbum");
      setSearchParams(searchParams, { replace: true });
      refetch();
    }
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

  const {
    status: isTop100,
    data: albums_top,
    refetch,
  } = useQuery(
    ["albums_top", searchParams],
    () => getTop100ListOfAlbums(searchParams),
    { retry: 0 }
  );

  if (isTop100 === "success") {
    let number = 0;
    top100Albums = (
      <>
        {albums_top.length !== 0 ? (
          albums_top.map((album) => (
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
                  <Star className="top-icon" />{" "}
                  {parseFloat(album.mean).toFixed(2)}
                </p>
                <p className="top__rates-counts">Liczba ocen</p>
                <p>{album.counts}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="nope-rates">Brak albumów</div>
        )}
      </>
    );
  }

  return (
    <div>
      {numberOfAlbums}
      <div className="title-ranking">Ranking top 100 - albumy</div>
      <section className="user-page__options">
        <div className="user-page__sorters">
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">typ albumu:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "all";
                  handleSearchParamsType(option);
                }}
                style={
                  !searchParams.has("typeOfAlbum")
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                wszystkie
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "studio_album";
                  handleSearchParamsType(option);
                }}
                style={
                  searchParams.get("typeOfAlbum") === "studio_album"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                albumy studyjne
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "live_album";
                  handleSearchParamsType(option);
                }}
                style={
                  searchParams.get("typeOfAlbum") === "live_album"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                albumy koncertowe
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "compilation_album";
                  handleSearchParamsType(option);
                }}
                style={
                  searchParams.get("typeOfAlbum") === "compilation_album"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                albumy kompilacyjne
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "EP";
                  handleSearchParamsType(option);
                }}
                style={
                  searchParams.get("typeOfAlbum") === "EP"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                ep
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "OST";
                  handleSearchParamsType(option);
                }}
                style={
                  searchParams.get("typeOfAlbum") === "OST"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                ost
              </div>
            </div>
          </div>
        </div>

        <div className="user-page__sorters">
          <div className="user-page__sortBy">
            <div className="user-page__sortBy-title">okres wydania albumu:</div>
            <div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "all";
                  handleSearchParamsRelease(option);
                }}
                style={
                  !searchParams.has("releaseDate")
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                wszystkie
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "1950s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "1950s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                1950 - 1959
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "1960s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "1960s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                1960 - 1969
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "1970s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "1970s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                1970 - 1979
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "1980s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "1980s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                1980 - 1989
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "1990s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "1990s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                1990 - 1999
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "2000s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "2000s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                2000 - 2009
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "2010s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "2010s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                2010 - 2019
              </div>
              <div
                className="user-page__sortBy-item"
                onClick={() => {
                  option = "2020s";
                  handleSearchParamsRelease(option);
                }}
                style={
                  searchParams.get("releaseDate") === "2020s"
                    ? { fontWeight: 700 }
                    : { fontWeight: 400 }
                }
              >
                2020 - 2029
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="top">{top100Albums}</div>
    </div>
  );
};

export default MusicAlbums;
