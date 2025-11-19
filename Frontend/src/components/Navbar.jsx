import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { Link } from "react-router-dom";

>>>>>>> c375fed (my latest updates)
export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const Navigate = useNavigate();
  const navListMenuItems = [
    { title: "Products", description: "Find the perfect solution for your needs." },
    { title: "About Us", description: "Meet and learn about our dedication" },
    { title: "Blog", description: "Find the perfect solution for your needs." },
    { title: "Services", description: "Learn how we can help you achieve your goals." },
    { title: "Support", description: "Reach out to us for assistance or inquiries" },
    { title: "Contact", description: "Find the perfect solution for your needs." },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] backdrop-blur-md bg-white/10 rounded-2xl shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-10 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white lg:ml-[-100px]">Job</Link>

        {/* Search Bar */}
        <div className="hidden lg:block relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black">🔍</button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
                Home
              </Link>
            </li>

            <li className="relative group">
              <button className="flex items-center gap-1 py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
                Resources <span className="ml-1">&#9662;</span>
              </button>

              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-4 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl shadow-lg grid grid-cols-2 gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-max">
                {navListMenuItems.map((item, index) => (
                  <div key={index} className="p-2 hover:bg-white/20 rounded-xl">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                ))}
              </div>
            </li>
<<<<<<< HEAD
            <li><a href="#" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">About Us</a></li>
            <li><a href="#" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">Contact Us</a></li>
            <li><a href="#" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">Contact Us</a></li>
          </ul>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-full transition cursor-pointer" onClick={()=>Navigate('/login')}>Sign In</button>
=======

            <li>
              <Link to="/" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* LOGIN + SIGNUP FIXED */}
          <Link
            to="/login"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full transition"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-full transition"
          >
            Sign In
          </Link>
>>>>>>> c375fed (my latest updates)
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openNav && (
        <div className="lg:hidden bg-white/10 backdrop-blur-md text-white px-4 py-3 space-y-2 rounded-b-2xl shadow-lg">

          <Link to="/" className="block py-2 px-4 hover:bg-white/20 rounded-full transition">
            Home
          </Link>

          <div>
            <button
              onClick={() => setOpenMenuMobile(!openMenuMobile)}
              className="flex items-center justify-between w-full py-2 px-4 hover:bg-white/20 rounded-full transition"
            >
              Resources
              <span
                className={`ml-1 transform transition-transform ${
                  openMenuMobile ? "rotate-180" : ""
                }`}
              >
                &#9662;
              </span>
            </button>

            {openMenuMobile && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                {navListMenuItems.map((item, index) => (
                  <div key={index} className="p-2 hover:bg-white/20 rounded-xl">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-black/90">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/" className="block py-2 px-4 hover:bg-white/20 rounded-full transition">
            About Us
          </Link>

          <Link to="/" className="block py-2 px-4 hover:bg-white/20 rounded-full transition">
            Contact Us
          </Link>

          {/* Mobile login + signup */}
          <Link
            to="/login"
            className="w-full block text-center bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full transition"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="w-full block text-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-full transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
