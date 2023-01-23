import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, userData } from "../API-utils/endpointsAuthUser";
import { useQuery } from "react-query";

const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  let userIsLogged = false;
  let user_info;
  let content;

  const { status, data } = useQuery("user", userAuth, { retry: 0 });
  const { status: isUser, data: user } = useQuery(
    ["user-data", username],
    () => userData(username),
    { retry: 0 }
  );

  if (status === "success") {
    if (data.user.username === username) {
      userIsLogged = true;
    }
  }

  if (isUser === "error") {
    navigate("/404");
  }
  if (isUser === "success") {
    user_info = user;
    content = <InfoAccount person={{ userIsLogged, user_info }} />;
  }

  console.log(isUser);

  return content;
};

export default UserPage;
