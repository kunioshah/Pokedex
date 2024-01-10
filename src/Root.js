import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import PokeDetails from "./components/PokeDetails";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/pokemon/" element={<PokeDetails />} />
        <Route exact path="/pokemon/:id" element={<PokeDetails />} />
        <Route exact path="/Pokedex" element={<App />} />
        <Route exact path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

export default Root;
