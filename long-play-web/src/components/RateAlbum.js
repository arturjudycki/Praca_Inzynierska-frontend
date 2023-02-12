import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { userAuth } from "../API-utils/endpointsAuthUser";
import {
  addRateAlbum,
  getRateAlbumByUser,
} from "../API-utils/endpointsManageRates";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Star, Favorite } from "@material-ui/icons";
import InfoToLog from "./InfoToLog";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  numerical_rating: Yup.number().required("Przyznaj albumowi liczbę gwiazdek!"),
});

const RateAlbum = () => {
  const { id_music_album } = useParams();
  const queryClient = useQueryClient();

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: statusGetRateAlbum, data: rateAlbum } = useQuery(
    ["rate-album", id_music_album],
    () => getRateAlbumByUser(id_music_album),
    {
      retry: 0,
    }
  );

  const [rateValueAlbum, setRateValueAlbum] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [hoverFavorite, setHoverFavorite] = useState(false);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const {
    isError: errorAdd,
    isSuccess: successAdd,
    mutate: add_rate,
  } = useMutation(addRateAlbum, {
    onSuccess: () => {
      queryClient.invalidateQueries(["rate-album"]);
    },
  });

  let contentRate;

  if (status === "error" || status === "loading") {
    contentRate = (
      <div className="rate__box">
        <div className="rate__container">
          <p className="rate__container-text">Ocena </p>
          <span className="rate__container-value">
            {rateValueAlbum === null && hoverValue !== null
              ? hoverValue + "/10"
              : ""}
            {rateValueAlbum !== null ? rateValueAlbum + "/10" : ""}
          </span>
          <Favorite
            className="heart-icon"
            onClick={() => {
              toggleModal();
            }}
            onMouseEnter={() => {
              setHoverFavorite(true);
            }}
            onMouseLeave={() => {
              setHoverFavorite(false);
            }}
            style={
              isFavorite || hoverFavorite
                ? { color: "#ffc200" }
                : { color: "#ddd" }
            }
          />
        </div>
        <div>
          {[...Array(10)].map((star, index) => {
            const value_rating = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  className="star-input"
                  value={value_rating}
                  onClick={() => {
                    toggleModal();
                  }}
                />
                <Star
                  className="star-icon"
                  onMouseEnter={() => {
                    setHoverValue(value_rating);
                  }}
                  onMouseLeave={() => {
                    setHoverValue(null);
                  }}
                  style={
                    value_rating <= (rateValueAlbum || hoverValue)
                      ? { color: "#ffc200" }
                      : { color: "#ddd" }
                  }
                />
              </label>
            );
          })}
        </div>
        <form className="form__opinion">
          <textarea
            className="form__opinion-item"
            placeholder="Napisz swoją opinię"
            onClick={() => {
              toggleModal();
            }}
          ></textarea>
        </form>

        <button
          className="rate__box-button"
          type="submit"
          onClick={() => {
            toggleModal();
          }}
        >
          oceń
        </button>
      </div>
    );
  }
  if (status === "success") {
    if (statusGetRateAlbum === "loading") {
      contentRate = (
        <div className="spinner__box spinner__box--centerAlign">
          <div className="spinner__load"></div>
        </div>
      );
    }
    if (statusGetRateAlbum === "error") {
      contentRate = (
        <Formik
          initialValues={{
            favourites: false,
            numerical_rating: "",
            verbal_rating: "",
            music_album: id_music_album,
            user: data.user.id_user,
          }}
          validationSchema={LoginSchemat}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            // add_rate(values);
            console.log(values);
          }}
        >
          {({ handleSubmit, setErrors, values }) => (
            <Form onSubmit={handleSubmit} className="">
              <div className="rate__box">
                <div className="rate__container">
                  <p className="rate__container-text">Ocena </p>
                  <span className="rate__container-value">
                    {rateValueAlbum === null && hoverValue !== null
                      ? hoverValue + "/10"
                      : ""}
                    {rateValueAlbum !== null ? rateValueAlbum + "/10" : ""}
                  </span>
                  <label className="heart-label">
                    <input
                      type="radio"
                      id="favourites"
                      name="favourites"
                      className="star-input"
                      onClick={() => {
                        if (values.favourites === false) {
                          values.favourites = true;
                        } else if (values.favourites === true) {
                          values.favourites = false;
                        }
                      }}
                    />
                    <Favorite
                      className="heart-icon"
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                      }}
                      onMouseEnter={() => {
                        setHoverFavorite(true);
                      }}
                      onMouseLeave={() => {
                        setHoverFavorite(false);
                      }}
                      style={
                        isFavorite || hoverFavorite
                          ? { color: "#ffc200" }
                          : { color: "#ddd" }
                      }
                    />
                  </label>
                </div>
                <div>
                  {[...Array(10)].map((star, index) => {
                    const value_rating = index + 1;

                    return (
                      <label key={index}>
                        <Field
                          type="radio"
                          id="numerical_rating"
                          name="numerical_rating"
                          className="star-input"
                          value={value_rating}
                          onClick={() => {
                            setRateValueAlbum(value_rating);
                            setErrors({});
                          }}
                        />
                        <Star
                          className="star-icon"
                          onMouseEnter={() => {
                            setHoverValue(value_rating);
                          }}
                          onMouseLeave={() => {
                            setHoverValue(null);
                          }}
                          style={
                            value_rating <= (rateValueAlbum || hoverValue)
                              ? { color: "#ffc200" }
                              : { color: "#ddd" }
                          }
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="errors">
                  <ErrorMessage name="numerical_rating" />
                </div>
                <div className="form__opinion">
                  <Field
                    as="textarea"
                    id="verbal_rating"
                    name="verbal_rating"
                    className="form__opinion-item"
                    placeholder="Napisz swoją opinię"
                  />
                </div>
                <button className="rate__box-button" type="submit">
                  oceń
                </button>
              </div>
            </Form>
          )}
        </Formik>
      );
    }
    if (statusGetRateAlbum === "success") {
      contentRate = (
        <div className="rate__box">
          <div className="rate__container">
            <p className="rate__container-text">Twoja ocena </p>
            <span className="rate__container-value">
              {rateAlbum.numerical_rating + "/10"}
            </span>
            {rateAlbum.favourite === 1 ? setIsFavorite(!isFavorite) : ""}
            <Favorite
              className="heart-icon"
              style={
                isFavorite || hoverFavorite
                  ? { color: "#ffc200" }
                  : { color: "#ddd" }
              }
            />
          </div>
          <div>
            {[...Array(10)].map((star, index) => {
              const value_rating = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    className="star-input"
                    value={value_rating}
                    onClick={() => {
                      toggleModal();
                    }}
                  />
                  <Star
                    className="star-icon"
                    onMouseEnter={() => {
                      setHoverValue(value_rating);
                    }}
                    onMouseLeave={() => {
                      setHoverValue(null);
                    }}
                    style={
                      value_rating <= (rateValueAlbum || hoverValue)
                        ? { color: "#ffc200" }
                        : { color: "#ddd" }
                    }
                  />
                </label>
              );
            })}
          </div>
          <div className="form__opinion">
            <p className="form__opinion-item">{rateAlbum.verbal_rating}</p>
          </div>
        </div>

        // <Formik
        //   initialValues={{
        //     favourites: rateAlbum.favourites,
        //     numerical_rating: rateAlbum.numerical_rating,
        //     verbal_rating: rateAlbum.verbal_rating,
        //     music_album: rateAlbum.music_album,
        //     user: rateAlbum.user,
        //   }}
        //   validationSchema={LoginSchemat}
        //   validateOnChange={false}
        //   validateOnBlur={false}
        //   onSubmit={(values) => {
        //     // add_rate(values);
        //   }}
        // >
        //   {({ handleSubmit, setErrors, values }) => (
        //     <Form onSubmit={handleSubmit} className="">
        //       <div className="rate__box">
        //         <div className="rate__container">
        //           <p className="rate__container-text"> Twoja ocena </p>
        //           <span className="rate__container-value">
        //             {rateValueAlbum === null && hoverValue !== null
        //               ? hoverValue + "/10"
        //               : ""}
        //             {rateValueAlbum !== null ? rateValueAlbum + "/10" : ""}
        //           </span>
        //           <Field
        //             type="radio"
        //             id="favourites"
        //             name="favourites"
        //             value={1}
        //             className="star-input"
        //           />
        //           <Favorite
        //             className="heart-icon"
        //             onClick={() => {
        //               setIsFavorite(!isFavorite);
        //             }}
        //             onMouseEnter={() => {
        //               setHoverFavorite(true);
        //             }}
        //             onMouseLeave={() => {
        //               setHoverFavorite(false);
        //             }}
        //             style={
        //               isFavorite || hoverFavorite
        //                 ? { color: "#ffc200" }
        //                 : { color: "#ddd" }
        //             }
        //           />
        //         </div>
        //         <div>
        //           {[...Array(10)].map((star, index) => {
        //             const value_rating = index + 1;

        //             return (
        //               <label key={index}>
        //                 <Field
        //                   type="radio"
        //                   id="numerical_rating"
        //                   name="numerical_rating"
        //                   className="star-input"
        //                   value={value_rating}
        //                   onClick={() => {
        //                     setRateValueAlbum(value_rating);
        //                     setErrors({});
        //                   }}
        //                 />
        //                 <Star
        //                   className="star-icon"
        //                   onMouseEnter={() => {
        //                     setHoverValue(value_rating);
        //                   }}
        //                   onMouseLeave={() => {
        //                     setHoverValue(null);
        //                   }}
        //                   style={
        //                     value_rating <= (rateValueAlbum || hoverValue)
        //                       ? { color: "#ffc200" }
        //                       : { color: "#ddd" }
        //                   }
        //                 />
        //               </label>
        //             );
        //           })}
        //         </div>
        //         <div className="errors">
        //           <ErrorMessage name="numerical_rating" />
        //         </div>
        //         <div className="form__opinion">
        //           <Field
        //             as="textarea"
        //             id="verbal_rating"
        //             name="verbal_rating"
        //             className="form__opinion-item"
        //             placeholder="Treść tekstu"
        //             type="textarea"
        //           />
        //         </div>
        //       </div>
        //     </Form>
        //   )}
        // </Formik>
      );
    }
  }

  return (
    <div className="rate">
      {contentRate}
      <InfoToLog toggleModal={toggleModal} props={{ modal }} />
    </div>
  );
};

export default RateAlbum;
