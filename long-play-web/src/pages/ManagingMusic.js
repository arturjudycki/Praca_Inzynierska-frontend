import React from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faFileAudio,
  faGuitar,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddingAlbum = () => {};

const LoginSchemat = Yup.object().shape({});

const ManagingMusic = () => {
  const navigate = useNavigate();

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const addingAlbum = () => {
    return (
      <Formik
        initialValues={{
          title: "",
          // cover: "",
          release_date: "",
          duration: "",
          type_of_album: "studio_album",
          genre: "",
          record_label: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values) => {
          // mutate(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
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

            <label>
              Dodaj okładkę albumu
              <div className="preview-image__box"></div>
              <input
                type="file"
                name="cover"
                onChange={(event) => {
                  setFieldValue("cover", event.currentTarget.files[0]);
                }}
              />
              {/* PreviewImage */}
            </label>

            <label className="">
              Data wydania albumu
              <Field
                id="release_date"
                name="release_date"
                placeholder="Data wydania albumu"
                type="date"
                className="adding-music__form-input"
              />
              <div className="errors">
                <ErrorMessage name="release_date" />
              </div>
            </label>
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
              placeholder="Nazwisko admina"
              type="text"
              className="adding-music__form-input"
            />
            <div className="errors">
              <ErrorMessage name="record_label" />
            </div>
            <button type="submit" className="createAccount__form-button">
              Dodaj album
            </button>
          </Form>
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
          <section className="managing-music">
            <NavLink
              to="/"
              className="heroUser__link heroUser__link--flexStart"
            >
              <FontAwesomeIcon icon={faRecordVinyl} className="faRecordVinyl" />
              <p className="heroUser__settings-link">Albumy muzyczne</p>
            </NavLink>
            <NavLink
              to="/"
              className="heroUser__link heroUser__link--flexStart"
            >
              <FontAwesomeIcon icon={faFileAudio} className="faFileAudio" />
              <p className="heroUser__settings-link">Piosenki</p>
            </NavLink>
            <NavLink
              to="/"
              className="heroUser__link heroUser__link--flexStart"
            >
              <FontAwesomeIcon icon={faGuitar} className="faGuitar" />
              <p className="heroUser__settings-link">Wykonawcy</p>
            </NavLink>
          </section>
          {addingAlbum()}
          {/* <AddingAlbum /> */}
        </>
      );
    }
  }
};

export default ManagingMusic;
