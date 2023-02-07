import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  faFileAudio,
  faMagnifyingGlass,
  faPlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getAllArtists } from "../API-utils/endpointsManageArtists";
import { addSong, getSongsOfAlbum } from "../API-utils/endpointsManageSongs";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  track_number: Yup.number().required("Numer utworu na albumie jest wymagany!"),

  title: Yup.string().required("Tytuł jest wymagany!"),

  duration: Yup.string().required("Czas trwania utworu jest wymagany!"),

  id_artist: Yup.number().required("Wykonawca jest wymagany!"),
});

const ManagingSong = ({ props }) => {
  const id_music_album = props.album.id_music_album;
  const [songModal, setSongModal] = useState(false);
  const [artistsSearch, setArtistsSearch] = useState([]);

  let contentSongs;

  const queryClient = useQueryClient();

  const { mutate: add_song } = useMutation(addSong, {
    onSuccess: () => {
      queryClient.invalidateQueries(["songs-data"]);
    },
  });

  const [idArtist, setIdArtist] = useState();
  let [artistName, setArtistName] = useState("");

  const { status: isSongs, data: songs } = useQuery(
    ["songs-data", id_music_album],
    () => getSongsOfAlbum(id_music_album),
    { retry: 0 }
  );

  if (isSongs === "loading") {
    contentSongs = (
      <div className="spinner__box">
        <div className="spinner__load"></div>
      </div>
    );
  }

  if (isSongs === "success") {
    if (songs.length === 0) {
      contentSongs = <p>Brak dodanych utworów</p>;
    } else {
      contentSongs = songs
        .sort((a, b) => a.track_number - b.track_number)
        .map((song) => (
          <div className="song__box-item-r" key={song.id_song}>
            <p className="song__item-c">{song.track_number}</p>
            <p className="song__item-c">{song.title}</p>
            <p className="song__item-c song__item-c--narrower">
              {song.duration}
            </p>
            <p className="song__item-c">{song.name}</p>
            <p className="song__item-c">
              Edytuj
              <FontAwesomeIcon icon={faPen} className="" />
            </p>
            <p className="song__item-c">
              Usuń <FontAwesomeIcon icon={faTrash} className="" />
            </p>
          </div>
        ));
    }
  }

  const { status: isAllArtists, data: AllArtists } = useQuery(
    "artists",
    getAllArtists,
    { retry: 0 }
  );

  const handleSubmitSearch = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (isAllArtists === "success") {
      const resultsArray = AllArtists.filter(
        (artist) =>
          e.target.value !== "" &&
          artist.name
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())
      );
      setArtistsSearch(resultsArray);
    }
  };

  const searchingArtist = () => {
    return (
      <>
        <div
          className="search-artist search-artist--margin"
          onSubmit={handleSubmitSearch}
        >
          <div className="search-artist__box">
            <input
              type="text"
              placeholder="Wyszukaj wykonawcę, aby go dodać"
              className="search-artist__input search-artist__input--w"
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="icon-artists"
            />
          </div>
        </div>

        <section className="searched-artist">
          {artistsSearch.map((artist) => (
            <div
              className="searched-artist__box searched-artist__box--width"
              key={artist.id_artist}
            >
              <NavLink
                to={{
                  pathname: "/artist/".concat(`${artist.id_artist}`),
                }}
                className="link-to-artist"
              >
                <div className="searched-artist__name">{artist.name}</div>
              </NavLink>
              <div
                onClick={() => {
                  setIdArtist(artist.id_artist);
                  setArtistName(artist.name);
                }}
              >
                <p>Dodaj</p>
                <FontAwesomeIcon icon={faPlus} className="icon-artists" />
              </div>
            </div>
          ))}
        </section>
      </>
    );
  };

  return (
    <>
      <div
        className="assign-link"
        onClick={() => {
          setSongModal(!songModal);
        }}
      >
        <p className="assign-link__text">Zarządzaj utworami</p>
        <FontAwesomeIcon icon={faFileAudio} className="faFileAudio" />
      </div>
      {songModal ? (
        <div className="modal modal--zIndex">
          <div
            onClick={() => {
              setSongModal(!songModal);
            }}
            className="overlay"
          ></div>
          <div className="modal-content modal-content--songs">
            <div className="song__box-item-r song__box-item-r-title">
              <p className="song__item-c">Numer utworu na płycie</p>
              <p className="song__item-c">Tytuł utworu</p>
              <p className="song__item-c song__item-c--narrower">
                Czas trwania
              </p>
              <p className="song__item-c">Wykonawca</p>
              <p className="song__item-c">Edytuj dane</p>
              <p className="song__item-c">Usuń utwór</p>
            </div>
            {contentSongs}
            <Formik
              initialValues={{
                track_number: "",
                title: "",
                duration: "",
                id_music_album: id_music_album,
                id_artist: idArtist,
              }}
              enableReinitialize={true}
              validationSchema={LoginSchemat}
              onSubmit={(values) => {
                add_song(values);
              }}
            >
              {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit} className="createAccount__form">
                  <div className="song__choose-author">
                    Wybierz najpierw wykonawcę <br />
                    <span> Wykonawca: {artistName} </span>
                  </div>
                  <div className="errors">
                    <ErrorMessage name="id_artist" />
                  </div>
                  {searchingArtist()}
                  <Field
                    id="track_number"
                    name="track_number"
                    placeholder="Numer utworu na albumie"
                    type="number"
                    className=""
                  />

                  <div className="errors">
                    <ErrorMessage name="track_number" />
                  </div>

                  <Field
                    id="title"
                    name="title"
                    placeholder="Tytuł utworu"
                    type="text"
                    className=""
                  />

                  <div className="errors">
                    <ErrorMessage name="title" />
                  </div>

                  <Field
                    id="duration"
                    name="duration"
                    placeholder="Czas trwania utworu"
                    type="text"
                    className=""
                  />

                  <div className="errors">
                    <ErrorMessage name="duration" />
                  </div>

                  <button
                    type="submit"
                    onClick={() => {
                      console.log(values);
                    }}
                    className="createAccount__form-button"
                  >
                    Dodaj utwór
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ManagingSong;
