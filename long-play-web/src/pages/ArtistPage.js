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
        <section className="artist-info__box">
          <div className="artist-info__item-name">{artist.name}</div>
          <div className="artist-info__item-description">
            {artist.description}
          </div>
          <div className="artist-info__item-members">{artist.members}</div>
        </section>
      </>
    );
  }

  return <>{content}</>;
};

export default ArtistPage;
