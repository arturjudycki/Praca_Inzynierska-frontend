import React from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerAuth } from "../API-utils/endpoints";

const LoginSchemat = Yup.object().shape({
  username: Yup.string()
    .required("Nazwa użytkownika jest wymagana!")
    .min(5, "Nazwa użytkownika musi składać się z conajmniej 5 znaków.")
    .max(20, "Nazwa użytkownika może składać się maksymalnie z 20 znaków"),

  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password: Yup.string()
    .required("Hasło jest wymagane!")
    .min(8, "Hasło musi zawierać minimum 8 znaków.")
    .matches(/^.*(?=.*\d).*$/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /^.*((?=.*[a-z,A-Z])).*$/,
      "Hasło musi zawierać przynajmniej jedną literę."
    ),

  passwordConfirmation: Yup.string()
    .required("Pole jest wymagane!")
    .oneOf([Yup.ref("password")], "Podane hasła nie są identyczne"),
});

const Register = () => {
  let content;

  const { isSuccess, isError, mutate } = useMutation(registerAuth, {});

  if (isSuccess) {
    content = (
      <section className="popUp">
        <div class="popUp__register201">
          <p>Twoje konto zostało pomyślnie utworzone.</p>
          <p>Możesz się teraz zalogować.</p>
          <NavLink to="/login">
            <button className="popUp__button">Zaloguj się</button>
          </NavLink>
        </div>
      </section>
    );
  }

  if (isError) {
    content = <p className="registerError">Konto z tymi danymi już istnieje</p>;
  }

  return (
    <div className="sign-wrapper">
      <section className="sign-choose">
        <NavLink
          className={({ isActive }) =>
            isActive ? "sign-choose__type login_selected" : "sign-choose__type"
          }
          to="/login"
        >
          Zaloguj się
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "sign-choose__type register_selected"
              : "sign-choose__type"
          }
          to="/register"
        >
          Załóż konto
        </NavLink>
      </section>
      {content}
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="sign-form">
            <Field
              id="username"
              name="username"
              placeholder="Nazwa użytkownika"
              type="text"
              className="sign-form__input"
            />
            <div className="errors">
              <ErrorMessage name="username" />
            </div>

            <Field
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              className="sign-form__input"
            />
            <div className="errors">
              <ErrorMessage name="email" />
            </div>

            <Field
              id="password"
              name="password"
              placeholder="Hasło"
              type="password"
              className="sign-form__input"
            />
            <div className="errors">
              <ErrorMessage name="password" />
            </div>

            <div className="password-info">
              <p className="password-info__text">
                Pamiętaj by hasło zawierało:
              </p>
              <ul className="password-info__list">
                <li className="password-info__list-item">minimum 8 znaków</li>
                <li className="password-info__list-item">
                  przynajmniej jedną literę
                </li>
                <li className="password-info__list-item">
                  przynajmniej jedną cyfrę
                </li>
              </ul>
            </div>

            <Field
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Powtórz hasło"
              type="password"
              className="sign-form__input"
            />
            <div className="errors">
              <ErrorMessage name="passwordConfirmation" />
            </div>

            <button type="submit" className="sign-form__button">
              Załóż konto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
