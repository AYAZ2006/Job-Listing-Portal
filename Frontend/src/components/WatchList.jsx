import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { MdUpdate } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { toast } from "react-toastify";

export default function WatchList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("user_email") || "";

  const daysAgo = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/favorite-list/", { email });
      const favoriteItems = res.data.favorite_items || [];
      const [jobsRes, internsRes] = await Promise.all([axios.get("http://127.0.0.1:8000/jobs/"),axios.get("http://127.0.0.1:8000/internships/")]);
      const allJobs = jobsRes.data;
      const allInterns = internsRes.data;
      const mappedItems = favoriteItems.map((fav) => {
        if (fav.type === "job") {const job = allJobs.find((j) => j.id === fav.id);return job ? { ...job, type: "job", is_favorite: true } : null;}
        else if (fav.type === "internship") {const intern = allInterns.find((i) => i.id === fav.id);return intern ? { ...intern, type: "internship", is_favorite: true } : null;}
        return null;
      }).filter(Boolean);
      setItems(mappedItems);
    } catch (error) {
      toast.error("Failed to load favorite items");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (item) => {
    try {
      const payload = { email };
      if (item.type === "job") payload.job_id = item.id;
      if (item.type === "internship") payload.internship_id = item.id;
      const res = await axios.post("http://127.0.0.1:8000/favorite/", payload);
      const isFav = res.data.favorite;
      setItems((prev) =>
        prev.map((i) => (i.id === item.id && i.type === item.type ? { ...i, is_favorite: isFav } : i))
      );
    } catch (error) {
      toast.error("Failed to toggle favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex flex-col md:flex-row overflow-hidden">
      <aside className="w-72 h-3/4 sticky top-0 p-6 overflow-y-auto bg-[#1a1a1a] border-r border-white/10 mt-25 rounded-lg ml-5 hidden md:block">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Job Type</h3>
          <select className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none">
            <option>Internship</option>
            <option>Full Time</option>
            <option>Part Time</option>
          </select>
        </div>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Location</h3>
          <input type="text" placeholder="Search location" className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none"/>
        </div>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Skills / Keywords</h3>
          <input type="text" placeholder="React, Python, etc" className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none"/>
        </div>
      </aside>
      <main className="flex-1 h-[90vh] overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-20 space-y-6">
        {loading && <p className="text-center text-gray-400">Loading favorite jobs...</p>}
        {!loading && items.length === 0 && (
          <p className="text-center text-gray-400">No saved jobs or internships found</p>
        )}
        {items.map(item => (
          <div key={`${item.type}-${item.id}`} 
              className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 items-center hover:border-teal-500/50 transition cursor-pointer" 
              onClick={() => window.location.href = `/${item.type}s/${item.id}`}>
            <img src={item.company_logo || "https://via.placeholder.com/70"} className="md:w-35 md:h-35 w-10 h-10 object-cover rounded" alt="Logo"/>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.type === "job" ? item.job_title : item.internship_title}</h2>
              <p className="text-gray-400 text-sm mb-2">{item.company_name}</p>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><BiTimeFive />{item.work_type}</span>
                <span className="flex items-center gap-1"><IoBriefcaseOutline />{item.work_mode}</span>
                {item.salary_min && <span className="flex items-center gap-1"><FaRupeeSign />{item.salary_min} - {item.salary_max}</span>}
              </div>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><GoLocation />{item.location}</span>
                {item.created_at && <span className="flex items-center gap-1"><LuCalendarDays />{item.created_at.split("T")[0]}</span>}
              </div>
              {item.created_at && <div className="text-sm text-gray-400 flex items-center gap-2"><MdUpdate /> Posted {daysAgo(item.created_at)}</div>}
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }} className="text-gray-400 hover:text-teal-400 transition text-xl">
              {item.is_favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
