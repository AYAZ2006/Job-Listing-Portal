import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/jobs/${id}/`).then((res) => setJob(res.data)).catch((err) => console.error(err));
  }, [id]);
  if (!job) return <p className="text-center text-gray-400">Loading...</p>;
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex items-center justify-center px-6">
  <div className="max-w-xl w-full bg-[#1a1a1a] rounded-2xl p-8 shadow-xl border border-white/10 space-y-4">

    <div className="flex items-center gap-4">
      <img
        src={job.company_logo}
        alt={job.company_name}
        className="w-20 h-20 rounded-lg object-cover border border-white/10"
      />
      <div>
        <h1 className="text-3xl font-semibold">{job.job_title}</h1>
        <p className="text-gray-400">{job.company_name}</p>
      </div>
    </div>

    <div className="border-t border-white/10 pt-4 space-y-2 text-gray-300">
      <p><span className="text-gray-500">Openings:</span> {job.openings}</p>
      <p><span className="text-gray-500">Work Type:</span> {job.work_type}</p>
      <p><span className="text-gray-500">Mode:</span> {job.work_mode}</p>
      <p><span className="text-gray-500">Location:</span> {job.location}</p>
      <p><span className="text-gray-500">Salary Min:</span> ₹{job.salary_min}</p>
      <p><span className="text-gray-500">Salary Max:</span> ₹{job.salary_max}</p>
      <p><span className="text-gray-500">Posted On:</span> {job.created_at}</p>
    </div>

    <div className="bg-[#141414] p-4 rounded-xl border border-white/10">
      <p className="text-gray-200 leading-relaxed whitespace-pre-line">
        {job.job_description}
      </p>
    </div>
  </div>
</div>

  );
}
