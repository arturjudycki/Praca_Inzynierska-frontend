import React from "react";
import { useParams } from "react-router-dom";
import InfoAccount from "../components/InfoAccount";
import { userAuth, logoutAuth } from "../API-utils/endpoints";
import { useQuery, useMutation } from "react-query";

const SettingPage = () => {
  return <div>Ustawienia </div>;
};

export default SettingPage;
