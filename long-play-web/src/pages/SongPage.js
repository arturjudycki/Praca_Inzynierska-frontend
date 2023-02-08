import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const ErrorPage = () => {
  const { id_song } = useParams();

  return <section className="song-page">{id_song}</section>;
};

export default ErrorPage;
