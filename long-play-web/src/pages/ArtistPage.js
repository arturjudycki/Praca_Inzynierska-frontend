import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import {
  getArtistById,
  getAlbumsByArtistId,
} from "../API-utils/endpointsManageArtists";
import { useQuery } from "react-query";

const ArtistPage = () => {
  const { id_artist } = useParams();
  const navigate = useNavigate();

  let content;
  let discography;
  let img_path = "http://localhost:8000/images/";

  const { status: isArtist, data: artist } = useQuery(
    ["artist-data", id_artist],
    () => getArtistById(id_artist),
    { retry: 0 }
  );

  const { status: isAlbums, data: albums } = useQuery(
    ["albums-data", id_artist],
    () => getAlbumsByArtistId(id_artist),
    { retry: 0 }
  );

  if (isArtist === "error") {
    navigate("/404");
  }

  if (isArtist === "loading") {
    content = (
      <div className="spinner__box">
        <div className="spinner__load"></div>
      </div>
    );
  }

  if (isArtist === "success") {
    content = (
      <section className="artist-page__box">
        <div className="artist-page__item-name">{artist.name}</div>
        <div className="artist-page__container">
          <div className="artist-page__container-info">
            <p className="artist-page__item-title">Notka biograficzna</p>
            <div className="artist-page__item-text">{artist.description}</div>
          </div>
          <div className="artist-page__container-info artist-page__container-info--width">
            <p className="artist-page__item-title">Skład/członkowie</p>
            <div className="artist-page__item-text">{artist.members}</div>
          </div>
        </div>
      </section>
    );
  }

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
  };

  if (isAlbums === "success") {
    discography = (
      <section className="discography">
        <h1 className="discography__title">Dyskografia</h1>
        {albums
          .sort(
            (a, b) =>
              displayReleaseYear(b.release_date) -
              displayReleaseYear(a.release_date)
          )
          .map((album) => (
            <div key={album.id_music_album}>
              <div className="discography__box">
                <p className="discography__year">
                  {displayReleaseYear(album.release_date)}
                </p>
                <NavLink
                  to={{
                    pathname: "/music-album/".concat(`${album.id_music_album}`),
                  }}
                  className="discography__link"
                >
                  <div className="discography__box-img">
                    <img
                      src={img_path + album.cover}
                      alt="cover"
                      className="discography__cover"
                    />
                  </div>
                </NavLink>
                <div className="discography__info-box">
                  <p className="discography__type-album">
                    {displayTypeOfAlbum(album.type_of_album)}
                  </p>
                  <NavLink
                    to={{
                      pathname: "/music-album/".concat(
                        `${album.id_music_album}`
                      ),
                    }}
                    className="discography__link discography__link-title"
                  >
                    <p className="discography__name-album">{album.title}</p>
                  </NavLink>
                </div>
              </div>
              <div className="discography__line"></div>
            </div>
          ))}
      </section>
    );
  }

  return (
    <>
      {content}
      {discography}
    </>
  );
};

export default ArtistPage;
