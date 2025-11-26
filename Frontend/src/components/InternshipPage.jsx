import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

export default function InternshipPage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/internships/").then((res) => setInternships(res.data)).catch((err) => console.error(err)).finally(() => setLoading(false));
  }, []);
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex overflow-hidden">
      <aside className="w-72 h-3/4 sticky top-0 p-6 overflow-y-auto bg-[#1a1a1a] border-r border-white/10 mt-25 rounded-lg ml-5">
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
        <main className="flex-1 h-screen overflow-y-auto p-6 mt-20 space-y-6">
            {loading && (
            <p className="text-center text-gray-400">Loading internships...</p>
            )}
            {!loading && internships.length === 0 && (
            <p className="text-center text-gray-400">No internships found</p>
            )}
        {internships.map((item) => (
          <div key={item.id} className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 hover:border-teal-500/50 transition">
            <img src={item.company_logo || "https://via.placeholder.com/70"} className="w-20 h-20 object-cover rounded" alt="Logo"/>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.internship_title}</h2>
              <p className="text-gray-400 text-sm mb-2">{item.company_name}</p>
              <div className="flex gap-3 text-sm text-gray-400">
                <span>{item.location}</span>
                <span>{item.work_type}</span>
                <span>{item.work_mode}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-teal-400 transition text-xl"><FaRegHeart /></button>
          </div>
        ))}
      </main>
    </div>
  );
}
