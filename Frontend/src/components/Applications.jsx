import React, { useEffect, useState, useMemo } from "react";
import CommonFilters from "./CommonFilters";
import axios from "axios";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { MdUpdate } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { toast } from "react-toastify";

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({workMode: "",workType: "",datePosted: "",location: "",keywords: "",});
  const email = localStorage.getItem("user_email") || "";
  const daysAgo = (dateString) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.post("https://jobchahiye.vercel.app/applied-jobs/", { email });
      const appliedData = res.data.applied_jobs || [];
      const jobsResponse = await axios.get("https://jobchahiye.vercel.app/jobs/");
      const allJobs = jobsResponse.data;
      const jobsWithDetails = appliedData.map(item => {
          const job = allJobs.find(j => j.id === item.job_id);
          if (!job) return null;
          return {...job,status: item.status || "applied",applied_at: item.applied_at || job.created_at};}).filter(Boolean);
      setJobs(jobsWithDetails);
      setFilteredJobs(jobsWithDetails);
    } catch (error) {
      toast.error("Failed to load applied jobs");
    } finally {
      setLoading(false);
    }
  };
  const fetchAppliedInternships = async () => {
    try {
      const res = await axios.post("https://jobchahiye.vercel.app/applied-internships/", { email });
      const appliedData = res.data.applied_internships || [];
      const all = await axios.get("https://jobchahiye.vercel.app/internships/");
      const allData = all.data;
      const formatted = appliedData.map(item => {
          const match = allData.find(i => i.id === item.internship_id);
          if (!match) return null;
          return {...match,is_internship: true,  status: item.status || "applied",applied_at: item.applied_at || match.created_at};}).filter(Boolean);
      setInternships(formatted);
    } catch (err) {
      toast.error("Failed to load applied internships");
    }
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
  useEffect(() => {
  if (!email) return setLoading(false);
  const loadAll = async () => {await fetchAppliedJobs();await fetchAppliedInternships();setLoading(false);};loadAll();}, []);
  const getStatusColor = (status) => {switch (status) {case "applied": return "bg-gray-600";case "shortlisted": return "bg-blue-600";case "interview": return "bg-purple-600";case "offer": return "bg-green-600";case "rejected": return "bg-red-600";default: return "bg-gray-600";}};
  useEffect(() => {
    const normalizedJobs = jobs.map(j => ({...j,type: "job",title: j.job_title,company: j.company_name,work_type: j.work_type || "Full Time",salary_min: j.salary_min,salary_max: j.salary_max,logo: j.company_logo,}));
    const normalizedInternships = internships.map(i => ({...i,type: "internship",title: i.internship_title,company: i.company_name,work_type: i.work_type || "Internship",salary_min: i.stipend || "Unpaid",salary_max: i.stipend || "",logo: i.company_logo,}));
    const merged = [...normalizedJobs, ...normalizedInternships].sort((a, b) => new Date(b.applied_at || b.created_at) - new Date(a.applied_at || a.created_at));
    setApplications(merged);
  }, [jobs, internships]);
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex flex-col md:flex-row overflow-hidden">
      <CommonFilters filters={filters} setFilters={setFilters} />
      <main className="flex-1 h-[90vh] overflow-y-auto p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mt-20 space-y-6">
        {loading && <p className="text-center text-gray-400">Loading applied jobs...</p>}
        {!loading && filteredApplications.length === 0 && (<p className="text-center text-gray-400">{applications.length === 0 ? "No applications yet" : "No applications match your filters"}</p>)}
        {filteredApplications.map((item) => (
          <div key={`${item.type}-${item.id}`} className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 items-center hover:border-teal-500/50 transition cursor-pointer">
            <img src={item.company_logo || "https://via.placeholder.com/70"} className="md:w-35 md:h-35 w-10 h-10 object-cover rounded" alt="Logo" onClick={() => (window.location.href = `/jobs/${item.id}`)}/>
            <div className="flex-1 cursor-pointer" onClick={() => {if (item.type === "job") {window.location.href = `/jobs/${item.id}`;} else {window.location.href = `/internships/${item.id}`;}}}>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-400 text-sm mb-2">{item.company}</p>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><BiTimeFive />{item.work_type}</span>
                <span className="flex items-center gap-1"><IoBriefcaseOutline />{item.work_mode}</span>
                <span className="flex items-center gap-1"><FaRupeeSign className="text-sm" />{item.salary_min} - {item.salary_max}</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-400 flex-wrap mb-3">
                <span className="flex items-center gap-1"><GoLocation />{item.location}</span>
                <span className="flex items-center gap-1"><LuCalendarDays />{item.created_at.split("T")[0]}</span>
                <span className={`px-4 py-2 rounded-full text-white font-bold text-xs ${getStatusColor(item.status)}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
              </div>
              <div className="text-sm text-gray-400 flex items-center gap-2"><MdUpdate /> Posted {daysAgo(item.applied_at || item.created_at)}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}