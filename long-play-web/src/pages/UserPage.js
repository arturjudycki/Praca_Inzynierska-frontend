import React from "react";
import { useParams } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, logoutAuth } from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";

const UserPage = () => {
  const { username } = useParams();
  let userIsLogged = false;
  const { status, data } = useQuery("user", userAuth);

  if (status === "success") {
    if (data.user.username === username) {
      userIsLogged = true;
    }
  }

  return (
    <InfoAccount person={{ username, userIsLogged }} />
    // <RatesAccount/>
  );
};

export default UserPage;
