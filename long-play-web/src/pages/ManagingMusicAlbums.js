import React, { useState } from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { addAlbum, getAllAlbums } from "../API-utils/endpointsManageMusic";
import AssignArtist from "../components/AssignArtist";
import { useQuery, useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFileAudio,
  faGuitar,
  faPlus,
  faMagnifyingGlass,
  faPen,
  faUserPlus,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
    return <img src={preview} alt="" className="previewImg" />;
  }
};

const LoginSchemat = Yup.object().shape({
  title: Yup.string().required("Tytuł jest wymagany!"),

  cover: Yup.mixed()
    .required("Dodanie zdjęcia albumu jest wymagane!")
    .test(
      "FILE_TYPE",
      "Nieodpowiedni typ pliku - tylko .png, .jpeg., .jpg",
      (value) =>
        value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "Rozmiar zdjęcia za duży - max 50kB",
      (value) => value && value.size < 51200
    ),

  release_date: Yup.date().required("Data wydania albumu jest wymagana!"),

  duration: Yup.string().required("Czas trwania płyty jest wymagany!"),

  genre: Yup.string().required("Przypisanie gatunku jest wymagane!"),

  record_label: Yup.string().required("Wytwórnia muzyczna jest wymagana!"),
});

const ManagingMusicAlbums = () => {
  const navigate = useNavigate();

  const [sectionAdd, setSectionAdd] = useState(true);
  const [sectionManage, setSectionManage] = useState(false);
  const [sectionSongs, setSectionSongs] = useState(false);
  const [albumsSearch, setAlbumsSearch] = useState([]);
  const [infoAddAlbum, setInfoAddAlbum] = useState(false);

  const [editAlbumModal, setEditAlbumModal] = useState(false);

  const [assignModal, setAssignModal] = useState(false);

  let infoAlbum;

  let img_path = "http://localhost:8000/images/";

  const toggleEditAlbumModal = () => {
    setEditAlbumModal(!editAlbumModal);
  };

  const toggleInfoAddAlbum = () => {
    setInfoAddAlbum(!infoAddAlbum);
  };

  const toggleAssignModal = () => {
    setAssignModal(!assignModal);
  };

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const { status: isAllAlbums, data: AllAlbums } = useQuery(
    "albums",
    getAllAlbums,
    { retry: 0 }
  );

  const {
    data: addedAlbum,
    isError: errorAddAlbum,
    isSuccess: successAddAlbum,
    mutate: add_album,
  } = useMutation(addAlbum, {});

  const infoSuccessAddAlbum = () => {
    return (
      <div className="infoAlbum">
        <p>Album został pomyślnie dodany.</p>
        <button
          className="add-button"
          onClick={() => {
            navigate("/managing-music-albums");
            navigate(0);
          }}
        >
          Zamknij
        </button>
      </div>
    );
  };

  const infoErrorAddAlbum = () => {
    return (
      <div className="infoAlbum">
        <p>Wystąpił nieoczekiwanie błąd.</p>
        <button
          className="add-button"
          onClick={() => {
            navigate("/managing-music-albums");
            navigate(0);
          }}
        >
          Zamknij
        </button>
      </div>
    );
  };

  const handleSubmitSearch = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (isAllAlbums === "success") {
      const resultsArray = AllAlbums.filter((album) =>
        album.title
          .toLowerCase()
          .trim()
          .includes(e.target.value.toLowerCase().trim())
      );
      setAlbumsSearch(resultsArray);
    }
  };

  const managingSongs = () => {
    return (
      <>
        <div>piosenki bez refrenu, piosenki bez melodii</div>
      </>
    );
  };

  const searchingAlbum = () => {
    return (
      <>
        <form className="search-artist" onSubmit={handleSubmitSearch}>
          <div className="search-artist__box">
            <input
              type="text"
              placeholder="Wyszukaj album, aby go zedytować lub przypisać do niego wykonawcę"
              className="search-artist__input"
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="icon-artists"
            />
          </div>
        </form>

        <section className="searched-artist">
          {albumsSearch.map((album) => (
            <div
              className="searched-artist__box searched-artist__box--spaceBetween"
              key={album.id_music_album}
            >
              <NavLink
                to={{
                  pathname: "/music-album/".concat(`${album.id_music_album}`),
                }}
                className="link-to-artist link-to-artist--display"
              >
                <img
                  src={img_path + album.cover}
                  alt="cover-of-album"
                  className="album-page__cover album-page__cover--smaller"
                />
                <div className="searched-artist__name">{album.title}</div>
              </NavLink>
              <div
                className="searched-artist__edit searched-artist__edit--top"
                onClick={toggleEditAlbumModal}
              >
                <p className="searched-artist__edit-text">Edytuj</p>
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div className="assign-link" onClick={toggleAssignModal}>
                <p className="assign-link__text">Przypisz wykonawcę</p>
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
              {assignModal ? (
                <AssignArtist
                  toggleAssignModal={toggleAssignModal}
                  props={{ album }}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </section>
      </>
    );
  };

  const addingAlbum = () => {
    return (
      <Formik
        initialValues={{
          title: "",
          cover: "",
          release_date: "",
          duration: "",
          type_of_album: "studio_album",
          genre: "",
          record_label: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values, onSubmitProps) => {
          add_album(values);
          toggleInfoAddAlbum();
          onSubmitProps.resetForm();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <section className="adding-music adding-music--marginTop">
            <Form onSubmit={handleSubmit} className="adding-music__form">
              <Field
                id="title"
                name="title"
                placeholder="Tytuł albumu"
                type="text"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="title" />
              </div>

              <div className="add-cover">
                <p>Dodaj okładkę albumu</p>

                <div className="preview-image__box">
                  {values.cover && <PreviewImage file={values.cover} />}
                </div>

                <input
                  type="file"
                  id="cover"
                  name="cover"
                  className="file-cover"
                  onChange={(event) => {
                    setFieldValue("cover", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="errors">
                <ErrorMessage name="cover" />
              </div>

              <label className="add-date">
                Data wydania albumu
                <Field
                  id="release_date"
                  name="release_date"
                  placeholder="Data wydania albumu"
                  type="date"
                  className="adding-music__form-input adding-music__form-input-date"
                />
              </label>
              <div className="errors">
                <ErrorMessage name="release_date" />
              </div>
              <Field
                id="duration"
                name="duration"
                placeholder="Czas trwania płyty"
                type="text"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="duration" />
              </div>
              <div className="radio-box__choose">
                <label>
                  <Field
                    type="radio"
                    id="type_of_album"
                    name="type_of_album"
                    value="studio_album"
                    className="radio-box__choose-item"
                  />
                  Album studyjny
                </label>
                <label>
                  <Field
                    type="radio"
                    id="type_of_album"
                    name="type_of_album"
                    value="live_album"
                    className="radio-box__choose-item"
                  />
                  Album koncertowy
                </label>
                <label>
                  <Field
                    type="radio"
                    id="type_of_album"
                    name="type_of_album"
                    value="compilation_album"
                    className="radio-box__choose-item"
                  />
                  Album kompilacyjny
                </label>
                <label>
                  <Field
                    type="radio"
                    id="type_of_album"
                    name="type_of_album"
                    value="EP"
                    className="radio-box__choose-item"
                  />
                  EP - minialbum
                </label>
              </div>
              <Field
                id="genre"
                name="genre"
                placeholder="Gatunek"
                type="text"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="genre" />
              </div>
              <Field
                id="record_label"
                name="record_label"
                placeholder="Wytwórnia muzyczna"
                type="text"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="record_label" />
              </div>
              <button type="submit" className="add-button">
                Dodaj album
              </button>
            </Form>
          </section>
        )}
      </Formik>
    );
  };

  if (isLogged === "error") {
    navigate("/");
  }

  if (isLogged === "success") {
    if (data.user.user_type !== "admin") {
      navigate("/");
    } else {
      return (
        <>
          <h1 className="managing-music__title">
            Administruj pozycjami muzycznymi
          </h1>
          <hr className="line--margin-top" />
          <section className="managing-music">
            <NavLink
              to="/managing-music-albums"
              className={({ isActive }) =>
                isActive
                  ? "heroUser__link heroUser__link--flexEvenly heroUser__link--selected"
                  : "heroUser__link heroUser__link--flexEvenly"
              }
            >
              <FontAwesomeIcon icon={faRecordVinyl} className="faRecordVinyl" />
              <p className="heroUser__settings-link">Albumy muzyczne/Utwory</p>
            </NavLink>
            <NavLink
              to="/managing-music-artists"
              className={({ isActive }) =>
                isActive
                  ? "heroUser__link heroUser__link--flexEvenly heroUser__link--selected"
                  : "heroUser__link heroUser__link--flexEvenly"
              }
            >
              <FontAwesomeIcon icon={faGuitar} className="faGuitar" />
              <p className="heroUser__settings-link">Wykonawcy</p>
            </NavLink>
          </section>
          <hr className="line--margin-bottom" />

          <main className="section-artist-choose">
            <div
              onClick={() => {
                if (sectionManage) {
                  setSectionManage(!sectionManage);
                  setSectionAdd(!sectionAdd);
                  // setSectionSongs(!sectionSongs);
                } else if (sectionSongs) {
                  setSectionManage(!sectionManage);
                  // setSectionAdd(!sectionAdd);
                  setSectionSongs(!sectionSongs);
                }
              }}
              className={
                sectionAdd
                  ? "section-artist-choose__item section-artist-choose__item-active"
                  : "section-artist-choose__item"
              }
            >
              <p>
                Dodanie nowego albumu
                <FontAwesomeIcon icon={faPlus} className="icon-artists" />
              </p>
            </div>
            <div
              onClick={() => {
                if (sectionAdd) {
                  setSectionManage(!sectionManage);
                  setSectionAdd(!sectionAdd);
                } else if (sectionSongs) {
                  setSectionManage(!sectionManage);
                  setSectionSongs(!sectionSongs);
                }
              }}
              className={
                sectionManage
                  ? "section-artist-choose__item section-artist-choose__item-active"
                  : "section-artist-choose__item"
              }
            >
              <p>
                Zarządzanie dodanym albumem
                <FontAwesomeIcon icon={faGears} className="icon-artists" />
              </p>
            </div>
            <div
              onClick={() => {
                if (sectionAdd) {
                  setSectionSongs(!sectionSongs);
                  setSectionAdd(!sectionAdd);
                } else if (sectionManage) {
                  setSectionSongs(!sectionSongs);
                  setSectionManage(!sectionManage);
                }
              }}
              className={
                sectionSongs
                  ? "section-artist-choose__item section-artist-choose__item-active"
                  : "section-artist-choose__item"
              }
            >
              <p>
                Zarządzanie utworami
                <FontAwesomeIcon icon={faGears} className="icon-artists" />
              </p>
            </div>
          </main>
          {sectionManage && searchingAlbum()}
          {sectionAdd && addingAlbum()}
          {sectionSongs && managingSongs()}

          {infoAddAlbum ? (
            <div className="modal">
              <div
                onClick={() => {
                  navigate("/managing-music-albums");
                  navigate(0);
                }}
                className="overlay"
              ></div>
              <div className="modal-content">
                {errorAddAlbum && infoErrorAddAlbum()}
                {successAddAlbum && infoSuccessAddAlbum()}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      );
    }
  }
};

export default ManagingMusicAlbums;
