import React from "react";
import { useParams } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import {
  userAuth,
  changeEmail,
  changePassword,
} from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),
});

const LoginSchemat2 = Yup.object().shape({
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

const SettingPage = () => {
  const navigate = useNavigate();

  const { status, data } = useQuery("user", userAuth, { retry: 0 });

  if (status === "error") {
    navigate("/");
  }

  if (status === "success") {
    if (data.user.user_type !== "admin") {
      navigate("/");
    } else {
      return (
        <div>
          <div>Utwórz konta byczqu</div>
        </div>
      );
    }
  }
};

export default SettingPage;
