import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({});

const ResetPassword = () => {
  return (
    <div className="sign-wrapper sign-wrapper--wider">
      <p className="sign-change-password">
        Ustal nowe hasło dla Twojego konta.
      </p>
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={LoginSchemat}
        onSubmit={
          {
            // useMutation
          }
        }
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="sign-form">
            <Field
              id="password"
              name="password"
              placeholder="Hasło"
              type="password"
              className="sign-form__input"
            />
            <ErrorMessage name="password" />

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
            <ErrorMessage name="passwordConfirmation" />

            <button type="submit" className="sign-form__button">
              Zmień hasło
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
