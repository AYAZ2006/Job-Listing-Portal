import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function Meta({ label, value }) {
  return (
    <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] rounded-lg p-3 flex flex-col border border-white/5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-gray-200 font-semibold mt-1">{value}</span>
    </div>
  );
}
export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  useEffect(() => {axios.get(`http://127.0.0.1:8000/jobs/${id}/`).then((res) => setJob(res.data)).catch((err) => console.error(err));}, [id]);
  useEffect(() => {axios.post("http://127.0.0.1:8000/apply-job/", {job_id: id,email: localStorage.getItem("user_email"),check_only: true}).then((res) => {setApplied(res.data.applied);}).catch(() => {});}, [id]);
  if (!job) return <p className="text-center text-gray-400">Loading...</p>;
  function daysAgo(dateString) {
    const posted = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} days ago`;
  }
  const applyJob = () => {axios.post("http://127.0.0.1:8000/apply-job/", {job_id: id,email: localStorage.getItem("user_email"),})
      .then(() => {
        toast.success("Applied successfully");
        setApplied(true); 
      })
      .catch(() => {
        toast.error("Failed to apply");
      });
  };
  const withdrawJob = () => {axios.delete("http://127.0.0.1:8000/apply-job/", {data: {job_id: id,email: localStorage.getItem("user_email"),},})
      .then(() => {
        toast.success("Withdrawn successfully");
        setApplied(false);
      })
      .catch(() => toast.error("Failed to withdraw"));
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.02),transparent_12%),linear-gradient(180deg,#0f0f0f,#060606)]">
      <div className="w-full max-w-3xl bg-[linear-gradient(180deg,rgba(26,26,26,0.95),rgba(18,18,18,0.95))] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.02)] border border-white/5 flex flex-col gap-4 mt-13">
        <header className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[linear-gradient(135deg,#1c1c1c,#0f0f0f)] shadow-inner border border-white/5 overflow-hidden">
              <img src={job.company_logo} alt={job.company_name} className="w-full h-full object-cover rounded-xl"/>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{job.job_title}</h1>
              <p className="text-sm text-gray-400">{job.company_name}</p>
            </div>
          </div>
          <div className="flex items-center">
              <button className="px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#2a2a2a,#141414)] text-white border border-white/10 shadow cursor-pointer" onClick={applied ? withdrawJob : applyJob}>{applied ? "Withdraw" : "Apply Now"}</button>   
          </div>
        </header>
        <section className="border-t border-white/10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Meta label="Openings" value={job.openings} />
            <Meta label="Work Type" value={job.work_type} />
            <Meta label="Mode" value={job.work_mode} />
            <Meta label="Location" value={job.location} />
            <Meta label="Salary" value={`₹${job.salary_min} - ₹${job.salary_max}`} />
            <Meta label="Posted" value={daysAgo(job.created_at)} />
          </div>
        </section>
        <section className="bg-[linear-gradient(180deg,rgba(20,20,20,0.7),rgba(16,16,16,0.5))] rounded-xl p-4 border border-white/5 max-h-64 overflow-y-auto">
          <h2 className="text-base font-semibold text-white mb-2">About the role</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.job_description}</p>
        </section>
        <section className="px-1 text-gray-300">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">Why you'll love it</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Work with a modern stack and cross-functional teams</li>
            <li>Opportunity to learn and grow with mentorship</li>
            <li>Competitive compensation and flexible work arrangements</li>
          </ul>
        </section>
        <footer className="flex justify-between items-center text-gray-400 text-sm border-t border-white/10 pt-3">
          <div>{job.company_name} • {job.location}</div>
          <div>Salary ₹{job.salary_min} — ₹{job.salary_max}</div>
        </footer>
      </div>
    </div>
  );
}

