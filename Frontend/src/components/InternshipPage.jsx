import React from "react";
import { FaRegHeart } from "react-icons/fa";

export default function InternshipPage() {
  return (
    <div className="h-screen w-full bg-[#121212] text-white flex">
      <aside className="w-72 h-full sticky top-0 p-6 overflow-y-auto bg-[#1a1a1a] border-r border-white/10">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Job Type</h3>
          <select className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none focus:ring-1 focus:ring-teal-400">
            <option>Internship</option>
            <option>Full Time</option>
            <option>Part Time</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Location</h3>
          <input
            type="text"
            placeholder="Search location"
            className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none focus:ring-1 focus:ring-teal-400"
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Skills / Keywords</h3>
          <input
            type="text"
            placeholder="React, Python, etc"
            className="w-full px-3 py-2 bg-[#262626] border border-white/10 rounded outline-none focus:ring-1 focus:ring-teal-400"
          />
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 h-full overflow-y-auto p-6 space-y-6">
        {/* CARD 1 */}
        <div className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 hover:border-teal-500/50 transition">
          <img
            src="https://via.placeholder.com/70"
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              Junior Full Stack Developer Internship
            </h2>
            <p className="text-gray-400 text-sm mb-2">Smaran AI</p>
            <div className="flex gap-3 text-sm text-gray-400">
              <span>Remote</span>
              <span>Full Time</span>
              <span>No Experience Required</span>
            </div>
          </div>

          {/* Save Button */}
          <button className="text-gray-400 hover:text-teal-400 transition text-xl">
            <FaRegHeart />
          </button>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#1b1b1b] border border-white/10 p-5 rounded-xl flex gap-4 hover:border-teal-500/50 transition">
          <img
            src="https://via.placeholder.com/70"
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              Frontend Web Development Internship
            </h2>
            <p className="text-gray-400 text-sm mb-2">TakeOff Talent</p>
            <div className="flex gap-3 text-sm text-gray-400">
              <span>Delhi</span>
              <span>Remote</span>
              <span>Freshers Welcome</span>
            </div>
          </div>

          {/* Save Button */}
          <button className="text-gray-400 hover:text-teal-400 transition text-xl">
            <FaRegHeart />
          </button>
        </div>
      </main>
    </div>
  );
}
