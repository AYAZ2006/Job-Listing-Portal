import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");
  const logout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_email");
    navigate("/recruiter-login");
  };
  const navLinks = [
    { to: "/post", label: "Post" },
    { to: "/evaluate", label: "Evaluate" },
    { to: "/manage", label: "Manage" },
    { to: "/messages", icon: "/message-square.svg", alt: "Messages" },
    { to: "/notifications", icon: "/bell.svg", alt: "Notifications" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] backdrop-blur-md bg-white/10 rounded-2xl shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white lg:-ml-20">JobPortal</div>
        <div className="hidden lg:block lg:ml-10 relative w-full max-w-sm">
          <input type="text" placeholder="Search jobs..." className="w-full px-4 py-2 rounded-full bg-black text-white focus:outline-none"/>
          <button className="absolute right-2 top-1/2 -translate-y-1/2">🔍</button>
        </div>
        <ul className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="flex items-center justify-center py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
              {link.icon ? <img src={link.icon} alt={link.alt} className="w-5 h-5" /> : link.label}
            </Link>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-6">
          <span className="text-white/90">{email}</span>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full transition" onClick={logout}>Logout</button>
        </div>
        <button className="lg:hidden text-white text-2xl" onClick={() => setOpenNav(!openNav)}>{openNav ? "✕" : "☰"}</button>
      </div>
      {openNav && (
        <div className="lg:hidden bg-white/10 backdrop-blur-md text-white px-4 py-3 space-y-3 rounded-b-2xl shadow-lg">
          <div className="relative w-full">
            <input type="text" placeholder="Search jobs..." className="w-full px-4 py-2 rounded-full bg-black text-white focus:outline-none"/>
            <button className="absolute right-2 top-1/2 -translate-y-1/2">🔍</button>
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="flex items-center justify-center py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
                {link.icon ? link.label || <img src={link.icon} alt={link.alt} className="w-5 h-5" /> : link.label}
              </Link>
            ))}
          </div>
          <div className="text-white/90">{email}</div>
          <button className="w-full text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
