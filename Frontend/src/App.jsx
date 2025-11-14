import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </HashRouter>
  );
}
