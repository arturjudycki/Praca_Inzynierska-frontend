import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmailReset from "../pages/EmailReset";
import ResetPassword from "../pages/ResetPassword";
import ErrorPage from "../pages/ErrorPage";
import Texts from "../pages/Texts";
import MusicAlbums from "../pages/MusicAlbums";
import Songs from "../pages/Songs";
import Artists from "../pages/Artists";
import UserPage from "../pages/UserPage";
import SettingPage from "../pages/SettingPage";

const Page = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route
          path="/send-link-to-reset-password"
          exact
          element={<EmailReset />}
        />
        <Route
          path="/reset-password/:token/:email"
          exact
          element={<ResetPassword />}
        />
        <Route path="/user/:username" exact element={<UserPage />} />
        <Route path="/texts" exact element={<Texts />} />
        <Route path="/music-albums" exact element={<MusicAlbums />} />
        <Route path="/songs" exact element={<Songs />} />
        <Route path="/artists" exact element={<Artists />} />
        <Route path="/settings-user" exact element={<SettingPage />} />
        <Route path="*" exact element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Page;
