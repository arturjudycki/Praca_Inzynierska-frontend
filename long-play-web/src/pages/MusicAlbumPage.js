import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAlbumById } from "../API-utils/endpointsManageMusic";
import { useQuery } from "react-query";

const MusicAlbumPage = () => {
  const { id_music_album } = useParams();
  const navigate = useNavigate();

  let content;

  const { status: isMusicAlbum, data: music_album } = useQuery(
    ["music-album-data", id_music_album],
    () => getAlbumById(id_music_album),
    { retry: 0 }
  );

  if (isMusicAlbum === "error") {
    navigate("/404");
  }

  if (isMusicAlbum === "loading") {
    content = (
      <div className="spinner__box">
        <div className="spinner__load"></div>
      </div>
    );
  }

  if (isMusicAlbum === "success") {
    content = (
      <>
        <section className="music-album-page__box">{music_album.title}</section>
      </>
    );
  }

  return <>{content}</>;
};

export default MusicAlbumPage;
