import React from "react";
import {
  getTextsByArticle,
  getTextsByNews,
  getTextsByRanking,
  getTextsByInterview,
} from "../API-utils/endpointsManageTexts";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import img from "../images/article.jpg";

const Texts = () => {
  let contentArticles;
  let contentNews;
  let contentRankings;
  let contentInterviews;

  const displayCorrectTypeOfText = (type) => {
    if (type === "article") {
      return "artykuł";
    } else if (type === "interview") {
      return "wywiad";
    } else return type;
  };

  const { status: isArticles, data: articles } = useQuery(
    "articles",
    getTextsByArticle,
    {
      retry: 0,
    }
  );

  const { status: isNews, data: news } = useQuery("news", getTextsByNews, {
    retry: 0,
  });

  const { status: isRankings, data: rankings } = useQuery(
    "rankings",
    getTextsByRanking,
    {
      retry: 0,
    }
  );

  const { status: isInterviews, data: interviews } = useQuery(
    "interviews",
    getTextsByInterview,
    {
      retry: 0,
    }
  );

  if (isArticles === "success") {
    contentArticles = articles
      .sort((a, b) => b.id_text - a.id_text)
      .map((article) => (
        <div className="textBox" key={article.id_text}>
          <NavLink
            to={{
              pathname: "/text/".concat(`${article.id_text}`),
            }}
            className="link-to-text"
          >
            <div className="text-item text-item__imgBox">
              <img src={img} alt="text" className="text-item__img" />
            </div>
            <p className="text-item text-item__type-of-text">
              {displayCorrectTypeOfText(article.type_of_text)}
            </p>
            <p className="text-item text-item__title">{article.title}</p>
          </NavLink>
        </div>
      ));
  }

  if (isNews === "success") {
    contentNews = news
      .sort((a, b) => b.id_text - a.id_text)
      .map((news) => (
        <div className="textBox" key={news.id_text}>
          <NavLink
            to={{
              pathname: "/text/".concat(`${news.id_text}`),
            }}
            className="link-to-text"
          >
            <div className="text-item text-item__imgBox">
              <img src={img} alt="text" className="text-item__img" />
            </div>
            <p className="text-item text-item__type-of-text">
              {displayCorrectTypeOfText(news.type_of_text)}
            </p>
            <p className="text-item text-item__title">{news.title}</p>
          </NavLink>
        </div>
      ));
  }

  if (isRankings === "success") {
    contentRankings = rankings
      .sort((a, b) => b.id_text - a.id_text)
      .map((ranking) => (
        <div className="textBox" key={ranking.id_text}>
          <NavLink
            to={{
              pathname: "/text/".concat(`${ranking.id_text}`),
            }}
            className="link-to-text"
          >
            <div className="text-item text-item__imgBox">
              <img src={img} alt="text" className="text-item__img" />
            </div>
            <p className="text-item text-item__type-of-text">
              {displayCorrectTypeOfText(ranking.type_of_text)}
            </p>
            <p className="text-item text-item__title">{ranking.title}</p>
          </NavLink>
        </div>
      ));
  }

  if (isInterviews === "success") {
    contentInterviews = interviews
      .sort((a, b) => b.id_text - a.id_text)
      .map((interview) => (
        <div className="textBox" key={interview.id_text}>
          <NavLink
            to={{
              pathname: "/text/".concat(`${interview.id_text}`),
            }}
            className="link-to-text"
          >
            <div className="text-item text-item__imgBox">
              <img src={img} alt="text" className="text-item__img" />
            </div>
            <p className="text-item text-item__type-of-text">
              {displayCorrectTypeOfText(interview.type_of_text)}
            </p>
            <p className="text-item text-item__title">{interview.title}</p>
          </NavLink>
        </div>
      ));
  }

  return (
    <div>
      <h1 className="textSlogan">artykuły</h1>
      <div className="textContainer">{contentArticles}</div>
      <h1 className="textSlogan">newsy</h1>
      <div className="textContainer">{contentNews}</div>
      <h1 className="textSlogan">rankingi</h1>
      <div className="textContainer">{contentRankings}</div>
      <h1 className="textSlogan">wywiady</h1>
      <div className="textContainer">{contentInterviews}</div>
    </div>
  );
};

export default Texts;
