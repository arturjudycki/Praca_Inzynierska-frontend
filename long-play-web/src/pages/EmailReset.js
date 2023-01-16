import React from "react";
import { useMutation } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { sendLinkToEmail } from "../API-utils/endpoints";

import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),
});

const EmailReset = () => {
  let content;

  const { isError, isSuccess, mutate } = useMutation(sendLinkToEmail, {});

  if (isSuccess) {
    content = (
      <section className="popUpEmail">
        <div className="popUpEmail__200">
          <p>Sprawdź swój adres email.</p>
          <p>Tam powinien znajdować się link do zmiany hasła.</p>
        </div>
      </section>
    );
  }

  if (isError) {
    content = (
      <p className="loginError">
        Użytkownik o takim adresie e-mail nie istnieje
      </p>
    );
  }

  return (
    <div className="sign-wrapper sign-wrapper--wider">
      <p className="sign-change-password">
        Na podany adres email zostanie przesłany link do zmiany hasła.
      </p>
      {content}
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="sign-form">
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

            <button type="submit" className="sign-form__button">
              Wyślij
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailReset;
