import React, { useState, useEffect } from "react";
import { Briefcase, GraduationCap, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
function Manage() {
  const [view, setView] = useState("select");
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await axios.get(`https://job-listing-portal-8.onrender.com/my-jobs/?username=${username}`);
      setJobs(res.data);
    } catch (err) {
      toast.error(err);
    }
  };

  const fetchInternships = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await axios.get(`https://job-listing-portal-8.onrender.com/my-internships/?username=${username}`);
      setInternships(res.data);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchJobs();
    fetchInternships();
  }, []);
  const handleDelete = async (id, type) => {
    setLoading(true);
    try {
      const url = type === "job" ? `https://job-listing-portal-8.onrender.com/jobs/${id}/`: `https://job-listing-portal-8.onrender.com/internships/${id}/`;
      await axios.delete(url);
      if (type === "job") fetchJobs();
      else fetchInternships();
      setOpenMenu(null);
    } catch (err) {
      toast.error(err);
    } finally{
      setLoading(false);
    }
  };

  const handleEdit = (id, type) => {
    navigate('/edit');
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#121212] pt-24">
        <div className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-2xl w-full max-w-6xl p-5 animate-[slideUp_0.35s_ease-out]">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-white">
              {view==="select" && "Select Posting Type to Continue"}
              {view==="jobs" && "My Jobs"}
              {view==="internship" && "My Internships"}
            </h2>
          </div>
          {view === "select" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button onClick={() => setView("jobs")} className="flex-1 bg-black text-white p-4 rounded-xl flex items-center justify-center gap-6 hover:opacity-90 transition cursor-pointer">
                <Briefcase size={22} />
                <p className="font-medium">Jobs</p>
              </button>
              <button onClick={() => setView("internship")} className="flex-1 bg-black text-white p-4 rounded-xl flex items-center justify-center gap-6 hover:opacity-90 transition cursor-pointer">
                <GraduationCap size={22} />
                <p className="font-medium">Internships</p>
              </button>
            </div>
          )}
          {view === "jobs" && (
          <div className="flex flex-col gap-6 mt-5 text-white">
              {jobs.length === 0 && <p>No jobs posted yet.</p>}
              {jobs.map((job) => (
              <div key={job.id} className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row gap-5">
                  {job.company_logo && (
                      <img src={"/eye.svg"} alt={job.company_name} className="w-28 h-28 object-contain rounded-lg"/>
                  )}
                  <div className="flex-1 flex flex-col gap-2">
                      <h3 className="text-2xl font-bold">{job.job_title}</h3>
                      <p className="text-gray-300 font-medium">{job.company_name}</p>
                      <p><span className="font-semibold">Posted by:</span> {job.created_by?.username || "N/A"}</p>
                      <p><span className="font-semibold">Location:</span> {job.location}</p>
                      <p><span className="font-semibold">Openings:</span> {job.openings}</p>
                      <p><span className="font-semibold">Work Type:</span> {job.work_type}</p>
                      <p><span className="font-semibold">Work Mode:</span> {job.work_mode}</p>
                      <p><span className="font-semibold">Salary Range:</span> {job.salary_min} - {job.salary_max}</p>
                      <p className="mt-2 whitespace-pre-wrap"><span className="font-semibold">Job Description:</span>{" "}{job.job_description}</p>
                      <p className="text-xs text-gray-400 mt-1">Posted on: {new Date(job.created_at).toLocaleString()}</p>
                  </div>
                  <div className="relative">
                      <button onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)} className="p-2 hover:bg-white/10 rounded-full"><MoreVertical /></button>
                      {openMenu === job.id && (
                          <div className="absolute right-0 mt-2 bg-black border border-white/20 p-2 rounded-lg w-32 text-sm">
                            <button onClick={() => navigate("/edit", { state: { item: job, type: "job" } })} className="w-full text-left py-1 hover:bg-white/10">Edit</button>
                            <button onClick={() => handleDelete(job.id, "job")} className="w-full text-left py-1 hover:bg-white/10">Delete</button>
                          </div>
                      )}
                  </div>
              </div>
              ))}
              <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg cursor-pointer" onClick={() => setView("select")}>Back</button>
          </div>
          )}
          {view === "internship" && (
            <div className="flex flex-col gap-4 mt-5 text-white">
              {internships.length === 0 && (
                <p>No internships posted yet.</p>
              )}
              {internships.map((intern) => (
                <div key={intern.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{intern.internship_title}</h3>
                    <p className="opacity-70 text-sm">{intern.company_name}</p>
                    <p className="opacity-50 text-xs">{intern.location}</p>
                  </div>
                  <div className="relative">
                    <button onClick={() => setOpenMenu(openMenu === intern.id ? null : intern.id)}><MoreVertical /></button>
                    {openMenu === intern.id && (
                      <div className="absolute right-0 mt-2 bg-black border border-white/20 p-2 rounded-lg w-32 text-sm">
                        <button onClick={() => navigate("/edit", { state: { item: intern, type: "internship" } })} className="w-full text-left py-1 hover:bg-white/10">Edit</button>
                        <button onClick={() => handleDelete(intern.id, "internship")} className="w-full text-left py-1 hover:bg-white/10">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg cursor-pointer" onClick={() => setView("select")}>Back</button></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manage;
