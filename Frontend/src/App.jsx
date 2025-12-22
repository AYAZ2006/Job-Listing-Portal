import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SigninUI from "./components/SigninUi.jsx";
import LoginUI from "./components/ui/LoginUI.jsx";
import Candidate from "./components/Candidate.jsx";
import RecruiterSignup from "./components/RecruiterSignup.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx"; 
import CandidateLogin from "./components/CandidateLogin.jsx";
import Home from "./components/Home.jsx";
import Upload from "./components/Upload.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CNavbar from "./components/CNavbar.jsx";
import Admin from "./components/Admin.jsx";
import ProfileDownload from "./components/ProfileDownload.jsx";
import JobDetail from "./components/JobDetail.jsx";
import ANavbar from "./components/ANavbar.jsx";
import WatchList from "./components/WatchList.jsx";
import Footer from "./components/Footer.jsx";
import InternshipPage from "./components/InternshipPage.jsx";
import Evaluate from "./components/Evaluate.jsx";
import Post from "./components/Post.jsx";
import Manage from "./components/Manage.jsx";
import Profile from "./components/Profile.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Applications from "./components/Applications.jsx";
import Jobs from "./components/Jobs.jsx";
import Edit from "./components/Edit.jsx"
import InternshipDetail from "./components/InterviewDetail.jsx";
import AnalyticsPage from "./components/AnalyticsPage.jsx";
import Settings from "./components/Settings.jsx";
import CommonFilters from "./components/CommonFilters.jsx";
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
  const loggedInNavbarRoutes = ["/home","/jobs","/internships","/settings","/applications","/profile","/admin","/watchlist","/contact"];
  const showPublicNavbar = publicNavbarHideRoutes.includes(location.pathname);
  const showLoggedInNavbar = loggedInNavbarRoutes.includes(location.pathname) || location.pathname.startsWith("/jobs/") || location.pathname.startsWith("/internships/");
  return (
    <>
      {["/admin", "/post", "/evaluate","/manage","/edit"].includes(location.pathname) && <ANavbar />}
      {!showPublicNavbar && !showLoggedInNavbar && !["/admin", "/post", "/evaluate","/manage","/upload","/edit"].includes(location.pathname) && (<Navbar />)}
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
        <Route path="/filters" element={<CommonFilters />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile-download" element={<ProfileDownload />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/internships/:id" element={<InternshipDetail />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/evaluate" element={<Evaluate />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<ProtectedRoute allowedRoles={["candidate"]}><Home /></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default function App() {
  return(
    <Router basename={process.env.PUBLIC_URL || '/'}>
      <Layout />
      <ToastContainer />
    </Router>
  )
}