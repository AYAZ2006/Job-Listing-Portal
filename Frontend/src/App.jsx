import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SigninUI from "./components/SigninUi.jsx";
import LoginUI from "./components/ui/LoginUI.jsx";
import Candidate from "./components/Candidate.jsx";
import RecruiterSignup from "./components/RecruiterSignup.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx"; 
import CandidateLogin from "./components/CandidateLogin.jsx";


function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup", "/candidate", "/recruiter"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SigninUI />} />
        <Route path="/login" element={<LoginUI />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/recruiter" element={<RecruiterSignup />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
<Route path="/recruiter-login" element={<RecruiterLogin />} />

      </Routes>
    </>
  );
}

export default function App() {
  return <Layout />;  // ❌ removed second router, only layout here
}



