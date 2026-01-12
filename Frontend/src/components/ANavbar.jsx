import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link ,useLocation} from "react-router-dom";
import {Home,Edit3,ListChecks,FolderCog,MessageSquare,Bell,LogOut,Settings,Phone,Star} from "lucide-react";
import axios from "axios";

export default function AdminNavbar() {
  const [openPanel, setOpenPanel] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("user_email");
  const username = localStorage.getItem("username");
  const panelRef = useRef(null);
  const notifRef = useRef(null);
  const logout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_email");
    localStorage.removeItem("username");
    navigate("/recruiter-login");
  };
  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target))
        setOpenPanel(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setOpenNotifications(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!openNotifications) return;
    axios.get(`https://jobchahiye.vercel.app/recruiter/notifications/?email=${email}`).then((res) => setNotifications(res.data)).catch((err) => console.error(err));
  }, [openNotifications]);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.is_read).length);
  }, [notifications]);
  
  useEffect(() => {
    setOpenPanel(false);
    setOpenNotifications(false);
  }, [location.pathname]);

  function markNotificationAsRead(id) {
    setNotifications((prev) =>prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    axios.patch(`https://jobchahiye.vercel.app/recruiter/notifications/${id}/`,{ is_read: true });
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] backdrop-blur-md bg-white/10 rounded-2xl shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">JobPortal</div>
        <div className="hidden lg:block relative w-full max-w-sm lg:ml-10">
          <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-full bg-black text-white focus:outline-none"/>
          <button className="absolute right-2 top-1/2 -translate-y-1/2">🔍</button>
        </div>
        <ul className="hidden lg:flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80">Home</Link>
          <Link to="/post" className="flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80">Post</Link>
          <Link to="/evaluate" className="flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80">Evaluate</Link>
          <Link to="/manage" className="flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80">Manage</Link>
          <Link to="/messages" className="flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80"><MessageSquare size={18} /></Link>
          <li className="relative">
            <div onClick={() => setOpenNotifications(!openNotifications)} className="relative cursor-pointer flex items-center gap-2 py-2 px-4 hover:bg-white/20 rounded-full text-white/80">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">{unreadCount}</span>
              )}
            </div>
          </li>
        </ul>
        <div className="hidden lg:flex w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setOpenPanel(!openPanel)}>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="w-full h-full object-cover"/>
        </div>
        <button className="lg:hidden text-white text-2xl" onClick={() => setOpenPanel(!openPanel)}>{openPanel ? "✕" : "☰"}</button>
      </div>
      {openPanel && (
        <div ref={panelRef} className="absolute right-6 top-16 w-72 bg-[#0f0f0f] text-white rounded-2xl shadow-xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="w-14 h-14 rounded-full"/>
            <div>
              <div className="font-semibold">{username}</div>
              <div className="text-xs opacity-70">{email}</div>
            </div>
          </div>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-sm"><Edit3 size={16} /> Edit Profile</button>
          <hr className="border-white/10" />
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/admin" className="flex items-center gap-2 py-2 px-2 hover:bg-white/10 rounded"><Home size={16} /> Home</Link>
            <Link to="/post" className="flex items-center gap-2 py-2 px-2 hover:bg-white/10 rounded"><Edit3 size={16} /> Post a Job</Link>
            <Link to="/evaluate" className="flex items-center gap-2 py-2 px-2 hover:bg-white/10 rounded"><ListChecks size={16} /> Evaluate</Link>
            <Link to="/manage" className="flex items-center gap-2 py-2 px-2 hover:bg-white/10 rounded"><FolderCog size={16} /> Manage Listings</Link>
          </div>
          <hr className="border-white/10" />
          <button onClick={logout} className="w-full py-2 mt-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center gap-2 text-sm cursor-pointer"><LogOut size={16} /> Logout</button>
        </div>
      )}
    </nav>
  );
}
