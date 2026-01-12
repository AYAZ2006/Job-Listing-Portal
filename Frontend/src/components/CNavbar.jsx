import React, { useState,useRef,useEffect } from "react";
import { useNavigate, Link ,useLocation} from "react-router-dom";
import { User, Edit3, ListChecks, Star, Settings, Phone, LogOut, Bell } from "lucide-react";
import axios from "axios";
export default function CNavbar() {
  const [openPanel, setOpenPanel] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("user_email");
  const username = localStorage.getItem("username");
  const logout = () => { localStorage.removeItem("user_type"); localStorage.removeItem("user_email"); localStorage.removeItem("username");navigate("/candidate-login");};
  const panelWrapperRef = useRef(null);
  const notifRef = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (panelWrapperRef.current && !panelWrapperRef.current.contains(e.target)) setOpenPanel(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotifications(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  useEffect(() => {
    if (!openNotifications) return;
    axios.get(`https://jobchahiye.vercel.app/candidate/notifications/?email=${email}`).then((res) => setNotifications(res.data)).catch((err) => console.error(err));
  }, [openNotifications]);
  useEffect(() => {
    setOpenPanel(false);
    setOpenNotifications(false);
  }, [location.pathname]);
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.is_read).length);
  }, [notifications]);
  function markNotificationAsRead(id) {
    setNotifications(prev =>
      prev.map(n =>n.id === id ? { ...n, is_read: true } : n)
    );
    axios.patch(`https://jobchahiye.vercel.app/candidate/notifications/${id}/`,{ is_read: true }).catch(err => console.error(err));
  }
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] backdrop-blur-md bg-white/10 rounded-2xl shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">JobPortal</div>
        <div className="hidden lg:block relative w-full max-w-sm lg:ml-10">
          <input type="text" placeholder="Search jobs..." className="w-full px-4 py-2 rounded-full bg-black text-white focus:outline-none"/>
          <button className="absolute right-2 top-1/2 -translate-y-1/2">🔍</button>
        </div>
        <ul className="hidden lg:flex items-center gap-4">
          <li><Link to="/home" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">Home</Link></li>
          <li><Link to="/internships" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">Internships</Link></li>
          <li><Link to="/jobs" className="py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80">Jobs</Link></li>
          <li><Link to="/home" className="flex items-center justify-center py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80"> <img src="/message-square.svg" alt="Messages" className="w-5 h-5"/></Link></li>
          <li className="relative">
            <div onClick={() => setOpenNotifications(!openNotifications)} className="cursor-pointer py-2 px-4 hover:bg-white/20 rounded-full transition text-white/80 flex items-center relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">{unreadCount}</span>
              )}
            </div>
            {openNotifications && (
              <div ref={notifRef} className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-[#111] text-white rounded-2xl shadow-2xl p-3 z-[999] border border-white/10">
                {notifications.length === 0 ? (
                  <div className="text-sm text-gray-400 p-3">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} onClick={() => markNotificationAsRead(n.id)} className={`p-3 rounded-lg mb-2 cursor-pointer transition flex items-start gap-3 ${n.is_read ? "bg-white/10" : "bg-white/20"}`}>
                      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-10 h-10 rounded-full object-cover"/>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{n.title || "New Update"}</div>
                        <div className="text-xs text-gray-300 mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{n.time || "Just now"}</div>
                      </div>
                      {!n.is_read && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                  )))}
              </div>
            )}
          </li>
        </ul>
        <div className="hidden lg:flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer overflow-hidden" onClick={() => setOpenPanel(!openPanel)}>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" className="w-full h-full object-cover"/>
          </div>
        </div>

        <div ref={panelWrapperRef}>
          <button className="lg:hidden text-white text-2xl" onClick={() => setOpenPanel(prev => !prev)}>{openPanel ? "✕" : "☰"}</button>
          {openPanel && (
            <div className="absolute right-6 top-16 w-64 bg-[#0f0f0f] text-white rounded-2xl shadow-2xl p-5 space-y-4 z-[999] border border-white/10">
              <div className="flex items-center gap-4">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" className="w-14 h-14 rounded-full object-cover border border-white/20"/>
                <div>
                  <div className="font-semibold">{username}</div>
                  <div className="text-xs sm:text-sm opacity-60 break-all">{email}</div>
                </div>
              </div>
              <button className="w-full py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer" onClick={()=>navigate('/settings')}><Edit3 size={16}/>Edit</button>
              <hr className="border-white/10"/>
              <div className="flex flex-col text-sm gap-1.5 lg:hidden">
                <Link to="/home" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition">Home</Link>
                <Link to="/internships" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition">Internships</Link>
                <Link to="/jobs" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition">Jobs</Link>
                <hr className="border-white/10"/>
              </div>
              <div className="flex flex-col text-sm gap-1.5">
                <Link to="/applications" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition"><ListChecks size={16}/>Registrations / Applications</Link>
                <Link to="/watchlist" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition"><Star size={16}/>Watchlist</Link>
                <Link to="/settings" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition"><Settings size={16}/>Settings</Link>
                <Link to="/contact" className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white/10 transition"><Phone size={16}/>Contact Us</Link>
              </div>
              <button onClick={logout} className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition flex items-center justify-center gap-2 cursor-pointer"><LogOut size={16}/>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
