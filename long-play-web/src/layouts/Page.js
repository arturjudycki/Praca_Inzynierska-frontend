import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmailReset from "../pages/EmailReset";
import ResetPassword from "../pages/ResetPassword";

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
        <Route path="/reset-password" exact element={<ResetPassword />} />
        {/* <Route path="/" exact element={<HomePage />} /> */}
      </Routes>
    </div>
  );
};

export default Page;
