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
export default function WatchList() {
  const [items, setItems] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications,setApplications] =useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("user_email") || "";
  const [filters, setFilters] = useState({workMode: "",workType: "",datePosted: "",location: "",keywords: "",});
  const daysAgo = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  };
  const filteredApplications = useMemo(() => {
      return applications.filter((item) => {
        const daysOld = Math.floor((Date.now() - new Date(item.applied_at || item.created_at)) / 86400000);
        const modeMatch = !filters.workMode || item.work_mode?.toLowerCase().includes(filters.workMode.toLowerCase()) || filters.workMode.toLowerCase().includes(item.work_mode?.toLowerCase());
        const typeMatch = !filters.workType || (item.work_type || (item.type === "internship" ? "internship" : "")).toLowerCase() === filters.workType.toLowerCase();
        const dateMatch = !filters.datePosted || daysOld <= {past24hours: 1, pastweek: 7, pastmonth: 30,past3months: 90, past6months: 180, pastyear: 365}[filters.datePosted];
        const locationMatch = !filters.location || item.location?.toLowerCase().includes(filters.location.toLowerCase());
        const keywordMatch = !filters.keywords || item.title?.toLowerCase().includes(filters.keywords.toLowerCase()) || item.company_name?.toLowerCase().includes(filters.keywords.toLowerCase());
        return modeMatch && typeMatch && dateMatch && locationMatch && keywordMatch;
      });
    }, [applications, filters]);
  const fetchFavorites = async () => {
    try {
      const res = await axios.post("https://jobchahiye.vercel.app/favorite-list/", { email });
      const favoriteItems = res.data.favorite_items || [];
      const [jobsRes, internsRes] = await Promise.all([axios.get("https://jobchahiye.vercel.app/jobs/"),axios.get("https://jobchahiye.vercel.app/internships/")]);
      const allJobs = jobsRes.data;
      const allInterns = internsRes.data;
      const mappedItems = favoriteItems.map((fav) => {if (fav.type === "job") {const job = allJobs.find((j) => j.id === fav.id);return job ? { ...job, type: "job", is_favorite: true } : null;}else if (fav.type === "internship") {const intern = allInterns.find((i) => i.id === fav.id);return intern ? { ...intern, type: "internship", is_favorite: true } : null;}return null;}).filter(Boolean);
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
      const res = await axios.post("https://jobchahiye.vercel.app/favorite/", payload);
      const isFav = res.data.favorite;
      setItems((prev) => prev.map((i) => (i.id === item.id && i.type === item.type ? { ...i, is_favorite: isFav } : i)));
    } catch (error) {
      toast.error("Failed to toggle favorite");
    }
  };
  useEffect(() => {
      const normalizedJobs = jobs.map(j => ({...j,type: "job",title: j.job_title,company: j.company_name,work_type: j.work_type || "Full Time",salary_min: j.salary_min,salary_max: j.salary_max,logo: j.company_logo,}));
      const normalizedInternships = internships.map(i => ({...i,type: "internship",title: i.internship_title,company: i.company_name,work_type: i.work_type || "Internship",salary_min: i.stipend || "Unpaid",salary_max: i.stipend || "",logo: i.company_logo,}));
      const merged = [...normalizedJobs, ...normalizedInternships].sort((a, b) => new Date(b.applied_at || b.created_at) - new Date(a.applied_at || a.created_at));
      setApplications(merged);
    }, [jobs, internships]);
  useEffect(() => {
    fetchFavorites();
  }, []);
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex flex-col md:flex-row overflow-hidden">
      <CommonFilters filters={filters} setFilters={setFilters} />
      <main className="flex-1 h-[90vh] overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-20 space-y-6">
        {loading && <p className="text-center text-gray-400">Loading favorite jobs...</p>}
        {!loading && items.length === 0 && (<p className="text-center text-gray-400">No saved jobs or internships found</p>)}
        {items.map(item => (
          <div key={`${item.type}-${item.id}`} className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 items-center hover:border-teal-500/50 transition cursor-pointer" onClick={() => window.location.href = `/${item.type}s/${item.id}`}>
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
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }} className="text-gray-400 hover:text-teal-400 transition text-xl">{item.is_favorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}</button>
          </div>
        ))}
      </main>
    </div>
  );
}
