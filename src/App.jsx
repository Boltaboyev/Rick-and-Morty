import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Characters from "./components/Characters";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/episodes/:episodeId" element={<Home />} />{" "}
        <Route path="/characters" element={<Characters />} />
        <Route path="/" element={<Navigate to="/episodes/1" replace />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </div>
  );
};

export default App;
