import "./sass/App.sass";
import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Page from "./layouts/Page";
import Footer from "./layouts/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>{/* <Page /> */}</Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
