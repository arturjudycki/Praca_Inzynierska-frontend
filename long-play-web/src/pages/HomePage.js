import React from "react";
import { getAllTexts } from "../API-utils/endpointsManageTexts";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import articleImg from "../images/article.jpg";
import newsImg from "../images/news.png";
import rankingImg from "../images/ranking.jpg";
import interviewImg from "../images/interview.jpg";

const HomePage = () => {
  let contentTexts;

  const { status: isTexts, data: texts } = useQuery("texts", getAllTexts, {
    retry: 0,
  });

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
    contentTexts = texts
      .sort((a, b) => b.id_text - a.id_text)
      .map((text) => (
        <div className="textBox" key={text.id_text}>
          <NavLink
            to={{
              pathname: "/text/".concat(`${text.id_text}`),
            }}
            className="link-to-text"
          >
            <div className="textBox__item-imgBox">
              <div className="textBox__item-imgContainer">
                <img
                  src={displayCorrectImage(text.type_of_text)}
                  alt="text"
                  className="textBox__item-img"
                />
              </div>
              <p className="textBox__item-type-of-text">
                {displayCorrectTypeOfText(text.type_of_text)}
              </p>
            </div>

            <p className="textBox__item-title">{text.title}</p>
          </NavLink>
        </div>
      ));
  }

  return (
    <div>
      <h1 className="textSlogan">Najnowsze teksty</h1>
      <section className="newest_texts">{contentTexts}</section>
    </div>
  );
};

export default HomePage;
