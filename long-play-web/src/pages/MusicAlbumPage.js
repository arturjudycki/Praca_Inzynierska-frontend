import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAlbumById } from "../API-utils/endpointsManageMusic";
import { useQuery } from "react-query";

const MusicAlbumPage = () => {
  const { id_music_album } = useParams();
  const navigate = useNavigate();

  let img_path = "http://localhost:8000/images/";

  let content;

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
    else return "EP";
  };

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
        <main className="album-page">
          <section className="album-page__box">
            <img
              src={img_path + music_album.cover}
              alt="cover-of-album"
              className="album-page__cover"
            />

            <div className="album-page__box-info">
              <p className="album-page__type-album">
                {displayTypeOfAlbum(music_album.type_of_album)}
              </p>
              <p className="album-page__title">{music_album.title}</p>
              <p className="album-page__release-date">
                {displayPublicationDate(music_album.release_date)}
              </p>
              <p className="album-page__artist">miejsce na wykonawcę</p>
            </div>

            <div className="ocenianko">
              Komponent - stanowiący sedno aplikacji - opiniowanie albumu
            </div>
          </section>
          <hr className="album-page__line" />

          <section className="album-page__box">
            <div className="album-page__box-details">
              <div className="album-page__box-details-item">
                <p className="album-page__box-details-item-text">
                  Długość albumu
                </p>
                <p>{music_album.duration}</p>
              </div>
              <div className="album-page__box-details-item">
                <p className="album-page__box-details-item-text">Gatunki</p>
                <p>{music_album.genre}</p>
              </div>
              <div className="album-page__box-details-item">
                <p className="album-page__box-details-item-text">Wytwórnia</p>
                <p>{music_album.record_label}</p>
              </div>
            </div>
            <div className="pioseneczki">piosenki</div>
          </section>
        </main>
      </>
    );
  }

  return <>{content}</>;
};

export default MusicAlbumPage;
