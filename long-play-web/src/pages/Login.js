import React, { useState } from "react";
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginAuth } from "../API-utils/endpoints";

const LoginSchemat = Yup.object().shape({
  username: Yup.string().required("E-mail jest wymagany!"),
  password: Yup.string().required("Hasło jest wymagane!"),
});

const Login = () => {
  const navigate = useNavigate();

  let content;

  const { isError, mutate } = useMutation(loginAuth, {
    onSuccess: () => {
      navigate("/");
      navigate(0);
    },
  });

  if (isError) {
    content = (
      <p className="loginError">Twoje dane logowania są nieprawidłowe</p>
    );
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
          password: "",
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
              id="password"
              name="password"
              placeholder="Hasło"
              type="password"
              className="sign-form__input"
            />

            <div className="errors">
              <ErrorMessage name="password" />
            </div>

            <NavLink
              to="/send-link-to-reset-password"
              className="sign-form__remindPassword"
            >
              Zapomniałeś hasła?
            </NavLink>
            <button type="submit" className="sign-form__button">
              Zaloguj się
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
