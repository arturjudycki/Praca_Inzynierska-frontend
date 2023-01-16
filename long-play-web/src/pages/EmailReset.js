import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),
});

const EmailReset = () => {
  return (
    <div className="sign-wrapper sign-wrapper--wider">
      <p className="sign-change-password">
        Na podany adres email zostanie przesłany link do zmiany hasła.
      </p>
      <Formik
        initialValues={{
          email: "",
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
