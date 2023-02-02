import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArtistById } from "../API-utils/endpointsManageArtists";
import { useQuery } from "react-query";

const ArtistPage = () => {
  const { id_artist } = useParams();
  const navigate = useNavigate();

  let content;

  const { status: isArtist, data: artist } = useQuery(
    ["artist-data", id_artist],
    () => getArtistById(id_artist),
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
      <>
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

        <section className="discography">
          <h1 className="discography__title">Dyskografia ()</h1>
          <div>Listing albumów muzycznych</div>
        </section>
      </>
    );
  }

  return <>{content}</>;
};

export default ArtistPage;
