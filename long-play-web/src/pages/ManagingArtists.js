import React, { useState } from "react";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { addArtist } from "../API-utils/endpointsManageArtist";
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
  let infoArtist;

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  const {
    data: album,
    isError: errorAddArtist,
    isSuccess: successAddArtist,
    mutate: add_artist,
  } = useMutation(addArtist, {});

  if (successAddArtist) {
    infoArtist = (
      <div className="info-add">
        <p>Wykonawca został pomyślnie dodany.</p>
        {/* <p>Możesz przypisać do niego wykonawcę.</p> */}
        {/* <button className="add-button">Dodaj utwory do albumu</button> */}
      </div>
    );
  }

  const addingArtist = () => {
    return (
      <Formik
        initialValues={{
          name: "",
          description: "",
          members: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values) => {
          add_artist(values);
        }}
      >
        {({ handleSubmit }) => (
          <section className="adding-music">
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
              <button type="submit" className="add-button">
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

          {addingArtist()}
          {infoArtist}
        </>
      );
    }
  }
};

export default ManagingArtists;
