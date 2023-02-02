import React, { useState } from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { addAlbum } from "../API-utils/endpointsManageMusic";
import { useQuery, useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFileAudio,
  faGuitar,
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
  let infoAlbum;

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const {
    data: album,
    isError: errorAddAlbum,
    isSuccess: successAddAlbum,
    mutate: add_album,
  } = useMutation(addAlbum, {});

  if (successAddAlbum) {
    infoAlbum = (
      <div className="infoAlbum">
        <p>Album został pomyślnie dodany.</p>
        <p>Możesz przypisać do niego wykonawcę.</p>
        <button className="add-button">Przypisz wykonawcę</button>
      </div>
    );
  }

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
        onSubmit={(values) => {
          add_album(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <section className="adding-music">
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

          {addingAlbum()}
          {infoAlbum}
          {/* <AddingAlbum /> */}
        </>
      );
    }
  }
};

export default ManagingMusicAlbums;
