import React, { useState } from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import {
  addArtist,
  editArtist,
  getAllArtists,
} from "../API-utils/endpointsManageArtists";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFileAudio,
  faGuitar,
  faPlus,
  faMagnifyingGlass,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  name: Yup.string().required("Nazwa wykonawcy jest wymagana!"),

  description: Yup.string().required(
    "Notka biograficzna wykonawcy jest wymagana!"
  ),

  members: Yup.string().required(
    "Uwzględnienie składu/członków jest wymagane!"
  ),
});

const ManagingArtists = () => {
  const navigate = useNavigate();
  const [sectionSearch, setSectionSearch] = useState(true);
  const [sectionAddArtist, setSectionAddArtist] = useState(false);
  const [infoAddArtist, setInfoAddArtist] = useState(false);
  const [artistsSearch, setArtistsSearch] = useState([]);

  const [editArtistModal, setEditArtistModal] = useState(false);

  const queryClient = useQueryClient();

  const toggleInfoAddArtist = () => {
    setInfoAddArtist(!infoAddArtist);
  };

  const toggleEditArtistModal = () => {
    setEditArtistModal(!editArtistModal);
  };

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const { status: isAllArtists, data: AllArtists } = useQuery(
    "artists",
    getAllArtists,
    { retry: 0 }
  );

  const {
    data: artistId,
    isError: errorAddArtist,
    isSuccess: successAddArtist,
    mutate: add_artist,
  } = useMutation(addArtist, {});

  const { mutate: edit_artist } = useMutation(editArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["artists"]);
    },
  });

  const infoSuccessAddArtist = () => {
    return (
      <div className="info-add-artist">
        <p>Wykonawca został pomyślnie dodany.</p>
        <button
          className="button-modal"
          onClick={() => {
            navigate("/managing-music-artists");
            navigate(0);
          }}
        >
          Zamknij
        </button>
      </div>
    );
  };

  const infoErrorAddArtist = () => {
    return (
      <div className="info-add-artist">
        <p>Wystąpił nieoczekiwanie błąd.</p>
        <button
          className="button-modal"
          onClick={() => {
            navigate("/managing-music-artists");
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
    if (isAllArtists === "success") {
      const resultsArray = AllArtists.filter((artist) =>
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
        <form className="search-artist" onSubmit={handleSubmitSearch}>
          <div className="search-artist__box">
            <input
              type="text"
              placeholder="Wyszukaj wykonawcę"
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
          {artistsSearch !== undefined}
          {artistsSearch.map((artist) => (
            <div className="searched-artist__box" key={artist.id_artist}>
              <NavLink
                to={{
                  pathname: "/artist/".concat(
                    `${artist.name}`,
                    "/",
                    `${artist.id_artist}`
                  ),
                }}
                className="link-to-artist"
              >
                <div className="searched-artist__name">{artist.name}</div>
              </NavLink>
              <div
                className="searched-artist__edit"
                onClick={toggleEditArtistModal}
              >
                <p className="searched-artist__edit-text">Edytuj</p>
                <FontAwesomeIcon icon={faPen} className="" />
              </div>
              {editArtistModal ? (
                <div className="modal">
                  <div
                    onClick={() => {
                      toggleEditArtistModal();
                    }}
                    className="overlay"
                  ></div>
                  <div className="modal-content modal-content--editArtist">
                    <Formik
                      initialValues={{
                        id_artist: artist.id_artist,
                        name: artist.name,
                        description: artist.description,
                        members: artist.members,
                      }}
                      validationSchema={LoginSchemat}
                      onSubmit={(values) => {
                        edit_artist(values);
                        toggleEditArtistModal();
                      }}
                    >
                      {({ handleSubmit }) => (
                        <section className="adding-music adding-music-artist">
                          <Form
                            onSubmit={handleSubmit}
                            className="adding-music__form adding-music__form--editArtist"
                          >
                            <label>
                              Nazwa wykonawcy
                              <Field
                                id="name"
                                name="name"
                                placeholder="Nazwa wykonawcy"
                                type="text"
                                className="adding-music__form-input adding-music__form-input--editArtist"
                              />
                            </label>
                            <div className="errors">
                              <ErrorMessage name="name" />
                            </div>

                            <label>
                              Notka biograficzna
                              <Field
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Notka biograficzna"
                                className="adding-music__form-input adding-music__form-input-textarea adding-music__form-input--editArtist"
                              />
                            </label>
                            <div className="errors">
                              <ErrorMessage name="description" />
                            </div>

                            <label>
                              Skład/członkowie
                              <Field
                                as="textarea"
                                id="members"
                                name="members"
                                placeholder="Skład/członkowie"
                                className="adding-music__form-input adding-music__form-input-textarea adding-music__form-input--editArtist"
                              />
                            </label>
                            <div className="errors">
                              <ErrorMessage name="members" />
                            </div>
                            <button
                              type="submit"
                              className="add-button"
                              // onClick={() => {
                              //   toggleEditArtistModal();
                              // }}
                            >
                              Edytuj wykonawcę
                            </button>
                          </Form>
                        </section>
                      )}
                    </Formik>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </section>
      </>
    );
  };

  const addingArtist = () => {
    return (
      <Formik
        initialValues={{
          name: "",
          description: "",
          members: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values, onSubmitProps) => {
          add_artist(values);
          onSubmitProps.resetForm();
        }}
      >
        {({ handleSubmit }) => (
          <section className="adding-music adding-music-artist">
            <Form onSubmit={handleSubmit} className="adding-music__form">
              <Field
                id="name"
                name="name"
                placeholder="Nazwa wykonawcy"
                type="text"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="name" />
              </div>

              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Notka biograficzna"
                className="adding-music__form-input adding-music__form-input-textarea"
              />
              <div className="errors">
                <ErrorMessage name="description" />
              </div>
              <Field
                as="textarea"
                id="members"
                name="members"
                placeholder="Skład/członkowie"
                className="adding-music__form-input adding-music__form-input-textarea"
              />
              <div className="errors">
                <ErrorMessage name="members" />
              </div>
              <button
                type="submit"
                className="add-button"
                onClick={() => {
                  toggleInfoAddArtist();
                }}
              >
                Dodaj wykonawcę
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
              <p className="heroUser__settings-link">Albumy muzyczne</p>
            </NavLink>
            <NavLink
              to="/managing-music-songs"
              className={({ isActive }) =>
                isActive
                  ? "heroUser__link heroUser__link--flexEvenly heroUser__link--selected"
                  : "heroUser__link heroUser__link--flexEvenly"
              }
            >
              <FontAwesomeIcon icon={faFileAudio} className="faFileAudio" />
              <p className="heroUser__settings-link">Utwory</p>
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
                if (sectionAddArtist) {
                  setSectionSearch(!sectionSearch);
                  setSectionAddArtist(!sectionAddArtist);
                }
              }}
              className={
                sectionSearch
                  ? "section-artist-choose__item section-artist-choose__item-active"
                  : "section-artist-choose__item"
              }
            >
              <p>
                Wyszukanie wykonawcy
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="icon-artists"
                />
              </p>
            </div>
            <div
              onClick={() => {
                if (sectionSearch) {
                  setSectionSearch(!sectionSearch);
                  setSectionAddArtist(!sectionAddArtist);
                }
              }}
              className={
                sectionAddArtist
                  ? "section-artist-choose__item section-artist-choose__item-active"
                  : "section-artist-choose__item"
              }
            >
              <p>
                Dodanie nowego wykonawcy
                <FontAwesomeIcon icon={faPlus} className="icon-artists" />
              </p>
            </div>
          </main>
          {sectionSearch && searchingArtist()}
          {sectionAddArtist && addingArtist()}
          {infoAddArtist ? (
            <div className="modal">
              <div
                onClick={() => {
                  navigate("/managing-music-artists");
                  navigate(0);
                }}
                className="overlay"
              ></div>
              <div className="modal-content">
                {errorAddArtist && infoErrorAddArtist()}
                {successAddArtist && infoSuccessAddArtist()}
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

export default ManagingArtists;
