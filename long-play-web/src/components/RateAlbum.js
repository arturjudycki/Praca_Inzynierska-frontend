import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Star, Favorite } from "@material-ui/icons";
import InfoToLog from "./InfoToLog";

const RateAlbum = () => {
  const { id_music_album } = useParams();
  const { status, data } = useQuery("user", userAuth, { retry: 0 });

  const [rateValueAlbum, setRateValueAlbum] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [hoverFavorite, setHoverFavorite] = useState(false);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

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
            id="star_1"
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
                ? { color: "#fcfc00" }
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
                      ? { color: "#fcfc00" }
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
            id="star_1"
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
                ? { color: "#fcfc00" }
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
                    setRateValueAlbum(value_rating);
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
                      ? { color: "#fcfc00" }
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
          ></textarea>
        </form>
        <button className="rate__box-button" type="submit">
          oceń
        </button>
      </div>
    );
  }

  return (
    <div className="rate">
      {contentRate}
      <InfoToLog toggleModal={toggleModal} props={{ modal }} />
    </div>
  );
};

export default RateAlbum;
