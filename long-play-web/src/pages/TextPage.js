import React from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import {
  createText,
  updateText,
  getTextsByIdUser,
  getTextByIdText,
} from "../API-utils/endpointsManageTexts";
import { userAuth, logoutAuth, userData } from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";

const TextPage = () => {
  const { id_text } = useParams();
  const navigate = useNavigate();

  let content = id_text;
  let contentComments;

  const { status: isText, data: text } = useQuery(
    ["text-data", id_text],
    () => getTextByIdText(id_text),
    { retry: 0 }
  );

  const displayCorrectTypeOfText = (type) => {
    if (type === "article") {
      return "artykuł";
    } else if (type === "interview") {
      return "wywiad";
    } else return type;
  };

  if (isText === "error") {
    navigate("/404");
  }

  if (isText === "success") {
    console.log(text);
    content = (
      <>
        <p className="text-item text-item__type-of-text">
          {displayCorrectTypeOfText(text.text.type_of_text)}
        </p>
        <p className="text-item text-item__title">{text.text.title}</p>

        <p className="text-item text-item__content">
          <pre>{text.text.content}</pre>
        </p>
      </>
    );
  }

  return (
    <>
      {content}
      <p>Komentarze</p>
      {contentComments}
    </>
  );
};

export default TextPage;
