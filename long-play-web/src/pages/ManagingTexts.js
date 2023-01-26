import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createText,
  updateText,
  getTextsByIdUser,
} from "../API-utils/endpointsManageTexts";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import articleImg from "../images/article.jpg";
import newsImg from "../images/news.png";
import rankingImg from "../images/ranking.jpg";
import interviewImg from "../images/interview.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  title: Yup.string().required("Tytuł jest wymagany!"),

  content: Yup.string().required("Treść tekstu jest wymagana!"),
});

const ManagingTexts = () => {
  const navigate = useNavigate();
  let contentCreateText;
  let contentUpdateText;
  let contentUserTexts;
  const [idClick, setIdClick] = useState();

  const { status: isLogged, data } = useQuery("user", userAuth, {
    retry: 0,
  });

  const { status: isTexts, data: userTexts } = useQuery(
    "texts",
    getTextsByIdUser,
    {
      retry: 0,
    }
  );

  const {
    isError: errorUpdate,
    isSuccess: successUpdate,
    mutate: update_text,
  } = useMutation(updateText, {});

  if (successUpdate) {
    contentUpdateText = (
      <section className="popUp popUp--updateText">
        <div class="popUp__register201">
          <p>Tekst został pomyślnie edytowany</p>
          <NavLink>
            <button
              onClick={() => {
                navigate("/managing-texts");
                navigate(0);
              }}
              className="popUp__button"
            >
              Zamknij
            </button>
          </NavLink>
        </div>
      </section>
    );
  }

  if (errorUpdate) {
    contentUpdateText = (
      <p className="managing-text__error">
        Operacja się nie powiodła. Spróbuj ponownie.
      </p>
    );
  }

  if (isLogged === "error") {
    navigate("/");
  }

  const displayCorrectImage = (type) => {
    if (type === "article") {
      return articleImg;
    } else if (type === "news") {
      return newsImg;
    } else if (type === "ranking") {
      return rankingImg;
    } else {
      return interviewImg;
    }
  };

  const displayCorrectTypeOfText = (type) => {
    if (type === "article") {
      return "artykuł";
    } else if (type === "interview") {
      return "wywiad";
    } else return type;
  };

  if (isTexts === "success") {
    contentUserTexts = userTexts
      .sort((a, b) => b.id_text - a.id_text)
      .map((userText) => (
        <div key={userText.id_text} className="textBoxEdit">
          <div className="textBox__edit">
            <NavLink
              to={{
                pathname: "/text/".concat(`${userText.id_text}`),
              }}
              className="link-to-text"
            >
              <div className="textBox__item-imgBox">
                <div className="textBox__item-imgContainer">
                  <img
                    src={displayCorrectImage(userText.type_of_text)}
                    alt="text"
                    className="textBox__item-img"
                  />
                </div>
                <p className="textBox__item-type-of-text">
                  {displayCorrectTypeOfText(userText.type_of_text)}
                </p>
              </div>
              <p className="textBox__item-title">{userText.title}</p>
            </NavLink>
            <p
              className="textBox__item-icon"
              onClick={() => {
                if (idClick === userText.id_text) {
                  setIdClick(-1);
                } else {
                  setIdClick(userText.id_text);
                }
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="iconEdit" />
              <span>Wprowadź zmiany w tekście</span>
            </p>
          </div>
          {idClick === userText.id_text ? (
            <section className="editText">
              {contentUpdateText}
              <Formik
                initialValues={{
                  title: userText.title,
                  content: userText.content,
                  id_text: userText.id_text,
                }}
                validationSchema={LoginSchemat}
                onSubmit={(values) => {
                  update_text(values);
                }}
              >
                {({ handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="sign-change sign-change__editText"
                  >
                    <Field
                      id="title"
                      name="title"
                      type="text"
                      className="sign-change__input sign-change__input-text"
                    />

                    <div className="errors">
                      <ErrorMessage name="title" />
                    </div>

                    <Field
                      as="textarea"
                      id="content"
                      name="content"
                      type="textarea"
                      className="sign-change__input sign-change__input-text-area"
                    />

                    <div className="errors">
                      <ErrorMessage name="content" />
                    </div>

                    <button
                      className="sign-change__button sign-change__button--cancel"
                      onClick={() => {
                        setIdClick(-1);
                      }}
                      type="button"
                    >
                      Anuluj
                    </button>

                    <button type="submit" className="sign-change__button">
                      Edytuj
                    </button>
                  </Form>
                )}
              </Formik>
            </section>
          ) : (
            ""
          )}
        </div>
      ));
  }

  const {
    isError: errorCreate,
    isSuccess: successCreate,
    mutate: create_text,
  } = useMutation(createText, {});

  if (successCreate) {
    contentCreateText = (
      <section className="popUp popUp--createText">
        <div class="popUp__register201">
          <p>Tekst został pomyślnie dodany na stronę.</p>
          <NavLink>
            <button
              onClick={() => {
                navigate("/managing-texts");
                navigate(0);
              }}
              className="popUp__button"
            >
              Zamknij
            </button>
          </NavLink>
        </div>
      </section>
    );
  }

  if (errorCreate) {
    contentCreateText = (
      <p className="managing-text__error">
        Operacja się nie powiodła. Spróbuj ponownie.
      </p>
    );
  }

  if (isLogged === "success") {
    if (data.user.user_type !== "admin" && data.user.user_type !== "editor") {
      navigate("/");
    } else {
      return (
        <section className="managing-texts">
          <div className="managing-text__box">
            <h2 className="managing-text__title">
              <p
                onClick={() => {
                  if (
                    document
                      .querySelector(".boxToChange--text")
                      .classList.contains("boxToChange--none")
                  ) {
                    document
                      .querySelector(".boxToChange--text")
                      .classList.remove("boxToChange--none");
                  } else {
                    document
                      .querySelector(".boxToChange--text")
                      .classList.add("boxToChange--none");
                  }
                }}
                className="open-add-text"
              >
                Dodaj
              </p>{" "}
              nowy tekst na stronę
            </h2>
            <div className="boxToChange boxToChange--text">
              {contentCreateText}
              <Formik
                initialValues={{
                  type_of_text: "article",
                  title: "",
                  content: "",
                  user: data.user.id_user,
                }}
                validationSchema={LoginSchemat}
                onSubmit={(values) => {
                  console.log(new Date(Date.now()));
                  create_text(values);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className="sign-change">
                    <div className="radio-box__choose">
                      <label>
                        <Field
                          type="radio"
                          id="type_of_text"
                          name="type_of_text"
                          value="article"
                          className="radio-box__choose-item"
                        />
                        Artykuł
                      </label>
                      <label>
                        <Field
                          type="radio"
                          id="type_of_text"
                          name="type_of_text"
                          value="news"
                          className="radio-box__choose-item"
                        />
                        News
                      </label>
                      <label>
                        <Field
                          type="radio"
                          id="type_of_text"
                          name="type_of_text"
                          value="ranking"
                          className="radio-box__choose-item"
                        />
                        Ranking
                      </label>
                      <label>
                        <Field
                          type="radio"
                          id="type_of_text"
                          name="type_of_text"
                          value="interview"
                          className="radio-box__choose-item"
                        />
                        Wywiad
                      </label>
                    </div>
                    <Field
                      id="title"
                      name="title"
                      placeholder="Tytuł tekstu"
                      type="text"
                      className="sign-change__input sign-change__input-text"
                    />

                    <div className="errors">
                      <ErrorMessage name="title" />
                    </div>

                    <Field
                      as="textarea"
                      id="content"
                      name="content"
                      placeholder="Treść tekstu"
                      type="textarea"
                      className="sign-change__input sign-change__input-text-area"
                    />

                    <div className="errors">
                      <ErrorMessage name="content" />
                    </div>

                    <button
                      className="sign-change__button sign-change__button--cancel"
                      onClick={() => {
                        document
                          .querySelector(".boxToChange--text")
                          .classList.remove("boxToChange--none");
                      }}
                      type="button"
                    >
                      Anuluj
                    </button>

                    <button type="submit" className="sign-change__button">
                      Dodaj tekst
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="line"></div>
          <div className="managing-text__box">
            <h2 className="managing-text__title">
              Twoje ostatnio opublikowane teksty
            </h2>
            <section className="textContainer">{contentUserTexts}</section>
          </div>
        </section>
      );
    }
  }
};

export default ManagingTexts;
