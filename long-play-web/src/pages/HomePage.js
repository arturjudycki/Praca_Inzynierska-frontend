import React from "react";
import { getAllTexts } from "../API-utils/endpointsManageTexts";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import img from "../images/article.jpg";

const HomePage = () => {
  let contentTexts;

  const { status: isTexts, data: texts } = useQuery("texts", getAllTexts, {
    retry: 0,
  });

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
            <div className="text-item text-item__imgBox">
              <img src={img} alt="text" className="text-item__img" />
            </div>
            <p className="text-item text-item__type-of-text">
              {displayCorrectTypeOfText(text.type_of_text)}
            </p>
            <p className="text-item text-item__title">{text.title}</p>
          </NavLink>
        </div>
      ));
  }

  return (
    <div>
      <h1>Najnowsze teksty</h1>
      <section className="newest_texts">{contentTexts}</section>
    </div>
  );
};

export default HomePage;
