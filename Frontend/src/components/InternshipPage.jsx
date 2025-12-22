import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { MdUpdate } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { toast } from "react-toastify";
import CommonFilters from "./CommonFilters";
export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({workMode: "",workType: "",datePosted: "",location: "",keywords: "",});
  const email = localStorage.getItem("user_email") || "";
  const daysAgo = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  };
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const daysOld = Math.floor((Date.now() - new Date(item.created_at)) / 86400000);
      const modeMatch = !filters.workMode || item.work_mode?.toLowerCase().includes(filters.workMode.toLowerCase()) || filters.workMode.toLowerCase().includes(item.work_mode?.toLowerCase());
      const typeMatch = !filters.workType || item.work_type === filters.workType;
      const dateMatch = !filters.datePosted || daysOld <= {past24hours: 1,pastweek: 7,pastmonth: 30,past3months: 90,past6months: 180,pastyear: 365,}[filters.datePosted];
      const locationMatch = !filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase());
      const keywordMatch = !filters.keywords || item.internship_title.toLowerCase().includes(filters.keywords.toLowerCase()) || item.company_name.toLowerCase().includes(filters.keywords.toLowerCase()) ||(item.description && item.description.toLowerCase().includes(filters.keywords.toLowerCase()));
      return modeMatch && typeMatch && dateMatch && locationMatch && keywordMatch;
    });
  }, [internships, filters]);
  const fetchInternships = async () => {
    try {
      const res = await axios.get("https://jobchahiye.vercel.app/internships/");
      setInternships(res.data.map((intern) => ({ ...intern, is_favorite: false })));
    } catch {
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const res = await axios.post("https://jobchahiye.vercel.app/favorite/", { internship_id: id, email });
      const isFav = res.data.favorite;
      setInternships((prev) =>
        prev.map((intern) => (intern.id === id ? { ...intern, is_favorite: isFav } : intern))
      );
    } catch {
      toast.error("Failed to toggle favorite");
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="h-screen w-full bg-[#121212] text-white flex flex-col md:flex-row overflow-hidden">
      <CommonFilters filters={filters} setFilters={setFilters} />
      <main className="flex-1 h-[90vh] overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-20 space-y-6">
        {loading && <p className="text-center text-gray-400">Loading internships...</p>}
        {!loading && filteredInternships.length === 0 && (
          <p className="text-center text-gray-400">No internships found</p>
        )}
        {filteredInternships.map((item) => (
          <div key={item.id} className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 items-center hover:border-teal-500/50 transition cursor-pointer" onClick={() => (window.location.href = `/internships/${item.id}`)}>
            <img src={item.company_logo || "https://via.placeholder.com/70"} className="md:w-35 md:h-35 w-10 h-10 object-cover rounded" alt="Logo"/>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.internship_title}</h2>
              <p className="text-gray-400 text-sm mb-2">{item.company_name}</p>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><BiTimeFive />{item.work_type}</span>
                <span className="flex items-center gap-1"><IoBriefcaseOutline />{item.work_mode}</span>
                {item.salary_min && <span className="flex items-center gap-1"><FaRupeeSign />{item.salary_min} - {item.salary_max}</span>}
              </div>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><GoLocation />{item.location}</span>
                <span className="flex items-center gap-1"><LuCalendarDays />{item.created_at?.split("T")[0]}</span>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2"><MdUpdate /> Posted {daysAgo(item.created_at)}</div>
            </div>
            <button onClick={(e) => {e.stopPropagation();toggleFavorite(item.id);}} className="text-gray-400 hover:text-teal-400 transition text-xl">{item.is_favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}</button>
          </div>
        ))}
      </main>
    </div>
  );
}
