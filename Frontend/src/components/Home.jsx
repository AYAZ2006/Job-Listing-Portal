import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Building2, ArrowRight } from 'lucide-react';
import Footer from "./Footer.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [activeTab, setActiveTab] = useState("apps");
  const [appliedItems, setAppliedItems] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const Navigate = useNavigate();
  const recentApplications = [...appliedItems].sort((a, b) => new Date(b.applied_at || b.created_at) - new Date(a.applied_at || a.created_at)).slice(0, 3);
  const recentSaved = savedJobs.slice(-3).reverse();
  useEffect(() => {
    const email = localStorage.getItem("user_email") || "";
    if (!email) return;
    const loadApplied = async () => {
      try {
        const jobIdsRes = await axios.post("http://127.0.0.1:8000/applied-jobs/", { email });
        const allJobs = await axios.get("http://127.0.0.1:8000/jobs/");
        const appliedJobs = (jobIdsRes.data.applied_jobs || []).map(item => {const job = allJobs.data.find(j => j.id === item.job_id);
          if (!job) return null;
          return {...job,type: "job",title: job.job_title,company: job.company_name,status: item.status || "applied",applied_at: item.applied_at || job.created_at};}).filter(Boolean);
        const internIdsRes = await axios.post("http://127.0.0.1:8000/applied-internships/", { email });
        const allInternships = await axios.get("http://127.0.0.1:8000/internships/");
        const appliedInternships = (internIdsRes.data.applied_internships || []).map(item => {const intern = allInternships.data.find(i => i.id === item.internship_id);
            if (!intern) return null;
            return {...intern,type: "internship",title: intern.internship_title,company: intern.company_name,status: item.status || "applied",applied_at: item.applied_at || intern.created_at};}).filter(Boolean);
        setAppliedItems([...appliedJobs, ...appliedInternships]);
      } catch (err) {
        toast.error("Failed to load applications");
      }
    };
    loadApplied();
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("user_email") || "";
    if (!email) return;
    const fetchSavedJobs = async () => {
      try {
        const resFavorites = await axios.post("http://127.0.0.1:8000/favorite-list/", { email });
        const favoriteItems = resFavorites.data.favorite_items || [];
        const jobsRes = await axios.get("http://127.0.0.1:8000/jobs/");
        const internsRes = await axios.get("http://127.0.0.1:8000/internships/");
        const savedItems = favoriteItems.map(item => {
          if (item.type === "job") {const job = jobsRes.data.find(j => j.id === item.id);return job ? { ...job, type: "job", title: job.job_title } : null;}
          else if (item.type === "internship") {const intern = internsRes.data.find(i => i.id === item.id);return intern ? { ...intern, type: "internship", title: intern.internship_title } : null;}
          return null;
        }).filter(Boolean);
        setSavedJobs(savedItems);
      } catch (err) {
        toast.error("Failed to load saved items");
      }
    };
    fetchSavedJobs();
  }, []);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const internshipsRef = useRef(null);
  const jobsRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, internsRes] = await Promise.all([axios.get("http://127.0.0.1:8000/jobs/"),axios.get("http://127.0.0.1:8000/internships/")]);
        setJobs(jobsRes.data);
        setInternships(internsRes.data);
      } catch (err) {
        toast.error("Failed to load listings");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#121212] pt-24">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-10 mb-16 md:px-0 px-4">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-white mb-3">My Activity</h1>
          <p className="text-lg text-gray-300">Your recent applications and saved items.</p>
          <div className="bg-[#1C1C1C] border border-gray-700 rounded-full flex items-center gap-8 p-3 px-6 w-fit">
            <div onClick={() => setActiveTab("apps")} className={`flex items-center gap-3 cursor-pointer transition ${activeTab === "apps" ? "opacity-100" : "opacity-60"}`}>
              <img src="/activity.svg" className="w-6 h-6" />
              <span className="text-white text-sm font-medium">Applications</span>
            </div>
            <div onClick={() => setActiveTab("saved")} className={`flex items-center gap-3 cursor-pointer transition ${activeTab === "saved" ? "opacity-100" : "opacity-60"}`}>
              <img src="/bookmark.svg" className="w-5 h-5" />
              <span className="text-white text-sm font-medium">Saved</span>
            </div>
          </div>
          {activeTab === "apps" && (
            <div className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">Your Applications</h2>
                <button onClick={() => Navigate("/applications")} className="text-blue-400 text-sm hover:underline flex items-center gap-1">View All <img src="/arrow-up-right.svg" alt="→" /></button>
              </div>
              {recentApplications.length > 0 ? (
                <div className="space-y-3">
                  {recentApplications.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="p-4 bg-[#181818] rounded-lg border border-[#2A2A2A] flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium text-lg">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.company}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${item.status === "applied" ? "bg-gray-600" :item.status === "shortlisted" ? "bg-blue-600" :item.status === "interview" ? "bg-purple-600" :item.status === "offer" ? "bg-green-600" :"bg-red-600"}`}>{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 bg-[#181818] rounded-lg">No applications yet</div>
              )}
            </div>
          )}
          {activeTab === "saved" && (
            <div className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">Saved Items</h2>
                <button onClick={() => Navigate("/watchlist")} className="text-blue-400 text-sm hover:underline flex items-center gap-1">View All <img src="/arrow-up-right.svg" alt="→" /></button>
              </div>
              {recentSaved.length > 0 ? (
                <div className="space-y-3">
                  {recentSaved.map((job) => (
                    <div key={job.id} className="p-4 bg-[#181818] rounded-lg border border-[#2A2A2A] flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">{job.title || job.job_title || job.internship_title}</h3>
                        <p className="text-gray-400 text-sm">{job.company_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 bg-[#181818] rounded-lg">No saved items</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 md:px-0 px-4">Internship Opportunities</h2>
        <div className="relative">
          <div ref={internshipsRef} className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {internships.slice(-5).reverse().map((internship) => (
              <div key={internship.id} onClick={() => window.location.href = `/internships/${internship.id}`} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3 cursor-pointer hover:border-blue-500/50 transition">
                <h3 className="text-white font-semibold text-lg">{internship.internship_title}</h3>
                <p className="text-gray-400 text-sm">{internship.company_name}</p>
                {internship.location && <p className="text-gray-400 text-sm">Location: {internship.location}</p>}
                {internship.stipend_min !== undefined && internship.stipend_max !== undefined && (
                  <p className="text-gray-400 text-sm">Stipend: {internship.stipend_min} - {internship.stipend_max}</p>
                )}
                {internship.work_type && <p className="text-gray-400 text-sm">Type: {internship.work_type}</p>}
                {internship.openings !== undefined && <p className="text-gray-400 text-sm">{internship.openings} openings</p>}
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
            <button onClick={() => internshipsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
            <button onClick={() => internshipsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 60 }}  whileInView={{ opacity: 1, y: 0 }}  viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }}  className="relative w-full max-w-6xl  mx-auto mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-white/10 shadow-2xl backdrop-blur-xl"style={{backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80')`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundBlendMode: 'overlay',}}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative flex flex-col md:flex-row h-80 md:h-96">
          <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 1.2 }} className="md:w-1/2 h-full relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80" alt="Career Growth" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </motion.div>
          <div className="relative z-10 md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-white">
            <motion.h2 initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl font-bold leading-snug bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Opportunities don’t wait —<br />
              <span className="text-purple-300">why should you?</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-3 text-gray-300 text-sm md:text-base">Join thousands who’ve already taken the leap.</motion.p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Briefcase, label: 'Open Positions', value: '7,500+' },
                { icon: Users, label: 'Active Job Seekers', value: '18,000+' },
                { icon: Building2, label: 'Companies Hiring', value: '1,200+' },
              ].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.15, duration: 0.7 }} className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 backdrop-blur-md rounded-2xl border border-purple-400/30">
                    <stat.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button onClick={()=>Navigate('/jobs')} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }} whileTap={{ scale: 0.98 }} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full flex items-center cursor-pointer gap-2 w-fit text-sm hover:shadow-purple-500/30 transition-all duration-300">Start Your Job Search
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white md:px-0 px-4 mb-6">Job Opportunities</h2>
        <div className="relative">
          <div ref={jobsRef}  className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {jobs.slice(-5).reverse().map((job) => (
              <div key={job.id} onClick={() => window.location.href = `/jobs/${job.id}`} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3 cursor-pointer hover:border-blue-500/50 transition">
                <h3 className="text-white font-semibold text-lg">{job.job_title}</h3>
                <p className="text-gray-400 text-sm">{job.company_name}</p>
                {job.location && <p className="text-gray-400 text-sm">Location: {job.location}</p>}
                {job.salary_min !== undefined && job.salary_max !== undefined && (
                  <p className="text-gray-400 text-sm">Salary: {job.salary_min} - {job.salary_max}</p>
                )}
                {job.work_type && <p className="text-gray-400 text-sm">Type: {job.work_type}</p>}
                {job.applied !== undefined && <p className="text-gray-400 text-sm">{job.applied} people applied</p>}
                {job.created_at && (<p className="text-sm text-gray-400">Posted {Math.floor((new Date() - new Date(job.created_at)) / (1000*60*60*24)) === 0 ? "Today" : Math.floor((new Date() - new Date(job.created_at)) / (1000*60*60*24)) + " days ago"}</p>)}
                {job.active !== undefined && <p className={`text-sm font-medium ${job.active ? "text-green-400" : "text-red-400"}`}>{job.active ? "Active" : "Closed"}</p>}
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
            <button onClick={() => jobsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
            <button onClick={() => jobsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;