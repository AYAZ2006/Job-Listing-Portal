import React,{useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SigninUI from "./components/SigninUi.jsx";
import LoginUI from "./components/ui/LoginUI.jsx";
import Candidate from "./components/Candidate.jsx";
import RecruiterSignup from "./components/RecruiterSignup.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx"; 
import CandidateLogin from "./components/CandidateLogin.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CNavbar from "./components/CNavbar.jsx";
import Admin from "./components/Admin.jsx";
import JobDetail from "./components/JobDetail.jsx";
import ANavbar from "./components/ANavbar.jsx";
import Footer from "./components/Footer.jsx";
import InternshipPage from "./components/InternshipPage.jsx";
import Evaluate from "./components/Evaluate.jsx";
import Post from "./components/Post.jsx";
import Manage from "./components/Manage.jsx";
import Profile from "./components/Profile.jsx";
import Applications from "./components/Applications.jsx";
import Jobs from "./components/Jobs.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
  const location = useLocation();
  const user = localStorage.getItem("user_type");
  useEffect(() => {
    if (user && location.pathname === "/") {
      if (user === "candidate") window.location.replace("/home");
      else if (user === "recruiter") window.location.replace("/admin");
    }
  }, [user, location.pathname]);
  const publicNavbarHideRoutes = ["/login","/signup","/candidate","/recruiter","/candidate-login","/recruiter-login",];
  const loggedInNavbarRoutes = ["/home","/jobs","/internships","/settings","/applications","/profile","/admin"];
  const showPublicNavbar = publicNavbarHideRoutes.includes(location.pathname);
  const showLoggedInNavbar = loggedInNavbarRoutes.includes(location.pathname) || location.pathname.startsWith("/jobs/");;
  return (
    <>
      {["/admin", "/post", "/evaluate","/manage"].includes(location.pathname) && <ANavbar />}
      {!showPublicNavbar && !showLoggedInNavbar && !["/admin", "/post", "/evaluate","/manage"].includes(location.pathname) && (<Navbar />)}
      {showLoggedInNavbar && !["/admin", "/post", "/evaluate","/manage"].includes(location.pathname) && (<CNavbar />)}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SigninUI />} />
        <Route path="/login" element={<LoginUI />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/recruiter" element={<RecruiterSignup />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/internships" element={<InternshipPage />} />
        <Route path="/post" element={<Post />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<ProtectedRoute allowedRoles={["candidate"]}><Home /></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return(
    <>
      <Layout />
      <ToastContainer />
    </>

  )
}



