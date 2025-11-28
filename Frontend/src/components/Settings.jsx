import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="h-screen w-full bg-[#0e0e0e] text-gray-200 flex">
      <aside className="w-72 h-3/4 sticky top-0 p-6 overflow-y-auto hide-scrollbar bg-[#1a1a1a] border-r border-white/10 mt-30 rounded-lg ml-5 hidden md:block">
        <nav className="space-y-3 text-sm">
          <button className="w-full text-left px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#2a2a2a,#141414)] text-white border border-white/10 shadow cursor-pointer hover:bg-[linear-gradient(180deg,#3a3a3a,#1a1a1a)]">Dashboard</button>
          <button className="w-full text-left px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#2a2a2a,#141414)] text-white border border-white/10 shadow cursor-pointer hover:bg-[linear-gradient(180deg,#3a3a3a,#1a1a1a)]">Activity</button>
          <button className="w-full text-left px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#2a2a2a,#141414)] text-white border border-white/10 shadow cursor-pointer hover:bg-[linear-gradient(180deg,#3a3a3a,#1a1a1a)]">Reports</button>
          <button className="w-full text-left px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#444,#222)] text-white border border-white/10 shadow cursor-pointer">Settings</button>
          <button className="w-full text-left px-6 py-2 rounded-lg font-semibold bg-[linear-gradient(180deg,#2a2a2a,#141414)] text-white border border-white/10 shadow cursor-pointer hover:bg-[linear-gradient(180deg,#3a3a3a,#1a1a1a)]">Team</button>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto hide-scrollbar mt-10">
        <div className="sticky top-0 z-20 bg-[#0e0e0e] pt-6 pb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Settings</h1>
          <h1 className="text-xs sm:text-sm mb-6 text-gray-300">Manage your account settings and preferences</h1>
          <div className="flex justify-center gap-2 sm:gap-3 mb-4 overflow-x-auto hide-scrollbar">
            {["Account", "Notifications", "Sharing", "Schedule", "Billing", "Questions"].map((tab) => (
              <button key={tab} className={`px-3 sm:px-4 py-2 rounded-full cursor-pointer text-xs sm:text-sm whitespace-nowrap ${ tab === "Account" ? "bg-white text-black" : "bg-[#1a1a1a] text-gray-400 border border-white/10"}`}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input type="text" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="Your name"/></div>
            <div>
              <label className="text-sm text-gray-400">Surname</label>
              <input type="text" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="Your surname"/></div>
            <div className="flex items-center justify-center"><FaUserCircle className="text-gray-500" size={70} /></div>
            <div className="col-span-2">
              <label className="text-sm text-gray-400">Email</label>
              <input type="email" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="you@example.com"/>
            </div>
          </div>
        </div>
        <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Timezone & Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-400">City</label>
              <input type="text" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="City"/>
            </div>
            <div>
              <label className="text-sm text-gray-400">Timezone</label>
              <select className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white">
                <option>UTC / GMT +5:30</option>
                <option>UTC / GMT +1</option>
                <option>UTC / GMT -4</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Date Format</label>
              <select className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white">
                <option>dd/mm/yyyy</option>
                <option>mm/dd/yyyy</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Work Preferences</h2>
          <div className="mb-6">
            <label className="text-sm text-gray-400">Daily Time Utilization</label>
            <input type="range" min="1" max="12" className="w-full mt-2" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Core Work Range</label>
            <input type="range" min="1" max="8" className="w-full mt-2" />
          </div>
        </div>
        <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400">Role</label>
              <input type="text" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="Your role"/>
            </div>
            <div>
              <label className="text-sm text-gray-400">Department</label>
              <input type="text" className="w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white" placeholder="Department"/>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`.hide-scrollbar::-webkit-scrollbar {display: none;}.hide-scrollbar {-ms-overflow-style: none;scrollbar-width: none; /* Firefox */}`}</style>
    </div>
  );
}
