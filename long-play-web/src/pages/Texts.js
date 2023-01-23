import React from "react";
import { getTextsByArticle } from "../API-utils/endpointsManageTexts";
import { useQuery, useMutation } from "react-query";

const Texts = () => {
  const { status: isArticles, data: articles } = useQuery(
    "articles",
    getTextsByArticle,
    {
      retry: 0,
    }
  );

  return (
    <div>
      <div>Tekstem dobrze czytającym się to wielka sztuka</div>
    </div>
  );
};

export default Texts;
