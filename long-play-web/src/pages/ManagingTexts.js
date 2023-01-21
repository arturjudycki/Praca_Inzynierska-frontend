import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userAuth } from "../API-utils/endpointsAuthUser";
import { useQuery, useMutation } from "react-query";
const ManagingTexts = () => {
  const navigate = useNavigate();

  const { status: isLogged, data } = useQuery("user", userAuth, { retry: 0 });

  if (isLogged === "error") {
    navigate("/");
  }

  if (isLogged === "success") {
    if (data.user.user_type !== "admin" && data.user.user_type !== "editor") {
      navigate("/");
    } else {
      return <section className="managing-texts">textssssss</section>;
    }
  }
};

export default ManagingTexts;
